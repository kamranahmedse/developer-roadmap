import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Node } from 'reactflow';
import matter from 'gray-matter';
import type { RoadmapFrontmatter } from '../src/lib/roadmap';
import { slugify } from '../src/lib/slugger';
import { markdownToHtml } from '../src/lib/markdown';
import { HTMLElement, parse } from 'node-html-parser';
import { htmlToMarkdown } from '../src/lib/html';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const allowedLinkTypes = [
  'video',
  'article',
  'opensource',
  'course',
  'website',
  'podcast',
] as const;

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

const publicRoadmapsContentDir = path.join('./public', 'roadmap-content');
const stats = await fs.stat(publicRoadmapsContentDir).catch(() => null);
if (!stats || !stats.isDirectory()) {
  await fs.mkdir(publicRoadmapsContentDir, { recursive: true });
}

for (const roadmapId of editorRoadmapIds) {
  console.log(`🚀 Starting ${roadmapId}`);

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
      node?.type &&
      ['topic', 'subtopic', 'todo'].includes(node.type) &&
      node.data?.label,
  );

  const roadmapContentDir = path.join(
    ROADMAP_CONTENT_DIR,
    roadmapId,
    'content',
  );
  const stats = await fs.stat(roadmapContentDir).catch(() => null);
  if (!stats || !stats.isDirectory()) {
    await fs.mkdir(roadmapContentDir, { recursive: true });
  }

  const roadmapContentFiles = await fs.readdir(roadmapContentDir, {
    recursive: true,
  });

  const contentMap: Record<
    string,
    {
      title: string;
      description: string;
      links: {
        title: string;
        url: string;
        type: string;
      }[];
    }
  > = {};

  for (const node of nodes) {
    const ndoeDirPatterWithoutExt = `${slugify(node.data.label)}@${node.id}`;
    const nodeDirPattern = `${ndoeDirPatterWithoutExt}.md`;
    if (!roadmapContentFiles.includes(nodeDirPattern)) {
      contentMap[nodeDirPattern] = {
        title: node.data.label,
        description: '',
        links: [],
      };

      continue;
    }

    const content = await fs.readFile(
      path.join(roadmapContentDir, nodeDirPattern),
      'utf-8',
    );
    const html = markdownToHtml(content, false);
    const rootHtml = parse(html);

    let ulWithLinks: HTMLElement | undefined;
    rootHtml.querySelectorAll('ul').forEach((ul) => {
      const listWithJustLinks = Array.from(ul.querySelectorAll('li')).filter(
        (li) => {
          const link = li.querySelector('a');
          return link && link.textContent?.trim() === li.textContent?.trim();
        },
      );

      if (listWithJustLinks.length > 0) {
        ulWithLinks = ul;
      }
    });

    const listLinks =
      ulWithLinks !== undefined
        ? Array.from(ulWithLinks.querySelectorAll('li > a'))
            .map((link) => {
              const typePattern = /@([a-z.]+)@/;
              let linkText = link.textContent || '';
              const linkHref = link.getAttribute('href') || '';
              let linkType = linkText.match(typePattern)?.[1] || 'article';
              linkType = allowedLinkTypes.includes(linkType as any)
                ? linkType
                : 'article';

              linkText = linkText.replace(typePattern, '');

              return {
                title: linkText,
                url: linkHref,
                type: linkType,
              };
            })
            .sort((a, b) => {
              const order = [
                'official',
                'opensource',
                'article',
                'video',
                'feed',
              ];
              return order.indexOf(a.type) - order.indexOf(b.type);
            })
        : [];

    const title = rootHtml.querySelector('h1');
    ulWithLinks?.remove();
    title?.remove();
    const htmlStringWithoutLinks = rootHtml.toString();
    const description = htmlToMarkdown(htmlStringWithoutLinks);

    contentMap[node.id] = {
      title: node.data.label,
      description,
      links: listLinks,
    };
  }

  await fs.writeFile(
    path.join(publicRoadmapsContentDir, `${roadmapId}.json`),
    JSON.stringify(contentMap, null, 2),
  );
  console.log(`✅ Finished ${roadmapId}`);
  console.log('-'.repeat(20));
}
