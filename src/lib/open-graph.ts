type RoadmapOpenGraphQuery = {
  type: 'roadmaps' | 'guides' | 'best-practices';
  variant?: 'default' | 'image';
  resourceId?: string;
};

export function getOpenGraphImageUrl(params: RoadmapOpenGraphQuery) {
  return `${import.meta.env.PUBLIC_API_URL}/v1-open-graph?${new URLSearchParams(params)}`;
}
