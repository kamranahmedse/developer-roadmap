import type { APIRoute } from 'astro';
import { getDefaultOpenGraphImageBuffer } from '../../lib/open-graph';

export const prerender = false;

type Params = {
  slug: string;
};

export const GET: APIRoute<any, Params> = async (context) => {
  const { slug } = context.params;

  if (!slug.startsWith('user-')) {
    const buffer = await getDefaultOpenGraphImageBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  const username = slug.replace('user-', '');
  if (!username) {
    const buffer = await getDefaultOpenGraphImageBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  const response = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/v1-profile-open-graph/${username}`,
  );

  const svg = await response.text();
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
};
