import type { ReactNode } from 'react';
import { cn } from '../../lib/classname.ts';
import { CheckIcon, CircleDashed, Loader, Loader2, X } from 'lucide-react';
import { Spinner } from '../ReactIcons/Spinner.tsx';

type SubmissionRequirementProps = {
  status: 'pending' | 'success' | 'error';
  children: ReactNode;
  isLoading?: boolean;
};

export function SubmissionRequirement(props: SubmissionRequirementProps) {
  const { status, isLoading = false, children } = props;

  return (
    <div
      className={cn(`flex items-center rounded-lg p-2 text-sm text-gray-900`, {
        'bg-gray-200': status === 'pending',
        'bg-green-200': status === 'success',
        'bg-red-200': status === 'error',
      })}
    >
      {!isLoading && (
        <>
          {status === 'pending' ? (
            <CircleDashed className="h-4 w-4 shrink-0 text-gray-400" />
          ) : status === 'success' ? (
            <CheckIcon className="h-4 w-4 shrink-0 text-green-800" />
          ) : (
            <X className="h-4 w-4 shrink-0 text-yellow-800" />
          )}
        </>
      )}

      {isLoading && (
        <Loader2
          className={'h-4 w-4 animate-spin text-gray-400'}
          strokeWidth={3}
        />
      )}
      <span className="ml-2">{children}</span>
    </div>
  );
}
