type RoadmapOpenGraphQuery = {
  group: 'roadmaps' | 'guides' | 'best-practices';
  resourceId: string;
};

export function getOpenGraphImageUrl(params: RoadmapOpenGraphQuery) {
  return `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/og-images/${params.group}/${params.resourceId}.png`;
}

export async function getDefaultOpenGraphImageBuffer() {
  const defaultImageUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/images/og-img.png`;
  return fetch(defaultImageUrl).then((response) => response.arrayBuffer());
}
