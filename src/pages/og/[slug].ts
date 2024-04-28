import type { APIRoute } from 'astro';
import { getDefaultOpenGraphImageBuffer } from '../../lib/open-graph';

export const prerender = false;

type Params = {
  slug:
    | `user-${string}`
    | `roadmap-${string}`
    | `best-practice-${string}`
    | `guide-${string}`;
};

export const GET: APIRoute<any, Params> = async (context) => {
  const { slug } = context.params;

  if (
    !slug.startsWith('user-') &&
    !slug.startsWith('roadmap-') &&
    !slug.startsWith('best-practice') &&
    !slug.startsWith('guide-')
  ) {
    const buffer = await getDefaultOpenGraphImageBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  if (slug.startsWith('user-')) {
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
  } else {
    const type = slug.startsWith('roadmap-')
      ? 'roadmap'
      : slug.startsWith('best-practice-')
        ? 'best-practice'
        : 'guide';
    const resourceId = slug.replace(`${type}-`, '');

    if (!resourceId) {
      const buffer = await getDefaultOpenGraphImageBuffer();
      return new Response(buffer, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
    }

    const url = new URL(`${import.meta.env.PUBLIC_API_URL}/v1-open-graph`);
    url.searchParams.set('type', type);
    url.searchParams.set('resourceId', resourceId);
    url.searchParams.set('variant', 'image');
    const response = await fetch(url.toString());

    const svg = await response.text();
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }
};
