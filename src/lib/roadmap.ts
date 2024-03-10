import type { MarkdownFileType } from './file';

export interface RoadmapFrontmatter {
  pdfUrl: string;
  order: number;
  briefTitle: string;
  briefDescription: string;
  title: string;
  description: string;
  hasTopics: boolean;
  isForkable?: boolean;
  isHidden: boolean;
  isNew: boolean;
  isUpcoming: boolean;
  tnsBannerLink?: string;
  note?: string;
  question?: {
    title: string;
    description: string;
  };
  dimensions?: {
    width: number;
    height: number;
  };
  seo: {
    title: string;
    description: string;
    ogImageUrl?: string;
    keywords: string[];
  };
  schema?: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    imageUrl: string;
  };
  relatedRoadmaps: string[];
  relatedQuestions: string[];
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
  const roadmapFiles = import.meta.glob<RoadmapFileType>(
    '/src/data/roadmaps/*/*.md',
    {
      eager: true,
    },
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
  tag: string,
): Promise<RoadmapFileType[]> {
  const roadmapFilesMap = import.meta.glob<RoadmapFileType>(
    '/src/data/roadmaps/*/*.md',
    {
      eager: true,
    },
  );

  const roadmapFiles: RoadmapFileType[] = Object.values(roadmapFilesMap);
  const filteredRoadmaps = roadmapFiles
    .filter((roadmapFile) => roadmapFile.frontmatter.tags.includes(tag))
    .map((roadmapFile) => ({
      ...roadmapFile,
      id: roadmapPathToId(roadmapFile.file),
    }));

  return filteredRoadmaps.sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order,
  );
}

export async function getRoadmapById(id: string): Promise<RoadmapFileType> {
  const roadmapFilesMap: Record<string, RoadmapFileType> =
    import.meta.glob<RoadmapFileType>('/src/data/roadmaps/*/*.md', {
      eager: true,
    });

  const roadmapFile = Object.values(roadmapFilesMap).find((roadmapFile) => {
    return roadmapPathToId(roadmapFile.file) === id;
  });

  if (!roadmapFile) {
    throw new Error(`Roadmap with ID ${id} not found`);
  }

  return {
    ...roadmapFile,
    id: roadmapPathToId(roadmapFile.file),
  };
}

export async function getRoadmapsByIds(
  ids: string[],
): Promise<RoadmapFileType[]> {
  if (!ids?.length) {
    return [];
  }

  return Promise.all(ids.map((id) => getRoadmapById(id)));
}
