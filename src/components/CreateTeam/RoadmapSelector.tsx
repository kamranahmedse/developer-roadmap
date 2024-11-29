import { useEffect, useState } from 'react';
import { httpGet, httpPut } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import { pageProgressMessage } from '../../stores/page';
import { UpdateTeamResourceModal } from './UpdateTeamResourceModal';
import { SelectRoadmapModal } from './SelectRoadmapModal';
import { Map, Shapes } from 'lucide-react';
import type {
  AllowedRoadmapVisibility,
  RoadmapDocument,
} from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { useToast } from '../../hooks/use-toast';

export type TeamResourceConfig = {
  isCustomResource: boolean;
  roadmapSlug?: string;
  title: string;
  description?: string;
  visibility?: AllowedRoadmapVisibility;
  resourceId: string;
  resourceType: string;
  removed: string[];
  topics?: number;
  sharedTeamMemberIds: string[];
  sharedFriendIds: string[];
  defaultRoadmapId?: string;
}[];

type RoadmapSelectorProps = {
  teamId: string;
  teamResources: TeamResourceConfig;
  setTeamResources: (config: TeamResourceConfig) => void;
};

export function RoadmapSelector(props: RoadmapSelectorProps) {
  const { teamId, teamResources = [], setTeamResources } = props;

  const toast = useToast();
  const [removingRoadmapId, setRemovingRoadmapId] = useState<string>('');
  const [showSelectRoadmapModal, setShowSelectRoadmapModal] = useState(false);
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);
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
      },
    );

    if (error || !response) {
      setError(error?.message || 'Error deleting roadmap');
      return;
    }

    setTeamResources(response);
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
    const renderer = allRoadmaps.find((r) => r.id === roadmapId)?.renderer;
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-update-team-resource-config/${teamId}`,
      {
        teamId: teamId,
        resourceId: roadmapId,
        resourceType: 'roadmap',
        removed: [],
        renderer: renderer || 'balsamiq',
      },
    );

    if (error || !response) {
      setError(error?.message || 'Error adding roadmap');
      return;
    }

    setTeamResources(response);
    if (renderer === 'editor') {
      setShowSelectRoadmapModal(false);
    }
  }

  useEffect(() => {
    loadAllRoadmaps().finally(() => {});
  }, []);

  function handleCustomRoadmapCreated(roadmap: RoadmapDocument) {
    const { _id: roadmapId } = roadmap;
    if (!roadmapId) {
      return;
    }

    loadAllRoadmaps().finally(() => {});
    addTeamResource(roadmapId).finally(() => {
      pageProgressMessage.set('');
    });
  }

  return (
    <div>
      {changingRoadmapId && (
        <UpdateTeamResourceModal
          onClose={() => setChangingRoadmapId('')}
          resourceId={changingRoadmapId}
          resourceType={'roadmap'}
          teamId={teamId}
          setTeamResourceConfig={setTeamResources}
          defaultRemovedItems={
            teamResources.find((c) => c.resourceId === changingRoadmapId)
              ?.removed || []
          }
        />
      )}
      {showSelectRoadmapModal && (
        <SelectRoadmapModal
          onClose={() => setShowSelectRoadmapModal(false)}
          teamResourceConfig={teamResources.map((r) => r.resourceId)}
          allRoadmaps={allRoadmaps.filter((r) => r.renderer === 'editor')}
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
            onClose={() => setIsCreatingRoadmap(false)}
            onCreated={(roadmap: RoadmapDocument) => {
              handleCustomRoadmapCreated(roadmap);
              setIsCreatingRoadmap(false);
            }}
          />
        )}

        <button
          className="flex h-10 grow items-center justify-center gap-2 rounded-md border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
          onClick={() => {
            setShowSelectRoadmapModal(true);
          }}
        >
          <Map className="h-4 w-4 stroke-[2.5]" />
          Pick from our roadmaps
        </button>

        <span className="text-base text-gray-400">or</span>

        <button
          className="flex h-10 grow items-center justify-center gap-2 rounded-md border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
          onClick={() => {
            setIsCreatingRoadmap(true);
          }}
        >
          <Shapes className="h-4 w-4 stroke-[2.5]" />
          Create Custom Roadmap
        </button>
      </div>

      {!teamResources.length && (
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

      {teamResources.length > 0 && (
        <div className="mb-3 grid grid-cols-1 flex-wrap gap-2.5 sm:grid-cols-3">
          {teamResources.map(
            ({
              isCustomResource,
              title: roadmapTitle,
              resourceId,
              removed: removedTopics,
              topics,
            }) => {
              return (
                <div
                  className="relative flex flex-col items-start overflow-hidden rounded-md border border-gray-300"
                  key={resourceId}
                >
                  <div className={'w-full flex-grow px-3 pb-2 pt-4'}>
                    <span className="mb-0.5 block text-base font-medium leading-snug text-black">
                      {roadmapTitle}
                    </span>
                    {removedTopics.length > 0 || (topics && topics > 0) ? (
                      <span className={'text-xs leading-none text-gray-400'}>
                        {isCustomResource ? (
                          <>
                            Custom &middot; {topics} topic
                            {topics && topics > 1 ? 's' : ''}
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
                        {isCustomResource
                          ? 'Placeholder roadmap.'
                          : 'No changes made ..'}
                      </span>
                    )}
                  </div>

                  {removingRoadmapId === resourceId && (
                    <div
                      className={
                        'flex w-full items-center justify-end p-3 text-sm'
                      }
                    >
                      <span className="text-xs text-gray-500">
                        Are you sure?{' '}
                        <button
                          onClick={() => onRemove(resourceId)}
                          className="mx-0.5 text-red-500 underline underline-offset-1"
                        >
                          Yes
                        </button>{' '}
                        <button
                          onClick={() => setRemovingRoadmapId('')}
                          className="text-red-500 underline underline-offset-1"
                        >
                          No
                        </button>
                      </span>
                    </div>
                  )}
                  {(!removingRoadmapId || removingRoadmapId !== resourceId) && (
                    <div className={'flex w-full justify-between p-3'}>
                      <button
                        type="button"
                        className={
                          'text-xs text-gray-500 underline hover:text-black focus:outline-none'
                        }
                        onClick={() => {
                          if (isCustomResource) {
                            window.open(
                              `${
                                import.meta.env.PUBLIC_EDITOR_APP_URL
                              }/${resourceId}`,
                              '_blank',
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
                        onClick={() => setRemovingRoadmapId(resourceId)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}
