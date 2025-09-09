import type { PageType } from '../components/CommandMenu/CommandMenu';
import { httpGet } from './http';
import type { ResourceType } from './resource-progress';

export type AllowedRoadmapRenderer = 'balsamiq' | 'editor';

export interface RoadmapFrontmatter {
  pdfUrl: string;
  order: number;
  briefTitle: string;
  briefDescription: string;
  title: string;
  description: string;
  hasTopics: boolean;
  isForkable?: boolean;
  isHidden: boolean;
  isNew: boolean;
  isUpcoming: boolean;
  partner?: {
    description: string;
    link: string;
    linkText: string;
  };
  courses?: {
    title: string;
    description: string;
    link: string;
    instructor: {
      name: string;
      image: string;
      title: string;
    };
    features: string[];
  }[];
  note?: string;
  question?: {
    title: string;
    description: string;
  };
  dimensions?: {
    width: number;
    height: number;
  };
  seo: {
    title: string;
    description: string;
    ogImageUrl?: string;
    keywords: string[];
  };
  schema?: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    imageUrl: string;
  };
  relatedRoadmaps: string[];
  relatedQuestions: string[];
  sitemap: {
    priority: number;
    changefreq: string;
  };
  tags: string[];
  renderer?: AllowedRoadmapRenderer;
}

export async function getResourceMeta(
  resourceType: ResourceType,
  resourceId: string,
) {
  const { error, response } = await httpGet<PageType[]>(`/pages.json`);
  if (error || !response) {
    return null;
  }

  const page = response.find((page) => {
    if (resourceType === 'roadmap') {
      return page.url === `/${resourceId}`;
    } else if (resourceType === 'best-practice') {
      return page.url === `/best-practices/${resourceId}`;
    }

    return false;
  });

  if (!page) {
    return null;
  }

  return page;
}
