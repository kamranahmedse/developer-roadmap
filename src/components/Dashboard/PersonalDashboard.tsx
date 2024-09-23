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
import { DashboardAiRoadmaps } from './DashboardAiRoadmaps.tsx';
import type { AllowedProfileVisibility } from '../../api/user.ts';
import { PencilIcon, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname.ts';

type UserDashboardResponse = {
  name: string;
  email: string;
  avatar: string;
  headline: string;
  username: string;
  profileVisibility: AllowedProfileVisibility;
  progresses: UserProgress[];
  projects: ProjectStatusDocument[];
  aiRoadmaps: {
    id: string;
    title: string;
    slug: string;
  }[];
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

  const aiGeneratedRoadmaps = personalDashboardDetails?.aiRoadmaps || [];
  const customRoadmaps = (personalDashboardDetails?.progresses || [])
    .filter((progress) => progress.isCustomResource)
    .sort((a, b) => {
      const updatedAtA = new Date(a.updatedAt);
      const updatedAtB = new Date(b.updatedAt);
      return updatedAtB.getTime() - updatedAtA.getTime();
    });

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
    // take the ones that user is learning
    .filter((roadmap) =>
      learningRoadmapsToShow?.some(
        (learningRoadmap) => learningRoadmap.resourceId === roadmap.id,
      ),
    )
    .flatMap((roadmap) => roadmap.relatedRoadmapIds)
    // remove the ones that user is already learning or has bookmarked
    .filter(
      (roadmapId) =>
        !learningRoadmapsToShow.some((lr) => lr.resourceId === roadmapId),
    );

  const recommendedRoadmapIds = new Set(
    relatedRoadmapIds.length === 0
      ? [
          'frontend',
          'backend',
          'devops',
          'ai-data-scientist',
          'full-stack',
          'api-design',
        ]
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

  const { username } = personalDashboardDetails || {};

  return (
    <section>
      {isLoading ? (
        <div className="h-7 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
      ) : (
        <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
          <h2 className="text-lg font-medium">
            Hi {name}, good {getCurrentPeriod()}!
          </h2>
          <a
            href="/home"
            className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-300 hover:text-black"
          >
            Visit Homepage
          </a>
        </div>
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
              description={
                username ? 'View your profile' : 'Setup your profile'
              }
              href={username ? `/u/${username}` : '/account/update-profile'}
              {...(username && {
                externalLinkIcon: PencilIcon,
                externalLinkHref: '/account/update-profile',
                externalLinkText: 'Edit',
              })}
              className={
                !username
                  ? 'border-dashed border-gray-500 bg-gray-100 hover:border-gray-500 hover:bg-gray-200'
                  : ''
              }
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
              href="/projects"
            />
            <DashboardCard
              icon={CheckEmoji}
              title="Best Practices"
              description="Do things the right way"
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
        progresses={customRoadmaps}
        isLoading={isLoading}
      />

      <DashboardAiRoadmaps
        roadmaps={aiGeneratedRoadmaps}
        isLoading={isLoading}
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
  externalLinkIcon?: LucideIcon;
  externalLinkText?: string;
  externalLinkHref?: string;
  className?: string;
};

function DashboardCard(props: DashboardCardProps) {
  const {
    icon: Icon,
    imgUrl,
    title,
    description,
    href,
    externalLinkHref,
    externalLinkIcon: ExternalLinkIcon,
    externalLinkText,
    className,
  } = props;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50',
        className,
      )}
    >
      <a href={href} className="flex flex-col">
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

      {externalLinkHref && (
        <a
          href={externalLinkHref}
          className="absolute right-0 top-0 flex items-center gap-1.5 rounded-bl-md bg-gray-200 p-1 px-2 text-sm text-gray-600 hover:bg-gray-300 hover:text-black"
        >
          {ExternalLinkIcon && <ExternalLinkIcon className="size-3" />}
          {externalLinkText}
        </a>
      )}
    </div>
  );
}

function DashboardCardSkeleton() {
  return (
    <div className="h-[128px] animate-pulse rounded-lg border border-gray-300 bg-white"></div>
  );
}
