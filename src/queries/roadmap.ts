import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { type Node, type Edge, renderFlowJSON } from '@roadmapsh/editor';

export function roadmapJSONOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['roadmap-json', roadmapId],
    queryFn: async () => {
      const baseUrl = import.meta.env.PUBLIC_APP_URL;
      const roadmapJSON = await httpGet<{
        nodes: Node[];
        edges: Edge[];
      }>(`${baseUrl}/${roadmapId}.json`);

      const svg = await renderFlowJSON(roadmapJSON);

      return {
        json: roadmapJSON,
        svg,
      };
    },
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
  });
}
