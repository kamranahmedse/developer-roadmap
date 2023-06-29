import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  const roadmapJsons = await import.meta.glob('/src/data/roadmaps/**/*.json', {
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

export const get: APIRoute = async function ({ params, request, props }) {
  return {
    body: JSON.stringify(props.roadmapJson),
  };
};
