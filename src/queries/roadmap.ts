import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { type Node, type Edge, renderFlowJSON } from '@roadmapsh/editor';

type RoadmapJSON = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
};

export function roadmapJSONOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['roadmap-json', roadmapId],
    queryFn: async () => {
      const baseUrl = import.meta.env.PUBLIC_APP_URL;
      const roadmapJSON = await httpGet<RoadmapJSON>(
        `${baseUrl}/${roadmapId}.json`,
      );

      const svg = await renderFlowJSON(roadmapJSON);

      return {
        json: roadmapJSON,
        svg,
      };
    },
    refetchOnMount: false,
  });
}

export const allowedRoadmapRenderer = [
  'balsamiq',
  'editor',
  'infinite-canvas',
] as const;
export type AllowedRoadmapRenderer = (typeof allowedRoadmapRenderer)[number];

export type PagesJSON = {
  id: string;
  url: string;
  title: string;
  description: string;
  group: string;
  authorId?: string;
  renderer?: AllowedRoadmapRenderer;
}[];

export function listBuiltInRoadmaps() {
  return queryOptions({
    queryKey: ['built-in-roadmaps'],
    queryFn: () => {
      return httpGet<PagesJSON>(`${import.meta.env.PUBLIC_APP_URL}/pages.json`);
    },
    select: (data) => {
      return data
        .filter((page) => page?.group?.toLowerCase() === 'roadmaps')
        .map((page) => ({
          id: page.id,
          title: page.title,
          url: page.url,
          renderer: page.renderer,
        }));
    },
    refetchOnMount: false,
  });
}

export function roadmapDetailsOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['roadmap-details', roadmapId],
    queryFn: async () => {
      const baseUrl = import.meta.env.PUBLIC_APP_URL;
      const pagesJSON = await httpGet<PagesJSON>(`${baseUrl}/pages.json`);

      const roadmapDetails = pagesJSON.find(
        (page) =>
          page?.group?.toLowerCase() === 'roadmaps' && page.id === roadmapId,
      );

      if (!roadmapDetails) {
        throw new Error('Roadmap details not found');
      }

      return roadmapDetails;
    },
    refetchOnMount: false,
  });
}

export const allowedLinkTypes = [
  'video',
  'article',
  'opensource',
  'course',
  'website',
  'podcast',
] as const;
export type AllowedLinkTypes = (typeof allowedLinkTypes)[number];

export function roadmapContentOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['roadmap-content', { roadmapId }],
    queryFn: async () => {
      const baseUrl = import.meta.env.PUBLIC_APP_URL;
      return httpGet<
        Record<
          string,
          {
            title: string;
            description: string;
            links: {
              title: string;
              url: string;
              type: AllowedLinkTypes;
            }[];
          }
        >
      >(`${baseUrl}/roadmap-content/${roadmapId}.json`);
    },
    refetchOnMount: false,
  });
}
