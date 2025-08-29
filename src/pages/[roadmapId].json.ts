import type { APIRoute } from 'astro';
import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';
import type { OfficialRoadmapDocument } from '../queries/official-roadmap';

export const prerender = false;

// Get the project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type RoadmapJson = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  nodes: {
    type: 'topic' | 'subtopic' | 'paragraph';
    data: { label: string };
  }[];
  edges: unknown[];
  draft: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function fetchRoadmapJson(
  roadmapId: string,
): Promise<OfficialRoadmapDocument> {
  const isDev = import.meta.env.DEV;
  const baseUrl = new URL(
    isDev ? 'http://localhost:8080' : 'https://roadmap.sh',
  );
  baseUrl.pathname = isDev
    ? `/v1-official-roadmap/${roadmapId}`
    : `/api/v1-official-roadmap/${roadmapId}`;

  const response = await fetch(String(baseUrl));

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

  const roadmapJson = await fetchRoadmapJson(roadmapId);
  return new Response(JSON.stringify(roadmapJson), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
