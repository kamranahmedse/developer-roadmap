import type { APIRoute } from 'astro';

export const prerender = true;

export async function getStaticPaths() {
  const roadmapJsons = import.meta.glob('/src/data/roadmaps/**/*.json', {
    eager: true,
  });

  return Object.keys(roadmapJsons).map((filePath) => {
    const roadmapId = filePath.split('/').pop()?.replace('.json', '');
    const roadmapJson = roadmapJsons[filePath] as Record<string, any>;

    return {
      params: {
        roadmapId,
      },
      props: {
        roadmapJson: roadmapJson?.default,
      },
    };
  });
}

export const GET: APIRoute = async function ({ params, request, props }) {
  return new Response(JSON.stringify(props.roadmapJson), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
