import type { MarkdownFileType } from './file';
import type { BestPracticeFrontmatter } from './best-pratice';

// Generates URL from the topic file path e.g.
// -> /src/best-practices/frontend-performance/content/100-use-https-everywhere
//    /best-practices/frontend-performance/use-https-everywhere
// -> /src/best-practices/frontend-performance/content/102-use-cdn-for-static-assets
//    /best-practices/use-cdn-for-static-assets
function generateTopicUrl(filePath: string) {
  return filePath
    .replace('/src/best-practices/', '/') // Remove the base `/src/best-practices` from path
    .replace('/content', '') // Remove the `/[bestPracticeId]/content`
    .replace(/\/\d+-/g, '/') // Remove ordering info `/101-ecosystem`
    .replace(/\/index\.md$/, '') // Make the `/index.md` to become the parent folder only
    .replace(/\.md$/, ''); // Remove `.md` from the end of file
}

interface TopicFileType {
  url: string;
  heading: string;
  file: MarkdownFileType;
  bestPractice: BestPracticeFrontmatter;
  bestPracticeId: string;
}

/**
 * Gets all the topic files available for all the best practices
 * @returns Hashmap containing the topic slug and the topic file content
 */
async function getTopicFiles(): Promise<Record<string, TopicFileType>> {
  const contentFiles = await import.meta.glob<string>('/src/best-practices/*/content/**/*.md', {
    eager: true,
  });

  const mapping: Record<string, TopicFileType> = {};

  for (let filePath of Object.keys(contentFiles)) {
    const fileContent: MarkdownFileType = contentFiles[filePath] as any;
    const fileHeadings = fileContent.getHeadings();
    const firstHeading = fileHeadings[0];

    const [, bestPracticeId] = filePath.match(/^\/src\/best-practices\/(.+)?\/content\/(.+)?$/) || [];
    const topicUrl = generateTopicUrl(filePath);

    const currentBestPractice = await import(`../best-practices/${bestPracticeId}/${bestPracticeId}.md`);

    mapping[topicUrl] = {
      url: topicUrl,
      heading: firstHeading?.text,
      file: fileContent,
      bestPractice: currentBestPractice.frontmatter,
      bestPracticeId: bestPracticeId,
    };
  }

  return mapping;
}

/**
 * Gets the the topics for a given best practice
 *
 * @param bestPracticeId BestPractice id for which you want the topics
 *
 * @returns Promise<TopicFileType[]>
 */
export async function getTopicsByBestPracticeId(bestPracticeId: string): Promise<TopicFileType[]> {
  const topicFileMapping = await getTopicFiles();
  const allTopics = Object.values(topicFileMapping);

  return allTopics.filter((topic) => topic.bestPracticeId === bestPracticeId);
}
