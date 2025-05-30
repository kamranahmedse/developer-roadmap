import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

export interface UserResumeDocument {
  _id: string;

  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  resumeUrl: string;
  content: string;

  createdAt: Date;
  updatedAt: Date;
}

export function userResumeOptions() {
  return queryOptions({
    queryKey: ['user-resume'],
    queryFn: async () => {
      return httpGet<UserResumeDocument>('/v1-user-resume');
    },
    enabled: !!isLoggedIn(),
    refetchOnMount: false,
  });
}
