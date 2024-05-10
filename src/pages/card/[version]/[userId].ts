import type { APIRoute } from 'astro';
import { getDefaultOpenGraphImageBuffer } from '../../../lib/open-graph';
import { getRoadCard } from '../../../lib/road-card';

export const prerender = false;

type Params = {
  version: 'tall' | 'wide';
  userId: string;
};

export const GET: APIRoute<any, Params> = async (context) => {
  const { userId, version } = context.params;

  if (!userId || !version) {
    const buffer = await getDefaultOpenGraphImageBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  const searchParams = new URLSearchParams(context.url.searchParams);
  const variant = (searchParams.get('variant') as 'dark' | 'light') || 'dark';
  const roadmaps = searchParams.get('roadmaps') || '';

  const svg = await getRoadCard(version, userId, variant, roadmaps);
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
};
