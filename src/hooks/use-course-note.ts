import { useMutation, useQuery } from '@tanstack/react-query';
import { isLoggedIn } from '../lib/jwt';
import { httpDelete, httpGet, httpPost } from '../lib/query-http';
import { queryClient } from '../stores/query-client';

export interface CourseNoteDocument {
  _id: string;
  userId: string;
  courseProgressId: string;

  courseId: string;
  chapterId: string;
  lessonId: string;

  content: string;

  createdAt: Date;
  updatedAt: Date;
}

export type ListCourseNoteResponse = CourseNoteDocument[];

export function useListCourseNote(courseId: string) {
  return useQuery(
    {
      queryKey: ['list-course-note', courseId],
      queryFn: async () => {
        return httpGet<ListCourseNoteResponse>(
          `/v1-list-course-note/${courseId}`,
        );
      },
      enabled: !!courseId && isLoggedIn(),
    },
    queryClient,
  );
}

type UpsertCourseNoteBody = {
  id?: string;
  chapterId: string;
  lessonId: string;

  content: string;
};

export function useUpsertCourseNoteMutation(courseId: string) {
  return useMutation(
    {
      mutationFn: async (data: UpsertCourseNoteBody) => {
        return httpPost(`/v1-upsert-course-note/${courseId}`, data);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['list-course-note', courseId],
        });
      },
    },
    queryClient,
  );
}

export function useDeleteCourseNoteMutation(courseId: string) {
  return useMutation(
    {
      mutationFn: async (courseNoteId: string) => {
        return httpDelete(`/v1-delete-course-note/${courseId}/${courseNoteId}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['list-course-note', courseId],
        });
      },
    },
    queryClient,
  );
}
