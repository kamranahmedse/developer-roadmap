import { getCollection, type CollectionEntry } from 'astro:content';
import { getRoadmapById, type RoadmapFileType } from './roadmap.ts';

export type ProjectFileType = CollectionEntry<'projects'> & {
  roadmaps: RoadmapFileType[];
};

export async function getProjectsByRoadmapId(
  roadmapId: string,
): Promise<ProjectFileType[]> {
  const projects = await getAllProjects();

  return projects.filter((project) =>
    project.data?.roadmapIds?.includes(roadmapId),
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

  tempProjects = await getCollection('projects');
  return tempProjects;
}

export async function getProjectById(
  groupId: string,
): Promise<ProjectFileType> {
  const projects = await getAllProjects();
  const project = projects.find((project) => project.slug === groupId);
  if (!project) {
    throw new Error(`Project not found with id: ${groupId}`);
  }

  const roadmapIds = project.data.roadmapIds || [];
  const roadmaps = await Promise.all(
    roadmapIds.map((roadmapId: string) => getRoadmapById(roadmapId)),
  );

  return {
    ...project,
    roadmaps: roadmaps,
  };
}

export async function getRoadmapsProjects(): Promise<
  Record<string, ProjectFileType[]>
> {
  const projects = await getAllProjects();
  const roadmapsProjects: Record<string, ProjectFileType[]> = {};

  projects.forEach((project) => {
    project.data.roadmapIds.forEach((roadmapId) => {
      if (!roadmapsProjects[roadmapId]) {
        roadmapsProjects[roadmapId] = [];
      }

      roadmapsProjects[roadmapId].push(project);
    });
  });

  return roadmapsProjects;
}
