import type { MarkdownFileType } from './file';

export interface ChangelogFrontmatter {
  title: string;
  description: string;
  images: Record<string, string>;
  seo: {
    title: string;
    description: string;
  };
  date: string;
}

export type ChangelogFileType = MarkdownFileType<ChangelogFrontmatter> & {
  id: string;
};

/**
 * Generates id from the given changelog file
 * @param filePath Markdown file path
 *
 * @returns unique changelog identifier
 */
function changelogPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

/**
 * Gets all the changelogs sorted by the publishing date
 * @returns Promisifed guide files
 */
export async function getAllChangelogs(): Promise<ChangelogFileType[]> {
  // @ts-ignore
  const changelogs = import.meta.glob<ChangelogFileType>(
    '/src/data/changelogs/*.md',
    {
      eager: true,
    },
  );

  const changelogFiles = Object.values(changelogs) as ChangelogFileType[];
  const enrichedChangelogs: ChangelogFileType[] = changelogFiles.map(
    (changelogFile) => ({
      ...changelogFile,
      id: changelogPathToId(changelogFile.file),
    }),
  );

  return enrichedChangelogs.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf(),
  );
}

/**
 * Gets the changelog by the given id
 * @param id Changelog identifier
 * @returns Promisified changelog file
 */

export async function getChangelogById(
  id: string,
): Promise<ChangelogFileType | undefined> {
  const allChangelogs = await getAllChangelogs();

  return allChangelogs.find((changelog) => changelog.id === id);
}
