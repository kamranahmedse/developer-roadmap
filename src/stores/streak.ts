import { atom } from 'nanostores';

export type StreakResponse = {
  count: number;
  longestCount: number;
  previousCount?: number | null;
  firstVisitAt: Date;
  lastVisitAt: Date;
};

export const $accountStreak = atom<StreakResponse | undefined>();
