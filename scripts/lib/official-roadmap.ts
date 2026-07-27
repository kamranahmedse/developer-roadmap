export const allowedOfficialRoadmapType = [
  'skill',
  'role',
  'best-practice',
] as const;
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

export type OfficialRoadmapNode = {
  id: string;
  type?: string;
  data?: {
    label?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export interface OfficialRoadmapDocument {
  _id?: string;
  order: number;

  title: {
    card: string;
    page: string;
  };
  description: string;

  slug: string;
  nodes: OfficialRoadmapNode[];
  edges: any[];

  draft: {
    nodes: OfficialRoadmapNode[];
    edges: any[];
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  openGraph?: {
    image?: string;
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
  courses?: string[];

  createdAt: Date;
  updatedAt: Date;
}
