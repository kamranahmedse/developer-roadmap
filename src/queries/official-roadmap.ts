import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import type { Node, Edge } from '@roadmapsh/editor';

export const allowedOfficialRoadmapType = ['skill', 'role'] as const;
export type AllowedOfficialRoadmapType =
  (typeof allowedOfficialRoadmapType)[number];

export const allowedOfficialRoadmapQuestionType = ['faq', 'main'] as const;
export type AllowedOfficialRoadmapQuestionType =
  (typeof allowedOfficialRoadmapQuestionType)[number];

export type OfficialRoadmapQuestion = {
  _id: string;
  type: AllowedOfficialRoadmapQuestionType;
  title: string;
  // Tiptap JSON Content
  description: any;
};

export interface OfficialRoadmapDocument {
  _id: string;
  order: number;

  title: {
    card: string;
    page: string;
  };
  description: string;

  slug: string;
  nodes: Node[];
  edges: Edge[];

  draft: {
    nodes: Node[];
    edges: Edge[];
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  partner?: {
    description: string;
    linkText: string;
    link: string;
  };
  type: AllowedOfficialRoadmapType;
  dimensions?: {
    height: number;
    width: number;
  };

  questions?: OfficialRoadmapQuestion[];
  relatedRoadmaps?: string[];

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
