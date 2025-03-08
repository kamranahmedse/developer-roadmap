import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
import { queryOptions } from '@tanstack/react-query';

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

type GetAICourseLimitParams = {};

type GetAICourseLimitResponse = {
  used: number;
  limit: number;
};

export function getAiCourseLimitOptions() {
  return queryOptions({
    queryKey: ['ai-course-limit'],
    queryFn: () => {
      return httpGet<GetAICourseLimitResponse>(`/v1-get-ai-course-limit`);
    },
    enabled: !!isLoggedIn(),
  });
}
