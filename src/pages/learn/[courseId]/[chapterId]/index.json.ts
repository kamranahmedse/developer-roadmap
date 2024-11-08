import type { APIRoute } from 'astro';
import { getAllCourses, getChaptersByCourseId } from '../../../../lib/course';

export async function getStaticPaths() {
  const courses = await getAllCourses();
  const coursesWithChapters = await Promise.all(
    courses.map(async (course) => {
      const chapters = await getChaptersByCourseId(course.id);

      return chapters.map((chapter) => {
        return {
          params: {
            courseId: course.id,
            chapterId: chapter.id,
          },
          props: {
            chapter: {
              courseId: course.id,
              ...chapter.frontmatter,
              id: chapter.id,
            },
          },
        };
      });
    }),
  );

  return coursesWithChapters.flat();
}

export const GET: APIRoute = async function ({ params, request, props }) {
  return new Response(JSON.stringify(props.chapter), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
