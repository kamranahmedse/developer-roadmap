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

  console.log(allRoadmaps);

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

  if (!isLoading && learningRoadmapsToShow.length === 0) {
    return (
      <div className="flex flex-col items-center p-4 py-10">
        {pickRoadmapOptionModal}
        {addRoadmapModal}
        {createRoadmapModal}
        {confirmationContentIdModal}

        <RoadmapIcon className="mb-4 h-24 w-24 opacity-10" />

        <h3 className="mb-1 text-2xl font-bold text-gray-900">No roadmaps</h3>
        <p className="text-base text-gray-500">
          {canManageCurrentTeam
            ? 'Add a roadmap to start tracking your team'
            : 'Ask your team admin to add some roadmaps'}
        </p>

        {canManageCurrentTeam && (
          <button
            className="mt-4 rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-900"
            onClick={() => setIsPickingOptions(true)}
          >
            Add roadmap
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {pickRoadmapOptionModal}
      {addRoadmapModal}
      {createRoadmapModal}
      {confirmationContentIdModal}

      <h2 className="mb-3 text-xs uppercase text-gray-400">Roadmaps</h2>
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
              onClick={() => setIsAddingRoadmap(true)}
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
