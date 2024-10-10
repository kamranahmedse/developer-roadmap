import type { MarkdownFileType } from './file';
import { getRoadmapById, type RoadmapFileType } from './roadmap.ts';

export const projectDifficulties = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type ProjectDifficultyType = (typeof projectDifficulties)[number];

export interface ProjectFrontmatter {
  title: string;
  description: string;
  isNew: boolean;
  sort: number;
  difficulty: ProjectDifficultyType;
  nature: string;
  skills: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImageUrl: string;
  };
  roadmapIds: string[];
}

export type ProjectFileType = MarkdownFileType<ProjectFrontmatter> & {
  id: string;
  roadmaps: RoadmapFileType[];
};

/**
 * Generates id from the given project file
 * @param filePath Markdown file path
 *
 * @returns unique project identifier
 */
function projectPathToId(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';

  return fileName.replace('.md', '');
}

export async function getProjectsByRoadmapId(
  roadmapId: string,
): Promise<ProjectFileType[]> {
  const projects = await getAllProjects();

  return projects.filter((project) =>
    project.frontmatter?.roadmapIds?.includes(roadmapId),
  );
}

let tempProjects: ProjectFileType[] = [];

/**
 * Gets all the projects sorted by the publishing date
 * @returns Promisifed project files
 */
export async function getAllProjects(): Promise<ProjectFileType[]> {
  if (tempProjects.length) {
    return tempProjects;
  }

  const projects = import.meta.glob<ProjectFileType>(
    '/src/data/projects/*.md',
    {
      eager: true,
    },
  );

  tempProjects = Object.values(projects).map((projectFile) => ({
    ...projectFile,
    id: projectPathToId(projectFile.file),
  }));

  return tempProjects;
}

export async function getProjectById(
  groupId: string,
): Promise<ProjectFileType> {
  const project = await import(`../data/projects/${groupId}.md`);
  const roadmapIds = project.frontmatter.roadmapIds || [];
  const roadmaps = await Promise.all(
    roadmapIds.map((roadmapId: string) => getRoadmapById(roadmapId)),
  );

  return {
    ...project,
    roadmaps: roadmaps,
    id: projectPathToId(project.file),
  };
}

export async function getRoadmapsProjects(): Promise<
  Record<string, ProjectFileType[]>
> {
  const projects = await getAllProjects();
  const roadmapsProjects: Record<string, ProjectFileType[]> = {};

  projects.forEach((project) => {
    project.frontmatter.roadmapIds.forEach((roadmapId) => {
      if (!roadmapsProjects[roadmapId]) {
        roadmapsProjects[roadmapId] = [];
      }

      roadmapsProjects[roadmapId].push(project);
    });
  });

  return roadmapsProjects;
}
