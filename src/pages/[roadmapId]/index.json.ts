import type { APIRoute } from 'astro';

export const GET: APIRoute = async function ({ params, url, request, props }) {
  const { roadmapId: fullRoadmapId } = params;
  if (!fullRoadmapId) {
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

  // to account for `roadmap/roadmap-beginner.json` files
  const roadmapId =
    fullRoadmapId?.indexOf('-beginner') !== -1
      ? fullRoadmapId.replace('-beginner', '')
      : fullRoadmapId;

  const fileName =
    roadmapId === fullRoadmapId
      ? `${roadmapId}.json`
      : `${fullRoadmapId}.json`;

  console.log(fileName);
  try {
    const roadmapJson = await import(
      `../../data/roadmaps/${roadmapId}/${fileName}`
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
