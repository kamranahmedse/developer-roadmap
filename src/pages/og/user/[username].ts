import type { APIRoute } from 'astro';
import { getDefaultOpenGraphImageBuffer } from '../../../lib/open-graph';

export const prerender = false;

type Params = {
  username: string;
};

export const GET: APIRoute<any, Params> = async (context) => {
  const { username } = context.params;

  if (!username || !/^[a-zA-Z0-9]*?[a-zA-Z]+?[a-zA-Z0-9]*?$/.test(username)) {
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
