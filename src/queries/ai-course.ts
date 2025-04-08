import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
import { queryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { queryClient } from '../stores/query-client';

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
    enabled: !!params.aiCourseSlug,
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

export type ListUserAiCoursesQuery = {
  perPage?: string;
  currPage?: string;
  query?: string;
};

export type AICourseWithLessonCount = AICourseDocument & {
  lessonCount: number;
};

type ListUserAiCoursesResponse = {
  data: AICourseWithLessonCount[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function listUserAiCoursesOptions(
  params: ListUserAiCoursesQuery = {
    perPage: '10',
    currPage: '1',
    query: '',
  },
) {
  return {
    queryKey: ['user-ai-courses', params],
    queryFn: () => {
      return httpGet<ListUserAiCoursesResponse>(
        `/v1-list-user-ai-courses`,
        params,
      );
    },
    enabled: !!isLoggedIn(),
  };
}

type ListExploreAiCoursesParams = {};

type ListExploreAiCoursesQuery = {
  perPage?: string;
  currPage?: string;
};

type ListExploreAiCoursesResponse = {
  data: AICourseWithLessonCount[];
  currPage: number;
  perPage: number;
};

export function useListExploreAiCourses() {
  return useInfiniteQuery(
    {
      queryKey: ['explore-ai-courses'],
      queryFn: ({ pageParam = 1 }) => {
        return httpGet<ListExploreAiCoursesResponse>(
          `/v1-list-explore-ai-courses`,
          {
            perPage: '20',
            currPage: String(pageParam),
          },
        );
      },
      getNextPageParam: (lastPage, pages, lastPageParam) => {
        if (lastPage?.data?.length === 0) {
          return undefined;
        }

        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
      initialPageParam: 1,
    },
    queryClient,
  );
}
