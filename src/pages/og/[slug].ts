import type { APIRoute } from 'astro';

export const prerender = false;

type Params = {
  slug: string;
};

export const GET: APIRoute<any, Params> = async (context) => {
  const { slug } = context.params;

  if (!slug.startsWith('user-')) {
    return new Response(
      JSON.stringify({
        error: 'Invalid slug',
      }),
      {
        status: 400,
      },
    );
  }

  const username = slug.replace('user-', '');
  if (!username) {
    return new Response(
      JSON.stringify({
        error: 'Invalid username',
      }),
      {
        status: 400,
      },
    );
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
