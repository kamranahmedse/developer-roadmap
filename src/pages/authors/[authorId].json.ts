import type { APIRoute } from 'astro';
import { getAuthorById } from '../../lib/author';

export const GET: APIRoute = async function ({ params, request, props }) {
  const { authorId } = params as { authorId: string };

  const authorDetails = await getAuthorById(authorId);
  if (!authorDetails) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(authorDetails?.frontmatter), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
