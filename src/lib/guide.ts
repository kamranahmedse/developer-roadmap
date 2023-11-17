import type { MarkdownFileType } from './file';

export interface GuideFrontmatter {
  title: string;
  description: string;
  author: {
    name: string;
    url: string;
    imageUrl: string;
  };
  canonicalUrl?: string;
  seo: {
    title: string;
    description: string;
  };
  isNew: boolean;
  type: 'visual' | 'textual';
  date: string;
  sitemap: {
    priority: number;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yealry';
  };
  tags: string[];
}

export type GuideFileType = MarkdownFileType<GuideFrontmatter> & {
  id: string;
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

/**
 * Gets all the guides sorted by the publishing date
 * @returns Promisifed guide files
 */
export async function getAllGuides(): Promise<GuideFileType[]> {
  const guides = await import.meta.glob<GuideFileType>(
    '/src/data/guides/*.md',
    {
      eager: true,
    }
  );

  const guideFiles = Object.values(guides);
  const enrichedGuides = guideFiles.map((guideFile) => ({
    ...guideFile,
    id: guidePathToId(guideFile.file),
  }));

  return enrichedGuides.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
  );
}
