import { queryOptions } from '@tanstack/react-query';
import { isLoggedIn } from '../lib/jwt';
import { httpGet } from '../lib/query-http';

export interface CourseProgressDocument {
  _id: string;
  userId: string;
  courseId: string;
  completed: {
    chapterId: string;
    lessonId: string;
    completedAt: Date;
  }[];
  review?: {
    rating: number;
    feedback?: string;
  };

  enrolledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CourseProgressResponse = Pick<
  CourseProgressDocument,
  'completed' | 'completedAt' | 'review' | 'enrolledAt'
>;

export function courseProgressOptions(courseSlug: string) {
  return queryOptions({
    queryKey: ['course-progress', courseSlug],
    retryOnMount: false,
    queryFn: async () => {
      return httpGet<CourseProgressResponse>(
        `/v1-course-progress/${courseSlug}`,
      );
    },
    enabled: !!isLoggedIn(),
  });
}
