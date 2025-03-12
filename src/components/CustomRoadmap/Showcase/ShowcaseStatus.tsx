import { useState } from 'react';
import { SubmitShowcaseWarning } from './SubmitShowcaseWarning';
import type { GetRoadmapResponse } from '../CustomRoadmap';
import { SendIcon } from 'lucide-react';

type ShowcaseStatusProps = {
  currentRoadmap: GetRoadmapResponse;
};

export function ShowcaseStatus(props: ShowcaseStatusProps) {
  const { currentRoadmap } = props;

  const { showcaseStatus } = currentRoadmap;
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);

  if (!currentRoadmap || showcaseStatus || currentRoadmap.aiRoadmapId) {
    return null;
  }

  return (
    <>
      {showSubmitWarning && (
        <SubmitShowcaseWarning
          onClose={() => {
            setShowSubmitWarning(false);
          }}
        />
      )}

      <button
        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-2 text-xs font-medium text-black hover:border-gray-300 hover:bg-gray-300 sm:pl-1.5 sm:pr-3 sm:text-sm"
        onClick={() => {
          setShowSubmitWarning(true);
        }}
        disabled={!!showcaseStatus}
      >
        <SendIcon className="mr-0 h-4 w-4 stroke-[2.5] sm:mr-1.5" />
        <span className="hidden sm:inline">Apply to be Featured</span>
      </button>
    </>
  );
}
