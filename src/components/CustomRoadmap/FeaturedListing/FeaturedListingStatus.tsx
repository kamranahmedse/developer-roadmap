import { useState } from 'react';
import { SubmitFeaturedListingWarning } from './SubmitFeaturedListingWarning';
import type { GetRoadmapResponse } from '../CustomRoadmap';
import { CheckIcon, EyeIcon, FlagIcon, SendIcon, XIcon } from 'lucide-react';
import { cn } from '../../../lib/classname';

type FeaturedListingStatusProps = {
  currentRoadmap: GetRoadmapResponse;
};

export function FeaturedListingStatus(props: FeaturedListingStatusProps) {
  const { currentRoadmap } = props;

  const { featuredListStatus = 'idle' } = currentRoadmap;
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);

  const currentLabel = {
    idle: {
      icon: SendIcon,
      label: 'Submit for Featured Listing',
      className: 'bg-gray-100 text-gray-600 border-gray-200',
    },
    submitted: {
      icon: EyeIcon,
      label: 'Waiting for Approval',
      className: 'bg-blue-100 text-blue-600 border-blue-200',
    },
    approved: {
      icon: CheckIcon,
      label: 'Approved',
      className: 'bg-green-100 text-green-600 border-green-200',
    },
    rejected: {
      icon: XIcon,
      label: 'Rejected',
      className: 'bg-red-100 text-red-600 border-red-200',
    },
    rejected_with_reason: {
      icon: FlagIcon,
      label: 'Changes Requested',
      className: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    },
  }[featuredListStatus];

  return (
    <>
      {showSubmitWarning && (
        <SubmitFeaturedListingWarning
          onClose={() => {
            setShowSubmitWarning(false);
          }}
        />
      )}

      <button
        className={cn(
          'flex items-center gap-1.5 rounded-full border px-2 text-sm',
          currentLabel?.className,
        )}
        onClick={() => {
          setShowSubmitWarning(true);
        }}
        disabled={
          !['idle', 'rejected_with_reason'].includes(featuredListStatus)
        }
      >
        <currentLabel.icon className="size-3 stroke-[2.5]" />
        {currentLabel.label}
      </button>
    </>
  );
}
