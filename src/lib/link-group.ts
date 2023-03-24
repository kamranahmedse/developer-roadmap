import type { MarkdownFileType } from './file';

export interface LinkGroupFrontmatter {
  [key: string]: string;
}

export type LinkGroupFileType = MarkdownFileType<LinkGroupFrontmatter> & {
  id: string;
};

/**
 * Generates id from the given linkGroup file
 * @param filePath Markdown file path
 *
 * @returns unique linkGroup identifier
 */
function linkGroupPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

/**
 * Gets all the linkGroups sorted by the publishing date
 * @returns Promisifed linkGroup files
 */
export async function getAllLinkGroups(): Promise<LinkGroupFileType[]> {
  const linkGroups = await import.meta.glob<LinkGroupFileType>('/src/link-groups/*.md', {
    eager: true,
  });

  const linkGroupFiles = Object.values(linkGroups);
  const enrichedLinkGroups = linkGroupFiles.map((linkGroupFile) => ({
    ...linkGroupFile,
    id: linkGroupPathToId(linkGroupFile.file),
  }));

  return enrichedLinkGroups;
}
