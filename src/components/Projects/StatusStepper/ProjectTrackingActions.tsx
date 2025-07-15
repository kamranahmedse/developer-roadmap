import { CheckIcon, PlayIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StartProjectConfirmation } from '../StartProjectConfirmation';
import { projectStatusOptions } from '../../../queries/project';
import { queryClient } from '../../../stores/query-client';
import { useQuery } from '@tanstack/react-query';
import { cn } from '../../../lib/classname';
import { isLoggedIn } from '../../../lib/jwt';
import { showLoginPopup } from '../../../lib/popup';
import { getRelativeTimeString } from '../../../lib/date';
import { CompleteProjectConfirmation } from '../CompleteProjectConfirmation';

type ProjectTrackingActionsProps = {
  projectId: string;
};

export function ProjectTrackingActions(props: ProjectTrackingActionsProps) {
  const { projectId } = props;

  const { data: projectStatus } = useQuery(
    projectStatusOptions(projectId),
    queryClient,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isStartingProject, setIsStartingProject] = useState(false);
  const [isCompletingProject, setIsCompletingProject] = useState(false);

  useEffect(() => {
    if (!projectStatus) {
      return;
    }

    setIsLoading(false);
  }, [projectStatus]);

  const { startedAt, submittedAt } = projectStatus || {};
  const formattedStartedAt = startedAt ? getRelativeTimeString(startedAt) : '';
  const formattedSubmittedAt = submittedAt
    ? getRelativeTimeString(submittedAt)
    : '';
  const isCompleted = !!submittedAt;

  return (
    <>
      {isStartingProject && (
        <StartProjectConfirmation
          onClose={() => setIsStartingProject(false)}
          projectId={projectId}
        />
      )}

      {isCompletingProject && (
        <CompleteProjectConfirmation
          onClose={() => setIsCompletingProject(false)}
          projectId={projectId}
        />
      )}

      {!startedAt && (
        <button
          onClick={() => {
            if (!isLoggedIn()) {
              showLoginPopup();
              return;
            }

            setIsStartingProject(true);
          }}
          className={cn(
            'relative flex items-center gap-1.5 overflow-hidden rounded-full bg-purple-600 py-1 pr-2.5 pl-2 text-sm text-white hover:bg-purple-700',
            isLoading && 'bg-white text-gray-500',
          )}
          disabled={isLoading}
        >
          <PlayIcon size={13} />
          <span>Start Working</span>

          {isLoading && (
            <div
              className={cn('striped-loader absolute inset-0 z-10 bg-white')}
            />
          )}
        </button>
      )}

      {startedAt && !isLoading && (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setIsCompletingProject(true)}
            className={cn(
              'relative flex items-center gap-1.5 overflow-hidden rounded-full bg-green-600 py-1 pr-2.5 pl-2 text-sm text-white hover:bg-green-700',
              isCompleted &&
                'cursor-default bg-gray-200 text-gray-500 hover:bg-gray-200',
            )}
            disabled={isCompleted}
          >
            <CheckIcon size={13} className="stroke-[2.5]" />
            {isCompleted ? (
              <span>Completed</span>
            ) : (
              <span>Mark as Completed</span>
            )}
          </button>

          <div className="text-end text-xs text-gray-500">
            {isCompleted ? (
              <>
                Completed{' '}
                <span className="font-medium">{formattedSubmittedAt}</span>
              </>
            ) : (
              <>
                Started working{' '}
                <span className="font-medium">{formattedStartedAt}</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
