import type { APIRoute } from 'astro';

export const GET: APIRoute = async function ({ params, request, props }) {
  const { roadmapId } = params;

  try {
    const roadmapJson = await import(
      `../../data/roadmaps/${roadmapId}/${roadmapId}.json`
    );

    return new Response(JSON.stringify(roadmapJson), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: null,
        error: {
          message: 'Roadmap not found',
        },
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
