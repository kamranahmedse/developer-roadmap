import { type APIContext } from 'astro';
import { api } from './api.ts';

export type LeaderboardUserDetails = {
  id: string;
  name: string;
  avatar?: string;
  count: number;
};

export type ListLeaderboardStatsResponse = {
  streaks: {
    active: LeaderboardUserDetails[];
    lifetime: LeaderboardUserDetails[];
  };
  projectSubmissions: {
    currentMonth: LeaderboardUserDetails[];
    lifetime: LeaderboardUserDetails[];
  };
  githubContributors: {
    currentMonth: LeaderboardUserDetails[];
  };
  referrals: {
    currentMonth: LeadeboardUserDetails[];
    lifetime: LeadeboardUserDetails[];
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
