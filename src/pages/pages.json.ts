import { getAllBestPractices } from '../lib/best-practice';
import { getAllVideos } from '../lib/video';
import { getAllQuestionGroups } from '../lib/question-group';
import {
  listOfficialAuthors,
  listOfficialGuides,
} from '../queries/official-guide';
import {
  listOfficialBeginnerRoadmaps,
  listOfficialRoadmaps,
} from '../queries/official-roadmap';
import { listOfficialProjects } from '../queries/official-project';

export async function GET() {
  const guides = await listOfficialGuides();
  const authors = await listOfficialAuthors();
  const videos = await getAllVideos();
  const questionGroups = await getAllQuestionGroups();
  const mainRoadmaps = await listOfficialRoadmaps();
  const beginnerRoadmaps = await listOfficialBeginnerRoadmaps();

  const bestPractices = await getAllBestPractices();
  const projects = await listOfficialProjects();

  const roadmaps = [...mainRoadmaps, ...beginnerRoadmaps];
  // Transform main roadmaps into page objects first so that we can reuse their meta for beginner variants
  const roadmapPages = roadmaps
    .map((roadmap) => {
      const isBeginner = roadmap.slug.endsWith('-beginner');
      if (!isBeginner) {
        return {
          id: roadmap.slug,
          url: `/${roadmap.slug}`,
          title: roadmap.title.card,
          shortTitle: roadmap.title.card,
          description: roadmap.description,
          group: 'Roadmaps',
          metadata: {
            tags:
              roadmap.type === 'role' ? ['role-roadmap'] : ['skill-roadmap'],
          },
          renderer: 'editor',
        };
      }

      const parentSlug = roadmap.slug.replace('-beginner', '');
      const parentMeta = roadmaps.find((r) => r.slug === parentSlug);

      if (!parentMeta) {
        return null;
      }

      return {
        id: roadmap.slug,
        url: `/${parentSlug}?r=${roadmap.slug}`,
        title: `${parentMeta.title.page} Beginner`,
        shortTitle: `${parentMeta.title.page} Beginner`,
        description: parentMeta.description,
        group: 'Roadmaps',
        metadata: {
          tags: ['beginner-roadmap'],
        },
        renderer: 'editor',
      };
    })
    .filter(Boolean);

  return new Response(
    JSON.stringify([
      ...roadmapPages,
      ...bestPractices.map((bestPractice) => ({
        id: bestPractice.id,
        url: `/best-practices/${bestPractice.id}`,
        title: bestPractice.frontmatter.briefTitle,
        shortTitle: bestPractice.frontmatter.briefTitle,
        description: bestPractice.frontmatter.briefDescription,
        group: 'Best Practices',
      })),
      ...questionGroups.map((questionGroup) => ({
        id: questionGroup.id,
        url: `/questions/${questionGroup.id}`,
        title: questionGroup.frontmatter.briefTitle,
        shortTitle: questionGroup.frontmatter.briefTitle,
        group: 'Questions',
      })),
      ...guides.map((guide) => {
        const author = authors.find((author) => author._id === guide.authorId);
        const authorSlug = author?.slug || guide?.authorId;

        return {
          id: guide.slug,
          url: guide?.roadmapId
            ? `/${guide.roadmapId}/${guide.slug}`
            : `/guides/${guide.slug}`,
          title: guide.title,
          description: guide.description,
          authorId: authorSlug,
          shortTitle: guide.title,
          group: 'Guides',
        };
      }),
      ...videos.map((video) => ({
        id: video.id,
        url: `/videos/${video.id}`,
        title: video.frontmatter.title,
        shortTitle: video.frontmatter.title,
        group: 'Videos',
      })),
      ...projects.map((project) => ({
        id: project.slug,
        url: `/projects/${project.slug}`,
        title: project.title,
        description: project.description,
        shortTitle: project.title,
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
