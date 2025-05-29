import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

export interface UserPersonaDocument {
  _id: string;
  userId: string;
  roadmaps: {
    roadmapId: string;
    expertise: string;
    goal: string;
    commit: string;
    about?: string;
  }[];

  chatPreferences: {
    expertise: string;
    goal: string;
    about: string;
    specialInstructions?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

type UserPersonaResponse = UserPersonaDocument['roadmaps'][number] | null;

export function userRoadmapPersonaOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['user-persona', roadmapId],
    queryFn: async () => {
      return httpGet<UserPersonaResponse>(
        `/v1-user-roadmap-persona/${roadmapId}`,
      );
    },
    enabled: !!roadmapId && isLoggedIn(),
    refetchOnMount: false,
  });
}

export function userPersonaOptions() {
  return queryOptions({
    queryKey: ['user-persona'],
    queryFn: async () => {
      return httpGet<UserPersonaDocument>('/v1-user-persona');
    },
  });
}
