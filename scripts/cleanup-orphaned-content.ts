import type { Node } from '@roadmapsh/editor';
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from '../src/lib/slugger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROADMAP_CONTENT_DIR = path.join(__dirname, '../src/data/roadmaps');

const args = process.argv.slice(2);
const roadmapSlug = args?.[0]?.replace('--roadmap-slug=', '');

if (!roadmapSlug) {
  console.error('Usage: tsx scripts/cleanup-orphaned-content.ts --roadmap-slug=<slug|__all__>');
  process.exit(1);
}

interface OrphanEntry {
  file: string;
  reason: string;
  duplicateOf: string;
  action: 'deleted' | 'renamed';
  renamedTo?: string;
}

async function fetchRoadmapJson(slug: string): Promise<{ nodes: Node[] }> {
  try {
    const response = await fetch(
      `https://roadmap.sh/api/v1-official-roadmap/${slug}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.log(`  API fetch failed for ${slug}, falling back to local JSON`);
    const localPath = path.join(ROADMAP_CONTENT_DIR, slug, `${slug}.json`);
    const raw = await fs.readFile(localPath, 'utf-8');
    return JSON.parse(raw);
  }
}

async function isEditorRoadmap(slug: string): Promise<boolean> {
  const mdPath = path.join(ROADMAP_CONTENT_DIR, slug, `${slug}.md`);
  try {
    const raw = await fs.readFile(mdPath, 'utf-8');
    const { data } = matter(raw);
    return data.renderer === 'editor';
  } catch {
    return false;
  }
}

async function getEditorRoadmapSlugs(): Promise<string[]> {
  const allDirs = await fs.readdir(ROADMAP_CONTENT_DIR);
  const results: string[] = [];

  for (const dir of allDirs) {
    const stat = await fs.stat(path.join(ROADMAP_CONTENT_DIR, dir)).catch(() => null);
    if (!stat?.isDirectory()) {
      continue;
    }
    if (await isEditorRoadmap(dir)) {
      results.push(dir);
    }
  }

  return results;
}

function parseContentFilename(filename: string): { slug: string; nodeId: string } | null {
  const match = filename.match(/^(.+)@([^.]+)\.md$/);
  if (!match) {
    return null;
  }
  return { slug: match[1], nodeId: match[2] };
}

async function cleanupRoadmap(slug: string): Promise<OrphanEntry[]> {
  console.log(`\nProcessing: ${slug}`);

  const contentDir = path.join(ROADMAP_CONTENT_DIR, slug, 'content');
  const stat = await fs.stat(contentDir).catch(() => null);
  if (!stat?.isDirectory()) {
    console.log(`  No content directory found, skipping`);
    return [];
  }

  const roadmapData = await fetchRoadmapJson(slug);
  if (!roadmapData?.nodes) {
    console.log(`  No nodes found in roadmap JSON, skipping`);
    return [];
  }

  const topicNodes = roadmapData.nodes.filter(
    (node) =>
      node?.type &&
      ['topic', 'subtopic'].includes(node.type) &&
      node.data?.label,
  );

  const validNodeIds = new Set<string>();
  const nodeIdToExpectedSlug = new Map<string, string>();

  for (const node of topicNodes) {
    validNodeIds.add(node.id);
    nodeIdToExpectedSlug.set(node.id, slugify(node.data.label as string));
  }

  const files = await fs.readdir(contentDir);
  const orphans: OrphanEntry[] = [];

  const validFilesBySlug = new Map<string, string>();
  for (const file of files) {
    const parsed = parseContentFilename(file);
    if (!parsed) {
      continue;
    }
    if (validNodeIds.has(parsed.nodeId) && nodeIdToExpectedSlug.get(parsed.nodeId) === parsed.slug) {
      validFilesBySlug.set(parsed.slug, file);
    }
  }

  for (const file of files) {
    const parsed = parseContentFilename(file);
    if (!parsed) {
      continue;
    }

    const { slug: fileSlug, nodeId } = parsed;

    if (validNodeIds.has(nodeId)) {
      const expectedSlug = nodeIdToExpectedSlug.get(nodeId)!;
      if (fileSlug === expectedSlug) {
        continue;
      }

      const correctFile = `${expectedSlug}@${nodeId}.md`;
      const correctFileExists = files.includes(correctFile);

      if (correctFileExists) {
        orphans.push({
          file,
          reason: 'Same nodeId, old slug',
          duplicateOf: correctFile,
          action: 'deleted',
        });
      } else {
        orphans.push({
          file,
          reason: 'Same nodeId, old slug',
          duplicateOf: correctFile,
          action: 'renamed',
          renamedTo: correctFile,
        });
      }
      continue;
    }

    const validFile = validFilesBySlug.get(fileSlug);
    if (validFile) {
      orphans.push({
        file,
        reason: 'Same slug, old nodeId',
        duplicateOf: validFile,
        action: 'deleted',
      });
    } else {
      orphans.push({
        file,
        reason: 'Topic removed from roadmap',
        duplicateOf: 'N/A',
        action: 'deleted',
      });
    }
  }

  for (const orphan of orphans) {
    const filePath = path.join(contentDir, orphan.file);
    if (orphan.action === 'renamed') {
      const newPath = path.join(contentDir, orphan.renamedTo!);
      await fs.rename(filePath, newPath);
      console.log(`  Renamed: ${orphan.file} -> ${orphan.renamedTo} (${orphan.reason})`);
    } else {
      await fs.unlink(filePath);
      console.log(`  Deleted: ${orphan.file} (${orphan.reason})`);
    }
  }

  if (orphans.length === 0) {
    console.log(`  No orphans found`);
  }

  return orphans;
}

async function main() {
  const slugs =
    roadmapSlug === '__all__'
      ? await getEditorRoadmapSlugs()
      : [roadmapSlug];

  if (roadmapSlug !== '__all__') {
    if (!(await isEditorRoadmap(roadmapSlug))) {
      console.error(`${roadmapSlug} is not an editor-rendered roadmap`);
      process.exit(1);
    }
  }

  console.log(`Processing ${slugs.length} roadmap(s)...`);

  const allOrphans = new Map<string, OrphanEntry[]>();
  let totalOrphans = 0;

  for (const slug of slugs) {
    const orphans = await cleanupRoadmap(slug);
    if (orphans.length > 0) {
      allOrphans.set(slug, orphans);
      totalOrphans += orphans.length;
    }
  }

  const roadmapsAffected = allOrphans.size;

  let summary = `## Orphaned Content Cleanup\n\n`;
  summary += `Cleaned up **${totalOrphans}** orphaned content file(s) across **${roadmapsAffected}** roadmap(s).\n\n`;

  for (const [slug, orphans] of allOrphans) {
    summary += `### ${slug}\n\n`;
    summary += `| File | Action | Reason | Duplicate Of |\n`;
    summary += `|---|---|---|---|\n`;
    for (const orphan of orphans) {
      const action = orphan.action === 'renamed' ? `Renamed to \`${orphan.renamedTo}\`` : 'Deleted';
      const dupOf = orphan.duplicateOf === 'N/A' ? 'N/A' : `\`${orphan.duplicateOf}\``;
      summary += `| \`${orphan.file}\` | ${action} | ${orphan.reason} | ${dupOf} |\n`;
    }
    summary += `\n`;
  }

  const summaryPath = path.join(__dirname, '..', '.cleanup-summary.md');
  await fs.writeFile(summaryPath, summary);
  console.log(`\nSummary written to .cleanup-summary.md`);
  console.log(`Total: ${totalOrphans} orphaned file(s) cleaned up across ${roadmapsAffected} roadmap(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
