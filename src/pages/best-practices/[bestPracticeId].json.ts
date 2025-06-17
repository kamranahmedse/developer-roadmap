import type { APIRoute } from 'astro';

export const prerender = true;

export async function getStaticPaths() {
  const bestPracticeJsons = await import.meta.glob(
    '/src/data/best-practices/**/*.json',
    {
      eager: true,
    },
  );

  return Object.keys(bestPracticeJsons).map((filePath) => {
    const bestPracticeId = filePath.split('/').pop()?.replace('.json', '');
    const bestPracticeJson = bestPracticeJsons[filePath] as Record<string, any>;

    return {
      params: {
        bestPracticeId,
      },
      props: {
        bestPracticeJson: bestPracticeJson?.default,
      },
    };
  });
}

export const GET: APIRoute = async function ({ params, request, props }) {
  return new Response(JSON.stringify(props.bestPracticeJson), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
};
