import {
  FolderKanban,
  MapIcon,
  Plus,
  Sparkle,
  Eye,
  EyeOff,
  Square,
  SquareCheckBig,
} from 'lucide-react';
import { useState } from 'react';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions.tsx';
import { CheckIcon } from '../ReactIcons/CheckIcon.tsx';
import type { UserProgress } from '../TeamProgress/TeamProgressPage.tsx';
import { HeroProject } from './HeroProject';
import { HeroRoadmap } from './HeroRoadmap';
import { CreateRoadmapButton } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapButton.tsx';
import { HeroItemsGroup } from './HeroItemsGroup';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal.tsx';

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
};

export function FavoriteRoadmaps(props: FavoriteRoadmapsProps) {
  const { progress, isLoading, customRoadmaps, aiRoadmaps, projects } = props;
  const [showCompleted, setShowCompleted] = useState(false);
  const [isCreatingCustomRoadmap, setIsCreatingCustomRoadmap] = useState(false);

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
      {isCreatingCustomRoadmap && (
        <CreateRoadmapModal
          onClose={() => {
            setIsCreatingCustomRoadmap(false);
          }}
        />
      )}

      <HeroItemsGroup
        icon={<CheckIcon additionalClasses="mr-1.5 h-[14px] w-[14px]" />}
        isLoading={isLoading}
        title="Your progress and bookmarks"
        isEmpty={!isLoading && progress.length === 0}
        emptyTitle={
          <>
            No bookmars found
            <a
              href="#role-based-roadmaps"
              className="ml-1.5 inline-flex items-center gap-1 font-medium text-blue-500 underline-offset-2 hover:underline"
            >
              <SquareCheckBig className="size-3.5" strokeWidth={2.5} />
              Bookmark a roadmap
            </a>
          </>
        }
      >
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
      </HeroItemsGroup>

      <HeroItemsGroup
        icon={<MapIcon className="mr-1.5 h-[14px] w-[14px]" />}
        isLoading={isLoading}
        title="Your custom roadmaps"
        isEmpty={!isLoading && customRoadmaps.length === 0}
        emptyTitle={
          <>
            No custom roadmaps found
            <button
              onClick={() => {
                setIsCreatingCustomRoadmap(true);
              }}
              className="ml-1.5 inline-flex items-center gap-1 font-medium text-blue-500 underline-offset-2 hover:underline"
            >
              <SquareCheckBig className="size-3.5" strokeWidth={2.5} />
              Create custom roadmap
            </button>
          </>
        }
      >
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
      </HeroItemsGroup>

      <HeroItemsGroup
        icon={<Sparkle className="mr-1.5 h-[14px] w-[14px]" />}
        isLoading={isLoading}
        title="Your AI roadmaps"
        isEmpty={!isLoading && aiRoadmaps.length === 0}
        emptyTitle={
          <>
            No AI roadmaps found
            <a
              href="/ai"
              className="ml-1.5 inline-flex items-center gap-1 font-medium text-blue-500 underline-offset-2 hover:underline"
            >
              <SquareCheckBig className="size-3.5" strokeWidth={2.5} />
              Generate AI roadmap
            </a>
          </>
        }
      >
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
      </HeroItemsGroup>

      <HeroItemsGroup
        icon={<FolderKanban className="mr-1.5 h-[14px] w-[14px]" />}
        isLoading={isLoading}
        title="Your active projects"
        isEmpty={!isLoading && projectsToShow.length === 0}
        emptyTitle={
          <>
            No active projects found
            <a
              href="/projects"
              className="ml-1.5 inline-flex items-center gap-1 font-medium text-blue-500 underline-offset-2 hover:underline"
            >
              <SquareCheckBig className="size-3.5" strokeWidth={2.5} />
              Start a new project
            </a>
          </>
        }
        rightContent={
          completedProjects.length > 0 && (
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="hidden items-center gap-2 rounded-md text-xs text-slate-400 hover:text-slate-300 sm:flex"
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
        className="border-b-0"
      >
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
      </HeroItemsGroup>
    </div>
  );
}
