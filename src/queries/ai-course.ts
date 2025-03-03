import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

export interface AICourseProgressDocument {
  _id: string;
  userId: string;
  courseId: string;
  done: string[];
  createdAt: Date;
  updatedAt: Date;
}

type GetAICourseProgressParams = {
  aiCourseSlug: string;
};

type GetAICourseProgressBody = {};

type GetAICourseProgressQuery = {};

type GetAICourseProgressResponse = AICourseProgressDocument;

export function getAiCourseProgressOptions(params: GetAICourseProgressParams) {
  return {
    queryKey: ['ai-course-progress', params],
    queryFn: () => {
      return httpGet<GetAICourseProgressResponse>(
        `/v1-get-ai-course-progress/${params.aiCourseSlug}`,
      );
    },
    enabled: !!params.aiCourseSlug && isLoggedIn(),
  };
}

type GetAICourseParams = {
  aiCourseSlug: string;
};

export interface AICourseDocument {
  _id: string;
  userId: string;
  title: string;
  slug?: string;
  keyword: string;
  difficulty: string;
  data: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

type GetAICourseBody = {};

type GetAICourseQuery = {};

type GetAICourseResponse = AICourseDocument;

export function getAiCourseOptions(params: GetAICourseParams) {
  return {
    queryKey: ['ai-course', params],
    queryFn: () => {
      return httpGet<GetAICourseResponse>(
        `/v1-get-ai-course/${params.aiCourseSlug}`,
      );
    },
  };
}
