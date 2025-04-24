import type { APIRoute } from 'astro';

export const prerender = true;

export async function getStaticPaths() {
  const roadmapJsons = import.meta.glob('/src/data/roadmaps/**/tree.json', {
    eager: true,
  });

  return Object.keys(roadmapJsons).map((filePath) => {
    const filePathParts = filePath.split('/');
    const roadmapId = filePathParts?.[filePathParts.length - 2];

    const treeJSON = roadmapJsons[filePath] as Record<string, any>;

    return {
      params: {
        roadmapId,
      },
      props: {
        treeJSON: treeJSON?.default || {},
      },
    };
  });
}

export const GET: APIRoute = async function ({ params, request, props }) {
  return new Response(JSON.stringify(props.treeJSON), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
