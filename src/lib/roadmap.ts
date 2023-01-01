export interface RoadmapFrontmatter {
  id: string;
  jsonUrl: string;
  pdfUrl: string;
  order: number;
  featuredTitle: string;
  featuredDescription: string;
  title: string;
  description: string;
  hasTopics: boolean;
  dimensions: {
    width: number;
    height: number;
  };
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

export async function getRoadmapIds() {
  const roadmapFiles = await import.meta.glob<string>("/src/roadmaps/*/*.md", {
    eager: true,
  });

  return Object.keys(roadmapFiles).map((filePath) => {
    const fileName = filePath.split("/").pop() || "";

    return fileName.replace(".md", "");
  });
}

export interface TopicFileType {
    frontMatter: Record<string, string>;
    file: string;
    url: string;
    Content: any;
};

export async function getTopicPathMapping() {
  const contentFiles = await import.meta.glob<string>(
    "/src/roadmaps/*/content/**/*.md", {
        eager: true
    }
);

  const mapping: Record<string, TopicFileType> = {};

  Object.keys(contentFiles).forEach((filePath) => {
    // => Sample Paths
    // /src/roadmaps/vue/content/102-ecosystem/102-ssr/101-nuxt-js.md
    // /src/roadmaps/vue/content/102-ecosystem/102-ssr/index.md
    const url = filePath
      .replace("/src/roadmaps/", "") // Remove the base `/src/roadmaps` from path
      .replace("/content", "") // Remove the `/[roadmapName]/content`
      .replace(/\/\d+-/g, "/") // Remove ordering info `/101-ecosystem`
      .replace(/\/index\.md$/, "") // Make the `/index.md` to become the parent folder only
      .replace(/\.md$/, ""); // Remove `.md` from the end of file

    mapping[url] = contentFiles[filePath] as any;
  });

  return mapping;
}
