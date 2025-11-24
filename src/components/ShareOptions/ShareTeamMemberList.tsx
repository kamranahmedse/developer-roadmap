import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { UserItem } from './UserItem';
import { Users } from 'lucide-react';
import { httpGet } from '../../lib/http';

const allowedRoles = ['admin', 'manager', 'member'] as const;
const allowedStatus = ['invited', 'joined', 'rejected'] as const;

export type AllowedMemberRoles = (typeof allowedRoles)[number];
export type AllowedMemberStatus = (typeof allowedStatus)[number];

export interface TeamMemberDocument {
  _id?: string;
  userId?: string;
  invitedEmail?: string;
  teamId: string;
  role: AllowedMemberRoles;
  status: AllowedMemberStatus;
  progressReminderCount: number;
  lastProgressReminderAt?: Date;
  lastResendInviteAt?: Date;
  resendInviteCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberList extends TeamMemberDocument {
  name: string;
  avatar: string;
  hasProgress: boolean;
}

type ShareTeamMemberListProps = {
  teamId: string;
  title?: string;
  sharedTeamMemberIds: string[];
  setSharedTeamMemberIds: (sharedTeamMemberIds: string[]) => void;

  membersCache: Map<string, TeamMemberList[]>;
  isTeamMembersLoading: boolean;
  setIsTeamMembersLoading: (isLoading: boolean) => void;
};

export function ShareTeamMemberList(props: ShareTeamMemberListProps) {
  const {
    teamId,
    title = 'Select Members',
    sharedTeamMemberIds,
    setSharedTeamMemberIds,

    membersCache,
    isTeamMembersLoading: isLoading,
    setIsTeamMembersLoading: setIsLoading,
  } = props;

  const toast = useToast();

  async function loadTeamMembers() {
    if (membersCache.has(teamId)) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<TeamMemberList[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-list/${teamId}`
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    const joinedMembers =
      response?.filter((member) => member.status === 'joined') || [];
    membersCache.set(teamId, joinedMembers);
  }

  useEffect(() => {
    loadTeamMembers().finally(() => {
      setIsLoading(false);
    });
  }, [teamId]);

  const loadingMembers = isLoading && (
    <ul className="mt-2 grid grid-cols-3 gap-2.5">
      {[...Array(3)].map((_, idx) => (
        <li
          key={idx}
          className="flex min-h-[66px] animate-pulse items-center gap-2 rounded-md border p-2"
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
          <div className="inline-grid w-full">
            <div className="h-5 w-2/4 rounded-sm bg-gray-200" />
            <div className="mt-1 h-5 w-3/4 rounded-sm bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );

  const members = membersCache.get(teamId) || [];

  return (
    <>
      {(members.length > 0 || isLoading) && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm">{title}</p>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sharedTeamMemberIds.length === members.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setSharedTeamMemberIds(members.map((member) => member._id!));
                } else {
                  setSharedTeamMemberIds([]);
                }
              }}
            />
            <span className="text-sm">Select all</span>
          </label>
        </div>
      )}

      {loadingMembers}
      {members?.length > 0 && !isLoading && (
        <ul className="mt-2 grid grid-cols-3 gap-2.5">
          {members?.map((member) => {
            const isSelected = sharedTeamMemberIds?.includes(
              member._id?.toString()!
            );
            return (
              <li key={member.userId}>
                <UserItem
                  user={{
                    name: member.name,
                    avatar: member.avatar,
                    email: member.invitedEmail!,
                  }}
                  isSelected={isSelected}
                  onClick={() => {
                    if (isSelected) {
                      setSharedTeamMemberIds(
                        sharedTeamMemberIds.filter(
                          (id) => id !== member._id?.toString()!
                        )
                      );
                    } else {
                      setSharedTeamMemberIds([
                        ...sharedTeamMemberIds,
                        member._id?.toString()!,
                      ]);
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}

      {members.length === 0 && !isLoading && (
        <div className="flex grow flex-col items-center justify-center gap-2">
          <Users className="h-12 w-12 text-gray-500" />
          <p className="text-gray-500">No members have been added yet.</p>
        </div>
      )}
    </>
  );
}
