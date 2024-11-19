import {
  CheckIcon,
  EyeIcon,
  FlagIcon,
  FrownIcon,
  SmileIcon,
  XIcon,
} from 'lucide-react';
import { cn } from '../../../lib/classname';
import type { GetRoadmapResponse } from '../CustomRoadmap';

type ShowcaseAlertProps = {
  currentRoadmap: GetRoadmapResponse;
};

export function ShowcaseAlert(props: ShowcaseAlertProps) {
  const { currentRoadmap } = props;

  // const { showcaseStatus = 'idle' } = currentRoadmap;
  // if (showcaseStatus === 'idle') {
  //   return null;
  // }

  const showcaseStatus = 'rejected_with_reason';

  const showcaseStatusMap = {
    submitted: {
      icon: EyeIcon,
      label:
        'We are reviewing your roadmap. It will be visible to everyone on the platform once approved.',
      className: 'text-blue-600 border-blue-200',
    },
    approved: {
      icon: SmileIcon,
      label: 'Hooray! Your roadmap is now visible to everyone on the platform.',
      className: 'text-green-600 border-green-200',
    },
    rejected: {
      icon: FrownIcon,
      label: 'Sorry, we are unable to feature your roadmap at this time.',
      className: 'text-red-600 border-red-200',
    },
    rejected_with_reason: {
      icon: FlagIcon,
      label: (
        <>
          Your roadmap needs changes before it can be featured.{' '}
          <button className="font-medium underline underline-offset-2 hover:no-underline">
            Check Reason
          </button>
        </>
      ),
      className: 'text-yellow-600 border-yellow-200',
    },
  };
  const { icon: Icon, label, className } = showcaseStatusMap[showcaseStatus];

  return (
    <div
      className={cn(
        showcaseStatus === 'submitted' && 'bg-blue-100',
        showcaseStatus === 'approved' && 'bg-green-100',
        showcaseStatus === 'rejected' && 'bg-red-100',
        showcaseStatus === 'rejected_with_reason' && 'bg-yellow-100',
      )}
    >
      <div className="container relative flex items-center justify-center py-2 text-sm">
        <div className={cn('flex items-center gap-2', className)}>
          <Icon className="h-4 w-4 shrink-0 stroke-[2.5]" />
          <div>{label}</div>
        </div>
      </div>
    </div>
  );
}
