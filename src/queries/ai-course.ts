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

type AICourseModule = {
  title: string;
  lessons: string[];
};

type GetAICourseParams = {
  aiCourseSlug: string;
};

export interface AICourseDocument {
  _id: string;
  userId: string;
  title: string;
  slug?: string;
  keyword: string;
  done: string[];
  difficulty: string;
  modules: AICourseModule[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

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

export type GetAICourseLimitResponse = {
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

export type AICourseListItem = AICourseDocument & {
  lessonCount: number;
};

type ListUserAiCoursesResponse = AICourseListItem[];

export function listUserAiCoursesOptions() {
  return {
    queryKey: ['user-ai-courses'],
    queryFn: () => {
      return httpGet<ListUserAiCoursesResponse>(`/v1-list-user-ai-courses`);
    },
    enabled: !!isLoggedIn(),
  };
}
