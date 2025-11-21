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

export type OfficialRoadmapCourse = {
  _id: string;
  title: string;
  description: string;
  link: string;
  instructor: {
    name: string;
    image: string;
    title: string;
  };
  features: string[];
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
  nodes: any[];
  edges: any[];

  draft: {
    nodes: any[];
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

export const allowedOfficialRoadmapTopicResourceType = [
  'roadmap',
  'official',
  'opensource',
  'article',
  'course',
  'podcast',
  'video',
  'book',
  'feed',
] as const;
export type AllowedOfficialRoadmapTopicResourceType =
  (typeof allowedOfficialRoadmapTopicResourceType)[number];

export type OfficialRoadmapTopicResource = {
  _id: string;
  type: AllowedOfficialRoadmapTopicResourceType;
  title: string;
  url: string;
};

export interface OfficialRoadmapTopicContentDocument {
  _id: string;
  roadmapSlug: string;
  nodeId: string;
  description: string;
  resources: OfficialRoadmapTopicResource[];
  createdAt: Date;
  updatedAt: Date;
}
