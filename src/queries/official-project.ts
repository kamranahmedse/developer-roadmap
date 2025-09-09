import { DateTime } from 'luxon';
import { FetchError, httpGet } from '../lib/query-http';

export const allowedOfficialProjectDifficulty = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type AllowedOfficialProjectDifficulty =
  (typeof allowedOfficialProjectDifficulty)[number];

export const allowedOfficialProjectStatus = ['draft', 'published'] as const;
export type AllowedOfficialProjectStatus =
  (typeof allowedOfficialProjectStatus)[number];

export interface OfficialProjectDocument {
  _id: string;

  order: number;
  title: string;
  description: string;
  slug: string;
  difficulty: AllowedOfficialProjectDifficulty;
  topics: string[];

  status: AllowedOfficialProjectStatus;
  publishedAt?: Date;

  content: any;

  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  skills: string[];
  roadmapIds: string[];

  createdAt: Date;
  updatedAt: Date;
}

export async function officialProjectDetails(projectSlug: string) {
  try {
    const project = await httpGet<OfficialProjectDocument>(
      `/v1-official-project/${projectSlug}`,
    );

    return project;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return null;
    }

    throw error;
  }
}

type ListOfficialProjectsQuery = {
  roadmapId?: string;
};

export async function listOfficialProjects(
  query: ListOfficialProjectsQuery = {},
) {
  try {
    const projects = await httpGet<OfficialProjectDocument[]>(
      `/v1-list-official-projects`,
      query,
    );

    return projects;
  } catch (error) {
    if (FetchError.isFetchError(error) && error.status === 404) {
      return [];
    }

    throw error;
  }
}

export function isNewProject(createdAt: Date) {
  return (
    createdAt &&
    DateTime.now().diff(DateTime.fromJSDate(new Date(createdAt)), 'days').days <
      45
  );
}

export async function getRoadmapsProjects(): Promise<
  Record<string, OfficialProjectDocument[]>
> {
  const projects = await listOfficialProjects();
  const roadmapsProjects: Record<string, OfficialProjectDocument[]> = {};

  projects.forEach((project) => {
    project.roadmapIds.forEach((roadmapId) => {
      if (!roadmapsProjects[roadmapId]) {
        roadmapsProjects[roadmapId] = [];
      }

      roadmapsProjects[roadmapId].push(project);
    });
  });

  return roadmapsProjects;
}
