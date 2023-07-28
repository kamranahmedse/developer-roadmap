import { useEffect, useState } from 'preact/hooks';
import { httpGet, httpPut } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import ChevronDownIcon from '../../icons/chevron-down.svg';
import { pageProgressMessage } from '../../stores/page';
import type { TeamDocument } from './CreateTeamForm';
import { UpdateTeamResourceModal } from './UpdateTeamResourceModal';
import { SelectRoadmapModal } from './SelectRoadmapModal';
import { NotDropdown } from './NotDropdown';

export type TeamResourceConfig = {
  resourceId: string;
  resourceType: string;
  removed: string[];
}[];

type RoadmapSelectorProps = {
  teamId: string;
  teamResourceConfig: TeamResourceConfig;
  setTeamResourceConfig: (config: TeamResourceConfig) => void;
};

export function RoadmapSelector(props: RoadmapSelectorProps) {
  const { teamId, teamResourceConfig = [], setTeamResourceConfig } = props;

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
    if (!teamId) {
      return;
    }

    pageProgressMessage.set(`Deleting resource`);
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-delete-team-resource-config/${teamId}`,
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
    if (!teamId) {
      return;
    }

    pageProgressMessage.set(`Adding roadmap to team`);
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
          teamId={teamId}
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
          teamId={teamId}
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

      <div className="mt-3">
        <NotDropdown
          onClick={() => {
            setShowSelectRoadmapModal(true);
          }}
          selectedCount={teamResourceConfig.length}
          singularName={'roadmap'}
          pluralName={'roadmaps'}
        />
      </div>

      {!teamResourceConfig.length && (
        <p className={'mb-3 mt-2 text-base text-gray-400'}>
          No roadmaps selected.
        </p>
      )}

      {teamResourceConfig.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 flex-wrap gap-2.5">
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
        </div>
      )}
    </div>
  );
}
