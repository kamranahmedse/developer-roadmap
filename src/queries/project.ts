import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

type ProjectStatusResponse = {
  id?: string;

  startedAt?: Date;
  submittedAt?: Date;
  repositoryUrl?: string;

  upvotes: number;
  downvotes: number;
};

export function projectStatusOptions(projectId: string) {
  return queryOptions({
    queryKey: ['project-status', projectId],
    queryFn: () => {
      return httpGet<ProjectStatusResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-project-status/${projectId}`,
        {},
      );
    },
  });
}
