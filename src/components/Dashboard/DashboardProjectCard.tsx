import { Check, CircleCheck, CircleDashed } from 'lucide-react';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { cn } from '../../lib/classname.ts';
import { getRelativeTimeString } from '../../lib/date.ts';

type DashboardProjectCardProps = {
  project: ProjectStatusDocument & {
    title: string;
  };
};

export function DashboardProjectCard(props: DashboardProjectCardProps) {
  const { project } = props;

  const { title, projectId, submittedAt, startedAt, repositoryUrl } = project;

  const url = `/projects/${projectId}`;
  const status = submittedAt && repositoryUrl ? 'submitted' : 'started';

  return (
    <a
      href={url}
      key={projectId}
      className="group relative flex w-full items-center gap-2 text-left text-sm underline-offset-2"
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
          {
            'border border-green-500 bg-green-500 group-hover:border-green-600 group-hover:bg-green-600':
              status === 'submitted',
            'border border-dashed border-gray-400 bg-transparent group-hover:border-gray-500':
              status === 'started',
          },
        )}
      >
        {status === 'submitted' && (
          <Check
            className="relative top-[0.5px] size-3 text-white"
            strokeWidth={3}
          />
        )}
      </span>
      <span className="grow truncate group-hover:underline">{title.replace(/(System)|(Service)/, '')}</span>
      <span className="shrink-0 bg-transparent text-xs text-gray-400 no-underline">
        {!!startedAt &&
          status === 'started' &&
          getRelativeTimeString(startedAt)}
        {!!submittedAt &&
          status === 'submitted' &&
          getRelativeTimeString(submittedAt)}
      </span>
    </a>
  );
}
