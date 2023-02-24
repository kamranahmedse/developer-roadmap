import type { MarkdownFileType } from './file';

export interface VideoFrontmatter {
  title: string;
  description: string;
  author: {
    name: string;
    url: string;
    imageUrl: string;
  };
  seo: {
    title: string;
    description: string;
  };
  isNew: boolean;
  duration: string;
  date: string;
  sitemap: {
    priority: number;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yealry';
  };
  tags: string[];
}

export type VideoFileType = MarkdownFileType<VideoFrontmatter> & {
  id: string;
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

/**
 * Gets all the videos sorted by the publishing date
 * @returns Promisifed video files
 */
export async function getAllVideos(): Promise<VideoFileType[]> {
  const videos = await import.meta.glob<VideoFileType>('/src/data/videos/*.md', {
    eager: true,
  });

  const videoFiles = Object.values(videos);
  const enrichedVideos = videoFiles.map((videoFile) => ({
    ...videoFile,
    id: videoPathToId(videoFile.file),
  }));

  return enrichedVideos.sort(
    (a, b) =>
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
  );
}
