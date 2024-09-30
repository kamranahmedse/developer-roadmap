import { type APIContext } from 'astro';
import { api } from './api.ts';

export type LeadeboardUserDetails = {
  id: string;
  name: string;
  avatar?: string;
  count: number;
};

export type ListLeaderboardStatsResponse = {
  streaks: {
    active: LeadeboardUserDetails[];
    lifetime: LeadeboardUserDetails[];
  };
  projectSubmissions: {
    currentMonth: LeadeboardUserDetails[];
    lifetime: LeadeboardUserDetails[];
  };
  githubContributors: {
    currentMonth: LeadeboardUserDetails[];
  };
};

export function leaderboardApi(context: APIContext) {
  return {
    listLeaderboardStats: async function () {
      return api(context).get<ListLeaderboardStatsResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-list-leaderboard-stats`,
        {},
      );
    },
  };
}
