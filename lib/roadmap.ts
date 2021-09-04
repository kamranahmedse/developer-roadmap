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
  isUpcoming: boolean;
  id: string;
  url: string;
};

export function getRoadmapById(id: string): RoadmapType | undefined {
  return (roadmaps as RoadmapType[]).find(roadmap => roadmap.id === id);
}

export function getAllRoadmaps(): RoadmapType[] {
  return (roadmaps as RoadmapType[]);
}

export function getFeaturedRoadmaps(): RoadmapType[] {
  const roadmaps: RoadmapType[] = getAllRoadmaps();

  return roadmaps.filter(roadmap => roadmap.featured);
}
