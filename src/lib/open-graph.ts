type RoadmapOpenGraphQuery = {
  group: 'roadmap' | 'guide' | 'best-practice';
  resourceId: string;
};

export function getOpenGraphImageUrl(params: RoadmapOpenGraphQuery) {
  return `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/og/${params.group}/${params.resourceId}`;
}

export async function getDefaultOpenGraphImageBuffer() {
  const defaultImageUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/images/og-img.png`;
  return fetch(defaultImageUrl).then((response) => response.arrayBuffer());
}

export async function getResourceOpenGraph(
  type: 'roadmap' | 'guide' | 'best-practice',
  resourceId: string,
) {
  const url = new URL(`${import.meta.env.PUBLIC_API_URL}/v1-open-graph`);
  url.searchParams.set('type', type);
  url.searchParams.set('resourceId', resourceId);
  url.searchParams.set('variant', 'image');
  const response = await fetch(url.toString());

  return response.text();
}
