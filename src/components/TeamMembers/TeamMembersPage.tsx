import { useEffect, useState } from 'react';
import { httpDelete, httpGet, httpPatch } from '../../lib/http';
import { useAuth } from '../../hooks/use-auth';
import { pageProgressMessage } from '../../stores/page';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import { LeaveTeamButton } from './LeaveTeamButton';
import type { AllowedRoles } from '../CreateTeam/RoleDropdown';
import type { AllowedMemberStatus } from '../TeamDropdown/TeamDropdown';
import { InviteMemberPopup } from './InviteMemberPopup';
import { getUrlParams } from '../../lib/browser';
import { UpdateMemberPopup } from './UpdateMemberPopup';
import { useStore } from '@nanostores/react';
import { $canManageCurrentTeam } from '../../stores/team';
import { useToast } from '../../hooks/use-toast';
import { TeamMemberItem } from './TeamMemberItem';

export interface TeamMemberDocument {
  _id?: string;
  userId?: string;
  invitedEmail?: string;
  teamId: string;
  role: AllowedRoles;
  status: AllowedMemberStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResourceProgressDocument {
  _id?: string;
  userId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  isFavorite?: boolean;
  done: string[];
  learning: string[];
  skipped: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMemberItem extends TeamMemberDocument {
  name: string;
  avatar: string;
  hasProgress: boolean;
}

const MAX_MEMBER_COUNT = 200;

export function TeamMembersPage() {
  const { t: teamId } = getUrlParams();

  const toast = useToast();
  const canManageCurrentTeam = useStore($canManageCurrentTeam);

  const [memberToUpdate, setMemberToUpdate] = useState<TeamMemberItem>();
  const [isInvitingMember, setIsInvitingMember] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  const [team, setTeam] = useState<TeamDocument>();

  const user = useAuth();

  async function loadTeam() {
    const { response, error } = await httpGet<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamId}`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    if (response) {
      setTeam(response);
    }
  }

  async function getTeamMemberList() {
    const { response, error } = await httpGet<TeamMemberItem[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-list/${teamId}`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to load team member list');
      return;
    }

    setTeamMembers(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    Promise.all([loadTeam(), getTeamMemberList()]).finally(() => {
      pageProgressMessage.set('');
    });
  }, [teamId]);
  async function deleteMember(teamId: string, memberId: string) {
    pageProgressMessage.set('Deleting member');
    const { response, error } = await httpDelete(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-delete-member/${teamId}/${memberId}`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Member has been deleted');
    await getTeamMemberList();
  }

  async function resendInvite(teamId: string, memberId: string) {
    pageProgressMessage.set('Resending Invite');
    const { response, error } = await httpPatch(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-resend-invite/${teamId}/${memberId}`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Invite has been sent');
  }

  async function handleSendReminder(teamId: string, memberId: string) {
    pageProgressMessage.set('Sending Reminder');
    const { response, error } = await httpPatch(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-send-progress-reminder/${teamId}/${memberId}`,
      {},
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Reminder has been sent');
  }

  const joinedMembers = teamMembers.filter(
    (member) => member.status === 'joined',
  );
  const invitedMembers = teamMembers.filter(
    (member) => member.status === 'invited',
  );
  const rejectedMembers = teamMembers.filter(
    (member) => member.status === 'rejected',
  );

  return (
    <div>
      {memberToUpdate && (
        <UpdateMemberPopup
          member={memberToUpdate}
          onUpdated={() => {
            pageProgressMessage.set('Refreshing members');
            getTeamMemberList().finally(() => {
              pageProgressMessage.set('');
            });
            setMemberToUpdate(undefined);
            toast.success('Member has been updated');
          }}
          onClose={() => {
            setMemberToUpdate(undefined);
          }}
        />
      )}
      {isInvitingMember && (
        <InviteMemberPopup
          onInvited={() => {
            toast.success('Invite sent');
            getTeamMemberList().then(() => null);
            setIsInvitingMember(false);
          }}
          onClose={() => {
            setIsInvitingMember(false);
          }}
        />
      )}
      <div>
        <div className="rounded-md border">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <p className="hidden text-sm sm:block">
              {teamMembers.length} people in the team.
            </p>
            <p className="block text-sm sm:hidden">
              {teamMembers.length} members
            </p>
            <LeaveTeamButton teamId={team?._id!} />
          </div>
          {joinedMembers.map((member, index) => {
            return (
              <TeamMemberItem
                key={index}
                member={member}
                index={index}
                teamId={teamId}
                userId={user?.id!}
                canViewProgress={
                  canManageCurrentTeam ||
                  !team?.personalProgressOnly ||
                  String(member.userId) === user?.id
                }
                onResendInvite={() => {
                  resendInvite(teamId, member._id!).finally(() => {
                    pageProgressMessage.set('');
                  });
                }}
                canManageCurrentTeam={canManageCurrentTeam}
                onDeleteMember={() => {
                  deleteMember(teamId, member._id!).finally(() => {
                    pageProgressMessage.set('');
                  });
                }}
                onUpdateMember={() => {
                  setMemberToUpdate(member);
                }}
                onSendProgressReminder={() => {
                  handleSendReminder(teamId, member._id!).finally(() => {
                    pageProgressMessage.set('');
                  });
                }}
              />
            );
          })}
        </div>

        {invitedMembers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs uppercase text-gray-400">Invited Members</h3>
            <div className="mt-2 rounded-md border">
              {invitedMembers.map((member, index) => {
                return (
                  <TeamMemberItem
                    key={index}
                    member={member}
                    index={index}
                    teamId={teamId}
                    userId={user?.id!}
                    canViewProgress={false}
                    onResendInvite={() => {
                      resendInvite(teamId, member._id!).finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                    canManageCurrentTeam={canManageCurrentTeam}
                    onDeleteMember={() => {
                      deleteMember(teamId, member._id!).finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                    onUpdateMember={() => {
                      setMemberToUpdate(member);
                    }}
                    onSendProgressReminder={() => {
                      handleSendReminder(teamId, member._id!).finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {rejectedMembers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs uppercase text-gray-400">
              Rejected Invites
            </h3>
            <div className="mt-2 rounded-b-sm rounded-t-md border">
              {rejectedMembers.map((member, index) => {
                return (
                  <TeamMemberItem
                    key={index}
                    member={member}
                    index={index}
                    teamId={teamId}
                    canViewProgress={false}
                    userId={user?.id!}
                    onResendInvite={() => {
                      resendInvite(teamId, member._id!).finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                    canManageCurrentTeam={canManageCurrentTeam}
                    onDeleteMember={() => {
                      deleteMember(teamId, member._id!).finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                    onUpdateMember={() => {
                      setMemberToUpdate(member);
                    }}
                    onSendProgressReminder={() => {
                      handleSendReminder(teamId, member._id!).finally(() => {
                        pageProgressMessage.set('');
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {canManageCurrentTeam && (
        <div className="mt-4">
          <button
            disabled={teamMembers.length >= MAX_MEMBER_COUNT}
            onClick={() => setIsInvitingMember(true)}
            className="block w-full rounded-md border border-dashed border-gray-300 py-2 text-sm transition-colors hover:border-gray-600 hover:bg-gray-50 focus:outline-0"
          >
            + Invite Member
          </button>
        </div>
      )}

      {teamMembers.length >= MAX_MEMBER_COUNT && canManageCurrentTeam && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">
          You have reached the maximum number of members in a team. Please reach
          out to us if you need more.
        </p>
      )}
    </div>
  );
}
