import { joinPath } from './path';
import type { RoadmapFrontmatter } from './roadmap';

// Generates URL from the topic file path e.g.
// -> /src/roadmaps/vue/content/102-ecosystem/102-ssr/101-nuxt-js.md
//    /vue/ecosystem/ssr/nuxt-js
// -> /src/roadmaps/vue/content/102-ecosystem
//    /vue/ecosystem
function generateTopicUrl(filePath: string) {
  return filePath
    .replace('/src/roadmaps/', '/') // Remove the base `/src/roadmaps` from path
    .replace('/content', '') // Remove the `/[roadmapId]/content`
    .replace(/\/\d+-/g, '/') // Remove ordering info `/101-ecosystem`
    .replace(/\/index\.md$/, '') // Make the `/index.md` to become the parent folder only
    .replace(/\.md$/, ''); // Remove `.md` from the end of file
}

/**
 * Generates breadcrumbs for the given topic URL from the given topic file details
 *
 * @param topicUrl Topic URL for which breadcrumbs are required
 * @param topicFiles Topic file mapping to read the topic data from
 */
function generateBreadcrumbs(
  topicUrl: string,
  topicFiles: Record<string, TopicFileType>
): BreadcrumbItem[] {
  // We need to collect all the pages with permalinks to generate breadcrumbs
  // e.g. /backend/internet/how-does-internet-work/http
  //      /backend
  //      /backend/internet
  //      /backend/internet/how-does-internet-work
  //      /backend/internet/how-does-internet-work/http

  const urlParts = topicUrl.split('/');
  const breadcrumbUrls = [];
  const subLinks = [];

  for (let counter = 0; counter < urlParts.length; counter++) {
    subLinks.push(urlParts[counter]);

    // Skip the following
    // -> [ '' ]
    // -> [ '', 'vue' ]
    if (subLinks.length > 2) {
        breadcrumbUrls.push(subLinks.join('/'));
    }
  }

  const breadcrumbs = breadcrumbUrls.map((breadCrumbUrl): BreadcrumbItem => {
    const topicFile = topicFiles[breadCrumbUrl];
    const topicFileContent = topicFile.file;

    const firstHeading = topicFileContent?.getHeadings()?.[0];

    return { title: firstHeading?.text, url: breadCrumbUrl };
  });

  return breadcrumbs;
}

type BreadcrumbItem = {
  title: string;
  url: string;
};

type FileHeadingType = {
  depth: number;
  slug: string;
  text: string;
};

export interface TopicFileContentType {
  frontMatter: Record<string, string>;
  file: string;
  url: string;
  Content: any;
  getHeadings: () => FileHeadingType[];
}

export interface TopicFileType {
  url: string;
  file: TopicFileContentType;
  roadmap: RoadmapFrontmatter;
  roadmapId: string;
  breadcrumbs: BreadcrumbItem[];
}

export async function getTopicFiles(): Promise<Record<string, TopicFileType>> {
  const contentFiles = await import.meta.glob<string>(
    '/src/roadmaps/*/content/**/*.md',
    {
      eager: true,
    }
  );

  const mapping: Record<string, TopicFileType> = {};

  for (let filePath of Object.keys(contentFiles)) {
    const fileContent: TopicFileContentType = contentFiles[filePath] as any;
    const fileHeadings = fileContent.getHeadings();
    const firstHeading = fileHeadings[0];

    const [, roadmapId, pathInsideContent] =
      filePath.match(/^\/src\/roadmaps\/(.+)?\/content\/(.+)?$/) || [];

    const topicUrl = generateTopicUrl(filePath);

    const currentRoadmap = await import(
      `../roadmaps/${roadmapId}/${roadmapId}.md`
    );

    mapping[topicUrl] = {
      url: topicUrl,
      file: fileContent,
      roadmap: currentRoadmap.frontmatter,
      roadmapId: roadmapId,
      breadcrumbs: [],
    };
  }

  // Populate breadcrumbs inside the mapping
  Object.keys(mapping).forEach((topicUrl) => {
    const {
      roadmap: currentRoadmap,
      roadmapId,
      file: currentTopic,
    } = mapping[topicUrl];
    const roadmapUrl = `/${roadmapId}`;

    // Breadcrumbs for the file
    const breadcrumbs: BreadcrumbItem[] = [
      {
        title: currentRoadmap.featuredTitle,
        url: `${roadmapUrl}`,
      },
      {
        title: 'Topics',
        url: `${roadmapUrl}/topics`,
      },
      ...generateBreadcrumbs(topicUrl, mapping),
    ];

    mapping[topicUrl].breadcrumbs = breadcrumbs;
  });

  return mapping;
}
