import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { OfficialRoadmapDocument } from '../src/queries/official-roadmap';
import { parse } from 'node-html-parser';
import { markdownToHtml } from '../src/lib/markdown';
import { htmlToMarkdown } from '../src/lib/html';
import matter from 'gray-matter';
import type { RoadmapFrontmatter } from '../src/lib/roadmap';
import {
  allowedOfficialRoadmapTopicResourceType,
  type AllowedOfficialRoadmapTopicResourceType,
  type SyncToDatabaseTopicContent,
} from '../src/queries/official-roadmap-topic';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
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
      },
      body: JSON.stringify({
        topics,
        secret,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Failed to sync content to database: ${response.statusText} ${JSON.stringify(error, null, 2)}`,
    );
  }

  return response.json();
}

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
  try {
    const roadmap = await fetchRoadmapJson(roadmapId);

    const files = await fs.readdir(
      path.join(ROADMAP_CONTENT_DIR, roadmapId, 'content'),
    );

    console.log(`🚀 Starting ${files.length} files for ${roadmapId}`);
    const topics: SyncToDatabaseTopicContent[] = [];

    for (const file of files) {
      const isContentFile = file.endsWith('.md');
      if (!isContentFile) {
        console.log(`🚨 Skipping ${file} because it is not a content file`);
        continue;
      }

      const nodeSlug = file.replace('.md', '');
      if (!nodeSlug) {
        console.error(`🚨 Node id is required: ${file}`);
        continue;
      }

      const nodeId = nodeSlug.split('@')?.[1];
      if (!nodeId) {
        console.error(`🚨 Node id is required: ${file}`);
        continue;
      }

      const node = roadmap.nodes.find((node) => node.id === nodeId);
      if (!node) {
        console.error(`🚨 Node not found: ${file}`);
        continue;
      }

      const filePath = path.join(
        ROADMAP_CONTENT_DIR,
        roadmapId,
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

                if (!linkText || !linkHref) {
                  return null;
                }

                return {
                  title: linkText,
                  url: linkHref,
                  type: linkType as AllowedOfficialRoadmapTopicResourceType,
                };
              })
              .filter((link) => link !== null)
              .sort((a, b) => {
                const order = [
                  'official',
                  'opensource',
                  'article',
                  'video',
                  'feed',
                ];
                return order.indexOf(a!.type) - order.indexOf(b!.type);
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
        roadmapSlug: roadmapId,
        nodeId,
        description: updatedDescription,
        resources: listLinks,
      });
    }

    await syncContentToDatabase(topics);
    console.log(
      `✅ Synced ${topics.length} topics to database for ${roadmapId}`,
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
