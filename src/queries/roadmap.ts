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
