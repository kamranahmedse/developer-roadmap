import {useEffect, useState} from 'preact/hooks';
import {SearchSelector} from '../SearchSelector';
import {httpGet, httpPut} from '../../lib/http';
import type {PageType} from '../CommandMenu/CommandMenu';
import XIcon from '../../icons/close-dark.svg';
import SearchIcon from '../../icons/search.svg';
import {pageProgressMessage} from '../../stores/page';
import type {TeamDocument} from './CreateTeamForm';

type RoadmapSelectorProps = {
  team?: TeamDocument;
  selectedRoadmapIds: string[];
  setSelectedRoadmapIds: (resourcesIds: string[]) => void;
};

export function RoadmapSelector(props: RoadmapSelectorProps) {
  const { selectedRoadmapIds, setSelectedRoadmapIds, team } = props;
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);

  const [error, setError] = useState<string>('');

  async function loadTeamResourceConfig(teamId: string) {
    const { error, response } = await httpGet(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-resource-config/${teamId}`
    );
    if (error || !Array.isArray(response)) {
      const message = error?.message || 'Error loading team resource config';
      setError(message);
      return;
    }

    setSelectedRoadmapIds(response.map((resource) => resource.resourceId));
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

  async function getData() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      alert(error.message);
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

    console.log('done');
  }

  useEffect(() => {
    getData().finally();
  }, []);

  return (
    <div>
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
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedRoadmapIds.map((resourceId) => (
              <div className="flex min-h-[32px] items-center rounded-md border p-2">
                <div className="text-sm leading-none text-slate-500">
                  {
                    allRoadmaps.find((roadmap) => roadmap.id === resourceId)
                      ?.title
                  }
                </div>
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => {
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
                  }}
                >
                  <img src={XIcon} alt="Remove" className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
