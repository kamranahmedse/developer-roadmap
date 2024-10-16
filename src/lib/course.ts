import type { MarkdownFileType } from './file';

export interface CourseFrontmatter {
  order: number;
  title: string;
  description: string;
}

export type LessonFrontmatter = {
  title: string;
  description: string;
  order: number;
  type: 'lesson' | 'challenge' | 'quiz';

  defaultValue?: string;
  initSteps?: string[];
  expectedResults?: {
    columns: string[];
    values: string[][];
  }[];
};

export type LessonFileType = MarkdownFileType<LessonFrontmatter> & {
  id: string;
};

export type ChapterFrontmatter = {
  id: string;
  order: number;
  title: string;
};

export type ChapterFileType = MarkdownFileType<ChapterFrontmatter> & {
  id: string;
  lessons: LessonFileType[];
};

export type CourseFileType = MarkdownFileType<CourseFrontmatter> & {
  id: string;
};

function coursePathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';
  return fileName.replace('.md', '');
}

/**
 * Gets the IDs of all the courses available on the website
 *
 * @returns string[] Array of course IDs
 */
export async function getAllCourseIds() {
  const courseFiles = import.meta.glob<CourseFileType>(
    '/src/data/courses/*/*.md',
    {
      eager: true,
    },
  );

  return Object.keys(courseFiles).map(coursePathToId);
}

export async function getAllCourses() {
  const allCourseIds = await getAllCourseIds();

  const courses = await Promise.all(
    allCourseIds.map(async (courseId) => {
      return getCourseById(courseId);
    }),
  );

  return courses.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getCourseById(id: string): Promise<CourseFileType> {
  const courseFilesMap: Record<string, CourseFileType> =
    import.meta.glob<CourseFileType>('/src/data/courses/*/*.md', {
      eager: true,
    });

  const courseFile = Object.values(courseFilesMap).find((courseFile) => {
    return coursePathToId(courseFile.file) === id;
  });

  if (!courseFile) {
    throw new Error(`Course with ID ${id} not found`);
  }

  return {
    ...courseFile,
    id: coursePathToId(courseFile.file),
  };
}

export function chapterPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';
  return fileName.replace('.md', '');
}

export async function getChaptersByCourseId(courseId: string) {
  const chapterFilesMap = import.meta.glob<ChapterFileType>(
    `/src/data/courses/*/chapters/*/*.md`,
    {
      eager: true,
    },
  );

  const chapterFiles = Object.values(chapterFilesMap).filter((chapterFile) => {
    const [_, currentCourseId] =
      chapterFile.file.match(/\/courses\/([^/]+)\/chapters/) || [];
    return currentCourseId === courseId;
  });

  const enrichedChapters: ChapterFileType[] = [];
  for (const chapterFile of chapterFiles) {
    const chapterId = chapterPathToId(chapterFile.file);
    const lessons = await getLessonsByCourseId(courseId, chapterId);

    enrichedChapters.push({
      ...chapterFile,
      id: chapterId,
      lessons,
    });
  }

  return enrichedChapters.sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order,
  );
}

export function lessonPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';
  return fileName.replace('.md', '');
}

export async function getLessonsByCourseId(
  courseId: string,
  chapterId: string,
): Promise<LessonFileType[]> {
  const lessonFilesMap = import.meta.glob<LessonFileType>(
    `/src/data/courses/*/chapters/*/lessons/*.md`,
    {
      eager: true,
    },
  );

  return Object.values(lessonFilesMap)
    .filter((lessonFile) => {
      const [, currentCourseId, currentChapterId] =
        lessonFile.file.match(
          /\/courses\/([^/]+)\/chapters\/([^/]+)\/lessons/,
        ) || [];

      return currentCourseId === courseId && currentChapterId === chapterId;
    })
    .map((lessonFile) => ({
      ...lessonFile,
      id: lessonPathToId(lessonFile.file),
    }))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
