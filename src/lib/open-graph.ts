type RoadmapOpenGraphQuery = {
  group: 'roadmaps' | 'guides' | 'best-practices';
  resourceId: string;
};

export function getOpenGraphImageUrl(params: RoadmapOpenGraphQuery) {
  return `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/og-images/${params.group}/${params.resourceId}.png`;
}
