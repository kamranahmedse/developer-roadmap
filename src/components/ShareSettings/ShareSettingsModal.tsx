import { useState, type ReactNode, useCallback, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ShareFriendList, type ListFriendsResponse } from './ShareFriendList';
import { TransferToTeamList } from './TransferToTeamList';
import { ShareSettingsTabs } from './ShareSettingsTab';
import {
  ShareTeamMemberList,
  type AllowedMemberStatus,
  type TeamMemberList,
  type AllowedMemberRoles,
} from './ShareTeamMemberList';
import type { AllowedRoadmapVisibility } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { cn } from '../../lib/classname';

export type OnShareSettingsUpdate = (options: {
  visibility: AllowedRoadmapVisibility;
  sharedTeamMemberIds: string[];
  sharedFriendIds: string[];
}) => void;

export type GetUserTeamsResponse = {
  _id: string;
  name: string;
  avatar?: string;
  type: 'company' | 'study_group';
  memberId: string;
  roadmaps: string[];
  role: AllowedMemberRoles;
  status: AllowedMemberStatus;
};

type ShareSettingsModalProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onClose: () => void;
  visibility: AllowedRoadmapVisibility;
  sharedFriendIds?: string[];
  sharedTeamMemberIds?: string[];
  teamId?: string;
  roadmapId?: string;

  onShareSettingsUpdate: OnShareSettingsUpdate;
  onTransferRoadmap: (teamId: string) => void;
};

export function ShareSettingsModal(props: ShareSettingsModalProps) {
  const {
    isLoading,
    setIsLoading,
    onClose,
    visibility: defaultVisibility,
    sharedTeamMemberIds: defaultSharedMemberIds = [],
    sharedFriendIds: defaultSharedFriendIds = [],
    teamId,
    roadmapId,
    onShareSettingsUpdate,
    onTransferRoadmap,
  } = props;

  const [visibility, setVisibility] = useState(defaultVisibility);
  const [sharedTeamMemberIds, setSharedTeamMemberIds] = useState<string[]>(
    defaultSharedMemberIds
  );
  const [sharedFriendIds, setSharedFriendIds] = useState<string[]>(
    defaultSharedFriendIds
  );
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const [friends, setFriends] = useState<ListFriendsResponse>([]);
  const [teams, setTeams] = useState<GetUserTeamsResponse[]>([]);
  const [members, setMembers] = useState<TeamMemberList[]>([]);

  const isTransferingToTeam = visibility === 'team' && !teamId;

  let isUpdateDisabled = false;
  // Disable update button if there are no friends to share with
  if (visibility === 'friends' && sharedFriendIds.length === 0) {
    isUpdateDisabled = true;
    // Disable update button if there are no team to transfer
  } else if (isTransferingToTeam && !selectedTeamId) {
    isUpdateDisabled = true;
    // Disable update button if there are no members to share with
  } else if (
    visibility === 'team' &&
    teamId &&
    sharedTeamMemberIds.length === 0
  ) {
    isUpdateDisabled = true;
  }

  return (
    <>
      <ShareSettingsTabs
        visibility={visibility}
        setVisibility={setVisibility}
        teamId={teamId}
        onChange={(visibility) => {
          setSelectedTeamId(null);

          if (['me', 'public'].includes(visibility)) {
            setSharedTeamMemberIds([]);
            setSharedFriendIds([]);
          } else if (visibility === 'friends') {
            // If there are no friends to share with, share with all friends by default
            setSharedFriendIds(
              defaultSharedFriendIds.length > 0
                ? defaultSharedFriendIds
                : friends.map((friend) => friend.userId?.toString()!)
            );
          } else if (visibility === 'team' && teamId) {
            // If there are no members to share with, share with all members by default
            setSharedTeamMemberIds(
              defaultSharedMemberIds?.length > 0
                ? defaultSharedMemberIds
                : members.map((member) => member._id?.toString()!)
            );
            setSharedFriendIds([]);
          } else {
            setSharedFriendIds([]);
            setSharedTeamMemberIds([]);
          }
        }}
      />

      <div className="mt-4 flex grow flex-col">
        {visibility === 'public' && (
          <p>Anyone who has the link will be able to access this roadmap.</p>
        )}
        {visibility === 'me' && (
          <p>Only you will be able to access this roadmap.</p>
        )}

        {/* For Personal Roadmap */}
        {visibility === 'friends' && (
          <ShareFriendList
            defaultSharedFriendIds={defaultSharedFriendIds}
            friends={friends}
            setFriends={setFriends}
            sharedFriendIds={sharedFriendIds}
            setSharedFriendIds={setSharedFriendIds}
          />
        )}
        {isTransferingToTeam && (
          <TransferToTeamList
            teams={teams}
            setTeams={setTeams}
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
          />
        )}

        {/* For Team Roadmap */}
        {visibility === 'team' && teamId && (
          <ShareTeamMemberList
            defaultSharedMemberIds={defaultSharedMemberIds}
            teamId={teamId}
            sharedTeamMemberIds={sharedTeamMemberIds}
            setSharedTeamMemberIds={setSharedTeamMemberIds}
            members={members}
            setMembers={setMembers}
          />
        )}
      </div>

      <div className="mt-2 flex items-center justify-between gap-1.5">
        <button
          className="flex items-center justify-center gap-1.5 rounded-md border px-3.5 py-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75"
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </button>

        {isTransferingToTeam ? (
          <UpdateAction
            disabled={isUpdateDisabled || isLoading}
            onClick={() => {
              onTransferRoadmap(selectedTeamId!);
            }}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Transfer
          </UpdateAction>
        ) : (
          <UpdateAction
            disabled={isUpdateDisabled || isLoading}
            onClick={() => {
              onShareSettingsUpdate({
                visibility,
                sharedTeamMemberIds:
                  visibility === 'team' ? sharedTeamMemberIds : [],
                sharedFriendIds:
                  visibility === 'friends' ? sharedFriendIds : [],
              });
            }}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Update Share Settings
          </UpdateAction>
        )}
      </div>
    </>
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
        'flex min-w-[120px] items-center justify-center gap-1.5 rounded-md border bg-gray-900 px-3.5 py-1.5 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-75',
        disabled && 'bg-gray-200 text-gray-500 hover:bg-gray-200',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
