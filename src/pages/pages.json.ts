import { getAllBestPractices } from '../lib/best-practice';
import { getAllGuides } from '../lib/guide';
import { getRoadmapsByTag } from '../lib/roadmap';
import { getAllVideos } from '../lib/video';
import { getAllQuestionGroups } from '../lib/question-group';
import { getAllProjects } from '../lib/project';

// Add utility to fetch beginner roadmap file IDs
function getBeginnerRoadmapIds() {
  const files = import.meta.glob('/src/data/roadmaps/*/*-beginner.json', {
    eager: true,
  });

  return Object.keys(files).map((filePath) => {
    const fileName = filePath.split('/').pop() || '';
    return fileName.replace('.json', '');
  });
}

export async function GET() {
  const guides = await getAllGuides();
  const videos = await getAllVideos();
  const questionGroups = await getAllQuestionGroups();
  const roadmaps = await getRoadmapsByTag('roadmap');
  const bestPractices = await getAllBestPractices();
  const projects = await getAllProjects();

  // Transform main roadmaps into page objects first so that we can reuse their meta for beginner variants
  const roadmapPages = roadmaps.map((roadmap) => ({
    id: roadmap.id,
    url: `/${roadmap.id}`,
    title: roadmap.frontmatter.briefTitle,
    description: roadmap.frontmatter.briefDescription,
    group: 'Roadmaps',
    metadata: {
      tags: roadmap.frontmatter.tags,
    },
    renderer: roadmap?.frontmatter?.renderer || 'balsamiq',
  }));

  // Generate beginner roadmap page objects
  const beginnerRoadmapPages = getBeginnerRoadmapIds()
    .map((beginnerId) => {
      const parentId = beginnerId.replace('-beginner', '');
      const parentMeta = roadmapPages.find((page) => page.id === parentId);

      if (!parentMeta) {
        return null;
      }

      return {
        ...parentMeta,
        id: beginnerId,
        url: `/${parentId}?r=${beginnerId}`,
        title: `${parentMeta.title} Beginner`,
      };
    })
    .filter(Boolean);

  return new Response(
    JSON.stringify([
      ...roadmapPages,
      ...beginnerRoadmapPages,
      ...bestPractices.map((bestPractice) => ({
        id: bestPractice.id,
        url: `/best-practices/${bestPractice.id}`,
        title: bestPractice.frontmatter.briefTitle,
        description: bestPractice.frontmatter.briefDescription,
        group: 'Best Practices',
      })),
      ...questionGroups.map((questionGroup) => ({
        id: questionGroup.id,
        url: `/questions/${questionGroup.id}`,
        title: questionGroup.frontmatter.briefTitle,
        group: 'Questions',
      })),
      ...guides.map((guide) => ({
        id: guide.id,
        url: guide.frontmatter.excludedBySlug
          ? guide.frontmatter.excludedBySlug
          : `/guides/${guide.id}`,
        title: guide.frontmatter.title,
        description: guide.frontmatter.description,
        authorId: guide.frontmatter.authorId,
        group: 'Guides',
      })),
      ...videos.map((video) => ({
        id: video.id,
        url: `/videos/${video.id}`,
        title: video.frontmatter.title,
        group: 'Videos',
      })),
      ...projects.map((project) => ({
        id: project.id,
        url: `/projects/${project.id}`,
        title: project.frontmatter.title,
        description: project.frontmatter.description,
        group: 'Projects',
      })),
    ]),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
