import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from '../src/lib/slugger';
import type { OfficialRoadmapDocument } from '../src/queries/official-roadmap';
import { parse } from 'node-html-parser';
import { markdownToHtml } from '../src/lib/markdown';
import { htmlToMarkdown } from '../src/lib/html';
import type {
  OfficialRoadmapTopicContentDocument,
  OfficialRoadmapTopicResource,
} from './sync-content-to-repo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const allFiles = args?.[0]?.replace('--files=', '');
const secret = args?.[1]?.replace('--secret=', '');
if (!secret) {
  throw new Error('Secret is required');
}

let roadmapJsonCache: Map<string, OfficialRoadmapDocument> = new Map();
export async function fetchRoadmapJson(
  roadmapId: string,
): Promise<OfficialRoadmapDocument> {
  if (roadmapJsonCache.has(roadmapId)) {
    return roadmapJsonCache.get(roadmapId)!;
  }

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

  roadmapJsonCache.set(roadmapId, data);
  return data;
}

export const allowedOfficialRoadmapTopicResourceType = [
  'official',
  'opensource',
  'article',
  'course',
  'podcast',
  'video',
  'book',
  'feed',
] as const;
export type AllowedOfficialRoadmapTopicResourceType =
  (typeof allowedOfficialRoadmapTopicResourceType)[number];

const files = allFiles.split(' ');
console.log(`🚀 Starting ${files.length} files`);

const ROADMAP_CONTENT_DIR = path.join(__dirname, '../src/data/roadmaps');

const topics: Omit<
  OfficialRoadmapTopicContentDocument,
  'createdAt' | 'updatedAt' | '_id'
>[] = [];

for (const file of files) {
  const isContentFile = file.endsWith('.md') && file.includes('content/');
  if (!isContentFile) {
    console.log(`🚨 Skipping ${file} because it is not a content file`);
    continue;
  }

  const pathParts = file.replace('src/data/roadmaps/', '').split('/');
  const roadmapSlug = pathParts?.[0];
  if (!roadmapSlug) {
    console.error(`🚨 Roadmap slug is required: ${file}`);
    continue;
  }
  const nodeSlug = pathParts?.[2]?.replace('.md', '');
  if (!nodeSlug) {
    console.error(`🚨 Node id is required: ${file}`);
    continue;
  }

  const nodeId = nodeSlug.split('@')?.[1];
  if (!nodeId) {
    console.error(`🚨 Node id is required: ${file}`);
    continue;
  }

  const roadmap = await fetchRoadmapJson(roadmapSlug);
  const node = roadmap.nodes.find((node) => node.id === nodeId);
  if (!node) {
    console.error(`🚨 Node not found: ${file}`);
    continue;
  }

  const filePath = path.join(
    ROADMAP_CONTENT_DIR,
    roadmapSlug,
    'content',
    `${nodeSlug}.md`,
  );

  const content = await fs.readFile(filePath, 'utf8');
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
      // @ts-expect-error - TODO: fix this
      ulWithLinks = ul;
    }
  });

  const listLinks: Omit<OfficialRoadmapTopicResource, '_id'>[] =
    ulWithLinks !== undefined
      ? Array.from(ulWithLinks.querySelectorAll('li > a'))
          .map((link) => {
            const typePattern = /@([a-z.]+)@/;
            let linkText = link.textContent || '';
            const linkHref = link.getAttribute('href') || '';
            let linkType = linkText.match(typePattern)?.[1] || 'article';
            linkType = allowedOfficialRoadmapTopicResourceType.includes(
              linkType as any,
            )
              ? linkType
              : 'article';

            linkText = linkText.replace(typePattern, '');

            return {
              title: linkText,
              url: linkHref,
              type: linkType as AllowedOfficialRoadmapTopicResourceType,
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

  if (listLinks.length > 0) {
    const lastParagraph = rootHtml.querySelector('p:last-child');
    console.log(lastParagraph?.textContent);
    lastParagraph?.remove();
  }

  const htmlStringWithoutLinks = rootHtml.toString();
  const description = htmlToMarkdown(htmlStringWithoutLinks);

  const updatedDescription = `# ${title?.textContent}

${description}`.trim();

  const label = node?.data?.label as string;
  if (!label) {
    console.error(`🚨 Label is required: ${file}`);
    continue;
  }

  topics.push({
    roadmapSlug,
    nodeId,
    title: label,
    description: updatedDescription,
    resources: listLinks,
  });
}

console.log(JSON.stringify(topics, null, 2));
