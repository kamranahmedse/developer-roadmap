import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Node } from 'reactflow';
import matter from 'gray-matter';
import type { RoadmapFrontmatter } from '../src/lib/roadmap';
import { slugify } from '../src/lib/slugger';

// ERROR: `__dirname` is not defined in ES module scope
// https://iamwebwiz.medium.com/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usage: tsx ./scripts/editor-roadmap-dirs.ts <roadmapId>
//test of pull request
// Directory containing the roadmaps
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
let { nodes } = JSON.parse(roadmapContent) as {
  nodes: Node[];
};
nodes = nodes.filter(
  (node) =>
    node?.type && ['topic', 'subtopic'].includes(node.type) && node.data?.label,
);

const roadmapContentDir = path.join(ROADMAP_CONTENT_DIR, roadmapId, 'content');
const stats = await fs.stat(roadmapContentDir).catch(() => null);
if (!stats || !stats.isDirectory()) {
  await fs.mkdir(roadmapContentDir, { recursive: true });
}

const roadmapContentFiles = await fs.readdir(roadmapContentDir, {
  recursive: true,
});

nodes.forEach(async (node, index) => {
  const nodeDirPattern = `${slugify(node.data.label)}@${node.id}.md`;
  if (roadmapContentFiles.includes(nodeDirPattern)) {
    console.log(`Skipping ${nodeDirPattern}`);
    return;
  }

  await fs.writeFile(
    path.join(roadmapContentDir, nodeDirPattern),
    `# ${node.data.label}`,
  );
});
