import type { MarkdownFileType } from './file';
import type { SponsorType } from '../components/Sponsor.astro';

export interface RoadmapFrontmatter {
  jsonUrl: string;
  pdfUrl: string;
  order: number;
  featuredTitle: string;
  featuredDescription: string;
  title: string;
  description: string;
  hasTopics: boolean;
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
  relatedRoadmaps: string[];
  sitemap: {
    priority: number;
    changefreq: string;
  };
  tags: string[];
}

export type RoadmapFileType = MarkdownFileType<RoadmapFrontmatter> & {
  id: string;
};

function roadmapPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

/**
 * Gets the IDs of all the roadmaps available on the website
 *
 * @returns string[] Array of roadmap IDs
 */
export async function getRoadmapIds() {
  const roadmapFiles = await import.meta.glob<RoadmapFileType>(
    '/src/roadmaps/*/*.md',
    {
      eager: true,
    }
  );

  return Object.keys(roadmapFiles).map(roadmapPathToId);
}

/**
 * Gets the roadmap files which have the given tag assigned
 *
 * @param tag Tag assigned to roadmap
 * @returns Promisified RoadmapFileType[]
 */
export async function getRoadmapsByTag(
  tag: string
): Promise<RoadmapFileType[]> {
  const roadmapFilesMap = await import.meta.glob<RoadmapFileType>(
    '/src/roadmaps/*/*.md',
    {
      eager: true,
    }
  );

  const roadmapFiles = Object.values(roadmapFilesMap);
  const filteredRoadmaps = roadmapFiles
    .filter((roadmapFile) => roadmapFile.frontmatter.tags.includes(tag))
    .map((roadmapFile) => ({
      ...roadmapFile,
      id: roadmapPathToId(roadmapFile.file),
    }));

  return filteredRoadmaps.sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
}
