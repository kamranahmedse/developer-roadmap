import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from '../src/lib/slugger';

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
export const allowedOfficialRoadmapTopicResourceType = [
  'official',
  'opensource',
  'article',
  'course',
  'podcast',
  'video',
  'book',
] as const;
export type AllowedOfficialRoadmapTopicResourceType =
  (typeof allowedOfficialRoadmapTopicResourceType)[number];

type OfficialRoadmapTopicResource = {
  _id?: string;
  type: AllowedOfficialRoadmapTopicResourceType;
  title: string;
  url: string;
};

export interface OfficialRoadmapTopicContentDocument {
  _id?: string;
  roadmapSlug: string;
  nodeId: string;
  title: string;
  description: string;
  resources: OfficialRoadmapTopicResource[];
  createdAt: Date;
  updatedAt: Date;
}

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

// Directory containing the roadmaps
const ROADMAP_CONTENT_DIR = path.join(
  __dirname,
  '../src/data/roadmaps',
  roadmapSlug,
);

const allTopics = await roadmapTopics(roadmapSlug, secret);
for (const topic of allTopics) {
  const { title, nodeId } = topic;

  const topicSlug = `${slugify(title)}@${nodeId}.md`;

  const topicPath = path.join(ROADMAP_CONTENT_DIR, topicSlug);
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

  const content = `
${description}

Visit the following resources to learn more:

${resources.map((resource) => `- [@${resource.type}@${resource.title}](${resource.url})`).join('\n')}
  `.trim();

  return content;
}
