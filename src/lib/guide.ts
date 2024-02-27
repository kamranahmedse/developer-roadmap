import type { MarkdownFileType } from './file';
import { type AuthorFileType, getAllAuthors } from './author.ts';

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
  };
  isNew: boolean;
  type: 'visual' | 'textual';
  date: string;
  sitemap: {
    priority: number;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  tags: string[];
}

export type GuideFileType = MarkdownFileType<GuideFrontmatter> & {
  id: string;
  author: AuthorFileType;
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
  const enrichedGuides: GuideFileType[] = guideFiles.map((guideFile) => ({
    ...guideFile,
    id: guidePathToId(guideFile.file),
    author: allAuthors.find(
      (author) => author.id === guideFile.frontmatter.authorId,
    )!,
  }));

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
