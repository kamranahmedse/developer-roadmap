import {
  ArrowUpRight,
  Bookmark,
  FolderKanban,
  type LucideIcon,
  Map,
} from 'lucide-react';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { DashboardBookmarkCard } from './DashboardBookmarkCard';
import { DashboardProjectCard } from './DashboardProjectCard';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { DashboardProgressCard } from './DashboardProgressCard';
import { useStore } from '@nanostores/react';
import { $accountStreak, type StreakResponse } from '../../stores/streak';
import { EmptyStackMessage } from './EmptyStackMessage.tsx';

type ProgressStackProps = {
  progresses: UserProgress[];
  projects: (ProjectStatusDocument & {
    title: string;
  })[];
  accountStreak?: StreakResponse;
  isLoading: boolean;
  topicDoneToday: number;
};

const MAX_PROGRESS_TO_SHOW = 11;
const MAX_PROJECTS_TO_SHOW = 8;

type ProgressLaneProps = {
  title: string;
  linkText?: string;
  linkHref?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  loadingWrapperClassName?: string;
  loadingSkeletonCount?: number;
  loadingSkeletonClassName?: string;
  children: React.ReactNode;
  emptyMessage?: string;
  emptyIcon?: LucideIcon;
  emptyLinkText?: string;
  emptyLinkHref?: string;
  className?: string;
};

function ProgressLane(props: ProgressLaneProps) {
  const {
    title,
    linkText,
    linkHref,
    isLoading = false,
    loadingWrapperClassName = '',
    loadingSkeletonCount = 4,
    loadingSkeletonClassName = '',
    children,
    isEmpty = false,
    emptyIcon: EmptyIcon = Map,
    emptyMessage = `No ${title.toLowerCase()} to show`,
    emptyLinkHref = '/roadmaps',
    emptyLinkText = 'Explore',
    className,
  } = props;

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-md border bg-white px-4 py-3 shadow-sm',
        className,
      )}
    >
      {isLoading && (
        <div className={'flex flex-row justify-between'}>
          <div className="h-[16px] w-[75px] animate-pulse rounded-md bg-gray-100"></div>
        </div>
      )}
      {!isLoading && !isEmpty && (
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs uppercase text-gray-500">{title}</h3>

          {linkText && linkHref && (
            <a
              href={linkHref}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-black"
            >
              <ArrowUpRight size={12} />
              {linkText}
            </a>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-grow flex-col gap-1.5">
        {isLoading && (
          <div
            className={cn('grid grid-cols-2 gap-2', loadingWrapperClassName)}
          >
            {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
              <CardSkeleton key={index} className={loadingSkeletonClassName} />
            ))}
          </div>
        )}
        {!isLoading && children}

        {!isLoading && isEmpty && (
          <div className="flex flex-grow flex-col items-center justify-center text-gray-500">
            <EmptyIcon
              size={37}
              strokeWidth={1.5}
              className={'mb-3 text-gray-200'}
            />
            <span className="mb-0.5 text-sm">{emptyMessage}</span>
            <a
              href={emptyLinkHref}
              className="text-xs font-medium text-gray-600 underline-offset-2 hover:underline"
            >
              {emptyLinkText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProgressStack(props: ProgressStackProps) {
  const { progresses, projects, isLoading, accountStreak, topicDoneToday } =
    props;

  const [showAllProgresses, setShowAllProgresses] = useState(false);
  const sortedProgresses = progresses.sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) {
      return 1;
    }

    if (!a.isFavorite && b.isFavorite) {
      return -1;
    }

    return 0;
  });
  const userProgressesToShow = showAllProgresses
    ? sortedProgresses
    : sortedProgresses.slice(0, MAX_PROGRESS_TO_SHOW);

  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsToShow = showAllProjects
    ? projects
    : projects.slice(0, MAX_PROJECTS_TO_SHOW);

  const totalProjectFinished = projects.filter(
    (project) => project.repositoryUrl,
  ).length;

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <StatsCard
          title="Current Streak"
          value={accountStreak?.count || 0}
          isLoading={isLoading}
        />
        <StatsCard
          title="Topics Done Today"
          value={topicDoneToday}
          isLoading={isLoading}
        />
        <StatsCard
          title="Projects Finished"
          value={totalProjectFinished}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-2 grid min-h-[330px] grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <div className="relative col-span-2">
          {!isLoading && userProgressesToShow.length === 0 && (
            <EmptyStackMessage
              number={1}
              title={'Bookmark some Roadmaps'}
              description={
                'Bookmark some roadmaps to access them quickly and start updating your progress'
              }
              buttonText={'Explore Roadmaps'}
              buttonLink={'/roadmaps'}
              bodyClassName="max-w-[280px]"
            />
          )}

          <ProgressLane
            title="Progress & Bookmarks"
            isLoading={isLoading}
            loadingSkeletonCount={MAX_PROGRESS_TO_SHOW}
            linkHref="/roadmaps"
            linkText="Roadmaps"
            isEmpty={userProgressesToShow.length === 0}
            emptyIcon={Bookmark}
            emptyMessage={'No bookmarks to show'}
            emptyLinkHref={'/roadmaps'}
            emptyLinkText={'Explore Roadmaps'}
          >
            <div className="grid flex-grow grid-cols-2 items-start gap-2">
              {userProgressesToShow.length > 0 && (
                <>
                  {userProgressesToShow.map((progress) => {
                    const isFavorite =
                      progress.isFavorite &&
                      !progress.done &&
                      !progress.skipped;

                    if (isFavorite) {
                      return (
                        <DashboardBookmarkCard
                          key={progress.resourceId}
                          bookmark={progress}
                        />
                      );
                    }

                    return (
                      <DashboardProgressCard
                        key={progress.resourceId}
                        progress={progress}
                      />
                    );
                  })}
                </>
              )}

              {sortedProgresses.length > MAX_PROGRESS_TO_SHOW && (
                <ShowAllButton
                  showAll={showAllProgresses}
                  setShowAll={setShowAllProgresses}
                  count={sortedProgresses.length}
                  maxCount={MAX_PROGRESS_TO_SHOW}
                  className="min-h-[38px] rounded-md border border-dashed leading-none"
                />
              )}
            </div>

            <a
              href={'/home'}
              className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-gray-200 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black transition-colors"
            >
              <Map size={16} />
              View All Roadmaps
            </a>
          </ProgressLane>
        </div>

        <div className="relative">
          <ProgressLane
            title={'Projects'}
            linkHref={'/projects'}
            linkText={'Projects'}
            isLoading={isLoading}
            loadingWrapperClassName="grid-cols-1"
            loadingSkeletonClassName={'h-5'}
            loadingSkeletonCount={8}
            isEmpty={projectsToShow.length === 0}
            emptyMessage={'No projects started'}
            emptyIcon={FolderKanban}
            emptyLinkText={'Explore Projects'}
            emptyLinkHref={'/projects'}
          >
            {!isLoading && projectsToShow.length === 0 && (
              <EmptyStackMessage
                number={2}
                title={'Build your first project'}
                description={'Pick a project to practice and start building'}
                buttonText={'Explore Projects'}
                buttonLink={'/projects'}
              />
            )}

            {projectsToShow.map((project) => {
              return (
                <DashboardProjectCard
                  key={project.projectId}
                  project={project}
                />
              );
            })}

            {projects.length > MAX_PROJECTS_TO_SHOW && (
              <ShowAllButton
                showAll={showAllProjects}
                setShowAll={setShowAllProjects}
                count={projects.length}
                maxCount={MAX_PROJECTS_TO_SHOW}
                className="mb-0.5 mt-3"
              />
            )}
          </ProgressLane>
        </div>
      </div>
    </>
  );
}

type ShowAllButtonProps = {
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
  count: number;
  maxCount: number;
  className?: string;
};

function ShowAllButton(props: ShowAllButtonProps) {
  const { showAll, setShowAll, count, maxCount, className } = props;

  return (
    <button
      className={cn(
        'flex w-full items-center justify-center text-sm text-gray-500 hover:text-gray-700',
        className,
      )}
      onClick={() => setShowAll(!showAll)}
    >
      {!showAll ? <>+ show {count - maxCount} more</> : <>- show less</>}
    </button>
  );
}

type CardSkeletonProps = {
  className?: string;
};

function CardSkeleton(props: CardSkeletonProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        'h-[38px] w-full animate-pulse rounded-md bg-gray-100',
        className,
      )}
    />
  );
}

type StatsCardProps = {
  title: string;
  value: number;
  isLoading?: boolean;
};

function StatsCard(props: StatsCardProps) {
  const { title, value, isLoading = false } = props;

  return (
    <div className="flex flex-col gap-1 rounded-md border bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-xs uppercase text-gray-500">{title}</h3>
      {isLoading ? (
        <CardSkeleton className="h-8" />
      ) : (
        <span className="text-2xl font-medium text-black">{value}</span>
      )}
    </div>
  );
}
