import { useEffect, useState } from 'react';
import { httpGet, httpPut } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import { pageProgressMessage } from '../../stores/page';
import { UpdateTeamResourceModal } from './UpdateTeamResourceModal';
import { SelectRoadmapModal } from './SelectRoadmapModal';
import { HardDrive, LockIcon, Map, PackagePlus } from 'lucide-react';
import { showCreateRoadmapModal } from '../../stores/roadmap';
import type { RoadmapDocument } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { useToast } from '../../hooks/use-toast';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';

export type TeamResourceConfig = {
  resourceId: string;
  resourceType: string;
  removed: string[];
  topics?: number;
}[];

type RoadmapSelectorProps = {
  teamId: string;
  teamResourceConfig: TeamResourceConfig;
  setTeamResourceConfig: (config: TeamResourceConfig) => void;
};

export function RoadmapSelector(props: RoadmapSelectorProps) {
  const { teamId, teamResourceConfig = [], setTeamResourceConfig } = props;

  const toast = useToast();
  const [showSelectRoadmapModal, setShowSelectRoadmapModal] = useState(false);
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);
  const [allCustomRoadmaps, setAllCustomRoadmaps] = useState<RoadmapDocument[]>(
    []
  );
  const [changingRoadmapId, setChangingRoadmapId] = useState<string>('');
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  async function loadAllRoadmaps() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      toast.error(error.message || 'Something went wrong. Please try again!');
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

  async function loadAllCustomRoadmaps() {
    const { error, response } = await httpGet<RoadmapDocument[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-roadmap-list/${teamId}`
    );

    if (error) {
      toast.error(error.message || 'Something went wrong. Please try again!');
      return;
    }

    if (!response) {
      return [];
    }

    setAllCustomRoadmaps(response);
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
    Promise.all([loadAllRoadmaps(), loadAllCustomRoadmaps()]).finally(() => {});
  }, []);

  useEffect(() => {
    function handleCustomRoadmapCreated(event: Event) {
      const { roadmapId } = (event as CustomEvent)?.detail;
      if (!roadmapId) {
        return;
      }
      loadAllCustomRoadmaps().finally(() => {});
      addTeamResource(roadmapId).finally(() => {
        pageProgressMessage.set('');
      });
    }
    window.addEventListener(
      'custom-roadmap-created',
      handleCustomRoadmapCreated
    );

    return () => {
      window.removeEventListener(
        'custom-roadmap-created',
        handleCustomRoadmapCreated
      );
    };
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

      <div className="my-3 flex items-center gap-4">
        {isCreatingRoadmap && (
          <CreateRoadmapModal
            teamId={teamId}
            visibility={'team'}
            onClose={() => setIsCreatingRoadmap(false)}
          />
        )}
        <button
          className="flex h-10 grow items-center justify-center gap-2 rounded-md bg-black text-white hover:opacity-70"
          onClick={() => {
            setShowSelectRoadmapModal(true);
          }}
        >
          <HardDrive className="h-4 w-4 stroke-[2.5]" />
          Pick from our roadmaps
        </button>

        <span className="text-base text-gray-400">or</span>

        <button
          className="flex h-10 grow items-center justify-center gap-2 rounded-md bg-black text-white hover:opacity-70"
          onClick={() => {
            setIsCreatingRoadmap(true);
          }}
        >
          <PackagePlus className="h-4 w-4 stroke-[2.5]" />
          Create from scratch
        </button>
      </div>

      {!teamResourceConfig.length && (
        <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border">
          <Map className="mb-2 h-12 w-12 text-gray-300" />
          <p className={'text-lg font-semibold'}>No roadmaps selected.</p>
          <p className={'text-base text-gray-400'}>
            Pick from{' '}
            <span
              onClick={() => setShowSelectRoadmapModal(true)}
              className="cursor-pointer underline"
            >
              our roadmaps
            </span>{' '}
            or{' '}
            <span
              onClick={() => {
                setIsCreatingRoadmap(true);
              }}
              className="cursor-pointer underline"
            >
              create a new one
            </span>
            .
          </p>
        </div>
      )}

      {teamResourceConfig.length > 0 && (
        <div className="mb-3 grid grid-cols-1 flex-wrap gap-2.5 sm:grid-cols-3">
          {teamResourceConfig.map(
            ({ resourceId, removed: removedTopics, topics }) => {
              let roadmapTitle = '';
              const customRoadmap = allCustomRoadmaps.find(
                (roadmap) => roadmap._id?.toString() === resourceId
              );
              if (customRoadmap) {
                roadmapTitle = customRoadmap.title || '...';
              } else {
                roadmapTitle =
                  allRoadmaps.find((roadmap) => roadmap.id === resourceId)
                    ?.title || '...';
              }

              const isOnlyVisibleToMe = customRoadmap?.visibility === 'me';

              return (
                <div
                  className="flex flex-col items-start rounded-md border border-gray-300"
                  key={resourceId}
                >
                  <div className={'w-full px-3 pb-2 pt-4'}>
                    <span className="mb-0.5 block text-base font-medium leading-none text-black">
                      {roadmapTitle}
                      {isOnlyVisibleToMe && (
                        <span className="ml-1.5 inline-flex items-center gap-1.5 rounded-md border border-red-300 bg-red-50 p-0.5 px-1.5 text-xs font-normal text-red-500">
                          <LockIcon className="inline-block h-3 w-3" />
                          Only me
                        </span>
                      )}
                    </span>
                    {removedTopics.length > 0 || (topics && topics > 0) ? (
                      <span className={'text-xs leading-none text-gray-900'}>
                        {customRoadmap ? (
                          <>
                            {topics} topic{topics && topics > 1 ? 's' : ''}
                          </>
                        ) : (
                          <>
                            {removedTopics.length} topic
                            {removedTopics.length > 1 ? 's' : ''} removed
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="text-xs italic leading-none text-gray-400/60">
                        {customRoadmap
                          ? 'Placeholder roadmap'
                          : 'No changes made ..'}
                      </span>
                    )}
                  </div>

                  <div className={'flex w-full justify-between p-3'}>
                    <button
                      type="button"
                      className={
                        'text-xs text-gray-500 underline hover:text-black focus:outline-none'
                      }
                      onClick={() => {
                        if (customRoadmap) {
                          // Open the roadmap in a new tab
                          window.open(
                            `${
                              import.meta.env.PUBLIC_EDITOR_APP_URL
                            }/${resourceId}`,
                            '_blank'
                          );
                          return;
                        }
                        setChangingRoadmapId(resourceId);
                      }}
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
            }
          )}
        </div>
      )}
    </div>
  );
}
