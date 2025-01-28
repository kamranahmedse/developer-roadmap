import { getUser } from '../../lib/jwt';
import { getPercentage } from '../../helper/number';
import { ProjectProgressActions } from './ProjectProgressActions';
import { cn } from '../../lib/classname';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { ProjectStatus } from './ProjectStatus';
import { ThumbsUp } from 'lucide-react';

type ProjectProgressType = {
  projectStatus: ProjectStatusDocument & {
    title: string;
  };
  showActions?: boolean;
  userId?: string;
};

export function ProjectProgress(props: ProjectProgressType) {
  const {
    projectStatus,
    showActions = true,
    userId: defaultUserId = getUser()?.id,
  } = props;

  const shouldShowActions =
    projectStatus.submittedAt &&
    projectStatus.submittedAt !== null &&
    showActions;

  return (
    <div className="relative">
      <a
        className={cn(
          'group relative flex w-full items-center justify-between overflow-hidden rounded-md border border-gray-300 bg-white px-3 py-2 pr-7 text-left text-sm transition-all hover:border-gray-400',
          shouldShowActions ? '' : 'pr-3',
        )}
        href={`/projects/${projectStatus.projectId}`}
        target="_blank"
      >
        <ProjectStatus projectStatus={projectStatus} />
        <span className="ml-2 grow truncate">{projectStatus?.title}</span>
        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
          {projectStatus.upvotes}
          <ThumbsUp className="size-2.5 stroke-[2.5px]" />
        </span>
      </a>

      {shouldShowActions && (
        <div className="absolute right-2 top-0 flex h-full items-center">
          <ProjectProgressActions
            userId={defaultUserId!}
            projectId={projectStatus.projectId}
          />
        </div>
      )}
    </div>
  );
}
