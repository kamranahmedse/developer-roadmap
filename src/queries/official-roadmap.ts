import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';

export interface OfficialRoadmapDocument {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  nodes: any[];
  edges: any[];

  createdAt: Date;
  updatedAt: Date;
}

export function officialRoadmapOptions(slug: string) {
  return queryOptions({
    queryKey: ['official-roadmap', slug],
    queryFn: () => {
      return httpGet<OfficialRoadmapDocument>(`/v1-official-roadmap/${slug}`);
    },
  });
}
