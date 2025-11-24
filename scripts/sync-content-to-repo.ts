import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from '../src/lib/slugger';
import type { OfficialRoadmapDocument } from '../src/queries/official-roadmap';
import type { OfficialRoadmapTopicContentDocument } from '../src/queries/official-roadmap-topic';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const roadmapSlug = args?.[0]?.replace('--roadmap-slug=', '');
const secret = args?.[1]?.replace('--secret=', '');
if (!secret) {
  throw new Error('Secret is required');
}

if (!roadmapSlug || roadmapSlug === '__default__') {
  throw new Error('Roadmap slug is required');
}

console.log(`🚀 Starting ${roadmapSlug}`);

export async function roadmapTopics(
  roadmapId: string,
  secret: string,
): Promise<OfficialRoadmapTopicContentDocument[]> {
  const path = `https://roadmap.sh/api/v1-list-official-roadmap-topics/${roadmapId}?secret=${secret}`;
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch roadmap topics: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(`Failed to fetch roadmap topics: ${data.error}`);
  }

  return data;
}

export async function fetchRoadmapJson(
  roadmapId: string,
): Promise<OfficialRoadmapDocument> {
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

// Directory containing the roadmaps
const ROADMAP_CONTENT_DIR = path.join(
  __dirname,
  '../src/data/roadmaps',
  roadmapSlug,
);

const allTopics = await roadmapTopics(roadmapSlug, secret);
const roadmap = await fetchRoadmapJson(roadmapSlug);
const { nodes } = roadmap;

for (const topic of allTopics) {
  const { nodeId } = topic;

  const node = nodes.find((node) => node.id === nodeId);
  if (!node) {
    console.error(`Node not found: ${nodeId}`);
    continue;
  }

  const label = node?.data?.label as string;
  if (!label) {
    console.error(`Label not found: ${nodeId}`);
    continue;
  }

  const topicSlug = `${slugify(label)}@${nodeId}.md`;

  const topicPath = path.join(ROADMAP_CONTENT_DIR, 'content', topicSlug);
  const topicDir = path.dirname(topicPath);
  const topicDirExists = await fs
    .stat(topicDir)
    .then(() => true)
    .catch(() => false);
  if (!topicDirExists) {
    await fs.mkdir(topicDir, { recursive: true });
  }

  const topicContent = prepareTopicContent(topic);
  await fs.writeFile(topicPath, topicContent);
  console.log(`✅ Synced ${topicSlug}`);
}

function prepareTopicContent(topic: OfficialRoadmapTopicContentDocument) {
  const { description, resources = [] } = topic;

  let content = description;
  if (resources.length > 0) {
    content += `\n\nVisit the following resources to learn more:\n\n${resources.map((resource) => `- [@${resource.type}@${resource.title}](${resource.url})`).join('\n')}`;
  }

  return content;
}
