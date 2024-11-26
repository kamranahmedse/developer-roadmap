import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Node } from '@xyflow/react';
import matter from 'gray-matter';
import type { RoadmapFrontmatter } from '../src/lib/roadmap';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the roadmaps
const ROADMAP_CONTENT_DIR = path.join(__dirname, '../src/data/roadmaps');
const allRoadmaps = await fs.readdir(ROADMAP_CONTENT_DIR);

const editorRoadmapIds = new Set<string>();
for (const roadmapId of allRoadmaps) {
  const roadmapFrontmatterDir = path.join(
    ROADMAP_CONTENT_DIR,
    roadmapId,
    `${roadmapId}.md`,
  );
  const roadmapFrontmatterRaw = await fs.readFile(
    roadmapFrontmatterDir,
    'utf-8',
  );
  const { data } = matter(roadmapFrontmatterRaw);

  const roadmapFrontmatter = data as RoadmapFrontmatter;
  if (roadmapFrontmatter.renderer === 'editor') {
    editorRoadmapIds.add(roadmapId);
  }
}

for (const roadmapId of editorRoadmapIds) {
  const roadmapJSONDir = path.join(
    ROADMAP_CONTENT_DIR,
    roadmapId,
    `${roadmapId}.json`,
  );

  const roadmapJSONRaw = await fs.readFile(roadmapJSONDir, 'utf-8');
  const roadmapJSON = JSON.parse(roadmapJSONRaw);

  const roadmapNodes = roadmapJSON.nodes as Node[];
  const updatedNodes = roadmapNodes.map((node) => {
    const width = node?.width || node?.style?.width || 0;
    const height = node?.height || node?.style?.height || 0;

    if (['legend', 'title', 'label', 'linksgroup'].includes(node.type!)) {
      delete node?.width;
      delete node?.height;
      delete node?.style?.width;
      delete node?.style?.height;
    }

    return {
      ...node,
      measured: {
        width,
        height,
      },
    };
  });

  const updatedRoadmapJSON = {
    ...roadmapJSON,
    nodes: updatedNodes,
  };

  const updatedRoadmapJSONString = JSON.stringify(updatedRoadmapJSON, null, 2);
  await fs.writeFile(roadmapJSONDir, updatedRoadmapJSONString, 'utf-8');
}
