import { type APIContext } from 'astro';
import { api } from './api.ts';

export type GetAIRoadmapBySlugResponse = {
  id: string;
  term: string;
  title: string;
  data: string;
  isAuthenticatedUser: boolean;
};

export function aiRoadmapApi(context: APIContext) {
  return {
    getAIRoadmapBySlug: async function (roadmapSlug: string) {
      return api(context).get<GetAIRoadmapBySlugResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-get-ai-roadmap-by-slug/${roadmapSlug}`,
      );
    },
  };
}

export interface AICourseDocument {
  _id: string;
  userId: string;
  title: string;
  slug?: string;
  keyword: string;
  difficulty: string;
  data: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}