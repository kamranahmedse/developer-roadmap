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
  }[];

  createdAt: Date;
  updatedAt: Date;
}

type UserPersonaResponse = UserPersonaDocument['roadmaps'][number] | null;

export function userPersonaOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['user-persona', roadmapId],
    queryFn: async () => {
      return httpGet<UserPersonaResponse>(`/v1-user-persona/${roadmapId}`);
    },
    enabled: !!roadmapId && isLoggedIn(),
  });
}
