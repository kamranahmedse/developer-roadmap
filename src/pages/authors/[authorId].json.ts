import type { APIRoute } from 'astro';
import { getAuthorById, getAuthorIds } from '../../lib/author';

export const prerender = true;

export async function getStaticPaths() {
  const authorIds = await getAuthorIds();

  return await Promise.all(
    authorIds.map(async (authorId) => {
      const authorDetails = await getAuthorById(authorId);

      return {
        params: { authorId },
        props: {
          authorDetails: authorDetails?.frontmatter || {},
        },
      };
    }),
  );
}

export const GET: APIRoute = async function ({ params, request, props }) {
  return new Response(JSON.stringify(props.authorDetails), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
