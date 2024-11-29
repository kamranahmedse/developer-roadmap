import type { MarkdownFileType } from './file';
import { type AuthorFileType, getAllAuthors } from './author.ts';
import { replaceVariables } from './markdown.ts';

export interface GuideFrontmatter {
  title: string;
  description: string;
  authorId: string;
  canonicalUrl?: string;
  // alternate path where this guide has been published
  excludedBySlug?: string;
  seo: {
    title: string;
    description: string;
    ogImageUrl?: string;
  };
  isNew: boolean;
  type: 'visual' | 'textual';
  date: string;
  sitemap: {
    priority: number;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  relatedTitle?: string;
  relatedGuidesId?: string;
  tags: string[];
}

export type GuideFileType = MarkdownFileType<GuideFrontmatter> & {
  id: string;
  author: AuthorFileType;
  relatedGuides?: Record<string, string>;
};

/**
 * Generates id from the given guide file
 * @param filePath Markdown file path
 *
 * @returns unique guide identifier
 */
function guidePathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

export async function getGuidesByAuthor(
  authorId: string,
): Promise<GuideFileType[]> {
  const allGuides = await getAllGuides();

  return allGuides.filter((guide) => guide.author?.id === authorId);
}

/**
 * Gets all the guides sorted by the publishing date
 * @returns Promisifed guide files
 */
export async function getAllGuides(): Promise<GuideFileType[]> {
  // @ts-ignore
  const guides = import.meta.glob<GuideFileType>('/src/data/guides/*.md', {
    eager: true,
  });

  const allAuthors = await getAllAuthors();

  const guideFiles = Object.values(guides) as GuideFileType[];

  let enrichedGuides: GuideFileType[] = guideFiles.map((guideFile) => {
    let relatedGuides: GuideFileType[] = [];
    if (guideFile.frontmatter.relatedGuidesId) {
      relatedGuides = guideFiles.filter(
        (g) =>
          g?.frontmatter?.relatedGuidesId ===
            guideFile.frontmatter.relatedGuidesId && g.file !== guideFile.file,
      );
    }

    return {
      ...guideFile,
      id: guidePathToId(guideFile.file),
      author: allAuthors.find(
        (author) => author.id === guideFile.frontmatter.authorId,
      )!,
      frontmatter: {
        ...guideFile.frontmatter,
        title: replaceVariables(guideFile.frontmatter.title),
        description: replaceVariables(guideFile.frontmatter.description),
        seo: {
          ...(guideFile.frontmatter?.seo || {}),
          title: replaceVariables(guideFile.frontmatter.seo.title),
          description: replaceVariables(guideFile.frontmatter.seo.description),
        },
      },
      relatedGuides: relatedGuides.reduce(
        (acc, guide) => {
          acc[replaceVariables(guide.frontmatter.title)] =
            guide.frontmatter?.excludedBySlug ||
            `/guides/${guidePathToId(guideFile.file)}`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    };
  });

  return enrichedGuides.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf(),
  );
}

/**
 * Gets the guide by the given id
 * @param id Guide identifier
 * @returns Promisified guide file
 */
export async function getGuideById(
  id: string,
): Promise<GuideFileType | undefined> {
  const allGuides = await getAllGuides();

  return allGuides.find((guide) => guide.id === id);
}

type HeadingType = ReturnType<MarkdownFileType['getHeadings']>[number];
export type HeadingGroupType = HeadingType & { children: HeadingType[] };

const NUMBERED_LIST_REGEX = /^\d+\.\s+?/;

export function getGuideTableOfContent(headings: HeadingType[]) {
  const tableOfContents: HeadingGroupType[] = [];
  let currentGroup: HeadingGroupType | null = null;

  headings
    .filter((heading) => heading.depth !== 1)
    .forEach((heading) => {
      if (heading.depth === 2) {
        currentGroup = {
          ...heading,
          text: heading.text.replace(NUMBERED_LIST_REGEX, ''),
          children: [],
        };
        tableOfContents.push(currentGroup);
      } else if (currentGroup && heading.depth === 3) {
        currentGroup.children.push({
          ...heading,
          text: heading.text.replace(NUMBERED_LIST_REGEX, ''),
        });
      }
    });

  if (tableOfContents.length > 5) {
    tableOfContents.forEach((group) => {
      group.children = [];
    });
  }

  return tableOfContents;
}
