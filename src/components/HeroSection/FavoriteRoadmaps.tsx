import {
  FolderKanban,
  MapIcon,
  Plus,
  Sparkle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/classname.ts';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions.tsx';
import { CheckIcon } from '../ReactIcons/CheckIcon.tsx';
import type { UserProgress } from '../TeamProgress/TeamProgressPage.tsx';
import { HeroProject } from './HeroProject';
import { HeroRoadmap } from './HeroRoadmap';
import { HeroTitle } from './HeroTitle';
import { CreateRoadmapButton } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapButton.tsx';

export type AIRoadmapType = {
  id: string;
  title: string;
  slug: string;
};

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

export function FavoriteRoadmaps(props: FavoriteRoadmapsProps) {
  const {
    progress,
    isLoading,
    customRoadmaps,
    aiRoadmaps,
    projects,
    isAllCollapsed,
  } = props;
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
      <div
        className={cn('', {
          'border-b border-b-slate-800/70 pb-5 pt-5': !isAllCollapsed,
          'py-2': isAllCollapsed,
        })}
      >
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
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
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

      <div
        className={cn('', {
          'border-b border-b-slate-800/70 pb-5 pt-5': !isAllCollapsed,
          'py-2': isAllCollapsed,
        })}
      >
        <div className="container">
          <HeroTitle
            icon={(<MapIcon className="mr-1.5 h-[14px] w-[14px]" />) as any}
            isLoading={isLoading}
            title="Your custom roadmaps"
          />
          {!isLoading && customRoadmaps.length > 0 && !isAllCollapsed && (
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
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

      <div
        className={cn('', {
          'border-b border-b-slate-800/70 pb-5 pt-5': !isAllCollapsed,
          'py-2': isAllCollapsed,
        })}
      >
        <div className="container">
          <HeroTitle
            icon={(<Sparkle className="mr-1.5 h-[14px] w-[14px]" />) as any}
            isLoading={isLoading}
            title="Your AI roadmaps"
          />
          {!isLoading && aiRoadmaps.length > 0 && !isAllCollapsed && (
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
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

      <div
        className={cn('', {
          'border-b border-b-slate-800/70 pb-5 pt-5': !isAllCollapsed,
          'py-2': isAllCollapsed,
        })}
      >
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
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
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
