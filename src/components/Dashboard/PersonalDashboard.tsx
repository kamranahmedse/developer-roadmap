import { useEffect, useState, type ReactNode } from 'react';
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
import { getCurrentPeriod } from '../../lib/date';
import { ListDashboardProgress } from './ListDashboardProgress';
import { ListDashboardCustomProgress } from './ListDashboardCustomProgress';
import { DashboardCardLink } from './DashboardCardLink';
import { RecommendedRoadmaps } from './RecommendedRoadmaps';

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
  relatedRoadmapIds?: string[];
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

  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    loadProgress().finally(() => setIsLoading(false));
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

  const aiGeneratedRoadmaps = customRoadmaps.filter(
    (progress) => progress?.aiRoadmapId,
  );
  const customRoadmapsToShow = customRoadmaps.filter(
    (progress) => !progress?.aiRoadmapId,
  );

  const { avatar, name } = personalDashboardDetails || {};
  const avatarLink = avatar
    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
    : '/images/default-avatar.png';

  const currentPeriod = getCurrentPeriod();

  const allRoadmapsAndBestPractices = [
    ...builtInRoleRoadmaps,
    ...builtInSkillRoadmaps,
    ...builtInBestPractices,
  ];

  const relatedRoadmapIds = allRoadmapsAndBestPractices
    .filter((roadmap) =>
      learningRoadmapsToShow?.some(
        (learningRoadmap) => learningRoadmap.resourceId === roadmap.id,
      ),
    )
    .flatMap((roadmap) => roadmap.relatedRoadmapIds)
    .filter(
      (roadmapId) =>
        !learningRoadmapsToShow.some((lr) => lr.resourceId === roadmapId),
    );

  const recommendedRoadmapIds = new Set(
    relatedRoadmapIds.length === 0
      ? ['frontend', 'backend', 'devops', 'ai-data-scientist', 'full-stack']
      : relatedRoadmapIds,
  );

  const recommendedRoadmaps = allRoadmapsAndBestPractices.filter((roadmap) =>
    recommendedRoadmapIds.has(roadmap.id),
  );

  return (
    <section>
      {isLoading ? (
        <div className="h-7 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
      ) : (
        <h2 className="text-lg font-medium">
          Hi {name}, good {currentPeriod}!
        </h2>
      )}

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
        {isLoading ? (
          <>
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </>
        ) : (
          <>
            <a
              className="overflow-hidden rounded-lg border border-gray-300 bg-white"
              href="/account/update-profile"
            >
              <div className="px-4 py-2.5">
                <img
                  src={avatarLink}
                  alt={name}
                  className="size-8 rounded-full"
                />
              </div>

              <div className="flex flex-col gap-0.5 p-4">
                <h3 className="truncate font-medium">{name}</h3>
                <p className="text-xs">Setup your profile</p>
              </div>
            </a>

            <DashboardCard
              icon={'💡'}
              title="Learn a new Skill"
              description="Visit our Roadmaps"
              href="/roadmaps"
            />
            <DashboardCard
              icon={'🏗️'}
              title="Practice your skills"
              description="Visit Projects"
              href="/backend/projects"
            />
            <DashboardCard
              icon={'📚'}
              title="Do things right way"
              description="Visit Best Practices"
              href="/best-practices"
            />
          </>
        )}
      </div>

      <ListDashboardProgress
        progresses={learningRoadmapsToShow}
        isLoading={isLoading}
      />

      <RecommendedRoadmaps
        roadmaps={recommendedRoadmaps}
        isLoading={isLoading}
      />

      <ListDashboardCustomProgress
        progresses={customRoadmapsToShow}
        isLoading={isLoading}
      />
      <ListDashboardCustomProgress
        progresses={aiGeneratedRoadmaps}
        isLoading={isLoading}
        isAIGeneratedRoadmaps={true}
      />
    </section>
  );
}

type DashboardCardProps = {
  icon: string | ReactNode;
  title: string;
  description: string;
  href: string;
};

function DashboardCard(props: DashboardCardProps) {
  const { icon, title, description, href } = props;

  return (
    <a
      href={href}
      target="_blank"
      className="flex flex-col overflow-hidden rounded-lg border border-gray-300"
    >
      <div className="border-b border-gray-300 bg-gray-100 px-4 py-2.5">
        <span className="flex size-8 items-center justify-center text-xl">
          {icon}
        </span>
      </div>

      <div className="flex grow flex-col justify-center gap-0.5 bg-white p-4">
        <h3 className="truncate font-medium text-black">{title}</h3>
        <p className="text-xs text-black">{description}</p>
      </div>
    </a>
  );
}

function DashboardCardSkeleton() {
  return (
    <div className="h-[129px] animate-pulse rounded-lg border border-gray-300 bg-white"></div>
  );
}
