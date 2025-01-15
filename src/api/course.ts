import { type APIContext } from 'astro';
import { api } from './api.ts';

export const allowedCourseDifficulties = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type AllowedCourseDifficulty =
  (typeof allowedCourseDifficulties)[number];

export interface CourseDocument {
  _id: string;

  slug: string;
  title: string;
  description?: string;
  detailedDescription?: string;

  difficulty?: AllowedCourseDifficulty;

  willLearn?: string[];
  prerequisites?: string[];

  creatorId: string;

  // AI Configurations
  setting: {
    prompt?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface CourseChapterDocument {
  _id: string;

  courseId: string;
  creatorId: string;

  title: string;
  slug: string;

  // AI Configurations
  setting: {
    prompt?: string;
  };

  sort: number;

  createdAt: Date;
  updatedAt: Date;
}

export const allowedLessonType = ['lesson', 'quiz', 'challenge'] as const;
export type AllowedLessonType = (typeof allowedLessonType)[number];

export const allowedSQLChallengeType = [
  'DDL',
  'DML',
  'DQL',
  'DCL',
  'TCL',
] as const;
export type AllowedSQLChallengeType = (typeof allowedSQLChallengeType)[number];

export type SQLChallenge = {
  editor: 'sql';
  type: AllowedSQLChallengeType;
  setupQuery: string;
  defaultQuery?: string;
  expectedQuery?: string;
};

export type PythonChallenge = {
  editor: 'python';
  setupCode: string;
  defaultCode: string;
  expectedCode: string;
};

export type LessonChallenge = SQLChallenge | PythonChallenge;

export type LessonQuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type LessonQuestion = {
  id: string;
  question: string;
  options: LessonQuestionOption[];
};

export interface CourseLessonDocument {
  _id: string;

  courseId: string;
  chapterId: string;
  creatorId: string;

  title: string;
  slug: string;
  type: AllowedLessonType;

  // lesson
  content?: string;

  quiz?: {
    questions: LessonQuestion[];
  };

  challenge?: LessonChallenge & {
    shouldVerifyResult?: boolean;
  };

  setting: {
    prompt?: string;
  };

  isLocked: boolean;
  sort: number;

  createdAt: Date;
  updatedAt: Date;
}

export type CourseDetailsResponse = Omit<CourseDocument, 'setting'> & {
  chapters: (Pick<
    CourseChapterDocument,
    '_id' | 'title' | 'slug' | 'sort' | 'courseId'
  > & {
    lessons: Pick<
      CourseLessonDocument,
      | '_id'
      | 'title'
      | 'slug'
      | 'type'
      | 'sort'
      | 'chapterId'
      | 'courseId'
      | 'isLocked'
    >[];
  })[];

  enrolled: number;
  rating: {
    average: number;
  };
};

export function courseApi(context: APIContext) {
  return {
    getCourse: (courseSlug: string) => {
      return api(context).get<CourseDetailsResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-course-details/${courseSlug}`,
      );
    },
  };
}
