import { ThumbsUp } from 'lucide-react';
import { cn } from '../../lib/classname.ts';
import { getRelativeTimeString } from '../../lib/date';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions.tsx';

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