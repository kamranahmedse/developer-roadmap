import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Edge, Node } from '@xyflow/react';
import matter from 'gray-matter';
import type { RoadmapFrontmatter } from '../src/lib/roadmap';
import { slugify } from '../src/lib/slugger';
import OpenAI from 'openai';
import { runPromisesInBatchSequentially } from '../src/lib/promise';

// ERROR: `__dirname` is not defined in ES module scope
// https://iamwebwiz.medium.com/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usage: tsx ./scripts/editor-roadmap-content.ts <roadmapId>
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
console.log('OPEN_AI_API_KEY:', OPEN_AI_API_KEY);
const ROADMAP_CONTENT_DIR = path.join(__dirname, '../src/data/roadmaps');
const roadmapId = process.argv[2];

const allowedRoadmapIds = await fs.readdir(ROADMAP_CONTENT_DIR);
if (!roadmapId) {
  console.error('Roadmap Id is required');
  process.exit(1);
}

if (!allowedRoadmapIds.includes(roadmapId)) {
  console.error(`Invalid roadmap key ${roadmapId}`);
  console.error(`Allowed keys are ${allowedRoadmapIds.join(', ')}`);
  process.exit(1);
}

const roadmapFrontmatterDir = path.join(
  ROADMAP_CONTENT_DIR,
  roadmapId,
  `${roadmapId}.md`,
);
const roadmapFrontmatterRaw = await fs.readFile(roadmapFrontmatterDir, 'utf-8');
const { data } = matter(roadmapFrontmatterRaw);

const roadmapFrontmatter = data as RoadmapFrontmatter;
if (!roadmapFrontmatter) {
  console.error('Invalid roadmap frontmatter');
  process.exit(1);
}

if (roadmapFrontmatter.renderer !== 'editor') {
  console.error('Only Editor Rendered Roadmaps are allowed');
  process.exit(1);
}

const roadmapDir = path.join(
  ROADMAP_CONTENT_DIR,
  roadmapId,
  `${roadmapId}.json`,
);
const roadmapContent = await fs.readFile(roadmapDir, 'utf-8');
let { nodes, edges } = JSON.parse(roadmapContent) as {
  nodes: Node[];
  edges: Edge[];
};
const enrichedNodes = nodes
  .filter(
    (node) =>
      node?.type &&
      ['topic', 'subtopic'].includes(node.type) &&
      node.data?.label,
  )
  .map((node) => {
    // Because we only need the parent id and title for subtopics
    if (node.type !== 'subtopic') {
      return node;
    }

    const parentNodeId =
      edges.find((edge) => edge.target === node.id)?.source || '';
    const parentNode = nodes.find((n) => n.id === parentNodeId);

    return {
      ...node,
      parentId: parentNodeId,
      parentTitle: parentNode?.data?.label || '',
    };
  }) as (Node & { parentId?: string; parentTitle?: string })[];

const roadmapContentDir = path.join(ROADMAP_CONTENT_DIR, roadmapId, 'content');
const stats = await fs.stat(roadmapContentDir).catch(() => null);
if (!stats || !stats.isDirectory()) {
  await fs.mkdir(roadmapContentDir, { recursive: true });
}

let openai: OpenAI | undefined;
if (OPEN_AI_API_KEY) {
  openai = new OpenAI({
    apiKey: OPEN_AI_API_KEY,
  });
}

function writeTopicContent(
  roadmapTitle: string,
  childTopic: string,
  parentTopic?: string,
) {
  let prompt = `I will give you a topic and you need to write a brief introduction for that with regards to "${roadmapTitle}". Your format should be as follows and be in strictly markdown format:

# (Put a heading for the topic without adding parent "Subtopic in Topic" or "Topic in Roadmap" or "Subtopic under XYZ" etc.)

(Briefly explain the topic in one paragraph using simple english with regards to "${roadmapTitle}". Don't start with explaining how important the topic is with regard to "${roadmapTitle}". Don't say something along the lines of "XYZ plays a crucial role in ${roadmapTitle}". Don't include anything saying "In the context of ${roadmapTitle}". Instead, start with a simple explanation of the topic itself. For example, if the topic is "React", you can start with "React is a JavaScript library for building user interfaces." and then you can explain how it is used in "${roadmapTitle}".)
`;

  if (!parentTopic) {
    prompt += `First topic is: ${childTopic}`;
  } else {
    prompt += `First topic is: ${childTopic} under ${parentTopic}`;
  }

  return new Promise((resolve, reject) => {
    openai?.chat.completions
      .create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })
      .then((response) => {
        const article = response.choices[0].message.content;

        resolve(article);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function writeNodeContent(node: Node & { parentTitle?: string }) {
  const nodeDirPattern = `${slugify(node.data.label)}@${node.id}.md`;
  if (!roadmapContentFiles.includes(nodeDirPattern)) {
    console.log(`Missing file for: ${nodeDirPattern}`);
    return;
  }

  const nodeDir = path.join(roadmapContentDir, nodeDirPattern);
  const nodeContent = await fs.readFile(nodeDir, 'utf-8');
  const isFileEmpty = !nodeContent.replace(`# ${node.data.label}`, '').trim();
  if (!isFileEmpty) {
    console.log(`❌ Ignoring ${nodeDirPattern}. Not empty.`);
    return;
  }

  const topic = node.data.label;
  const parentTopic = node.parentTitle;

  console.log(`⏳ Generating content for ${topic}...`);
  let newContentFile = '';
  if (OPEN_AI_API_KEY) {
    newContentFile = (await writeTopicContent(
      roadmapFrontmatter.title,
      topic,
      parentTopic,
    )) as string;
  } else {
    newContentFile = `# ${topic}`;
  }

  await fs.writeFile(nodeDir, newContentFile, 'utf-8');
  console.log(`✅ Content generated for ${topic}`);
}

let roadmapContentFiles = await fs.readdir(roadmapContentDir, {
  recursive: true,
});

if (!OPEN_AI_API_KEY) {
  console.log('----------------------------------------');
  console.log('OPEN_AI_API_KEY not found. Skipping openai api calls...');
  console.log('----------------------------------------');
}
const promises = enrichedNodes.map((node) => () => writeNodeContent(node));
await runPromisesInBatchSequentially(promises, 20);
console.log('✅ All content generated');
