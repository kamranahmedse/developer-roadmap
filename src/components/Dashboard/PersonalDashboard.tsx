import { useStore } from '@nanostores/react';
import {
  CheckCircle,
  ChevronsDownUp,
  ChevronsUpDown,
  FolderGit2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AllowedProfileVisibility } from '../../api/user.ts';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/classname.ts';
import { httpGet } from '../../lib/http';
import type { AllowedRoadmapRenderer } from '../../lib/roadmap.ts';
import { $accountStreak, type StreakResponse } from '../../stores/streak';
import type { PageType } from '../CommandMenu/CommandMenu';
import {
  FavoriteRoadmaps,
  type AIRoadmapType,
} from '../HeroSection/FavoriteRoadmaps.tsx';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { HeroRoadmap } from '../HeroSection/HeroRoadmap.tsx';

type UserDashboardResponse = {
  name: string;
  email: string;
  avatar: string;
  headline: string;
  username: string;
  profileVisibility: AllowedProfileVisibility;
  progresses: UserProgress[];
  projects: ProjectStatusDocument[];
  aiRoadmaps: AIRoadmapType[];
  topicDoneToday: number;
};

export type BuiltInRoadmap = {
  id: string;
  url: string;
  title: string;
  description: string;
  isFavorite?: boolean;
  isNew?: boolean;
  relatedRoadmapIds?: string[];
  renderer?: AllowedRoadmapRenderer;
  metadata?: Record<string, any>;
};

type PersonalDashboardProps = {
  builtInRoleRoadmaps?: BuiltInRoadmap[];
  builtInSkillRoadmaps?: BuiltInRoadmap[];
  builtInBestPractices?: BuiltInRoadmap[];
};

type DashboardStatsProps = {
  accountStreak?: StreakResponse;
  topicsDoneToday?: number;
  finishedProjectsCount?: number;
  isLoading: boolean;
  isAllCollapsed: boolean;
  onToggleCollapseAll: () => void;
};

type DashboardStatItemProps = {
  icon: LucideIcon;
  iconClassName: string;
  value: number;
  label: string;
  isLoading: boolean;
};

function DashboardStatItem(props: DashboardStatItemProps) {
  const { icon: Icon, iconClassName, value, label, isLoading } = props;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-lg bg-slate-800/50 py-2 pl-3 pr-3',
        {
          'striped-loader-slate striped-loader-slate-fast text-transparent':
            isLoading,
        },
      )}
    >
      <Icon
        size={16}
        className={cn(iconClassName, { 'text-transparent': isLoading })}
      />
      <span>
        <span className="tabular-nums">{value}</span> {label}
      </span>
    </div>
  );
}

function DashboardStats(props: DashboardStatsProps) {
  const {
    accountStreak,
    topicsDoneToday = 0,
    finishedProjectsCount = 0,
    isLoading,
    onToggleCollapseAll,
    isAllCollapsed,
  } = props;

  return (
    <div className="container mb-3 flex items-center justify-between gap-2 pb-2 pt-6 text-sm text-slate-400">
      <div className="flex items-center gap-2">
        <DashboardStatItem
          icon={Zap}
          iconClassName="text-yellow-500"
          value={accountStreak?.count || 0}
          label="day streak"
          isLoading={isLoading}
        />
        <DashboardStatItem
          icon={CheckCircle}
          iconClassName="text-green-500"
          value={topicsDoneToday}
          label="topics done today"
          isLoading={isLoading}
        />
        <DashboardStatItem
          icon={FolderGit2}
          iconClassName="text-blue-500"
          value={finishedProjectsCount}
          label="projects finished"
          isLoading={isLoading}
        />
      </div>

      <button
        className="flex items-center gap-1 rounded-lg border border-transparent py-1.5 pl-3 pr-3 text-xs uppercase tracking-wide text-slate-400 hover:border-slate-800 hover:bg-slate-800"
        onClick={onToggleCollapseAll}
      >
        {isAllCollapsed ? (
          <>
            <ChevronsUpDown className="size-3" />
            <span>Expand All</span>
          </>
        ) : (
          <>
            <ChevronsDownUp className="size-3" />
            <span>Collapse All</span>
          </>
        )}
      </button>
    </div>
  );
}

export function PersonalDashboard(props: PersonalDashboardProps) {
  const {
    builtInRoleRoadmaps = [],
    builtInBestPractices = [],
    builtInSkillRoadmaps = [],
  } = props;

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isAllCollapsed, setIsAllCollapsed] = useState(false);
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

  const learningRoadmapsToShow: UserProgress[] = (
    personalDashboardDetails?.progresses || []
  )
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

  const customRoadmaps: UserProgress[] = (
    personalDashboardDetails?.progresses || []
  )
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
    <div>
      <DashboardStats
        isLoading={isLoading}
        accountStreak={accountStreak}
        topicsDoneToday={personalDashboardDetails?.topicDoneToday}
        onToggleCollapseAll={() => {
          setIsAllCollapsed(!isAllCollapsed);
        }}
        isAllCollapsed={isAllCollapsed}
        finishedProjectsCount={
          enrichedProjects?.filter((p) => p.submittedAt && p.repositoryUrl)
            .length
        }
      />

      <FavoriteRoadmaps
        progress={learningRoadmapsToShow}
        customRoadmaps={customRoadmaps}
        aiRoadmaps={aiGeneratedRoadmaps}
        projects={enrichedProjects || []}
        isLoading={isLoading}
        isAllCollapsed={isAllCollapsed}
      />

      <div className="relative mt-6 border-t border-t-[#1e293c] pt-12">
        <div className="container">
          <h2 className="text-md font-regular absolute -top-[17px] flex rounded-lg border border-[#1e293c] bg-slate-900 px-3 py-1 text-slate-400 sm:left-1/2 sm:-translate-x-1/2">
            Role Based Roadmaps
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {builtInRoleRoadmaps.map((roadmap) => {
              const roadmapProgress = learningRoadmapsToShow.find(
                (lr) => lr.resourceId === roadmap.id,
              );

              const percentageDone =
                (((roadmapProgress?.skipped || 0) +
                  (roadmapProgress?.done || 0)) /
                  (roadmapProgress?.total || 1)) *
                100;

              return (
                <HeroRoadmap
                  key={roadmap.id}
                  resourceId={roadmap.id}
                  resourceType="roadmap"
                  resourceTitle={roadmap.title}
                  isFavorite={roadmap.isFavorite}
                  percentageDone={percentageDone}
                  isNew={roadmap.isNew}
                  url={`/${roadmap.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative mt-12 border-t border-t-[#1e293c] pt-12">
        <div className="container">
          <h2 className="text-md font-regular absolute -top-[17px] flex rounded-lg border border-[#1e293c] bg-slate-900 px-3 py-1 text-slate-400 sm:left-1/2 sm:-translate-x-1/2">
            Skill Based Roadmaps
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {builtInSkillRoadmaps.map((roadmap) => {
              const roadmapProgress = learningRoadmapsToShow.find(
                (lr) => lr.resourceId === roadmap.id,
              );

              const percentageDone =
                (((roadmapProgress?.skipped || 0) +
                  (roadmapProgress?.done || 0)) /
                  (roadmapProgress?.total || 1)) *
                100;

              return (
                <HeroRoadmap
                  key={roadmap.id}
                  resourceId={roadmap.id}
                  resourceType="roadmap"
                  resourceTitle={roadmap.title}
                  isFavorite={roadmap.isFavorite}
                  percentageDone={percentageDone}
                  isNew={roadmap.isNew}
                  url={`/${roadmap.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative mt-12 border-t border-t-[#1e293c] pt-12">
        <div className="container">
          <h2 className="text-md font-regular absolute -top-[17px] flex rounded-lg border border-[#1e293c] bg-slate-900 px-3 py-1 text-slate-400 sm:left-1/2 sm:-translate-x-1/2">
            Best Practices
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {builtInBestPractices.map((roadmap) => {
              const roadmapProgress = learningRoadmapsToShow.find(
                (lr) => lr.resourceId === roadmap.id,
              );

              const percentageDone =
                (((roadmapProgress?.skipped || 0) +
                  (roadmapProgress?.done || 0)) /
                  (roadmapProgress?.total || 1)) *
                100;

              return (
                <HeroRoadmap
                  key={roadmap.id}
                  resourceId={roadmap.id}
                  resourceType="best-practice"
                  resourceTitle={roadmap.title}
                  isFavorite={roadmap.isFavorite}
                  percentageDone={percentageDone}
                  isNew={roadmap.isNew}
                  url={`/best-practices/${roadmap.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
