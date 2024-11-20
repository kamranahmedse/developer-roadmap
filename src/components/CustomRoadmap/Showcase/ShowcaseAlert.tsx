import { EyeIcon, FlagIcon, FrownIcon, SmileIcon } from 'lucide-react';
import { cn } from '../../../lib/classname';
import type { GetRoadmapResponse } from '../CustomRoadmap';
import { useState } from 'react';
import { SubmitShowcaseWarning } from './SubmitShowcaseWarning';

type ShowcaseAlertProps = {
  currentRoadmap: GetRoadmapResponse;
};

export function ShowcaseAlert(props: ShowcaseAlertProps) {
  const { currentRoadmap } = props;

  const [showRejectedReason, setShowRejectedReason] = useState(false);

  const { showcaseStatus } = currentRoadmap;
  if (!showcaseStatus) {
    return null;
  }

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
          <button
            className="font-medium underline underline-offset-2 hover:no-underline"
            onClick={() => {
              setShowRejectedReason(true);
            }}
          >
            Check Reason
          </button>
        </>
      ),
      className: 'text-yellow-600 border-yellow-200',
    },
  };
  const showcaseStatusDetails = showcaseStatusMap[showcaseStatus];
  if (!showcaseStatusDetails) {
    return null;
  }

  const { icon: Icon, label, className } = showcaseStatusDetails;

  return (
    <>
      {showRejectedReason && (
        <SubmitShowcaseWarning
          onClose={() => {
            setShowRejectedReason(false);
          }}
        />
      )}

      <div
        className={cn(
          'absolute inset-x-0 top-0 z-10',
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
    </>
  );
}
