import {
  ArrowUpRight,
  Bookmark,
  Check,
  CheckCircle,
  CheckIcon,
  CircleCheck,
  CircleDashed,
} from 'lucide-react';
import { ResourceProgress } from '../Activity/ResourceProgress';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { getPercentage } from '../../helper/number';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { DashboardBookmarkCard } from './DashboardBookmarkCard';
import { DashboardProjectCard } from './DashboardProjectCard';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { DashboardProgressCard } from './DashboardProgressCard';

type ProgressStackProps = {
  progresses: UserProgress[];
  projects: (ProjectStatusDocument & {
    title: string;
  })[];
  isLoading: boolean;
};

const MAX_PROGRESS_TO_SHOW = 5;
const MAX_PROJECTS_TO_SHOW = 8;
const MAX_BOOKMARKS_TO_SHOW = 8;

export function ProgressStack(props: ProgressStackProps) {
  const { progresses, projects, isLoading } = props;

  const bookmarkedProgresses = progresses.filter(
    (progress) =>
      progress?.isFavorite &&
      progress?.done === 0 &&
      progress?.learning === 0 &&
      progress?.skipped === 0,
  );

  const userProgresses = progresses.filter((progress) => !progress?.isFavorite);

  const [showAllProgresses, setShowAllProgresses] = useState(false);
  const userProgressesToShow = showAllProgresses
    ? userProgresses
    : userProgresses.slice(0, MAX_PROGRESS_TO_SHOW);

  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsToShow = showAllProjects
    ? projects
    : projects.slice(0, MAX_PROJECTS_TO_SHOW);

  const [showAllBookmarks, setShowAllBookmarks] = useState(false);
  const bookmarksToShow = showAllBookmarks
    ? bookmarkedProgresses
    : bookmarkedProgresses.slice(0, MAX_BOOKMARKS_TO_SHOW);

  return (
    <div className="mt-2 grid min-h-[330px] grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      <div className="h-full rounded-md border bg-white p-4 shadow-sm">
        <h3 className="text-xs uppercase text-gray-500">Your Progress</h3>

        <div className="mt-4 flex flex-col gap-2">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              {userProgressesToShow.map((progress) => {
                return (
                  <DashboardProgressCard
                    key={progress.resourceId}
                    progress={progress}
                  />
                );
              })}
            </>
          )}
        </div>

        {userProgresses.length > MAX_PROGRESS_TO_SHOW && (
          <ShowAllButton
            showAll={showAllProgresses}
            setShowAll={setShowAllProgresses}
            count={userProgresses.length}
            maxCount={MAX_PROGRESS_TO_SHOW}
            className="mt-3"
          />
        )}
      </div>

      <div className="h-full rounded-md border bg-white p-4 shadow-sm">
        <h3 className="text-xs uppercase text-gray-500">Projects</h3>

        <div className="mt-4 flex flex-col gap-2.5">
          {isLoading ? (
            <>
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
            </>
          ) : (
            <>
              {projectsToShow.map((project) => {
                return (
                  <DashboardProjectCard
                    key={project.projectId}
                    project={project}
                  />
                );
              })}
            </>
          )}
        </div>

        {projects.length > MAX_PROJECTS_TO_SHOW && (
          <ShowAllButton
            showAll={showAllProjects}
            setShowAll={setShowAllProjects}
            count={projects.length}
            maxCount={MAX_PROJECTS_TO_SHOW}
            className="mt-3"
          />
        )}
      </div>

      <div className="h-full rounded-md border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs uppercase text-gray-500">Bookmarks</h3>

          <a
            href="/roadmaps"
            className="flex items-center gap-1 text-xs text-gray-500"
          >
            <ArrowUpRight size={12} />
            Explore
          </a>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {isLoading ? (
            <>
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
              <CardSkeleton className="h-5" />
            </>
          ) : (
            <>
              {bookmarksToShow.map((progress) => {
                return (
                  <DashboardBookmarkCard
                    key={progress.resourceId}
                    bookmark={progress}
                  />
                );
              })}
            </>
          )}
        </div>

        {bookmarkedProgresses.length > MAX_BOOKMARKS_TO_SHOW && (
          <ShowAllButton
            showAll={showAllBookmarks}
            setShowAll={setShowAllBookmarks}
            count={bookmarkedProgresses.length}
            maxCount={MAX_BOOKMARKS_TO_SHOW}
            className="mt-3"
          />
        )}
      </div>
    </div>
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
        'h-10 w-full animate-pulse rounded-md bg-gray-100',
        className,
      )}
    />
  );
}
