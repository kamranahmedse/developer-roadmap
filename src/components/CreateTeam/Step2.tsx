import { ResourceSelector } from './ResourceSelector';
import { useState } from 'preact/hooks';

type Step2Props = {
  setStepIndex: (index: number) => void;
};

export function Step2(props: Step2Props) {
  const { setStepIndex } = props;

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
    </>
  );
}
