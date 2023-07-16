import {RoadmapSelector, TeamResourceConfig} from './RoadmapSelector';
import type {TeamDocument} from './CreateTeamForm';

type Step2Props = {
  team: TeamDocument;
  teamResourceConfig: TeamResourceConfig;
  setTeamResourceConfig: (config: TeamResourceConfig) => void;
  onBack: () => void;
  onNext: () => void;
};

export function Step2(props: Step2Props) {
  const { team, onBack, onNext, teamResourceConfig, setTeamResourceConfig } = props;

  return (
    <>
      <RoadmapSelector
        team={team}
        teamResourceConfig={teamResourceConfig}
        setTeamResourceConfig={setTeamResourceConfig}
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
          disabled={teamResourceConfig.length === 0}
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
