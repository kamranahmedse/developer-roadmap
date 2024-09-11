import { type JSXElementConstructor, useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import type { PageType } from '../CommandMenu/CommandMenu';
import { useToast } from '../../hooks/use-toast';
import { getCurrentPeriod } from '../../lib/date';
import { ListDashboardCustomProgress } from './ListDashboardCustomProgress';
import { RecommendedRoadmaps } from './RecommendedRoadmaps';
import { ProgressStack } from './ProgressStack';
import { useStore } from '@nanostores/react';
import { $accountStreak, type StreakResponse } from '../../stores/streak';
import { CheckEmoji } from '../ReactIcons/CheckEmoji.tsx';
import { ConstructionEmoji } from '../ReactIcons/ConstructionEmoji.tsx';
import { BookEmoji } from '../ReactIcons/BookEmoji.tsx';

type UserDashboardResponse = {
  name: string;
  email: string;
  avatar: string;
  headline: string;
  username: string;
  progresses: UserProgress[];
  projects: ProjectStatusDocument[];
  topicDoneToday: number;
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

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [personalDashboardDetails, setPersonalDashboardDetails] =
    useState<UserDashboardResponse>();
  const [projectDetails, setProjectDetails] = useState<PageType[]>([]);
  const accountStreak = useStore($accountStreak);

  const loadAccountStreak = async () => {
    if (accountStreak) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<StreakResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-streak`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load account streak');
      return;
    }

    $accountStreak.set(response);
  };

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
    Promise.allSettled([
      loadProgress(),
      loadAllProjectDetails(),
      loadAccountStreak(),
    ]).finally(() => setIsLoading(false));
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
      ? ['frontend', 'backend', 'devops', 'ai-data-scientist', 'full-stack', 'api-design']
      : relatedRoadmapIds,
  );

  const recommendedRoadmaps = allRoadmapsAndBestPractices.filter((roadmap) =>
    recommendedRoadmapIds.has(roadmap.id),
  );

  const enrichedProjects = personalDashboardDetails?.projects
    .map((project) => {
      const projectDetail = projectDetails.find(
        (page) => page.id === project.projectId,
      );

      return {
        ...project,
        title: projectDetail?.title || 'N/A',
      };
    })
    .sort((a, b) => {
      if (a.repositoryUrl && !b.repositoryUrl) {
        return 1;
      }

      if (!a.repositoryUrl && b.repositoryUrl) {
        return -1;
      }

      return 0;
    });

  return (
    <section>
      {isLoading ? (
        <div className="h-7 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
      ) : (
        <h2 className="text-lg font-medium">
          Hi {name}, good {getCurrentPeriod()}!
        </h2>
      )}

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
        {isLoading ? (
          <>
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </>
        ) : (
          <>
            <DashboardCard
              imgUrl={avatarLink}
              title={name!}
              description="Setup your profile"
              href="/account/update-profile"
            />

            <DashboardCard
              icon={BookEmoji}
              title="Visit Roadmaps"
              description="Learn new skills"
              href="/roadmaps"
            />

            <DashboardCard
              icon={ConstructionEmoji}
              title="Build Projects"
              description="Practice what you learn"
              href="/backend/projects"
            />
            <DashboardCard
              icon={CheckEmoji}
              title="Best Practices"
              description="Do things right way"
              href="/best-practices"
            />
          </>
        )}
      </div>

      <ProgressStack
        progresses={learningRoadmapsToShow}
        projects={enrichedProjects || []}
        isLoading={isLoading}
        accountStreak={accountStreak}
        topicDoneToday={personalDashboardDetails?.topicDoneToday || 0}
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

      <RecommendedRoadmaps
        roadmaps={recommendedRoadmaps}
        isLoading={isLoading}
      />
    </section>
  );
}

type DashboardCardProps = {
  icon?: JSXElementConstructor<any>;
  imgUrl?: string;
  title: string;
  description: string;
  href: string;
};

function DashboardCard(props: DashboardCardProps) {
  const { icon: Icon, imgUrl, title, description, href } = props;

  return (
    <a
      href={href}
      target="_blank"
      className="flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
    >
      {Icon && (
        <div className="px-4 pb-3 pt-4">
          <Icon className="size-6" />
        </div>
      )}

      {imgUrl && (
        <div className="px-4 pb-1.5 pt-3.5">
          <img src={imgUrl} alt={title} className="size-8 rounded-full" />
        </div>
      )}

      <div className="flex grow flex-col justify-center gap-0.5 p-4">
        <h3 className="truncate font-medium text-black">{title}</h3>
        <p className="text-xs text-black">{description}</p>
      </div>
    </a>
  );
}

function DashboardCardSkeleton() {
  return (
    <div className="h-[128px] animate-pulse rounded-lg border border-gray-300 bg-white"></div>
  );
}
