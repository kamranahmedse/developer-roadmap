import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { OfficialRoadmapDocument } from '../src/queries/official-roadmap';
import { parse } from 'node-html-parser';
import { markdownToHtml } from '../src/lib/markdown';
import { htmlToMarkdown } from '../src/lib/html';
import {
  allowedOfficialRoadmapTopicResourceType,
  type AllowedOfficialRoadmapTopicResourceType,
  type SyncToDatabaseTopicContent,
} from '../src/queries/official-roadmap-topic';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const allFiles = args
  .find((arg) => arg.startsWith('--files='))
  ?.replace('--files=', '');
const secret = args
  .find((arg) => arg.startsWith('--secret='))
  ?.replace('--secret=', '');

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
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; roadmap-sync/1.0)',
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch roadmap json: ${response.statusText} for ${roadmapId}`,
    );
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(
      `Failed to fetch roadmap json: ${data.error} for ${roadmapId}`,
    );
  }

  roadmapJsonCache.set(roadmapId, data);
  return data;
}

export async function syncContentToDatabase(
  topics: SyncToDatabaseTopicContent[],
) {
  const response = await fetch(
    `https://roadmap.sh/api/v1-sync-official-roadmap-topics`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; roadmap-sync/1.0)',
      },
      body: JSON.stringify({
        topics,
        secret,
      }),
    },
  );

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Failed to sync content to database: ${response.status} ${response.statusText}\n${responseText}`,
    );
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error(
      `Failed to parse response as JSON: ${responseText.substring(0, 500)}`,
    );
  }
}

const files =
  allFiles
    ?.split(',')
    .map((file) => file.trim())
    .filter(Boolean) || [];
if (files.length === 0) {
  console.log('No files to sync');
  process.exit(0);
}

console.log(`🚀 Starting ${files.length} files`);
const ROADMAP_CONTENT_DIR = path.join(__dirname, '../src/data/roadmaps');

try {
  const topics: SyncToDatabaseTopicContent[] = [];

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

    const fileExists = await fs
      .stat(filePath)
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      console.log(`🚨 File not found: ${filePath}`);
      continue;
    }

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

    const listLinks: SyncToDatabaseTopicContent['resources'] =
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

    const allParagraphs = rootHtml.querySelectorAll('p');
    if (listLinks.length > 0 && allParagraphs.length > 0) {
      // to remove the view more see more from the description
      const lastParagraph = allParagraphs[allParagraphs.length - 1];
      lastParagraph?.remove();
    }

    const htmlStringWithoutLinks = rootHtml.toString();
    const description = htmlToMarkdown(htmlStringWithoutLinks);

    const updatedDescription =
      `# ${title?.textContent}\n\n${description}`.trim();

    const label = node?.data?.label as string;
    if (!label) {
      console.error(`🚨 Label is required: ${file}`);
      continue;
    }

    topics.push({
      roadmapSlug,
      nodeId,
      description: updatedDescription,
      resources: listLinks,
    });
  }

  console.log(`📤 Syncing ${topics.length} topics to database...`);
  await syncContentToDatabase(topics);
  console.log(`✅ Successfully synced ${topics.length} topics`);
} catch (error) {
  console.error('❌ Sync failed with error:');
  console.error(error);
  if (error instanceof Error) {
    console.error('\nError message:', error.message);
    console.error('\nStack trace:', error.stack);
  }
  process.exit(1);
}
