import { type ReactNode, useCallback, useState, useMemo } from 'react';
import { Globe2, Loader2, Lock } from 'lucide-react';
import { type ListFriendsResponse, ShareFriendList } from './ShareFriendList';
import { TransferToTeamList } from './TransferToTeamList';
import { ShareOptionTabs } from './ShareOptionsTab';
import {
  ShareTeamMemberList,
  type TeamMemberList,
} from './ShareTeamMemberList';
import { ShareSuccess } from './ShareSuccess';
import { useToast } from '../../hooks/use-toast';
import type { AllowedRoadmapVisibility } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { httpPatch } from '../../lib/http';
import { Modal } from '../Modal';
import { cn } from '../../lib/classname';
import type { UserTeamItem } from '../TeamDropdown/TeamDropdown';

export type OnShareSettingsUpdate = (options: {
  isDiscoverable: boolean;
  visibility: AllowedRoadmapVisibility;
  sharedTeamMemberIds: string[];
  sharedFriendIds: string[];
}) => void;

type ShareOptionsModalProps = {
  onClose: () => void;
  visibility: AllowedRoadmapVisibility;
  isDiscoverable?: boolean;
  sharedFriendIds?: string[];
  sharedTeamMemberIds?: string[];
  teamId?: string;
  roadmapId?: string;
  description?: string;
  roadmapSlug?: string;

  onShareSettingsUpdate: OnShareSettingsUpdate;
};

export function ShareOptionsModal(props: ShareOptionsModalProps) {
  const {
    roadmapId,
    roadmapSlug,
    onClose,
    isDiscoverable: defaultIsDiscoverable = false,
    visibility: defaultVisibility,
    sharedTeamMemberIds: defaultSharedMemberIds = [],
    sharedFriendIds: defaultSharedFriendIds = [],
    teamId,
    onShareSettingsUpdate,
    description,
  } = props;

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isTransferringToTeam, setIsTransferringToTeam] = useState(false);
  const [isSettingsUpdated, setIsSettingsUpdated] = useState(false);
  const [friends, setFriends] = useState<ListFriendsResponse>([]);
  const [teams, setTeams] = useState<UserTeamItem[]>([]);

  // Using global team members loading state to avoid glitchy UI when switching between teams
  const [isTeamMembersLoading, setIsTeamMembersLoading] = useState(false);
  const membersCache = useMemo(() => new Map<string, TeamMemberList[]>(), []);

  const [visibility, setVisibility] = useState(defaultVisibility);
  const [isDiscoverable, setIsDiscoverable] = useState(defaultIsDiscoverable);
  const [sharedTeamMemberIds, setSharedTeamMemberIds] = useState<string[]>(
    defaultSharedMemberIds,
  );
  const [sharedFriendIds, setSharedFriendIds] = useState<string[]>(
    defaultSharedFriendIds,
  );
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  let isUpdateDisabled = false;
  // Disable update button if there are no friends to share with
  if (visibility === 'friends' && sharedFriendIds.length === 0) {
    isUpdateDisabled = true;
    // Disable update button if there are no team to transfer
  } else if (isTransferringToTeam && !selectedTeamId) {
    isUpdateDisabled = true;
    // Disable update button if there are no members to share with
  } else if (
    visibility === 'team' &&
    teamId &&
    sharedTeamMemberIds.length === 0
  ) {
    isUpdateDisabled = true;
  }

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
        isDiscoverable,
      },
    );

    if (error) {
      toast.error(error?.message || 'Something went wrong, please try again');
      return;
    }

    setIsLoading(false);
    setIsSettingsUpdated(true);
    onShareSettingsUpdate({
      isDiscoverable,
      sharedFriendIds,
      visibility,
      sharedTeamMemberIds,
    });
  };

  const handleTransferToTeam = useCallback(
    async (teamId: string, sharedTeamMemberIds: string[]) => {
      if (!roadmapId) {
        return;
      }

      setIsLoading(true);
      const { response, error } = await httpPatch(
        `${import.meta.env.PUBLIC_API_URL}/v1-transfer-roadmap/${roadmapId}`,
        {
          teamId,
          sharedTeamMemberIds,
          isDiscoverable,
        },
      );

      if (error) {
        setIsLoading(false);
        toast.error(error?.message || 'Something went wrong, please try again');
        return;
      }

      window.location.reload();
    },
    [roadmapId],
  );

  if (isSettingsUpdated) {
    return (
      <Modal
        onClose={onClose}
        wrapperClassName="max-w-lg"
        bodyClassName="p-4 flex flex-col"
      >
        <ShareSuccess
          roadmapSlug={roadmapSlug}
          visibility={visibility}
          roadmapId={roadmapId!}
          description={description}
          onClose={onClose}
        />
      </Modal>
    );
  }

  return (
    <Modal
      onClose={() => {
        if (isLoading) {
          return;
        }
        onClose();
      }}
      wrapperClassName="max-w-3xl"
      bodyClassName="p-4 flex flex-col min-h-[440px]"
    >
      <div className="mb-4">
        <h3 className="mb-1 text-xl font-semibold">Update Sharing Settings</h3>
        <p className="text-sm text-gray-500">
          Pick and modify who can access this roadmap.
        </p>
      </div>

      <ShareOptionTabs
        isTransferringToTeam={isTransferringToTeam}
        setIsTransferringToTeam={setIsTransferringToTeam}
        visibility={visibility}
        setVisibility={setVisibility}
        teamId={teamId}
        onChange={(visibility) => {
          setSelectedTeamId(null);

          if (['me', 'public'].includes(visibility)) {
            setSharedTeamMemberIds([]);
            setSharedFriendIds([]);
          } else if (visibility === 'friends') {
            setSharedFriendIds(
              defaultSharedFriendIds.length > 0 ? defaultSharedFriendIds : [],
            );
          } else if (visibility === 'team' && teamId) {
            setSharedTeamMemberIds(
              defaultSharedMemberIds?.length > 0 ? defaultSharedMemberIds : [],
            );
            setSharedFriendIds([]);
          } else {
            setSharedFriendIds([]);
            setSharedTeamMemberIds([]);
          }

          setIsDiscoverable(visibility === 'public');
        }}
      />

      <div className="mt-4 flex grow flex-col">
        {!isTransferringToTeam && (
          <>
            {visibility === 'public' && (
              <div className="flex h-full grow flex-col items-center justify-center rounded-md border bg-gray-50 text-center">
                <Globe2 className="mb-3 h-10 w-10 text-gray-300" />
                <p className="font-medium text-gray-500">
                  Anyone with the link can access.
                </p>
              </div>
            )}
            {visibility === 'me' && (
              <div className="flex h-full grow flex-col items-center justify-center rounded-md border bg-gray-50 text-center">
                <Lock className="mb-3 h-10 w-10 text-gray-300" />
                <p className="font-medium text-gray-500">
                  Only you will be able to access.
                </p>
              </div>
            )}
            {/* For Personal Roadmap */}
            {visibility === 'friends' && (
              <ShareFriendList
                friends={friends}
                setFriends={setFriends}
                sharedFriendIds={sharedFriendIds}
                setSharedFriendIds={setSharedFriendIds}
              />
            )}

            {/* For Team Roadmap */}
            {visibility === 'team' && teamId && (
              <ShareTeamMemberList
                teamId={teamId}
                sharedTeamMemberIds={sharedTeamMemberIds}
                setSharedTeamMemberIds={setSharedTeamMemberIds}
                membersCache={membersCache}
                isTeamMembersLoading={isTeamMembersLoading}
                setIsTeamMembersLoading={setIsTeamMembersLoading}
              />
            )}
          </>
        )}

        {isTransferringToTeam && (
          <>
            <TransferToTeamList
              currentTeamId={teamId}
              teams={teams}
              setTeams={setTeams}
              selectedTeamId={selectedTeamId}
              setSelectedTeamId={setSelectedTeamId}
              isTeamMembersLoading={isTeamMembersLoading}
              setIsTeamMembersLoading={setIsTeamMembersLoading}
              onTeamChange={() => {
                setSharedTeamMemberIds([]);
              }}
            />
            {selectedTeamId && (
              <>
                <hr className="-mx-4 my-4" />
                <div className="mb-4">
                  <ShareTeamMemberList
                    title="Select who can access this roadmap. You can change this later."
                    teamId={selectedTeamId!}
                    sharedTeamMemberIds={sharedTeamMemberIds}
                    setSharedTeamMemberIds={setSharedTeamMemberIds}
                    membersCache={membersCache}
                    isTeamMembersLoading={isTeamMembersLoading}
                    setIsTeamMembersLoading={setIsTeamMembersLoading}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {visibility !== 'me' && (
        <>
          <hr className="-mx-4 my-4" />
          <div className="mb-2">
            <DiscoveryCheckbox
              isDiscoverable={isDiscoverable}
              setIsDiscoverable={setIsDiscoverable}
            />
          </div>
        </>
      )}

      <div className="mt-2 flex items-center justify-between gap-1.5">
        <button
          className="flex items-center justify-center gap-1.5 rounded-md border px-3.5 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75"
          disabled={isLoading}
          onClick={onClose}
        >
          Close
        </button>

        {isTransferringToTeam && (
          <UpdateAction
            disabled={
              isUpdateDisabled || isLoading || sharedTeamMemberIds.length === 0
            }
            onClick={() => {
              handleTransferToTeam(selectedTeamId!, sharedTeamMemberIds).then(
                () => null,
              );
            }}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Transfer
          </UpdateAction>
        )}

        {!isTransferringToTeam && (
          <UpdateAction
            disabled={isUpdateDisabled || isLoading}
            onClick={() => {
              handleShareChange({
                isDiscoverable,
                visibility,
                sharedTeamMemberIds:
                  visibility === 'team' ? sharedTeamMemberIds : [],
                sharedFriendIds:
                  visibility === 'friends' ? sharedFriendIds : [],
              });
            }}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Update Sharing Settings
          </UpdateAction>
        )}
      </div>
    </Modal>
  );
}

function UpdateAction(props: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const { onClick, disabled, children, className } = props;

  return (
    <button
      className={cn(
        'flex min-w-[120px] items-center justify-center gap-1.5 rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-75',
        disabled && 'border-gray-700 bg-gray-700 text-white hover:bg-gray-700',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type DiscoveryCheckboxProps = {
  isDiscoverable: boolean;
  setIsDiscoverable: (isDiscoverable: boolean) => void;
};

function DiscoveryCheckbox(props: DiscoveryCheckboxProps) {
  const { isDiscoverable, setIsDiscoverable } = props;

  return (
    <label className="group flex items-center gap-1.5">
      <input
        type="checkbox"
        checked={isDiscoverable}
        onChange={(e) => setIsDiscoverable(e.target.checked)}
      />
      <span className="text-sm text-gray-500 group-hover:text-gray-700">
        Include on discovery page
      </span>
    </label>
  );
}
