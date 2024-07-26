import type { MarkdownFileType } from './file';
import type { RoadmapFrontmatter } from './roadmap';

// Generates URL from the topic file path e.g.
// -> /src/data/roadmaps/vue/content/102-ecosystem/102-ssr/101-nuxt-js.md
//    /vue/ecosystem/ssr/nuxt-js
// -> /src/data/roadmaps/vue/content/102-ecosystem
//    /vue/ecosystem
function generateTopicUrl(filePath: string) {
  let result = filePath
    .replace('/src/data/roadmaps/', '/') // Remove the base `/src/data/roadmaps` from path
    .replace('/content', ''); // Remove the `/[roadmapId]/content`

  if (result.match(/\/\d+-/g) && !result.match(/\/\d-/g)) {
    result = result.replace(/\/\d+-/g, '/'); // Remove ordering info `/101-ecosystem`
  }

  result = result
    .replace(/\/index\.md$/, '') // Make the `/index.md` to become the parent folder only
    .replace(/\.md$/, ''); // Remove `.md` from the end of file

  return result;
}

export interface RoadmapTopicFileType {
  url: string;
  heading: string;
  file: MarkdownFileType;
  roadmap: RoadmapFrontmatter;
  roadmapId: string;
}

/**
 * Gets all the topic files available for all the roadmaps
 * @returns Hashmap containing the topic slug and the topic file content
 */
export async function getRoadmapTopicFiles(): Promise<
  Record<string, RoadmapTopicFileType>
> {
  const contentFiles = await import.meta.glob<string>(
    '/src/data/roadmaps/*/content/**/*.md',
    {
      eager: true,
    },
  );

  const mapping: Record<string, RoadmapTopicFileType> = {};

  for (let filePath of Object.keys(contentFiles)) {
    const fileContent: MarkdownFileType = contentFiles[filePath] as any;
    const fileHeadings = fileContent.getHeadings();
    const firstHeading = fileHeadings[0];

    const [, roadmapId] =
      filePath.match(/^\/src\/data\/roadmaps\/(.+)?\/content\/(.+)?$/) || [];
    const topicUrl = generateTopicUrl(filePath);

    const currentRoadmap = await import(
      `../data/roadmaps/${roadmapId}/${roadmapId}.md`
    );

    mapping[topicUrl] = {
      url: topicUrl,
      heading: firstHeading?.text,
      file: fileContent,
      roadmap: currentRoadmap.frontmatter,
      roadmapId: roadmapId,
    };
  }

  return mapping;
}
