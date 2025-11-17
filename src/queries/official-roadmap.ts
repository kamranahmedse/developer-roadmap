import { queryOptions } from '@tanstack/react-query';
import { FetchError, httpGet } from '../lib/query-http';
import { DateTime } from 'luxon';

export const allowedOfficialRoadmapType = ['skill', 'role', 'best-practice'] as const;
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

export type OfficialRoadmapWithCourses = Omit<
  OfficialRoadmapDocument,
  'courses'
> & {
  courses: OfficialRoadmapCourse[];
};

export function officialRoadmapOptions(slug: string) {
  return queryOptions({
    queryKey: ['official-roadmap', slug],
    queryFn: () => {
      return httpGet<OfficialRoadmapWithCourses>(
        `/v1-official-roadmap/${slug}`,
      );
    },
  });
}

export async function officialRoadmapDetails(roadmapSlug: string) {
  try {
    const roadmap = await httpGet<OfficialRoadmapWithCourses>(
      `/v1-official-roadmap/${roadmapSlug}`,
    );

    return roadmap;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function listOfficialRoadmaps() {
  try {
    const roadmaps = await httpGet<OfficialRoadmapDocument[]>(
      `/v1-list-official-roadmaps`,
    );

    return roadmaps;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }

    throw error;
  }
}

export async function listOfficialBeginnerRoadmaps() {
  try {
    const roadmaps = await httpGet<OfficialRoadmapDocument[]>(
      `/v1-list-official-beginner-roadmaps`,
    );

    return roadmaps;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }

    throw error;
  }
}

export function isNewRoadmap(createdAt: Date) {
  return (
    createdAt &&
    DateTime.now().diff(DateTime.fromJSDate(new Date(createdAt)), 'days').days <
      45
  );
}
