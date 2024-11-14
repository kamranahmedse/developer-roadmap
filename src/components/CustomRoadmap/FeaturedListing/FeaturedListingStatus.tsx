import { useState } from 'react';
import { SubmitFeaturedListingWarning } from './SubmitFeaturedListingWarning';
import type { GetRoadmapResponse } from '../CustomRoadmap';

type FeaturedListingStatusProps = {
  currentRoadmap: GetRoadmapResponse;
};

export function FeaturedListingStatus(props: FeaturedListingStatusProps) {
  const { currentRoadmap } = props;

  const { featuredListStatus = 'idle' } = currentRoadmap;
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);

  const currentLabel = {
    idle: 'Submit for Featured Listing',
    submitted: 'Submitted',
    approved: 'Approved',
    rejected: 'Rejected',
    rejected_with_reason: 'Rejected with Reason',
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
        className="text-sm"
        onClick={() => {
          if (!['idle', 'rejected'].includes(featuredListStatus)) {
            return;
          }

          setShowSubmitWarning(true);
        }}
      >
        {currentLabel}
      </button>
    </>
  );
}
