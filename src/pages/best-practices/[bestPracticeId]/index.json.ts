import type { APIRoute } from 'astro';

export const GET: APIRoute = async function ({ params, request, props }) {
  const { bestPracticeId } = params;

  try {
    const roadmapJson = await import(
      `../../../data/best-practices/${bestPracticeId}/${bestPracticeId}.json`
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
          message: 'Best Practices not found',
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
