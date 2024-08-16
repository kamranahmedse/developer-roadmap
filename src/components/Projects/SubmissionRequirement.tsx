import type { ReactNode } from 'react';
import { cn } from '../../lib/classname.ts';
import { CheckIcon, CircleDashed } from 'lucide-react';

type SubmissionRequirementProps = {
  status: 'pending' | 'success' | 'error';
  children: ReactNode;
};

export function SubmissionRequirement(props: SubmissionRequirementProps) {
  const { status, children } = props;

  return (
    <div
      className={cn(`flex items-center rounded-lg p-2 text-sm text-gray-900`, {
        'bg-gray-200': status === 'pending',
        'bg-green-200': status === 'success',
        'bg-red-200': status === 'error',
      })}
    >
      {status === 'pending' ? (
        <CircleDashed className="h-4 w-4 text-gray-400" />
      ) : status === 'success' ? (
        <CheckIcon className="h-4 w-4 text-green-800" />
      ) : (
        <CheckIcon className="h-4 w-4 text-yellow-800" />
      )}
      <span className="ml-2">{children}</span>
    </div>
  );
}
