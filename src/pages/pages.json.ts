import { getAllBestPractices } from '../lib/best-pratice';
import { getAllGuides } from '../lib/guide';
import { getRoadmapsByTag } from '../lib/roadmap';
import { getAllVideos } from '../lib/video';

export async function get() {
  const guides = await getAllGuides();
  const videos = await getAllVideos();
  const roadmaps = await getRoadmapsByTag('roadmap');
  const bestPractices = await getAllBestPractices();

  return {
    body: JSON.stringify([
      ...roadmaps.map((roadmap) => ({
        id: roadmap.id,
        url: `/${roadmap.id}`,
        title: roadmap.frontmatter.briefTitle,
        group: 'Roadmaps',
        metadata: {
          tags: roadmap.frontmatter.tags,
        },
      })),
      ...bestPractices.map((bestPractice) => ({
        id: bestPractice.id,
        url: `/best-practices/${bestPractice.id}`,
        title: bestPractice.frontmatter.briefTitle,
        group: 'Best Practices',
      })),
      ...guides.map((guide) => ({
        id: guide.id,
        url: `/guides/${guide.id}`,
        title: guide.frontmatter.title,
        group: 'Guides',
      })),
      ...videos.map((guide) => ({
        id: guide.id,
        url: `/videos/${guide.id}`,
        title: guide.frontmatter.title,
        group: 'Videos',
      })),
    ]),
  };
}
