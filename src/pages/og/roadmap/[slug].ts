import { Transformer } from '@napi-rs/image';
import type { APIRoute } from 'astro';

import {
  getDefaultOpenGraphImageBuffer,
  getResourceOpenGraph,
} from '../../../lib/open-graph';

export const prerender = false;

type Params = {
  slug: string;
};

export const GET: APIRoute<any, Params> = async (context) => {
  const { slug } = context.params;

  if (!slug) {
    const buffer = await getDefaultOpenGraphImageBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  const svg = await getResourceOpenGraph('roadmap', slug);
  const transformer = Transformer.fromSvg(svg).crop(0, 0, 1200, 630);

  return new Response(await transformer.png(), {
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
