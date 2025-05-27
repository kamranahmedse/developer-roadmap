import type { APIRoute } from 'astro';
import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';

export const prerender = false;

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// hack to make it work. TODO: Fix
const projectRoot = path.resolve(__dirname, '../..').replace(/dist$/, '');

export async function fetchRoadmapJson(roadmapId: string) {
  const response = await fetch(
    `https://roadmap.sh/api/v1-official-roadmap/${roadmapId}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch roadmap json: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(`Failed to fetch roadmap json: ${data.error}`);
  }

  return data;
}

export const GET: APIRoute = async function ({ params, request, props }) {
  const { roadmapId } = params;

  if (!roadmapId) {
    return new Response('Roadmap ID is required', {
      status: 400,
    });
  }

  // Construct the path to the markdown file
  let roadmapFilePath = path.join(
    projectRoot,
    'src',
    'data',
    'roadmaps',
    roadmapId,
    `${roadmapId}.md`,
  );

  let roadmapJsonPath = path.join(
    projectRoot,
    'src',
    'data',
    'roadmaps',
    roadmapId,
    `${roadmapId}.json`,
  );

  if (!fs.existsSync(roadmapFilePath)) {
    return new Response(JSON.stringify({ message: 'Roadmap not found' }), {
      status: 404,
    });
  }

  // Read and parse the markdown file
  const fileContent = fs.readFileSync(roadmapFilePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  if (frontmatter.renderer !== 'editor') {
    const roadmapJson = JSON.parse(fs.readFileSync(roadmapJsonPath, 'utf-8'));

    return new Response(JSON.stringify(roadmapJson), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const roadmapJson = await fetchRoadmapJson(roadmapId);

  return new Response(JSON.stringify(roadmapJson), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
