import { getCollection, type CollectionEntry } from 'astro:content';

export type AuthorFileType = CollectionEntry<'authors'>;

/**
 * Gets the IDs of all the authors available on the website
 *
 * @returns string[] Array of author IDs
 */
export async function getAuthorIds() {
  const authorEntries = await getCollection('authors');
  return authorEntries.map((entry) => entry.slug);
}

export async function getAllAuthors(): Promise<AuthorFileType[]> {
  return await getCollection('authors');
}

export async function getAuthorById(id: string): Promise<AuthorFileType> {
  const authorEntries = await getCollection(
    'authors',
    (entry) => entry.slug === id,
  );
  const authorFile = authorEntries?.[0];
  if (!authorFile) {
    throw new Error(`Author with ID ${id} not found`);
  }

  return authorFile;
}
