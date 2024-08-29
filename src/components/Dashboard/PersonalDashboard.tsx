import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { ResourceProgress } from '../Activity/ResourceProgress';

type UserDashboardResponse = {
  progresses: UserProgress[];
  projects: ProjectStatusDocument[];
};

type PersonalDashboardProps = {};

export function PersonalDashboard(props: PersonalDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [personalDashboardDetails, setPersonalDashboardDetails] =
    useState<UserDashboardResponse>();

  async function loadProgress() {
    setIsLoading(true);

    const { response: progressList, error } =
      await httpGet<UserDashboardResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-user-dashboard`,
      );

    if (error || !progressList) {
      return;
    }

    setPersonalDashboardDetails(progressList);
  }

  useEffect(() => {
    loadProgress().finally(() => setIsLoading(false));
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

  return (
    <section className="mt-8">
      <h2 className="text-xs uppercase text-gray-400">
        Progress and Bookmarks
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
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
            />
          );
        })}
      </div>
    </section>
  );
}
