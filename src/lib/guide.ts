import type { MarkdownFileType } from './file';
import { type AuthorFileType, getAllAuthors } from './author.ts';
import { getCollection, type CollectionEntry } from 'astro:content';

export type GuideFileType = CollectionEntry<'guides'> & {
  author: AuthorFileType;
};

export async function getGuidesByAuthor(
  authorId: string,
): Promise<GuideFileType[]> {
  const allGuides = await getAllGuides();

  return allGuides.filter((guide) => guide.author?.slug === authorId);
}

/**
 * Gets all the guides sorted by the publishing date
 * @returns Promisifed guide files
 */
export async function getAllGuides(): Promise<GuideFileType[]> {
  const guideEntries = await getCollection('guides');
  const allAuthors = await getAllAuthors();

  const enrichedGuides: GuideFileType[] = guideEntries
    .map((guideFile) => {
      const author = allAuthors.find(
        (author) => author.slug === guideFile.data.authorId,
      );

      if (!author) {
        throw new Error(
          `Author with ID ${guideFile.data.authorId} not found for guide ${guideFile.slug}`,
        );
      }

      return {
        ...guideFile,
        author,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
    );

  return enrichedGuides;
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

  return tableOfContents;
}
