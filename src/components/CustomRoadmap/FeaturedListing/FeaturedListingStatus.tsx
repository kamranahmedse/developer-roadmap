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

  return (
    <>
      {featuredListStatus === 'idle' && (
        <>
          {showSubmitWarning && (
            <SubmitFeaturedListingWarning
              onClose={() => setShowSubmitWarning(false)}
            />
          )}

          <button
            className="text-sm"
            onClick={() => setShowSubmitWarning(true)}
          >
            Submit for Featured Listing
          </button>
        </>
      )}

      {featuredListStatus === 'submitted' && (
        <span className="text-sm">Submitted</span>
      )}

      {featuredListStatus === 'approved' && (
        <span className="text-sm">Approved</span>
      )}

      {featuredListStatus === 'rejected' && (
        <span className="text-sm">Rejected</span>
      )}

      {featuredListStatus === 'rejected_with_reason' && <></>}
    </>
  );
}
