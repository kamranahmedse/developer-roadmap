import { useEffect, useState } from 'preact/hooks';
import { SearchSelector } from '../SearchSelector';
import { httpGet, httpPut } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import XIcon from '../../icons/close-dark.svg';
import SearchIcon from '../../icons/search.svg';
import { pageProgressMessage } from '../../stores/page';
import type { TeamDocument } from './CreateTeamForm';
import { TeamResource } from './TeamResource';

type RoadmapSelectorProps = {
  team: TeamDocument;
  selectedRoadmapIds: string[];
  setSelectedRoadmapIds: (resourcesIds: string[]) => void;
};

export function RoadmapSelector(props: RoadmapSelectorProps) {
  const { selectedRoadmapIds, setSelectedRoadmapIds, team } = props;
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);

  const [changingRoadmapId, setChangingRoadmapId] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function getData() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      setError(error.message || 'Something went wrong. Please try again!');
      return;
    }

    if (!response) {
      return [];
    }

    const allRoadmaps = response
      .filter((page) => page.group === 'Roadmaps')
      .sort((a, b) => {
        if (a.title === 'Android') return 1;
        return a.title.localeCompare(b.title);
      });

    setAllRoadmaps(allRoadmaps);
    return response;
  }

  async function deleteResource(roadmapId: string) {
    if (!team?._id) {
      return;
    }

    pageProgressMessage.set(`Deleting roadmap from team`);
    const { error, response } = await httpPut(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-team-resource-config/${
        team._id
      }`,
      {
        resourceId: roadmapId,
        resourceType: 'roadmap',
      }
    );

    if (error || !response) {
      setError(error?.message || 'Error deleting roadmap');
      return;
    }
  }

  async function onRemove(resourceId: string) {
    pageProgressMessage.set('Removing roadmap');

    deleteResource(resourceId)
      .then(() => {
        const filteredResources = selectedRoadmapIds.filter(
          (r) => r !== resourceId
        );
        setSelectedRoadmapIds(filteredResources);
      })
      .finally(() => {
        pageProgressMessage.set('');
      });
  }

  async function addTeamResource(roadmapId: string) {
    if (!team?._id) {
      return;
    }

    pageProgressMessage.set(`Adding roadmap to team`);
    const { error, response } = await httpPut(
      `${import.meta.env.PUBLIC_API_URL}/v1-update-team-resource-config/${
        team._id
      }`,
      {
        teamId: team._id,
        resourceId: roadmapId,
        resourceType: 'roadmap',
        removed: [],
      }
    );

    if (error || !response) {
      setError(error?.message || 'Error adding roadmap');
      return;
    }
  }

  useEffect(() => {
    getData().finally();
  }, []);

  return (
    <div>
      {changingRoadmapId && (
        <TeamResource
          onClose={() => setChangingRoadmapId('')}
          resourceId={changingRoadmapId}
          resourceType={'roadmap'}
          teamId={team?._id!}
        />
      )}

      <div className="mt-4 flex w-full flex-col">
        <div className="mb-1 mt-2">
          <h2 className="mb-2 text-2xl font-bold">Select Roadmaps</h2>
          <p className="text-sm text-gray-700">
            Picks the roadmaps to be made available to your team for tracking.
            You can always add more later.
          </p>
        </div>

        <SearchSelector
          placeholder={`Search Roadmaps ..`}
          onSelect={(option) => {
            const roadmapId = option.value;
            addTeamResource(roadmapId)
              .then(() => {
                setSelectedRoadmapIds([...selectedRoadmapIds, roadmapId]);
              })
              .finally(() => {
                pageProgressMessage.set('');
              });
          }}
          options={allRoadmaps
            .filter((roadmap) => !selectedRoadmapIds.includes(roadmap.id))
            .map((roadmap) => ({
              value: roadmap.id,
              label: roadmap.title,
            }))}
          searchInputId={'roadmap-input'}
          inputClassName="mt-2 block w-full rounded-md border px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        />

        {!selectedRoadmapIds.length && (
          <div className="mt-4 rounded-md border px-4 py-12 text-center text-sm text-gray-700">
            <img
              alt={'search'}
              src={SearchIcon}
              className={'mx-auto mb-5 h-[42px] w-[42px] opacity-10'}
            />
            <span className="block text-lg font-semibold text-black">
              No roadmaps selected.
            </span>
            <p className={'text-sm text-gray-400'}>
              Please search and add roadmaps from above
            </p>
          </div>
        )}

        {selectedRoadmapIds.length > 0 && (
          <div className="mt-4 grid grid-cols-3 flex-wrap gap-2.5">
            {selectedRoadmapIds.map((resourceId) => {
              const roadmapTitle = allRoadmaps.find(
                (roadmap) => roadmap.id === resourceId
              )?.title;

              return (
                <div className="flex flex-col items-start rounded-md border border-gray-300">
                  <div className={'w-full px-3 pb-2 pt-4'}>
                    <span className="mb-0.5 block text-base font-medium leading-none text-black">
                      {roadmapTitle}
                    </span>
                    <span
                      className={'text-xs italic leading-none text-gray-400/80'}
                    >
                      No changes made ..
                    </span>
                  </div>

                  <div className={'flex w-full justify-between p-3'}>
                    <button
                      type="button"
                      className={
                        'text-xs text-gray-500 underline hover:text-black'
                      }
                      onClick={() => setChangingRoadmapId(resourceId)}
                    >
                      Make Changes
                    </button>

                    <button
                      type="button"
                      className={
                        'text-xs text-red-500 underline hover:text-black'
                      }
                      onClick={() => onRemove(resourceId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
