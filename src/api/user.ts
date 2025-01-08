import { type APIContext } from 'astro';
import { api } from './api.ts';
import type { ResourceType } from '../lib/resource-progress.ts';
import type { ProjectStatusDocument } from '../components/Projects/ListProjectSolutions.tsx';

export const allowedRoadmapVisibility = ['all', 'none', 'selected'] as const;
export type AllowedRoadmapVisibility =
  (typeof allowedRoadmapVisibility)[number];

export const allowedCustomRoadmapVisibility = [
  'all',
  'none',
  'selected',
] as const;
export type AllowedCustomRoadmapVisibility =
  (typeof allowedCustomRoadmapVisibility)[number];

export const allowedProfileVisibility = ['public', 'private'] as const;
export type AllowedProfileVisibility =
  (typeof allowedProfileVisibility)[number];

export const allowedOnboardingStatus = ['done', 'pending', 'ignored'] as const;
export type AllowedOnboardingStatus = (typeof allowedOnboardingStatus)[number];

export const allowedSubscriptionStatus = [
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'paused',
  'trialing',
  'unpaid',
  'none',
] as const;
export type AllowedSubscriptionStatus =
  (typeof allowedSubscriptionStatus)[number];

export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  isEnabled: boolean;
  authProvider: 'github' | 'google' | 'email' | 'linkedin';
  metadata: Record<string, any>;
  calculatedStats: {
    activityCount: number;
    totalVisitCount: number;
    longestVisitStreak: number;
    currentVisitStreak: number;
    updatedAt: Date;
  };
  verificationCode: string;
  resetPasswordCode: string;
  isSyncedWithSendy: boolean;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dailydev?: string;
    website?: string;
  };
  username?: string;
  profileVisibility: AllowedProfileVisibility;
  publicConfig?: {
    isAvailableForHire: boolean;
    isEmailVisible: boolean;
    headline: string;
    roadmaps: string[];
    customRoadmaps: string[];
    roadmapVisibility: AllowedRoadmapVisibility;
    customRoadmapVisibility: AllowedCustomRoadmapVisibility;
  };
  resetPasswordCodeAt: string;
  verifiedAt: string;

  // Onboarding fields
  onboardingStatus?: AllowedOnboardingStatus;
  onboarding?: {
    updateProgress: AllowedOnboardingStatus;
    publishProfile: AllowedOnboardingStatus;
    customRoadmap: AllowedOnboardingStatus;
    addFriends: AllowedOnboardingStatus;
    roadCard: AllowedOnboardingStatus;
    inviteTeam: AllowedOnboardingStatus;
  };

  customerId: string;
  subscription?: {
    id: string;
    planId: string;
    priceId: string;
    interval: string;
    status: AllowedSubscriptionStatus;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  };

  createdAt: string;
  updatedAt: string;
}

export type UserActivityCount = {
  activityCount: Record<string, number>;
  totalActivityCount: number;
};

type ProgressResponse = {
  updatedAt: string;
  title: string;
  id: string;
  learning: number;
  skipped: number;
  done: number;
  total: number;
  isCustomResource?: boolean;
  roadmapSlug?: string;
};

export type GetPublicProfileResponse = Omit<
  UserDocument,
  'password' | 'verificationCode' | 'resetPasswordCode' | 'resetPasswordCodeAt'
> & {
  activity: UserActivityCount;
  roadmaps: ProgressResponse[];
  projects: ProjectStatusDocument[];
  isOwnProfile: boolean;
};

export type GetUserProfileRoadmapResponse = {
  title: string;
  topicCount: number;
  roadmapSlug?: string;
  isCustomResource?: boolean;
  done: string[];
  learning: string[];
  skipped: string[];
  nodes: any[];
  edges: any[];
};

export function userApi(context: APIContext) {
  return {
    getPublicProfile: async function (username: string) {
      return api(context).get<GetPublicProfileResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-get-public-profile/${username}`,
      );
    },
    getUserProfileRoadmap: async function (
      username: string,
      resourceId: string,
      resourceType: ResourceType = 'roadmap',
    ) {
      return api(context).get<GetUserProfileRoadmapResponse>(
        `${
          import.meta.env.PUBLIC_API_URL
        }/v1-get-user-profile-roadmap/${username}`,
        {
          resourceId,
          resourceType,
        },
      );
    },
  };
}
