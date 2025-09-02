import { Badge } from '../Badge.tsx';
import { Users } from 'lucide-react';
import { formatCommaNumber } from '../../lib/number.ts';
import { cn } from '../../lib/classname.ts';
import type { OfficialProjectDocument } from '../../queries/official-project.ts';

type ProjectCardProps = {
  project: OfficialProjectDocument;
  userCount?: number;
  status?: 'completed' | 'started' | 'none';
};

const badgeVariants = {
  beginner: 'yellow',
  intermediate: 'green',
  advanced: 'blue',
} as const;

export function ProjectCard(props: ProjectCardProps) {
  const { project, userCount = 0, status } = props;
  const { difficulty, title, description, slug, topics = [] } = project;

  const isLoadingStatus = status === undefined;
  const userStartedCount =
    status !== 'none' && userCount === 0 ? userCount + 1 : userCount;

  return (
    <a
      href={`/projects/${slug}`}
      className="flex flex-col rounded-md border bg-white p-3 transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <span className="flex justify-between gap-1.5">
        <Badge variant={badgeVariants[difficulty]} text={difficulty} />
        {topics?.map((topic, index) => (
          <Badge key={`${topic}-${index}`} variant={'grey'} text={topic} />
        ))}
      </span>
      <span className="my-3 flex min-h-[100px] flex-col">
        <span className="mb-1 font-medium">{title}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </span>
      <span className="flex min-h-[22px] items-center justify-between gap-2 text-xs text-gray-400">
        {isLoadingStatus ? (
          <>
            <span className="h-5 w-24 animate-pulse rounded-sm bg-gray-200" />{' '}
            <span className="h-5 w-20 animate-pulse rounded-sm bg-gray-200" />{' '}
          </>
        ) : (
          <>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              {userStartedCount > 0 ? (
                <>{formatCommaNumber(userStartedCount)} Started</>
              ) : (
                <>Be the first to solve!</>
              )}
            </span>

            {status !== 'none' && (
              <span
                className={cn(
                  'flex items-center gap-1.5 rounded-full border border-current px-2 py-0.5 capitalize',
                  status === 'completed' && 'text-green-500',
                  status === 'started' && 'text-yellow-500',
                )}
              >
                <span
                  className={cn('inline-block h-2 w-2 rounded-full', {
                    'bg-green-500': status === 'completed',
                    'bg-yellow-500': status === 'started',
                  })}
                />
                {status}
              </span>
            )}
          </>
        )}
      </span>
    </a>
  );
}
