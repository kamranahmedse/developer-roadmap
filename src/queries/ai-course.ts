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
