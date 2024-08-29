import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { ResourceProgress } from '../Activity/ResourceProgress';
import { ProjectProgress } from '../Activity/ProjectProgress';
import type { PageType } from '../CommandMenu/CommandMenu';
import { useToast } from '../../hooks/use-toast';
import { LoadingProgress } from './LoadingProgress';

type UserDashboardResponse = {
  progresses: UserProgress[];
  projects: ProjectStatusDocument[];
};

type PersonalDashboardProps = {};

export function PersonalDashboard(props: PersonalDashboardProps) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState<PageType[]>([]);
  const [personalDashboardDetails, setPersonalDashboardDetails] =
    useState<UserDashboardResponse>();

  async function loadProgress() {
    const { response: progressList, error } =
      await httpGet<UserDashboardResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-user-dashboard`,
      );

    if (error || !progressList) {
      return;
    }

    setPersonalDashboardDetails(progressList);
  }

  async function loadAllProjectDetails() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      toast.error(error.message || 'Something went wrong');
      return;
    }

    if (!response) {
      return [];
    }

    const allProjects = response.filter((page) => page.group === 'Projects');
    setProjectDetails(allProjects);
  }

  useEffect(() => {
    Promise.allSettled([loadProgress(), loadAllProjectDetails()]).finally(() =>
      setIsLoading(false),
    );
  }, []);

  const learningRoadmaps =
    personalDashboardDetails?.progresses?.filter(
      (progress) => progress.resourceType === 'roadmap',
    ) || [];

  const learningRoadmapsToShow = learningRoadmaps.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt);
    const updatedAtB = new Date(b.updatedAt);

    if (a.isFavorite && !b.isFavorite) {
      return -1;
    }

    if (!a.isFavorite && b.isFavorite) {
      return 1;
    }

    return updatedAtB.getTime() - updatedAtA.getTime();
  });

  const enrichedProjects =
    personalDashboardDetails?.projects?.map((project) => {
      const projectDetail = projectDetails.find(
        (page) => page.id === project.projectId,
      );

      return {
        ...project,
        title: projectDetail?.title || 'N/A',
      };
    }) || [];

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xs uppercase text-gray-400">
        Progress and Bookmarks
      </h2>
      {isLoading && <LoadingProgress />}
      {!isLoading && learningRoadmapsToShow.length > 0 && (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {learningRoadmapsToShow.map((roadmap) => {
            const learningCount = roadmap.learning || 0;
            const doneCount = roadmap.done || 0;
            const totalCount = roadmap.total || 0;
            const skippedCount = roadmap.skipped || 0;

            return (
              <ResourceProgress
                key={roadmap.resourceId}
                isCustomResource={roadmap?.isCustomResource || false}
                doneCount={doneCount > totalCount ? totalCount : doneCount}
                learningCount={
                  learningCount > totalCount ? totalCount : learningCount
                }
                totalCount={totalCount}
                skippedCount={skippedCount}
                resourceId={roadmap.resourceId}
                resourceType="roadmap"
                updatedAt={roadmap.updatedAt}
                title={roadmap.resourceTitle}
                showActions={false}
                roadmapSlug={roadmap.roadmapSlug}
              />
            );
          })}
        </div>
      )}

      <h2 className="mb-3 mt-6 text-xs uppercase text-gray-400">My Projects</h2>
      {isLoading && <LoadingProgress />}
      {!isLoading && enrichedProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {enrichedProjects.map((project) => {
            return (
              <ProjectProgress
                key={project.projectId}
                projectStatus={project}
                showActions={false}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
