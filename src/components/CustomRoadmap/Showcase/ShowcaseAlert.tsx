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
        'We are currently reviewing your roadmap, please wait for our response.',
      className: 'bg-blue-100 text-blue-600 border-blue-200',
    },
    approved: {
      icon: SmileIcon,
      label: 'Hooray! Your roadmap is now visible on the community page.',
      className: 'text-green-600 bg-green-100 border-green-300',
    },
    rejected: {
      icon: FrownIcon,
      label: 'Sorry, we are unable to feature your roadmap at this time.',
      className: 'text-red-600 bg-red-100 border-red-300',
    },
    rejected_with_reason: {
      icon: FlagIcon,
      label: (
        <>
          Your roadmap could not be featured at this time{' '}
          <button
            className="font-medium underline underline-offset-2 hover:text-red-800"
            onClick={() => {
              setShowRejectedReason(true);
            }}
          >
            click here to see why
          </button>
        </>
      ),
      className: 'text-red-800 bg-red-200 border-red-200',
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
          'z-10 border-b -mb-4',
          showcaseStatusDetails.className,
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
