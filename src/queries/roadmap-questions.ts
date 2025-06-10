import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';

export interface RoadmapQuestionsResponse {
  questions: string[];
}

export function roadmapQuestionsOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['roadmap-questions', roadmapId],
    queryFn: () => {
      return httpGet<RoadmapQuestionsResponse>(`/v1-official-roadmap-questions/${roadmapId}`);
    },
    refetchOnMount: false,
  });
} 