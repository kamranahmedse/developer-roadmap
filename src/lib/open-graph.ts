type RoadmapOpenGraphQuery = {
  group: 'roadmap' | 'guide' | 'best-practice';
  resourceId: string;
};

export function getOpenGraphImageUrl(params: RoadmapOpenGraphQuery) {
  return `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/og/${params.group}-${params.resourceId}`;
}

export async function getDefaultOpenGraphImageBuffer() {
  const defaultImageUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/images/og-img.png`;
  return fetch(defaultImageUrl).then((response) => response.arrayBuffer());
}
