import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../stores/query-client';
import { isLoggedIn } from '../lib/jwt';
import { httpGet, httpPost } from '../lib/query-http';

export interface CourseProgressDocument {
  _id: string;
  userId: string;
  courseId: string;
  completed: {
    chapterId: string;
    lessonId: string;
    completedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export type CourseProgressResponse = {
  completed: CourseProgressDocument['completed'];
};

export function useCourseProgress(courseId: string) {
  return useQuery(
    {
      queryKey: ['course-progress', courseId],
      queryFn: async () => {
        return httpGet<CourseProgressResponse>(
          `/v1-course-progress/${courseId}`,
        );
      },
      enabled: !!courseId && isLoggedIn(),
    },
    queryClient,
  );
}

export function useCompleteLessonMutation(courseId: string) {
  return useMutation(
    {
      mutationFn: async (data: { chapterId: string; lessonId: string }) => {
        return httpPost(`/v1-complete-lesson/${courseId}`, data);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['course-progress', courseId],
        });
      },
    },
    queryClient,
  );
}
