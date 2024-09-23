import { getCollection, type CollectionEntry } from 'astro:content';

export type ChangelogFileType = CollectionEntry<'changelogs'>;

/**
 * Gets all the changelogs sorted by the publishing date
 * @returns Promisifed guide files
 */
export async function getAllChangelogs(): Promise<ChangelogFileType[]> {
  const changelogEntries = await getCollection('changelogs');
  return changelogEntries.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
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
