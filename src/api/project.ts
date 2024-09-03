import { type APIContext } from 'astro';
import { api } from './api.ts';

export function projectApi(context: APIContext) {
  return {
    listProjectsUserCount: async function (projectIds: string[]) {
      return api(context).post<Record<string, string>>(
        `${import.meta.env.PUBLIC_API_URL}/v1-list-projects-user-count`,
        {
          projectIds,
        },
      );
    },
  };
}
