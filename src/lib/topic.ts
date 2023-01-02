import type { MarkdownFileType } from './file';
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

export type BreadcrumbItem = {
  title: string;
  url: string;
};

export interface TopicFileType {
  url: string;
  text: string;
  file: MarkdownFileType;
  roadmap: RoadmapFrontmatter;
  roadmapId: string;
  breadcrumbs: BreadcrumbItem[];
}

/**
 * Gets all the topic files available for all the roadmaps
 * @returns Hashmap containing the topic slug and the topic file content
 */
export async function getTopicFiles(): Promise<Record<string, TopicFileType>> {
  const contentFiles = await import.meta.glob<string>(
    '/src/roadmaps/*/content/**/*.md',
    {
      eager: true,
    }
  );

  const mapping: Record<string, TopicFileType> = {};

  for (let filePath of Object.keys(contentFiles)) {
    const fileContent: MarkdownFileType = contentFiles[filePath] as any;
    const fileHeadings = fileContent.getHeadings();
    const firstHeading = fileHeadings[0];

    const [, roadmapId] =
      filePath.match(/^\/src\/roadmaps\/(.+)?\/content\/(.+)?$/) || [];
    const topicUrl = generateTopicUrl(filePath);

    const currentRoadmap = await import(
      `../roadmaps/${roadmapId}/${roadmapId}.md`
    );

    mapping[topicUrl] = {
      url: topicUrl,
      text: firstHeading?.text,
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
        title: 'Roadmaps',
        url: '/roadmaps',
      },
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

// [
//   '/frontend/internet/how-does-the-internet-work',
//   '/frontend/internet/what-is-http',
//   '/frontend/internet/browsers-and-how-they-work',
//   '/frontend/internet/dns-and-how-it-works',
//   '/frontend/internet/what-is-domain-name',
//   '/frontend/internet/what-is-hosting',
//   '/frontend/internet',
//   '/frontend/html/learn-the-basics',
//   '/frontend/html/writing-semantic-html',
//   '/frontend/html/forms-and-validations',
//   '/frontend/html/conventions-and-best-practices',
//   '/frontend/html/accessibility',
//   '/frontend/html/seo-basics',
//   '/frontend/html',
//   '/frontend/css/learn-the-basics',
//   '/frontend/css/making-layouts',
//   '/frontend/css/responsive-design-and-media-queries',
//   '/frontend/css',
//   '/frontend/javascript/syntax-and-basic-constructs',
//   '/frontend/javascript/learn-dom-manipulation',
//   '/frontend/javascript/learn-fetch-api-ajax-xhr',
//   '/frontend/javascript/es6-and-modular-javascript',
//   '/frontend/javascript/concepts',
//   '/frontend/javascript',
//   '/frontend/version-control-systems/basic-usage-of-git',
//   '/frontend/version-control-systems'
// ]
export async function sortTopics(topics: TopicFileType[]): Promise<TopicFileType[]> {
  let sortedTopics: TopicFileType[] = [];

  // For each of the topic, find its place in the sorted topics
  for (let i = 0; i < topics.length; i++) {
    const currTopic = topics[i];
    const currUrl = currTopic.url;
    let isPlaced = false;
    
    // Find the first sorted topic which starts with the current topic
    for (let j = 0; j < sortedTopics.length; j++) {
      const sortedTopic = sortedTopics[j];
      const sortedUrl = sortedTopic.url;

      // Insert before the current URL and break
      if (sortedUrl.startsWith(`${currUrl}/`)) {
        sortedTopics.splice(j, 0, currTopic);
        isPlaced = true;
        break;
      }
    }

    if (!isPlaced) {
      sortedTopics.push(currTopic);
    }
  }

  return sortedTopics;
}

/**
 * Gets the the topics for a given roadmap
 * @param roadmapId Roadmap id for which you want the topics
 * @returns Promise<TopicFileType[]>
 */
export async function getTopicsByRoadmapId(roadmapId: string): Promise<TopicFileType[]> {
  const topicFileMapping = await getTopicFiles();
  const allTopics = Object.values(topicFileMapping);
  const roadmapTopics = allTopics.filter(
    (topic) => topic.roadmapId === roadmapId
  );

  return sortTopics(roadmapTopics);
}