import { useCallback, useState } from 'react';
import {
  ShareSettingsModal,
  type OnShareSettingsUpdate,
} from './ShareSettingsModal';
import { CopyRoadmapLink } from './CopyRoadmapLink';
import { useToast } from '../../hooks/use-toast';
import type { AllowedRoadmapVisibility } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { httpPatch } from '../../lib/http';
import { Modal } from '../Modal';
import { cn } from '../../lib/classname';

type ShareSettingsProps = {
  visibility: AllowedRoadmapVisibility;
  teamId?: string;
  roadmapId: string;
  sharedFriendIds: string[];
  sharedTeamMemberIds: string[];

  onShareSettingsUpdate?: OnShareSettingsUpdate;
  onClose: () => void;
};

export function ShareSettings(props: ShareSettingsProps) {
  const {
    visibility,
    teamId,
    roadmapId,
    onShareSettingsUpdate,
    sharedFriendIds,
    sharedTeamMemberIds,

    onClose,
  } = props;

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsUpdated, setIsSettingsUpdated] = useState(false);

  const handleShareChange: OnShareSettingsUpdate = async ({
    sharedFriendIds,
    visibility,
    sharedTeamMemberIds,
  }) => {
    setIsLoading(true);

    if (visibility === 'friends' && sharedFriendIds.length === 0) {
      toast.error('Please select at least one friend');
      return;
    } else if (
      visibility === 'team' &&
      teamId &&
      sharedTeamMemberIds.length === 0
    ) {
      toast.error('Please select at least one member');
      return;
    }

    const { response, error } = await httpPatch(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-update-roadmap-visibility/${roadmapId}`,
      {
        visibility,
        sharedFriendIds,
        sharedTeamMemberIds,
      }
    );

    if (error) {
      toast.error(error?.message || 'Something went wrong, please try again');
      return;
    }

    setIsLoading(false);
    setIsSettingsUpdated(true);
    onShareSettingsUpdate?.({
      sharedFriendIds,
      visibility,
      sharedTeamMemberIds,
    });
  };

  const handleTransferToTeam = useCallback(
    async (teamId: string) => {
      if (!roadmapId) {
        return;
      }

      setIsLoading(true);
      const { response, error } = await httpPatch(
        `${import.meta.env.PUBLIC_API_URL}/v1-transfer-roadmap/${roadmapId}`,
        {
          teamId,
        }
      );

      if (error) {
        setIsLoading(false);
        toast.error(error?.message || 'Something went wrong, please try again');
        return;
      }

      window.location.reload();
    },
    [roadmapId]
  );

  const handleClose = () => {
    if (isLoading) {
      return;
    }

    setIsSettingsUpdated(false);
    onClose();
  };

  return (
    <Modal
      onClose={handleClose}
      wrapperClassName={cn(isSettingsUpdated ? 'max-w-lg' : 'max-w-3xl')}
      bodyClassName={cn(
        'p-4 flex flex-col',
        isSettingsUpdated ? '' : 'min-h-[400px]'
      )}
    >
      {isSettingsUpdated ? (
        <CopyRoadmapLink roadmapId={roadmapId} onClose={handleClose} />
      ) : (
        <ShareSettingsModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onClose={handleClose}
          sharedFriendIds={sharedFriendIds}
          sharedTeamMemberIds={sharedTeamMemberIds}
          visibility={visibility}
          teamId={teamId}
          roadmapId={roadmapId}
          onShareSettingsUpdate={handleShareChange}
          onTransferRoadmap={(teamId) => {
            handleTransferToTeam(teamId);
          }}
        />
      )}
    </Modal>
  );
}
