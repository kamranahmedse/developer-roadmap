import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { ResourceProgress } from '../Activity/ResourceProgress';
import { ProjectProgress } from '../Activity/ProjectProgress';
import type { PageType } from '../CommandMenu/CommandMenu';
import { useToast } from '../../hooks/use-toast';
import { LoadingProgress } from './LoadingProgress';
import { ArrowUpRight, Pencil, Plus } from 'lucide-react';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';

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
  url: string;
  title: string;
  description: string;
  isFavorite?: boolean;
};

type PersonalDashboardProps = {
  builtInRoleRoadmaps?: BuiltInRoadmap[];
  builtInSkillRoadmaps?: BuiltInRoadmap[];
  builtInBestPractices?: BuiltInRoadmap[];
};

export function PersonalDashboard(props: PersonalDashboardProps) {
  const {
    builtInRoleRoadmaps = [],
    builtInBestPractices = [],
    builtInSkillRoadmaps = [],
  } = props;
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
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

    progressList?.progresses?.forEach((progress) => {
      window.dispatchEvent(
        new CustomEvent('mark-favorite', {
          detail: {
            resourceId: progress.resourceId,
            resourceType: progress.resourceType,
            isFavorite: progress.isFavorite,
          },
        }),
      );
    });
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

  useEffect(() => {
    window.addEventListener('refresh-favorites', loadProgress);
    return () => window.removeEventListener('refresh-favorites', loadProgress);
  }, []);

  const learningRoadmapsToShow = (personalDashboardDetails?.progresses || [])
    .filter((progress) => !progress.isCustomResource)
    .sort((a, b) => {
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

  const customRoadmaps = (personalDashboardDetails?.progresses || [])
    .filter((progress) => progress.isCustomResource)
    .sort((a, b) => {
      const updatedAtA = new Date(a.updatedAt);
      const updatedAtB = new Date(b.updatedAt);
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
      {isCreatingRoadmap && (
        <CreateRoadmapModal
          onClose={() => {
            setIsCreatingRoadmap(false);
          }}
        />
      )}

      {isLoading && (
        <div className="mb-10 h-[188px] animate-pulse rounded-md border bg-gray-100 sm:h-[91px]" />
      )}
      {!isLoading && (
        <div className="mb-10 flex flex-col gap-2 overflow-hidden rounded-md border bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 p-4 sm:p-0 sm:pl-4">
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

          <div className="flex flex-col justify-start divide-y border-t sm:border-l sm:border-t-0">
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
                resourceType={roadmap.resourceType}
                updatedAt={roadmap.updatedAt}
                title={roadmap.resourceTitle}
                showActions={true}
                roadmapSlug={roadmap.roadmapSlug}
              />
            );
          })}
        </div>
      )}

      <h2 className="mb-3 mt-7 text-xs uppercase text-gray-400">
        Custom Roadmaps
      </h2>
      {isLoading && <LoadingProgress />}
      {!isLoading && customRoadmaps.length > 0 && (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {customRoadmaps.map((roadmap) => {
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
                resourceType={roadmap.resourceType}
                updatedAt={roadmap.updatedAt}
                title={roadmap.resourceTitle}
                showActions={true}
                roadmapSlug={roadmap.roadmapSlug}
              />
            );
          })}

          <button
            className="flex w-full items-center justify-center gap-1 overflow-hidden rounded-md border border-dashed border-gray-300 text-sm text-gray-600 hover:border-gray-800 hover:text-black"
            onClick={() => {
              setIsCreatingRoadmap(true);
            }}
          >
            <Plus className="size-4" />
            Create your own Roadmap
          </button>
        </div>
      )}
{!isLoading && customRoadmaps.length === 0 && (
        <div className="flex min-h-[82px] flex-col items-center justify-center rounded-md border text-sm text-gray-500">
          <span>No custom roadmaps found.</span>
          <span>
            Start&nbsp;
            <button
              className="underline underline-offset-2 hover:no-underline"
              onClick={() => {
                setIsCreatingRoadmap(true);
              }}
            >
              creating your own roadmap
            </button>
            .
          </span>
        </div>
      )}
      

      <h2 className="mb-3 mt-7 text-xs uppercase text-gray-400">My Projects</h2>
      {isLoading && <LoadingProgress />}
      {!isLoading && enrichedProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {enrichedProjects.map((project) => {
            return (
              <ProjectProgress
                key={project.projectId}
                projectStatus={project}
                showActions={true}
              />
            );
          })}
        </div>
      )}
      {!isLoading && enrichedProjects.length === 0 && (
        <div className="flex min-h-[82px] flex-col items-center justify-center rounded-md border text-sm text-gray-500">
          <span>No projects found.</span>
          <span>
            Start&nbsp;
            <a
              href="/backend/projects"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
            >
              Backend Projects
            </a>
            .
          </span>
        </div>
      )}

      <h2 className="mb-3 mt-7 text-xs uppercase text-gray-400">
        Role Based Roadmaps
      </h2>
      <ListRoadmaps roadmaps={builtInRoleRoadmaps} />

      <h2 className="mb-3 mt-7 text-xs uppercase text-gray-400">
        Skill Based Roadmaps
      </h2>
      <ListRoadmaps roadmaps={builtInSkillRoadmaps} />

      <h2 className="mb-3 mt-7 text-xs uppercase text-gray-400">
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

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
        {roadmapsToShow.map((roadmap) => (
          <div className="relative w-full" key={roadmap.id}>
            <a
              key={roadmap.id}
              className="block rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
              href={roadmap.url}
            >
              {roadmap.title}
            </a>

            {isMounted && (
              <MarkFavorite
                resourceId={roadmap.id}
                resourceType={
                  roadmap.url.includes('best-practices')
                    ? 'best-practice'
                    : 'roadmap'
                }
                className='data-[is-favorite="true"]:text-gray-400'
              />
            )}
          </div>
        ))}
      </div>

      {!showAll && (
        <div
          className="absolute inset-0 z-50 -m-1 flex items-end justify-center bg-gradient-to-t from-white to-transparent"
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
