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
};

export async function getRoadmapIds() {
    const roadmapFiles = await import.meta.glob<string>('/src/roadmaps/*/*.md', {
        eager: true,
    });

    return Object.keys(roadmapFiles).map(filePath => {
        const fileName = filePath.split('/').pop() || '';

        return fileName.replace('.md', '');
    });
}