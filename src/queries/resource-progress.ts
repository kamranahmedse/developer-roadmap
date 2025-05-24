import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';

export type GetUserResourceProgressResponse = {
  totalTopicCount: number;
  done: string[];
  learning: string[];
  skipped: string[];
  isFavorite: boolean;
};

export function userResourceProgressOptions(
  resourceType: string,
  resourceId: string,
) {
  return queryOptions({
    queryKey: ['resource-progress', resourceId, resourceType],
    queryFn: () => {
      return httpGet<GetUserResourceProgressResponse>(
        `/v1-get-user-resource-progress`,
        {
          resourceId,
          resourceType,
        },
      );
    },
    refetchOnMount: false,
  });
}
