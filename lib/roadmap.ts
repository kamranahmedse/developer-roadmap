import roadmaps from '../content/roadmaps.json';

export type RoadmapType = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  title: string;
  description: string;
  featuredTitle: string;
  featuredDescription: string;
  author: {
    name: string;
    url: string;
  };
  type: 'role' | 'tool';
  featured: boolean;
  imageUrl?: string;
  jsonUrl?: string;
  isNew?: boolean;
  landingPath?: string;
  resourcesPath: string;
  contentPathsFilePath?: string;
  metaPath: string;
  isCommunity: boolean;
  isUpcoming: boolean;
  id: string;
  pdfUrl?: string;
  relatedRoadmaps?: string[];
};

export function getRoadmapById(id: string): RoadmapType | undefined {
  return (roadmaps as RoadmapType[]).find((roadmap) => roadmap.id === id);
}

export function getAllRoadmaps(): RoadmapType[] {
  return roadmaps as RoadmapType[];
}

export function filterRoadmapsByIds(ids: string[]): RoadmapType[] {
  return (roadmaps as RoadmapType[]).filter(roadmap => ids.includes(roadmap.id));
}

export function getFeaturedRoadmaps(): RoadmapType[] {
  const roadmaps: RoadmapType[] = getAllRoadmaps();

  return roadmaps.filter((roadmap) => roadmap.featured);
}

export function isInteractiveRoadmap(id: string): boolean {
  return ['frontend', 'backend', 'devops', 'react', 'vue', 'python', 'java', 'blockchain', 'golang', 'javascript', 'nodejs', 'qa', 'design-system', 'angular', 'software-architect', 'software-design-architecture', 'aspnet-core', 'flutter'].includes(id);
}
