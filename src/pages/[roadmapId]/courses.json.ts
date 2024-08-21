import type { APIRoute } from 'astro';
import { getRoadmapIds } from '../../lib/roadmap.ts';

export async function getStaticPaths() {
  const coursesJsons: Record<string, any> = import.meta.glob(
    '/src/data/roadmaps/**/courses.json',
    {
      eager: true,
    },
  );

  const roadmapIds = await getRoadmapIds();

  return roadmapIds.map((roadmapId) => ({
    params: {
      roadmapId,
    },
    props: {
      courses:
        coursesJsons[`/src/data/roadmaps/${roadmapId}/courses.json`]?.default ||
        {},
    },
  }));
}

export const GET: APIRoute = async function ({ params, request, props }) {
  return new Response(JSON.stringify(props.courses), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
