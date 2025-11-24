import { useRef, useState } from 'react';
import { useOutsideClick } from '../hooks/use-outside-click';
import { type OptionType, SearchSelector } from './SearchSelector';
import type { PageType } from './CommandMenu/CommandMenu';
import { CheckIcon } from './ReactIcons/CheckIcon';
import { httpPut } from '../lib/http';
import type { TeamResourceConfig } from './CreateTeam/RoadmapSelector';
import { Spinner } from './ReactIcons/Spinner';

type AddTeamRoadmapProps = {
  teamId: string;
  allRoadmaps: PageType[];
  availableRoadmaps: PageType[];
  onClose: () => void;
  onMakeChanges: (roadmapId: string) => void;
  setResourceConfigs: (config: TeamResourceConfig) => void;
};

export function AddTeamRoadmap(props: AddTeamRoadmapProps) {
  const {
    teamId,
    onMakeChanges,
    onClose,
    allRoadmaps,
    availableRoadmaps,
    setResourceConfigs,
  } = props;
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<string>('');
  const popupBodyEl = useRef<HTMLDivElement>(null);

  async function addTeamResource(roadmapId: string) {
    if (!teamId) {
      return;
    }

    setIsLoading(true);
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-update-team-resource-config/${teamId}`,
      {
        teamId: teamId,
        resourceId: roadmapId,
        resourceType: 'roadmap',
        removed: [],
      }
    );

    if (error || !response) {
      setError(error?.message || 'Error adding roadmap');
      return;
    }

    setResourceConfigs(response);
  }

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  const selectedRoadmapTitle = allRoadmaps.find(
    (roadmap) => roadmap.id === selectedRoadmap
  )?.title;

  return (
    <div className="popup fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
      <div className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          className="popup-body relative rounded-lg bg-white p-4 shadow-sm"
        >
          {isLoading && (
            <>
              <div className="flex items-center justify-center gap-2 py-8">
                <Spinner isDualRing={false} className="h-4 w-4" />
                <h2 className="font-medium">Loading...</h2>
              </div>
            </>
          )}
          {!isLoading && !error && selectedRoadmap && (
            <div className={'text-center'}>
              <CheckIcon additionalClasses="h-10 w-10 mx-auto opacity-20 mb-3 mt-4" />
              <h3 className="mb-1.5 text-2xl font-medium">
                {selectedRoadmapTitle} Added
              </h3>
              <p className="mb-4 text-sm leading-none text-gray-400">
                <button
                  onClick={() => onMakeChanges(selectedRoadmap)}
                  className="underline underline-offset-2 hover:text-gray-900"
                >
                  Click here
                </button>{' '}
                to make changes to the roadmap.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  type="button"
                  className="grow cursor-pointer rounded-lg bg-gray-200 py-2 text-center hover:bg-gray-300"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    setSelectedRoadmap('');
                    setError('');
                    setIsLoading(false);
                  }}
                  type="button"
                  className="grow cursor-pointer rounded-lg bg-black py-2 text-center text-white"
                >
                  + Add More
                </button>
              </div>
            </div>
          )}
          {!isLoading && error && (
            <>
              <h3 className="mb-1.5 text-2xl font-medium">Error</h3>
              <p className="mb-3 text-sm leading-none text-red-400">{error}</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  type="button"
                  className="grow cursor-pointer rounded-lg bg-gray-200 py-2 text-center hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
          {!isLoading && !error && !selectedRoadmap && (
            <>
              <h3 className="mb-1.5 text-2xl font-medium">Add Roadmap</h3>
              <p className="mb-3 text-sm leading-none text-gray-400">
                Search and add a roadmap
              </p>

              <SearchSelector
                options={availableRoadmaps.map((roadmap) => ({
                  value: roadmap.id,
                  label: roadmap.title,
                }))}
                onSelect={(option: OptionType) => {
                  const roadmapId = option.value;
                  addTeamResource(roadmapId).finally(() => {
                    setIsLoading(false);
                    setSelectedRoadmap(roadmapId);
                  });
                }}
                inputClassName="mt-2 mb-2 block w-full rounded-md border border-gray-300 px-3 py-2 outline-hidden placeholder:text-gray-400 focus:border-gray-400"
                placeholder={'Search for roadmap'}
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  type="button"
                  className="grow cursor-pointer rounded-lg bg-gray-200 py-2 text-center hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
