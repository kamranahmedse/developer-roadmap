import type { MarkdownFileType } from './file';
import type { SponsorType } from '../components/Sponsor/Sponsor.astro';

export interface BestPracticeFrontmatter {
  jsonUrl: string;
  pdfUrl: string;
  order: number;
  briefTitle: string;
  briefDescription: string;
  title: string;
  description: string;
  isNew: boolean;
  isUpcoming: boolean;
  dimensions?: {
    width: number;
    height: number;
  };
  sponsor?: SponsorType;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  schema?: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    imageUrl: string;
  };
}

export type BestPracticeFileType = MarkdownFileType<BestPracticeFrontmatter> & {
  id: string;
};

function bestPracticePathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

/**
 * Gets the IDs of all the best practices available on the website
 *
 * @returns string[] Array of best practices file IDs
 */
export async function getBestPracticeIds() {
  const bestPracticeFiles = await import.meta.glob<BestPracticeFileType>('/src/data/best-practices/*/*.md', {
    eager: true,
  });

  return Object.keys(bestPracticeFiles).map(bestPracticePathToId);
}

/**
 * Gets all the best practice files
 *
 * @param tag Tag assigned to best practice
 * @returns Promisified BestPracticeFileType[]
 */
export async function getAllBestPractices(): Promise<BestPracticeFileType[]> {
  const bestPracticeFilesMap = await import.meta.glob<BestPracticeFileType>('/src/data/best-practices/*/*.md', {
    eager: true,
  });

  const bestPracticeFiles = Object.values(bestPracticeFilesMap);
  const bestPracticeItems = bestPracticeFiles.map((bestPracticeFile) => ({
    ...bestPracticeFile,
    id: bestPracticePathToId(bestPracticeFile.file),
  }));

  return bestPracticeItems.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
