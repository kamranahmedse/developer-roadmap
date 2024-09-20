import type { MarkdownFileType } from './file';
import type { AuthorFileType } from './author.ts';
import { getAllAuthors } from './author.ts';
import type { GuideFileType } from './guide.ts';
import { getAllGuides } from './guide.ts';

export interface VideoFrontmatter {
  title: string;
  description: string;
  authorId: string;
  seo: {
    title: string;
    description: string;
  };
  isNew: boolean;
  duration: string;
  date: string;
  sitemap: {
    priority: number;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  tags: string[];
}

export type VideoFileType = MarkdownFileType<VideoFrontmatter> & {
  id: string;
  author: AuthorFileType;
};

/**
 * Generates id from the given video file
 * @param filePath Markdown file path
 *
 * @returns unique video identifier
 */
function videoPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

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
  const videos = import.meta.glob<VideoFileType>('/src/data/videos/*.md', {
    eager: true,
  });

  const allAuthors = await getAllAuthors();

  const videoFiles = Object.values(videos);
  const enrichedVideos = videoFiles.map((videoFile) => ({
    ...videoFile,
    id: videoPathToId(videoFile.file),
    author: allAuthors.find(
      (author) => author.slug === videoFile.frontmatter.authorId,
    )!,
  }));

  return enrichedVideos.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf(),
  );
}

export async function getVideoById(id: string): Promise<VideoFileType> {
  const videoFilesMap: Record<string, VideoFileType> =
    import.meta.glob<VideoFileType>('../data/videos/*.md', {
      eager: true,
    });

  const videoFile = Object.values(videoFilesMap).find((videoFile) => {
    return videoPathToId(videoFile.file) === id;
  });
  if (!videoFile) {
    throw new Error(`Video with ID ${id} not found`);
  }

  return {
    ...videoFile,
    id: videoPathToId(videoFile.file),
  };
}
