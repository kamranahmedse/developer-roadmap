import { NextApiRequest } from 'next';
import roadmaps from '../content/roadmaps.json';

export type RoadmapType = {
  seo: {
    title: string;
    description: string;
    keywords: string[]
  },
  title: string,
  description: string,
  featuredTitle: string;
  featuredDescription: string,
  author: {
    name: string,
    url: string
  },
  featured: boolean,
  imagePath?: string,
  contentPath?: string;
  resourcesPath: string;
  isCommunity: boolean;
  url: string;
};

export function getRequestedRoadmap(req: NextApiRequest): RoadmapType | undefined {
  // remove trailing slashes
  const normalizedUrl = req.url?.replace(/\/$/, '') || '';

  return (roadmaps as RoadmapType[]).find(roadmap => normalizedUrl.startsWith(roadmap.url));
}

export function getAllRoadmaps(): RoadmapType[] {
  return (roadmaps as RoadmapType[]);
}

export function getFeaturedRoadmaps(): RoadmapType[] {
  const roadmaps: RoadmapType[] = getAllRoadmaps();

  return roadmaps.filter(roadmap => roadmap.featured);
}
