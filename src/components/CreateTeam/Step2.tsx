import { RoadmapSelector, type TeamResourceConfig } from './RoadmapSelector';
import type { TeamDocument } from './CreateTeamForm';

type Step2Props = {
  team: TeamDocument;
  teamResourceConfig: TeamResourceConfig;
  setTeamResourceConfig: (config: TeamResourceConfig) => void;
  onBack: () => void;
  onNext: () => void;
};

export function Step2(props: Step2Props) {
  const { team, onBack, onNext, teamResourceConfig, setTeamResourceConfig } =
    props;

  return (
    <>
      <div className="mt-4 flex w-full flex-col">
        <div className="mb-1 mt-2">
          <h2 className="mb-1 text-lg font-bold md:mb-1.5 md:text-2xl">
            Select Roadmaps
          </h2>
          <p className="text-sm text-gray-700">
            You can always add and customize your roadmaps later.
          </p>
        </div>

        <RoadmapSelector
          teamId={team._id!}
          teamResources={teamResourceConfig}
          setTeamResources={setTeamResourceConfig}
        />
      </div>

      <div className="mt-4 flex flex-col items-stretch justify-between gap-2 md:flex-row md:items-center">
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

        <div className={'flex gap-2'}>
          <button
            type="button"
            onClick={onNext}
            disabled={teamResourceConfig.length !== 0}
            className={
              'grow rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-500 hover:border-gray-400 hover:text-black md:flex-auto disabled:opacity-50 disabled:pointer-events-none'
            }
          >
            Skip for Now
          </button>
          <button
            type="submit"
            disabled={teamResourceConfig.length === 0}
            onClick={onNext}
            className={
              'rounded-md border bg-black px-4 py-2 text-white disabled:opacity-50'
            }
          >
            Next Step
            <span className="ml-1">&rarr;</span>
          </button>
        </div>
      </div>
    </>
  );
}
