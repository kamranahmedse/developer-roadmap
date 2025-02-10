import {
  FolderKanban,
  MapIcon,
  Plus,
  Sparkle,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  CircleDashed,
  Circle,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { ResourceType } from '../../lib/resource-progress.ts';
import { CreateRoadmapButton } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapButton.tsx';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite.tsx';
import { CheckIcon } from '../ReactIcons/CheckIcon.tsx';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import type { UserProgress } from '../TeamProgress/TeamProgressPage.tsx';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions.tsx';
import { getRelativeTimeString } from '../../lib/date';
import { useState } from 'react';
import { cn } from '../../lib/classname.ts';

export type AIRoadmapType = {
  id: string;
  title: string;
  slug: string;
};

type ProgressRoadmapProps = {
  url: string;
  percentageDone: number;
  allowFavorite?: boolean;

  resourceId: string;
  resourceType: ResourceType;
  resourceTitle: string;
  isFavorite?: boolean;

  isTrackable?: boolean;
  isNew?: boolean;
};

export function HeroRoadmap(props: ProgressRoadmapProps) {
  const {
    url,
    percentageDone,
    resourceType,
    resourceId,
    resourceTitle,
    isFavorite,
    allowFavorite = true,
    isTrackable = true,
    isNew = false,
  } = props;

  return (
    <a
      href={url}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-md border p-3 text-sm text-slate-400 hover:text-slate-300',
        {
          'border-slate-800 bg-slate-900 hover:border-slate-600': isTrackable,
          'border-slate-700/50 bg-slate-800/50 hover:border-slate-600/70':
            !isTrackable,
        },
      )}
    >
      <span title={resourceTitle} className="relative z-20 truncate">
        {resourceTitle}
      </span>

      {isTrackable && (
        <span
          className="absolute bottom-0 left-0 top-0 z-10 bg-[#172a3a]"
          style={{ width: `${percentageDone}%` }}
        ></span>
      )}

      {allowFavorite && (
        <MarkFavorite
          resourceId={resourceId}
          resourceType={resourceType}
          favorite={isFavorite}
        />
      )}

      {isNew && (
        <span className="absolute bottom-1.5 right-2 flex items-center rounded-br rounded-tl text-xs font-medium text-purple-300">
          <span className="mr-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
          </span>
          New
        </span>
      )}
    </a>
  );
}

type HeroTitleProps = {
  icon: any;
  isLoading?: boolean;
  title: string | ReactNode;
  rightContent?: ReactNode;
};

function HeroTitle(props: HeroTitleProps) {
  const { isLoading = false, title, icon, rightContent } = props;

  return (
    <div className="flex items-center justify-between">
      <p className="flex items-center text-sm text-gray-400">
        {!isLoading && icon}
        {isLoading && (
          <span className="mr-1.5">
            <Spinner />
          </span>
        )}
        {title}
      </p>
      <div>{rightContent}</div>
    </div>
  );
}

type FavoriteRoadmapsProps = {
  progress: UserProgress[];
  projects: (ProjectStatusDocument & {
    title: string;
  })[];
  customRoadmaps: UserProgress[];
  aiRoadmaps: AIRoadmapType[];
  isLoading: boolean;
  isAllCollapsed: boolean;
};

type HeroProjectProps = {
  project: ProjectStatusDocument & {
    title: string;
  };
};

export function HeroProject({ project }: HeroProjectProps) {
  return (
    <a
      href={`/projects/${project.projectId}`}
      className="group relative flex flex-col justify-between gap-2 rounded-md border border-slate-800 bg-slate-900 p-3.5 hover:border-slate-600"
    >
      <div className="relative z-10 flex items-start justify-between gap-2">
        <h3 className="truncate font-medium text-slate-300 group-hover:text-slate-100">
          {project.title}
        </h3>
        <span
          className={cn(
            'absolute -right-2 -top-2 flex flex-shrink-0 items-center gap-1 rounded-full text-xs uppercase tracking-wide',
            {
              'text-green-600/50': project.submittedAt && project.repositoryUrl,
              'text-yellow-600': !project.submittedAt || !project.repositoryUrl,
            },
          )}
        >
          {project.submittedAt && project.repositoryUrl ? 'Done' : ''}
        </span>
      </div>
      <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
        {project.submittedAt && project.repositoryUrl && (
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            {project.upvotes}
          </span>
        )}
        {project.startedAt && (
          <span>Started {getRelativeTimeString(project.startedAt)}</span>
        )}
      </div>

      <div className="absolute inset-0 rounded-md bg-gradient-to-br from-slate-800/50 via-transparent to-transparent" />
      {project.submittedAt && project.repositoryUrl && (
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-green-950/20 via-transparent to-transparent" />
      )}
    </a>
  );
}

export function FavoriteRoadmaps(props: FavoriteRoadmapsProps) {
  const { progress, isLoading, customRoadmaps, aiRoadmaps, projects, isAllCollapsed } = props;
  const [showCompleted, setShowCompleted] = useState(false);

  const completedProjects = projects.filter(
    (project) => project.submittedAt && project.repositoryUrl,
  );
  const inProgressProjects = projects.filter(
    (project) => !project.submittedAt || !project.repositoryUrl,
  );

  const projectsToShow = [
    ...inProgressProjects,
    ...(showCompleted ? completedProjects : []),
  ];

  return (
    <div className="flex flex-col">
      <div className={cn("", {
        "border-b border-b-slate-800/70 pt-5 pb-5": !isAllCollapsed,
        "py-2": isAllCollapsed
      })}>
        <div className="container">
          <HeroTitle
            icon={
              (
                <CheckIcon additionalClasses="mr-1.5 h-[14px] w-[14px]" />
              ) as any
            }
            isLoading={isLoading}
            title="Your progress and bookmarks"
          />
          {!isLoading && progress.length > 0 && !isAllCollapsed && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 mt-3">
              {progress.map((resource) => (
                <HeroRoadmap
                  key={`${resource.resourceType}-${resource.resourceId}`}
                  resourceId={resource.resourceId}
                  resourceType={resource.resourceType}
                  resourceTitle={resource.resourceTitle}
                  isFavorite={resource.isFavorite}
                  percentageDone={
                    ((resource.skipped + resource.done) / resource.total) * 100
                  }
                  url={
                    resource.resourceType === 'roadmap'
                      ? `/${resource.resourceId}`
                      : `/best-practices/${resource.resourceId}`
                  }
                />
              ))}
              <CreateRoadmapButton />
            </div>
          )}
        </div>
      </div>

      <div className={cn("", {
        "border-b border-b-slate-800/70 pt-5 pb-5": !isAllCollapsed,
        "py-2": isAllCollapsed
      })}>
        <div className="container">
          <HeroTitle
            icon={(<MapIcon className="mr-1.5 h-[14px] w-[14px]" />) as any}
            isLoading={isLoading}
            title="Your custom roadmaps"
          />
          {!isLoading && customRoadmaps.length > 0 && !isAllCollapsed && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 mt-3">
              {customRoadmaps.map((customRoadmap) => (
                <HeroRoadmap
                  key={customRoadmap.resourceId}
                  resourceId={customRoadmap.resourceId}
                  resourceType={'roadmap'}
                  resourceTitle={customRoadmap.resourceTitle}
                  percentageDone={
                    ((customRoadmap.skipped + customRoadmap.done) /
                      customRoadmap.total) *
                    100
                  }
                  url={`/r/${customRoadmap?.roadmapSlug}`}
                  allowFavorite={false}
                />
              ))}
              <CreateRoadmapButton />
            </div>
          )}
        </div>
      </div>

      <div className={cn("", {
        "border-b border-b-slate-800/70 pt-5 pb-5": !isAllCollapsed,
        "py-2": isAllCollapsed
      })}>
        <div className="container">
          <HeroTitle
            icon={(<Sparkle className="mr-1.5 h-[14px] w-[14px]" />) as any}
            isLoading={isLoading}
            title="Your AI roadmaps"
          />
          {!isLoading && aiRoadmaps.length > 0 && !isAllCollapsed && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 mt-3">
              {aiRoadmaps.map((aiRoadmap) => (
                <HeroRoadmap
                  key={aiRoadmap.id}
                  resourceId={aiRoadmap.id}
                  resourceType={'roadmap'}
                  resourceTitle={aiRoadmap.title}
                  url={`/ai/${aiRoadmap.slug}`}
                  percentageDone={0}
                  allowFavorite={false}
                  isTrackable={false}
                />
              ))}

              <a
                href="/ai"
                className={
                  'flex h-full w-full items-center justify-center gap-1 overflow-hidden rounded-md border border-dashed border-gray-800 p-3 text-sm text-gray-400 hover:border-gray-600 hover:bg-gray-900 hover:text-gray-300'
                }
              >
                <Plus size={16} />
                Generate New
              </a>
            </div>
          )}
        </div>
      </div>

      <div className={cn("", {
        "border-b border-b-slate-800/70 pt-5 pb-5": !isAllCollapsed,
        "py-2": isAllCollapsed
      })}>
        <div className="container">
          <HeroTitle
            icon={
              (<FolderKanban className="mr-1.5 h-[14px] w-[14px]" />) as any
            }
            isLoading={isLoading}
            title="Your active projects"
            rightContent={
              completedProjects.length > 0 && (
                <button
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-slate-400 hover:text-slate-300"
                >
                  {showCompleted ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                  {completedProjects.length} Completed
                </button>
              )
            }
          />
          {!isLoading && projectsToShow.length > 0 && !isAllCollapsed && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 mt-3">
              {projectsToShow.map((project) => (
                <HeroProject key={project._id} project={project} />
              ))}

              <a
                href="/projects"
                className="flex min-h-[80px] items-center justify-center gap-2 rounded-md border border-dashed border-slate-800 p-4 text-sm text-slate-400 hover:border-slate-600 hover:bg-slate-900/50 hover:text-slate-300"
              >
                <Plus size={16} />
                Start a new project
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
