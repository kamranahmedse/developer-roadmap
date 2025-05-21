import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async function ({ params, request, props }) {
  const roadmapId = params.roadmapId;

  const roadmapUrl = `${import.meta.env.PUBLIC_API_URL}/v1-official-roadmap/${roadmapId}`;

  const res = await fetch(roadmapUrl);
  const roadmapJson = await res.json();

  if (res.status !== 200) {
    return new Response(
      JSON.stringify({
        error: roadmapJson.error,
      }),
      {
        status: 500,
      },
    );
  }

  return new Response(
    JSON.stringify({
      nodes: roadmapJson?.nodes,
      edges: roadmapJson?.edges,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
