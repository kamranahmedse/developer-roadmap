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
  const linkGroups = import.meta.glob<LinkGroupFileType>(
    '/src/data/link-groups/*.md',
    {
      eager: true,
    },
  );

  return Object.values(linkGroups).map((linkGroupFile) => ({
    ...linkGroupFile,
    id: linkGroupPathToId(linkGroupFile.file),
  }));
}

export async function getLinkGroupById(
  groupId: string,
): Promise<LinkGroupFileType> {
  const linkGroup = await import(`../data/link-groups/${groupId}.md`);

  return {
    ...linkGroup,
    id: linkGroupPathToId(linkGroup.file),
  };
}
