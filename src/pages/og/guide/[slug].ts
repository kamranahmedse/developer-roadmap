import type { APIRoute } from 'astro';
import {
  getDefaultOpenGraphImageBuffer,
  getResourceOpenGraph,
} from '../../../lib/open-graph';
import { Transformer } from '@napi-rs/image';

export const prerender = false;

type Params = {
  slug: string;
};

export const GET: APIRoute<any, Params> = async (context) => {
  const { slug } = context.params;
  const { searchParams } = context.url;

  if (!slug) {
    const buffer = await getDefaultOpenGraphImageBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  const svg = await getResourceOpenGraph(
    'guide',
    slug,
    Object.fromEntries(searchParams.entries()),
  );
  const transformer = Transformer.fromSvg(svg).crop(0, 0, 1200, 630);

  // @ts-expect-error - Buffer is not assignable to BodyInit
  return new Response(await transformer.png(), {
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
