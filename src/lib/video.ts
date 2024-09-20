import type { MarkdownFileType } from './file';
import type { AuthorFileType } from './author.ts';
import { getAllAuthors } from './author.ts';
import { getCollection, type CollectionEntry } from 'astro:content';

export type VideoFileType = CollectionEntry<'videos'> & {
  author: AuthorFileType;
};

export async function getVideosByAuthor(
  authorId: string,
): Promise<VideoFileType[]> {
  const allVideos = await getAllVideos();

  return allVideos.filter((video) => video.author?.slug === authorId);
}

/**
 * Gets all the videos sorted by the publishing date
 * @returns Promisifed video files
 */
export async function getAllVideos(): Promise<VideoFileType[]> {
  const videoEntries = await getCollection('videos');
  const allAuthors = await getAllAuthors();

  const enrichedVideos = videoEntries.map((videoFile) => {
    const author = allAuthors.find(
      (author) => author.slug === videoFile.data.authorId,
    );

    if (!author) {
      throw new Error(
        `Author with ID ${videoFile.data.authorId} not found for video ${videoFile.data.title}`,
      );
    }

    return {
      ...videoFile,
      author,
    };
  });

  return enrichedVideos.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );
}

export async function getVideoById(id: string): Promise<VideoFileType> {
  const allVideos = await getAllVideos();
  const videoFile = allVideos.find((video) => video.slug === id);

  if (!videoFile) {
    throw new Error(`Video with ID ${id} not found`);
  }

  return videoFile;
}
