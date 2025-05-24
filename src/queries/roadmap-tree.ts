import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';

export interface RoadmapTreeDocument {
  _id?: string;
  roadmapId: string;
  mapping: {
    _id?: string;
    nodeId: string;
    text: string;
    subjects: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export function roadmapTreeMappingOptions(roadmapId: string) {
  return queryOptions({
    queryKey: ['roadmap-tree-mapping', { roadmapId }],
    queryFn: () => {
      return httpGet<RoadmapTreeDocument['mapping']>(
        `${import.meta.env.PUBLIC_API_URL}/v1-roadmap-tree-mapping/${roadmapId}`,
      );
    },
    refetchOnMount: false,
  });
}
