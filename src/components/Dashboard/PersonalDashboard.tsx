import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { ResourceProgress } from '../Activity/ResourceProgress';
import { ProjectProgress } from '../Activity/ProjectProgress';
import type { PageType } from '../CommandMenu/CommandMenu';
import { useToast } from '../../hooks/use-toast';
import { LoadingProgress } from './LoadingProgress';
import { ArrowUpRight, Pencil } from 'lucide-react';

type UserDashboardResponse = {
  name: string;
  email: string;
  avatar: string;
  headline: string;
  username: string;
  progresses: UserProgress[];
  projects: ProjectStatusDocument[];
};

export type BuiltInRoadmap = {
  id: string;
  title: string;
  description: string;
};

type PersonalDashboardProps = {
  builtInRoadmaps?: BuiltInRoadmap[];
  builtInBestPractices?: BuiltInRoadmap[];
};

export function PersonalDashboard(props: PersonalDashboardProps) {
  const { builtInRoadmaps = [], builtInBestPractices = [] } = props;
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
    personalDashboardDetails?.projects
      ?.map((project) => {
        const projectDetail = projectDetails.find(
          (page) => page.id === project.projectId,
        );

        return {
          ...project,
          title: projectDetail?.title || 'N/A',
        };
      })
      ?.sort((a, b) => {
        const isPendingA = !a.repositoryUrl && !a.submittedAt;
        const isPendingB = !b.repositoryUrl && !b.submittedAt;

        if (isPendingA && !isPendingB) {
          return -1;
        }

        if (!isPendingA && isPendingB) {
          return 1;
        }

        return 0;
      }) || [];

  const { avatar, name, headline, email, username } =
    personalDashboardDetails || {};
  const avatarLink = avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
    : '/images/default-avatar.png';

  return (
    <section className="mt-8">
      {isLoading && (
        <div className="mb-6 h-[91px] animate-pulse rounded-md border bg-gray-100" />
      )}
      {!isLoading && (
        <div className="mb-6 flex items-center justify-between gap-2 overflow-hidden rounded-md border bg-gray-50">
          <div className="flex items-center gap-3 pl-4">
            <figure className="shrink-0">
              <img
                src={avatarLink}
                alt={name}
                className="h-14 w-14 rounded-full object-cover"
              />
            </figure>
            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-sm text-gray-500">{headline || email}</p>
            </div>
          </div>

          <div className="flex flex-col justify-start divide-y border-l">
            <a
              className="flex items-center gap-2 bg-white px-3 py-3 text-sm font-medium text-gray-500 hover:text-black"
              href={`/account/update-profile`}
              target="_blank"
            >
              <Pencil className="size-4" />
              Edit Profile
            </a>
            <a
              className="flex items-center gap-2 bg-white px-3 py-3 text-sm font-medium text-gray-500 hover:text-black aria-disabled:cursor-not-allowed"
              {...(username ? { href: `/u/${username}` } : {})}
              target="_blank"
              aria-disabled={!username}
            >
              <ArrowUpRight className="size-4" />
              View Profile
            </a>
          </div>
        </div>
      )}

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

      <h2 className="mb-3 mt-6 text-xs uppercase text-gray-400">
        All Roadmaps
      </h2>
      <ListRoadmaps roadmaps={builtInRoadmaps} />

      <h2 className="mb-3 mt-6 text-xs uppercase text-gray-400">
        Best Practices
      </h2>
      <ListRoadmaps roadmaps={builtInBestPractices} />
    </section>
  );
}

type ListRoadmapsProps = {
  roadmaps: BuiltInRoadmap[];
};
export function ListRoadmaps(props: ListRoadmapsProps) {
  const { roadmaps } = props;

  const [showAll, setShowAll] = useState(roadmaps.length <= 12);
  const roadmapsToShow = showAll ? roadmaps : roadmaps.slice(0, 12);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
        {roadmapsToShow.map((roadmap) => (
          <a
            key={roadmap.id}
            className="rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
            href={`/${roadmap.id}`}
          >
            {roadmap.title}
          </a>
        ))}
      </div>

      {!showAll && (
        <div
          className="absolute bottom-0 left-0 right-0 -m-1 flex h-full items-end justify-center bg-gradient-to-t from-white to-transparent p-2"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%)',
          }}
        >
          <button
            className="text-sm font-medium text-gray-600 hover:text-black focus:outline-none"
            onClick={() => setShowAll(true)}
          >
            + Show all
          </button>
        </div>
      )}
    </div>
  );
}
