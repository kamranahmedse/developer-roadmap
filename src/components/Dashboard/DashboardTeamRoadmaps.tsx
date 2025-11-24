import { useEffect, useMemo, useState } from 'react';
import { ResourceProgress } from '../Activity/ResourceProgress';
import { RoadmapIcon } from '../ReactIcons/RoadmapIcon';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { LoadingProgress } from './LoadingProgress';
import { PickRoadmapOptionModal } from '../TeamRoadmaps/PickRoadmapOptionModal';
import { SelectRoadmapModal } from '../CreateTeam/SelectRoadmapModal';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { ContentConfirmationModal } from '../CreateTeam/ContentConfirmationModal';
import { httpGet, httpPut } from '../../lib/http';
import type { PageType } from '../CommandMenu/CommandMenu';
import { useToast } from '../../hooks/use-toast';
import type { TeamResourceConfig } from '../CreateTeam/RoadmapSelector';
import { pageProgressMessage } from '../../stores/page';
import type { BuiltInRoadmap } from './PersonalDashboard';
import { MapIcon, Users2 } from 'lucide-react';

type DashboardTeamRoadmapsProps = {
  isLoading: boolean;
  teamId: string;
  learningRoadmapsToShow: (UserProgress & {
    defaultRoadmapId?: string;
  })[];
  canManageCurrentTeam: boolean;
  onUpdate: () => void;

  builtInRoleRoadmaps: BuiltInRoadmap[];
  builtInSkillRoadmaps: BuiltInRoadmap[];
};

export function DashboardTeamRoadmaps(props: DashboardTeamRoadmapsProps) {
  const {
    isLoading,
    teamId,
    learningRoadmapsToShow,
    canManageCurrentTeam,
    onUpdate,

    builtInRoleRoadmaps,
    builtInSkillRoadmaps,
  } = props;

  const toast = useToast();
  const [isPickingOptions, setIsPickingOptions] = useState(false);
  const [isAddingRoadmap, setIsAddingRoadmap] = useState(false);
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
  const [confirmationContentId, setConfirmationContentId] = useState<string>();

  const allRoadmaps = useMemo(
    () =>
      builtInRoleRoadmaps.concat(builtInSkillRoadmaps).map((r) => {
        return {
          id: r.id,
          title: r.title,
          url: r.url,
          group: 'Roadmaps',
          renderer: r.renderer || 'balsamiq',
          metadata: r.metadata,
        };
      }),
    [builtInRoleRoadmaps, builtInSkillRoadmaps],
  );

  async function onAdd(roadmapId: string, shouldCopyContent = false) {
    if (!teamId) {
      return;
    }

    toast.loading('Adding roadmap');
    pageProgressMessage.set('Adding roadmap');
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

    onUpdate();
    toast.success('Roadmap added');
    if (roadmap?.renderer === 'editor') {
      setIsAddingRoadmap(false);
    }
  }

  async function deleteResource(roadmapId: string) {
    if (!teamId) {
      return;
    }

    toast.loading('Deleting roadmap');
    pageProgressMessage.set(`Deleting roadmap from team`);
    const { error, response } = await httpPut<TeamResourceConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-delete-team-resource-config/${
        teamId
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
    onUpdate();
  }

  async function onRemove(resourceId: string) {
    pageProgressMessage.set('Removing roadmap');

    deleteResource(resourceId).finally(() => {
      pageProgressMessage.set('');
    });
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
    (r) => !learningRoadmapsToShow.find((c) => c?.defaultRoadmapId === r.id),
  );

  const addRoadmapModal = isAddingRoadmap && (
    <SelectRoadmapModal
      onClose={() => setIsAddingRoadmap(false)}
      teamResourceConfig={learningRoadmapsToShow.map((r) => r.resourceId)}
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
        setIsCreatingRoadmap(false);
      }}
    />
  );

  const roadmapHeading = (
    <div className="mb-3 flex h-[20px] items-center justify-between gap-2 text-xs">
      <h2 className="uppercase text-gray-400">Roadmaps</h2>
      <span className="mx-3 h-[1px] grow bg-gray-200" />
      {canManageCurrentTeam && (
        <a
          href={`/team/roadmaps?t=${teamId}`}
          className="flex flex-row items-center rounded-full bg-gray-400 px-2.5 py-0.5 text-xs text-white transition-colors hover:bg-black"
        >
          <MapIcon className="mr-1.5 size-3" strokeWidth={2.5} />
          Roadmaps
        </a>
      )}
    </div>
  );

  if (!isLoading && learningRoadmapsToShow.length === 0) {
    return (
      <>
        {roadmapHeading}
        <div className="flex flex-col items-center rounded-md border bg-white p-4 py-10">
          {pickRoadmapOptionModal}
          {addRoadmapModal}
          {createRoadmapModal}
          {confirmationContentIdModal}

          <RoadmapIcon className="mb-4 h-14 w-14 opacity-10" />

          <h2 className="text-lg font-semibold sm:text-lg">No roadmaps</h2>
          <p className="my-1 max-w-[400px] text-balance text-sm text-gray-500 sm:my-2 sm:text-base">
            {canManageCurrentTeam
              ? 'Add a roadmap to start tracking your team'
              : 'Ask your team admin to add some roadmaps'}
          </p>

          {canManageCurrentTeam && (
            <button
              className="mt-1 rounded-lg bg-black px-3 py-1 text-sm font-medium text-white hover:bg-gray-900"
              onClick={() => setIsPickingOptions(true)}
            >
              Add roadmap
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {pickRoadmapOptionModal}
      {addRoadmapModal}
      {createRoadmapModal}
      {confirmationContentIdModal}

      {roadmapHeading}
      {isLoading && <LoadingProgress />}
      {!isLoading && learningRoadmapsToShow.length > 0 && (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
          {learningRoadmapsToShow.map((roadmap) => {
            const learningCount = roadmap.learning || 0;
            const doneCount = roadmap.done || 0;
            const totalCount = roadmap.total || 0;
            const skippedCount = roadmap.skipped || 0;

            return (
              <ResourceProgress
                key={roadmap.resourceId}
                isCustomResource={roadmap?.isCustomResource || false}
                doneCount={doneCount > totalCount ? totalCount : doneCount}
                learningCount={
                  learningCount > totalCount ? totalCount : learningCount
                }
                totalCount={totalCount}
                skippedCount={skippedCount}
                resourceId={roadmap.resourceId}
                resourceType="roadmap"
                updatedAt={roadmap.updatedAt}
                title={roadmap.resourceTitle}
                showActions={false}
                roadmapSlug={roadmap.roadmapSlug}
              />
            );
          })}

          {canManageCurrentTeam && (
            <button
              onClick={() => setIsPickingOptions(true)}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-300 bg-white px-3 py-2 text-center text-sm text-gray-500 transition-all hover:border-gray-400 hover:text-black"
            >
              + Add Roadmap
            </button>
          )}
        </div>
      )}
    </>
  );
}
