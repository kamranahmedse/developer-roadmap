export async function getRoadCard(
  version: 'tall' | 'wide',
  userId: string,
  variant: 'dark' | 'light',
  roadmaps: string = '',
) {
  const url = new URL(
    `${import.meta.env.PUBLIC_API_URL}/v1-badge/${version}/${userId}`,
  );
  url.searchParams.set('variant', variant);
  if (roadmaps) {
    url.searchParams.set('roadmaps', roadmaps);
  }

  const response = await fetch(url.toString());
  return response.text();
}
