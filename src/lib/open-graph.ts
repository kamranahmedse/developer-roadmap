type RoadmapOpenGraphQuery = {
  group: 'roadmap' | 'guide' | 'best-practice';
  resourceId: string;
};

export function getOpenGraphImageUrl(
  params: RoadmapOpenGraphQuery,
  query?: Record<string, string>,
) {
  const baseUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';

  const url = new URL(`${baseUrl}/og/${params.group}/${params.resourceId}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return String(url);
}

export async function getDefaultOpenGraphImageBuffer() {
  const defaultImageUrl = `${import.meta.env.DEV ? 'http://localhost:3000' : 'https://roadmap.sh'}/img/og-img.png`;
  return fetch(defaultImageUrl).then((response) => response.arrayBuffer());
}

export async function getResourceOpenGraph(
  type: 'roadmap' | 'guide' | 'best-practice',
  resourceId: string,
  query?: Record<string, string>,
) {
  const url = new URL(`${import.meta.env.PUBLIC_API_URL}/v1-open-graph`);
  url.searchParams.set('type', type);
  url.searchParams.set('resourceId', resourceId);
  url.searchParams.set('variant', 'image');
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString());

  return response.text();
}
