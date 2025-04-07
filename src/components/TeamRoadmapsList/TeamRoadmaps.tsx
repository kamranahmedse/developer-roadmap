import { getUrlParams } from '../../lib/browser';
import { useEffect, useState } from 'react';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import type { TeamResourceConfig } from '../CreateTeam/RoadmapSelector';
import { httpGet, httpPut } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import type { PageType } from '../CommandMenu/CommandMenu';
import { useStore } from '@nanostores/react';
import { $canManageCurrentTeam } from '../../stores/team';
import { useToast } from '../../hooks/use-toast';
import { SelectRoadmapModal } from '../CreateTeam/SelectRoadmapModal';
import { PickRoadmapOptionModal } from '../TeamRoadmaps/PickRoadmapOptionModal';
import type { AllowedRoadmapVisibility } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import {
  ExternalLink,
  Globe,
  LockIcon,
  type LucideIcon,
  Package,
  PackageMinus,
  PenSquare,
  Shapes,
  Users,
} from 'lucide-react';
import { RoadmapActionDropdown } from './RoadmapActionDropdown';
import { UpdateTeamResourceModal } from '../CreateTeam/UpdateTeamResourceModal';
import { ShareOptionsModal } from '../ShareOptions/ShareOptionsModal';
import { cn } from '../../lib/classname';
import { RoadmapIcon } from '../ReactIcons/RoadmapIcon.tsx';
import { ContentConfirmationModal } from '../CreateTeam/ContentConfirmationModal.tsx';

export function TeamRoadmaps() {
  const { t: teamId } = getUrlParams();

  const canManageCurrentTeam = useStore($canManageCurrentTeam);

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isPickingOptions, setIsPickingOptions] = useState(false);
  const [isAddingRoadmap, setIsAddingRoadmap] = useState(false);
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
  const [changingRoadmapId, setChangingRoadmapId] = useState<string>('');
  const [team, setTeam] = useState<TeamDocument>();
  const [teamResources, setTeamResources] = useState<TeamResourceConfig>([]);
  const [allRoadmaps, setAllRoadmaps] = useState<PageType[]>([]);
  const [selectedResource, setSelectedResource] = useState<
    TeamResourceConfig[0] | null
  >(null);
  const [confirmationContentId, setConfirmationContentId] = useState('');

  async function loadAllRoadmaps() {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);

    if (error) {
      toast.error(error.message || 'Something went wrong');
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

  async function loadTeam(teamIdToFetch: string) {
    const { response, error } = await httpGet<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamIdToFetch}`,
    );

    if (error || !response) {
      toast.error('Error loading team');
      window.location.href = '/account';
      return;
    }

    setTeam(response);
  }

  async function loadTeamResourceConfig(teamId: string) {
    const { error, response } = await httpGet<TeamResourceConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-resource-config/${teamId}`,
    );
    if (error || !Array.isArray(response)) {
      console.error(error);
      return;
    }

    setTeamResources(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    setIsLoading(true);
    Promise.all([
      loadTeam(teamId),
      loadTeamResourceConfig(teamId),
      loadAllRoadmaps(),
    ]).finally(() => {
      pageProgressMessage.set('');
      setIsLoading(false);
    });
  }, [teamId]);

  async function deleteResource(roadmapId: string) {
    if (!team?._id) {
      return;
    }

    toast.loading('Deleting roadmap');
    pageProgressMessage.set(`Deleting roadmap from team`);
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-team-resource-config/${
        team._id
      }`,
      {
        resourceId: roadmapId,
        resourceType: 'roadmap',
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Roadmap removed');
    setTeamResources(response);
  }

  async function onAdd(roadmapId: string, shouldCopyContent = false) {
    if (!teamId) {
      return;
    }

    toast.loading('Adding roadmap');
    pageProgressMessage.set('Adding roadmap');
    setIsLoading(true);
    const roadmap = allRoadmaps.find((r) => r.id === roadmapId);
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-update-team-resource-config/${teamId}`,
      {
        teamId: teamId,
        resourceId: roadmapId,
        resourceType: 'roadmap',
        removed: [],
        renderer: roadmap?.renderer || 'balsamiq',
        shouldCopyContent,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Error adding roadmap');
      return;
    }

    setTeamResources(response);
    toast.success('Roadmap added');
    if (roadmap?.renderer === 'editor') {
      setIsAddingRoadmap(false);
    }
  }

  async function onRemove(resourceId: string) {
    pageProgressMessage.set('Removing roadmap');

    deleteResource(resourceId).finally(() => {
      pageProgressMessage.set('');
    });
  }

  useEffect(() => {
    function handleCustomRoadmapCreated(event: Event) {
      const { roadmapId } = (event as CustomEvent)?.detail;
      if (!roadmapId) {
        return;
      }

      loadAllRoadmaps().finally(() => {});
      onAdd(roadmapId).finally(() => {
        pageProgressMessage.set('');
      });
    }
    window.addEventListener(
      'custom-roadmap-created',
      handleCustomRoadmapCreated,
    );

    return () => {
      window.removeEventListener(
        'custom-roadmap-created',
        handleCustomRoadmapCreated,
      );
    };
  }, []);

  if (!team) {
    return null;
  }

  const pickRoadmapOptionModal = isPickingOptions && (
    <PickRoadmapOptionModal
      onClose={() => setIsPickingOptions(false)}
      showDefaultRoadmapsModal={() => {
        setIsAddingRoadmap(true);
        setIsPickingOptions(false);
      }}
      showCreateCustomRoadmapModal={() => {
        setIsCreatingRoadmap(true);
        setIsPickingOptions(false);
      }}
    />
  );

  const filteredAllRoadmaps = allRoadmaps.filter(
    (r) => !teamResources.find((c) => c?.defaultRoadmapId === r.id),
  );
  const addRoadmapModal = isAddingRoadmap && (
    <SelectRoadmapModal
      onClose={() => setIsAddingRoadmap(false)}
      teamResourceConfig={teamResources.map((c) => c.resourceId)}
      allRoadmaps={filteredAllRoadmaps.filter((r) => r.renderer === 'editor')}
      teamId={teamId}
      onRoadmapAdd={(roadmapId: string) => {
        const isEditorRoadmap = allRoadmaps.find(
          (r) => r.id === roadmapId && r.renderer === 'editor',
        );

        if (!isEditorRoadmap) {
          onAdd(roadmapId).finally(() => {
            pageProgressMessage.set('');
          });

          return;
        }

        setIsAddingRoadmap(false);
        setConfirmationContentId(roadmapId);
      }}
      onRoadmapRemove={(roadmapId: string) => {
        if (confirm('Are you sure you want to remove this roadmap?')) {
          onRemove(roadmapId).finally(() => {});
        }
      }}
    />
  );

  const confirmationContentIdModal = confirmationContentId && (
    <ContentConfirmationModal
      onClose={() => {
        setConfirmationContentId('');
      }}
      onClick={(shouldCopy) => {
        onAdd(confirmationContentId, shouldCopy).finally(() => {
          pageProgressMessage.set('');
          setConfirmationContentId('');
        });
      }}
    />
  );

  const createRoadmapModal = isCreatingRoadmap && (
    <CreateRoadmapModal
      teamId={teamId}
      onClose={() => {
        setIsCreatingRoadmap(false);
      }}
      onCreated={() => {
        loadTeamResourceConfig(teamId).finally(() => null);
        setIsCreatingRoadmap(false);
      }}
    />
  );

  const placeholderRoadmaps = teamResources.filter(
    (c: TeamResourceConfig[0]) => c.isCustomResource && !c.topics,
  );
  const customRoadmaps = teamResources.filter(
    (c: TeamResourceConfig[0]) => c.isCustomResource && c.topics,
  );
  const defaultRoadmaps = teamResources.filter(
    (c: TeamResourceConfig[0]) => !c.isCustomResource,
  );

  const hasRoadmaps =
    customRoadmaps.length > 0 ||
    defaultRoadmaps.length > 0 ||
    (placeholderRoadmaps.length > 0 && canManageCurrentTeam);
  if (!hasRoadmaps && !isLoading) {
    return (
      <div className="flex flex-col items-center p-4 py-20">
        {pickRoadmapOptionModal}
        {addRoadmapModal}
        {createRoadmapModal}
        {confirmationContentIdModal}

        <RoadmapIcon className="mb-3 h-14 w-14 opacity-10" />

        <h3 className="mb-1 text-xl font-bold text-gray-900">No roadmaps</h3>
        <p className="text-base text-gray-500">
          {canManageCurrentTeam
            ? 'Add a roadmap to start tracking your team'
            : 'Ask your team admin to add some roadmaps'}
        </p>

        {canManageCurrentTeam && (
          <button
            className="mt-3 rounded-md bg-black px-3 py-1.5 font-medium text-white hover:bg-gray-900 text-sm"
            onClick={() => setIsPickingOptions(true)}
          >
            Add roadmap
          </button>
        )}
      </div>
    );
  }

  const customizeRoadmapModal = changingRoadmapId && (
    <UpdateTeamResourceModal
      onClose={() => setChangingRoadmapId('')}
      resourceId={changingRoadmapId}
      resourceType={'roadmap'}
      teamId={team?._id!}
      setTeamResourceConfig={setTeamResources}
      defaultRemovedItems={
        defaultRoadmaps.find((c) => c.resourceId === changingRoadmapId)
          ?.removed || []
      }
    />
  );

  const shareSettingsModal = selectedResource && (
    <ShareOptionsModal
      description={selectedResource.description!}
      visibility={selectedResource.visibility!}
      sharedTeamMemberIds={selectedResource.sharedTeamMemberIds!}
      sharedFriendIds={selectedResource.sharedFriendIds!}
      teamId={teamId}
      roadmapId={selectedResource.resourceId}
      onShareSettingsUpdate={(shareSettings) => {
        setTeamResources((prev) => {
          return prev.map((c) => {
            if (c.resourceId !== selectedResource.resourceId) {
              return c;
            }

            return {
              ...c,
              ...shareSettings,
            };
          });
        });
      }}
      onClose={() => setSelectedResource(null)}
    />
  );

  return (
    <div>
      {pickRoadmapOptionModal}
      {addRoadmapModal}
      {createRoadmapModal}
      {customizeRoadmapModal}
      {shareSettingsModal}
      {confirmationContentIdModal}

      {canManageCurrentTeam && placeholderRoadmaps.length > 0 && (
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex w-full items-center justify-between text-xs uppercase text-gray-400">
              <span className="flex">Placeholder Roadmaps</span>
              <span className="normal-case">
                Total {placeholderRoadmaps.length} roadmap(s)
              </span>
            </h3>
          </div>
          <div className="flex flex-col divide-y rounded-md border">
            {placeholderRoadmaps.map(
              (resourceConfig: TeamResourceConfig[0]) => {
                return (
                  <div
                    className="grid grid-cols-1 p-2.5 sm:grid-cols-[auto_173px]"
                    key={resourceConfig.resourceId}
                  >
                    <div className="mb-3 grid sm:mb-0">
                      <p className="mb-1.5 truncate text-base font-medium leading-tight text-black">
                        {resourceConfig.title}
                      </p>
                      <span className="text-xs italic leading-none text-gray-400/60">
                        Placeholder roadmap
                      </span>
                    </div>

                    {canManageCurrentTeam && (
                      <div className="flex items-center justify-start gap-2 sm:justify-end">
                        <RoadmapActionDropdown
                          onUpdateSharing={() => {
                            setSelectedResource(resourceConfig);
                          }}
                          onDelete={() => {
                            if (
                              confirm(
                                'Are you sure you want to remove this roadmap?',
                              )
                            ) {
                              onRemove(resourceConfig.resourceId).finally(
                                () => {},
                              );
                            }
                          }}
                        />
                        <a
                          href={`${import.meta.env.PUBLIC_EDITOR_APP_URL}/${
                            resourceConfig.resourceId
                          }`}
                          className={
                            'flex gap-2 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs hover:bg-gray-50 focus:outline-hidden'
                          }
                          target={'_blank'}
                        >
                          <PenSquare className="inline-block h-4 w-4" />
                          Create Roadmap
                        </a>
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>
      )}

      {customRoadmaps.length > 0 && (
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex w-full items-center justify-between text-xs uppercase text-gray-400">
              <span className="flex">Custom Roadmaps</span>
              <span className="normal-case">
                Total {customRoadmaps.length} roadmap(s)
              </span>
            </h3>
          </div>
          <div className="flex flex-col divide-y rounded-md border">
            {customRoadmaps.map((resourceConfig: TeamResourceConfig[0]) => {
              const editorLink = `${import.meta.env.PUBLIC_EDITOR_APP_URL}/${
                resourceConfig.resourceId
              }`;

              return (
                <div
                  className={cn(
                    'grid grid-cols-1 p-2.5',
                    canManageCurrentTeam
                      ? 'sm:grid-cols-[auto_172px]'
                      : 'sm:grid-cols-[auto_110px]',
                  )}
                  key={resourceConfig.resourceId}
                >
                  <div className="mb-3 grid grid-cols-1 sm:mb-0">
                    <p className="mb-1.5 truncate text-base font-medium leading-tight text-black">
                      {resourceConfig.title}
                    </p>
                    <span className="flex items-center text-xs leading-none text-gray-400">
                      <VisibilityBadge
                        visibility={resourceConfig.visibility!}
                        sharedTeamMemberIds={resourceConfig.sharedTeamMemberIds}
                        sharedFriendIds={resourceConfig.sharedFriendIds}
                      />
                      <span className="mx-2 font-semibold">&middot;</span>
                      <Shapes size={16} className="mr-1 inline-block h-4 w-4" />
                      {resourceConfig.topics} topic
                    </span>
                  </div>
                  <div className="mr-1 flex items-center justify-start sm:justify-end">
                    {canManageCurrentTeam && (
                      <RoadmapActionDropdown
                        onUpdateSharing={() => {
                          setSelectedResource(resourceConfig);
                        }}
                        onCustomize={() => {
                          window.open(editorLink, '_blank');
                        }}
                        onDelete={() => {
                          if (
                            confirm(
                              'Are you sure you want to remove this roadmap?',
                            )
                          ) {
                            onRemove(resourceConfig.resourceId).finally(
                              () => {},
                            );
                          }
                        }}
                      />
                    )}

                    <a
                      href={`/r/${resourceConfig.roadmapSlug}`}
                      className={
                        'ml-2 flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs hover:bg-gray-50 focus:outline-hidden'
                      }
                      target={'_blank'}
                    >
                      <ExternalLink className="inline-block h-4 w-4" />
                      Visit
                    </a>
                    {canManageCurrentTeam && (
                      <a
                        href={editorLink}
                        className={
                          'ml-2 flex items-center gap-2 rounded-md border border-gray-800 bg-gray-900 px-2.5 py-1.5 text-xs text-white hover:bg-gray-800 focus:outline-hidden'
                        }
                        target={'_blank'}
                      >
                        <PenSquare className="inline-block h-4 w-4" />
                        Edit
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {defaultRoadmaps.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex w-full items-center justify-between text-xs uppercase text-gray-400">
              <span className="flex">Default Roadmaps</span>
              <span className="normal-case">
                Total {defaultRoadmaps.length} roadmap(s)
              </span>
            </h3>
          </div>
          <div className="flex flex-col divide-y rounded-md border">
            {defaultRoadmaps.map((resourceConfig: TeamResourceConfig[0]) => {
              return (
                <div
                  className="grid grid-cols-1 p-3 sm:grid-cols-[auto_110px]"
                  key={resourceConfig.resourceId}
                >
                  <div className="mb-3 grid grid-cols-1 sm:mb-0">
                    <p className="mb-1.5 truncate text-base font-medium leading-tight text-black">
                      {resourceConfig.title}
                    </p>
                    <span className="flex items-center text-xs leading-none text-gray-400">
                      {resourceConfig?.removed?.length > 0 && (
                        <>
                          <PackageMinus
                            size={16}
                            className="mr-1 inline-block h-4 w-4"
                          />
                          {resourceConfig.removed.length} topics removed
                        </>
                      )}

                      {!resourceConfig?.removed?.length && (
                        <>
                          <Package
                            size={16}
                            className="mr-1 inline-block h-4 w-4"
                          />
                          No changes made
                        </>
                      )}
                    </span>
                  </div>
                  <div className="mr-1 flex items-center justify-start sm:justify-end">
                    {canManageCurrentTeam && (
                      <RoadmapActionDropdown
                        onCustomize={() => {
                          setChangingRoadmapId(resourceConfig.resourceId);
                        }}
                        onDelete={() => {
                          if (
                            confirm(
                              'Are you sure you want to remove this roadmap?',
                            )
                          ) {
                            onRemove(resourceConfig.resourceId).finally(
                              () => {},
                            );
                          }
                        }}
                      />
                    )}

                    <a
                      href={`/${resourceConfig.resourceId}?t=${teamId}`}
                      className={
                        'ml-2 flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs hover:bg-gray-50 focus:outline-hidden'
                      }
                      target={'_blank'}
                    >
                      <ExternalLink className="inline-block h-4 w-4" />
                      Visit
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {canManageCurrentTeam && (
        <div className="mt-5">
          <button
            className="block w-full rounded-md border border-dashed border-gray-300 py-2 text-sm transition-colors hover:border-gray-600 hover:bg-gray-50 focus:outline-0"
            onClick={() => setIsPickingOptions(true)}
          >
            + Add new Roadmap
          </button>
        </div>
      )}
    </div>
  );
}

type VisibilityLabelProps = {
  visibility: AllowedRoadmapVisibility;
  sharedTeamMemberIds?: string[];
  sharedFriendIds?: string[];
};

const visibilityDetails: Record<
  AllowedRoadmapVisibility,
  {
    icon: LucideIcon;
    label: string;
  }
> = {
  public: {
    icon: Globe,
    label: 'Public',
  },
  me: {
    icon: LockIcon,
    label: 'Only me',
  },
  team: {
    icon: Users,
    label: 'Team Member(s)',
  },
  friends: {
    icon: Users,
    label: 'Friend(s)',
  },
} as const;

export function VisibilityBadge(props: VisibilityLabelProps) {
  const { visibility, sharedTeamMemberIds = [], sharedFriendIds = [] } = props;

  const { label, icon: Icon } = visibilityDetails[visibility];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-normal`}
    >
      <Icon className="inline-block h-3 w-3" />
      <div className="flex items-center">
        {visibility === 'team' && sharedTeamMemberIds?.length > 0 && (
          <span className="mr-1">{sharedTeamMemberIds.length}</span>
        )}
        {visibility === 'friends' && sharedFriendIds?.length > 0 && (
          <span className="mr-1">{sharedFriendIds.length}</span>
        )}
        {label}
      </div>
    </span>
  );
}
