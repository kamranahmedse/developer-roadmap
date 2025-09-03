import type { APIRoute } from 'astro';
import { officialRoadmapDetails } from '../queries/official-roadmap';

export const prerender = false;

export const GET: APIRoute = async function ({ params }) {
  const { roadmapId } = params;

  if (!roadmapId) {
    return new Response('Roadmap ID is required', {
      status: 400,
    });
  }

  const roadmapJson = await officialRoadmapDetails(roadmapId);
  if (!roadmapJson) {
    return new Response('Roadmap not found', {
      status: 404,
    });
  }

  return new Response(JSON.stringify(roadmapJson), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
