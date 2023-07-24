import { useEffect, useState } from 'preact/hooks';
import { httpGet, httpPut } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import PlusIcon from '../../icons/plus.svg';
import PlusWhiteIcon from '../../icons/plus-white.svg';
import { pageProgressMessage } from '../../stores/page';
import type { TeamDocument } from './CreateTeamForm';
import { UpdateTeamResourceModal } from './UpdateTeamResourceModal';
import { SelectRoadmapModal } from './SelectRoadmapModal';

export type TeamResourceConfig = {
  resourceId: string;
  resourceType: string;
  removed: string[];
}[];

type RoadmapSelectorProps = {
  team: TeamDocument;
  teamResourceConfig: TeamResourceConfig;
  setTeamResourceConfig: (config: TeamResourceConfig) => void;
};

export function RoadmapSelector(props: RoadmapSelectorProps) {
  const { team, teamResourceConfig = [], setTeamResourceConfig } = props;

  const [showSelectRoadmapModal, setShowSelectRoadmapModal] = useState(false);
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);
  const [changingRoadmapId, setChangingRoadmapId] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function loadAllRoadmaps() {
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

    pageProgressMessage.set(`Deleting resource`);
    const { error, response } = await httpPut<TeamResourceConfig>(
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

    setTeamResourceConfig(response);
  }

  async function onRemove(resourceId: string) {
    pageProgressMessage.set('Removing roadmap');

    deleteResource(resourceId).finally(() => {
      pageProgressMessage.set('');
    });
  }

  async function addTeamResource(roadmapId: string) {
    if (!team?._id) {
      return;
    }

    pageProgressMessage.set(`Adding roadmap to team`);
    const { error, response } = await httpPut<TeamResourceConfig>(
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

    setTeamResourceConfig(response);
  }

  useEffect(() => {
    loadAllRoadmaps().finally();
  }, []);

  return (
    <div>
      {changingRoadmapId && (
        <UpdateTeamResourceModal
          onClose={() => setChangingRoadmapId('')}
          resourceId={changingRoadmapId}
          resourceType={'roadmap'}
          teamId={team?._id!}
          setTeamResourceConfig={setTeamResourceConfig}
          defaultRemovedItems={
            teamResourceConfig.find((c) => c.resourceId === changingRoadmapId)
              ?.removed || []
          }
        />
      )}
      {showSelectRoadmapModal && (
        <SelectRoadmapModal
          onClose={() => setShowSelectRoadmapModal(false)}
          teamResourceConfig={teamResourceConfig}
          allRoadmaps={allRoadmaps}
          teamId={team?._id!}
          onRoadmapAdd={(roadmapId) => {
            addTeamResource(roadmapId).finally(() => {
              pageProgressMessage.set('');
            });
          }}
          onRoadmapRemove={(roadmapId) => {
            onRemove(roadmapId).finally(() => {});
          }}
        />
      )}

      {!teamResourceConfig.length && (
        <div className="mt-4 rounded-md border px-4 py-12 text-center text-sm text-gray-700">
          <span className="block text-lg font-semibold text-black">
            No roadmaps selected.
          </span>
          <p className={'text-sm text-gray-400'}>
            Please search and add roadmaps from below
          </p>
          <div className="mt-4 flex justify-center">
            <button
              className="group flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 transition-opacity hover:opacity-70"
              onClick={() => setShowSelectRoadmapModal(true)}
            >
              <img alt="add" src={PlusWhiteIcon} className="h-5 w-5" />
              <span className="text-sm text-white focus:outline-none">
                Add Roadmaps
              </span>
            </button>
          </div>
        </div>
      )}

      {teamResourceConfig.length > 0 && (
        <div className="mt-4 grid grid-cols-3 flex-wrap gap-2.5">
          {teamResourceConfig.map(({ resourceId, removed: removedTopics }) => {
            const roadmapTitle =
              allRoadmaps.find((roadmap) => roadmap.id === resourceId)?.title ||
              '...';

            return (
              <div className="flex flex-col items-start rounded-md border border-gray-300">
                <div className={'w-full px-3 pb-2 pt-4'}>
                  <span className="mb-0.5 block text-base font-medium leading-none text-black">
                    {roadmapTitle}
                  </span>
                  {removedTopics.length > 0 ? (
                    <span className={'text-xs leading-none text-gray-900'}>
                      {removedTopics.length} topic
                      {removedTopics.length > 1 ? 's' : ''} removed
                    </span>
                  ) : (
                    <span className="text-xs italic leading-none text-gray-400/60">
                      No changes made ..
                    </span>
                  )}
                </div>

                <div className={'flex w-full justify-between p-3'}>
                  <button
                    type="button"
                    className={
                      'text-xs text-gray-500 underline hover:text-black focus:outline-none'
                    }
                    onClick={() => setChangingRoadmapId(resourceId)}
                  >
                    Customize
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
          <button
            className="group flex min-h-[110px] flex-col items-center justify-center rounded-md border border-dashed border-gray-300 px-8 transition-colors hover:border-gray-600 hover:bg-gray-50"
            onClick={() => setShowSelectRoadmapModal(true)}
          >
            <img
              alt="add"
              src={PlusIcon}
              className="mb-1 h-6 w-6 opacity-20 transition-opacity group-hover:opacity-100"
            />
            <span className="text-sm text-gray-400 transition-colors focus:outline-none group-hover:text-black">
              Add Roadmaps
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
