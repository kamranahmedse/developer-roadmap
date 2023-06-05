import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  const bestPracticeJsons = await import.meta.glob(
    '/src/data/best-practices/**/*.json',
    {
      eager: true,
    }
  );

  return Object.keys(bestPracticeJsons).map((filePath) => {
    const bestPracticeId = filePath.split('/').pop()?.replace('.json', '');
    const bestPracticeJson = bestPracticeJsons[filePath] as Record<string, any>;

    return {
      params: {
        bestPracticeId,
      },
      props: {
        bestPracticeJson: bestPracticeJson,
      },
    };
  });
}

export const get: APIRoute = async function ({ params, request, props }) {
  return {
    body: JSON.stringify(props.bestPracticeJson),
  };
};
