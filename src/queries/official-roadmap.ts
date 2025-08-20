import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import type { Node, Edge } from '@roadmapsh/editor';

export interface OfficialRoadmapDocument {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  nodes: Node[];
  edges: Edge[];

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
