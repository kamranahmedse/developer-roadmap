import { ResourceSelector } from './ResourceSelector';
import { useState } from 'preact/hooks';
import { Spinner } from '../ReactIcons/Spinner';

type Step2Props = {
  onBack: () => void;
  onNext: () => void;
};

export function Step2(props: Step2Props) {
  const { onBack, onNext } = props;

  const [selectedRoadmaps, setSelectedRoadmaps] = useState<string[]>([]);
  const [bestPractices, setBestPractices] = useState<string[]>([]);

  return (
    <>
      <ResourceSelector
        type="Roadmaps"
        resourcesIds={selectedRoadmaps}
        setResourcesIds={setSelectedRoadmaps}
      />

      <ResourceSelector
        type="Best Practices"
        resourcesIds={bestPractices}
        setResourcesIds={setBestPractices}
      />

      <div className="mt-4 flex flex-row items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className={
            'rounded-md border border-red-400 bg-white px-4 py-2 text-red-500'
          }
        >
          <span className="mr-1">&larr;</span>
          Previous Step
        </button>
        <button
          type="submit"
          disabled={false}
          className={
            'rounded-md border bg-black px-4 py-2 text-white disabled:opacity-50'
          }
        >
          Next Step
          <span className="ml-1">&rarr;</span>
        </button>
      </div>
    </>
  );
}
