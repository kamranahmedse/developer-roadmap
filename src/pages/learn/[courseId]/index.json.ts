import type { APIRoute } from 'astro';
import { getAllCourses, getChaptersByCourseId } from '../../../lib/course';

export async function getStaticPaths() {
  const courses = await getAllCourses();
  const coursesWithChapters = await Promise.all(
    courses.map(async (course) => {
      const filteredCourse = course.frontmatter;
      const chapters = await getChaptersByCourseId(course.id);
      const enrichedChapters = chapters
        .filter((chapter) => chapter?.lessons?.length > 0)
        .map((chapter) => {
          return {
            ...chapter.frontmatter,
            id: chapter.id,
            lessons:
              chapter?.lessons?.map((lesson) => {
                return {
                  ...lesson.frontmatter,
                  id: lesson.id,
                };
              }) ?? [],
          };
        });

      const lessonsCount = enrichedChapters.reduce(
        (acc, chapter) => acc + chapter?.lessons?.length,
        0,
      );
      const chaptersCount = enrichedChapters.length;

      return {
        id: course.id,
        ...filteredCourse,
        lessonsCount,
        chaptersCount,
        // FIXME: let's discuss if we need to include the chapters here
        // or if we should just include the count
        // chapters: enrichedChapters,
      };
    }),
  );

  return coursesWithChapters.map((course) => {
    return {
      params: {
        courseId: course.id,
      },
      props: {
        course,
      },
    };
  });
}

export const GET: APIRoute = async function ({ params, request, props }) {
  return new Response(JSON.stringify(props.course), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
