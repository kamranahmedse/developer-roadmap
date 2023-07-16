import { RoadmapSelector } from './RoadmapSelector';
import { useEffect, useState } from 'preact/hooks';
import { Spinner } from '../ReactIcons/Spinner';
import type { TeamDocument } from './CreateTeamForm';
import { httpGet } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';

type Step2Props = {
  team: TeamDocument;
  onBack: () => void;
  onNext: () => void;
};

export function Step2(props: Step2Props) {
  const { team, onBack, onNext } = props;
  const [selectedRoadmaps, setSelectedRoadmaps] = useState<string[]>([]);

  async function loadTeamResourceConfig(teamId: string) {
    const { error, response } = await httpGet(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-resource-config/${teamId}`
    );
    if (error || !Array.isArray(response)) {
      console.error(error);
      return;
    }

    setSelectedRoadmaps(response.map((resource) => resource.resourceId));
  }

  useEffect(() => {
    if (!team?._id) {
      return;
    }

    pageProgressMessage.set('Fetching skill config');
    loadTeamResourceConfig(team._id).finally(() => {
      pageProgressMessage.set('');
    });
  }, [team]);

  return (
    <>
      <RoadmapSelector
        team={team}
        selectedRoadmapIds={selectedRoadmaps}
        setSelectedRoadmapIds={setSelectedRoadmaps}
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
          disabled={selectedRoadmaps.length <= 0}
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
