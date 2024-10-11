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
};

export type LessonFileType = MarkdownFileType<LessonFrontmatter> & {
  id: string;
};

export type QuizFrontmatter = {
  id: string;
  order: number;
  title: string;
};

export type QuizFileType = MarkdownFileType<QuizFrontmatter> & {
  id: string;
};

export type ChallengeFrontmatter = {
  title: string;
  desctiption: string;
  order: number;

  defaultValue?: string;
  initSteps?: string[];
  expectedResults?: {
    columns: string[];
    values: string[][];
  }[];
};

export type ChallengeFileType = MarkdownFileType<ChallengeFrontmatter> & {
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
  exercises: (QuizFileType | ChallengeFileType)[];
};

export type CourseFileType = MarkdownFileType<CourseFrontmatter> & {
  id: string;
  chapters: ChapterFileType[];
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
export async function getCourseIds() {
  const courseFiles = import.meta.glob<CourseFileType>(
    '/src/data/courses/*/*.md',
    {
      eager: true,
    },
  );

  return Object.keys(courseFiles).map(coursePathToId);
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

  const chapters = await getChaptersByCourseId(id);

  return {
    ...courseFile,
    id: coursePathToId(courseFile.file),
    chapters,
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
    const exercises = await getExercisesByCourseId(courseId, chapterId);

    enrichedChapters.push({
      ...chapterFile,
      id: chapterId,
      lessons,
      exercises,
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

export function exercisePathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';
  return fileName.replace('.md', '');
}

export async function getExercisesByCourseId(
  courseId: string,
  chapterId: string,
): Promise<(QuizFileType | ChallengeFileType)[]> {
  const exerciseFilesMap = import.meta.glob<QuizFileType | ChallengeFileType>(
    `/src/data/courses/*/chapters/*/exercises/*.md`,
    {
      eager: true,
    },
  );

  return Object.values(exerciseFilesMap)
    .filter((exerciseFile) => {
      const [, currentCourseId, currentChapterId] =
        exerciseFile.file.match(
          /\/courses\/([^/]+)\/chapters\/([^/]+)\/exercises/,
        ) || [];

      return currentCourseId === courseId && currentChapterId === chapterId;
    })
    .map((exerciseFile) => ({
      ...exerciseFile,
      id: exercisePathToId(exerciseFile.file),
    }))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getCourseExerciseById(
  courseId: string,
  chapterId: string,
  exerciseId: string,
) {
  const exerciseFilesMap = import.meta.glob<QuizFileType | ChallengeFileType>(
    `/src/data/courses/*/chapters/*/exercises/*.md`,
    {
      eager: true,
    },
  );

  const exerciseFile = Object.values(exerciseFilesMap).find((exerciseFile) => {
    const [, currentCourseId, currentChapterId, currentExerciseId] =
      exerciseFile.file.match(
        /\/courses\/([^/]+)\/chapters\/([^/]+)\/exercises\/([^/]+)\.md/,
      ) || [];

    return (
      currentCourseId === courseId &&
      currentChapterId === chapterId &&
      currentExerciseId === exerciseId
    );
  });

  if (!exerciseFile) {
    throw new Error(`Exercise with ID ${exerciseId} not found`);
  }

  return {
    ...exerciseFile,
    id: exercisePathToId(exerciseFile.file),
  };
}
