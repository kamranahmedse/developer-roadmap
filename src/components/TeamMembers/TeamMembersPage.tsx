import { useEffect, useState } from 'preact/hooks';
import { httpDelete, httpGet } from '../../lib/http';
import { MemberActionDropdown } from './MemberActionDropdown';
import { useAuth } from '../../hooks/use-auth';
import { pageProgressMessage } from '../../stores/page';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import { LeaveTeamButton } from './LeaveTeamButton';
import type { AllowedRoles } from '../CreateTeam/RoleDropdown';
import type { AllowedMemberStatus } from '../TeamDropdown/TeamDropdown';
import { InviteMemberPopup } from './InviteMemberPopup';
import { getUrlParams } from '../../lib/browser';
import { UpdateMemberPopup } from './UpdateMemberPopup';
import { useStore } from '@nanostores/preact';
import { $canManageCurrentTeam } from '../../stores/team';
import { useToast } from '../../hooks/use-toast';
import { MemberRoleBadge } from './RoleBadge';

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

interface TeamMemberItem extends TeamMemberDocument {
  name: string;
  avatar: string;
}

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
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamId}`
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
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-list/${teamId}`
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
      {}
    );

    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    toast.success('Member has been deleted');
    await getTeamMemberList();
  }

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
        <div className="rounded-b-sm rounded-t-md border">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <p className="hidden text-sm sm:block">
              {teamMembers.length} people in the team.
            </p>
            <p className="block text-sm sm:hidden">
              {teamMembers.length} members
            </p>
            <LeaveTeamButton teamId={team?._id!} />
          </div>
          {teamMembers.map((member, index) => {
            return (
              <div
                className={`flex items-center justify-between gap-2 p-3 ${
                  index === 0 ? '' : 'border-t'
                } ${member.status === 'invited' ? 'bg-gray-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      member.avatar
                        ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${
                            member.avatar
                          }`
                        : '/images/default-avatar.png'
                    }
                    alt={member.name || ''}
                    className="hidden h-10 w-10 rounded-full sm:block"
                  />
                  <div>
                    <span class={'mb-1 block sm:hidden'}>
                      <MemberRoleBadge role={member.role} />
                    </span>
                    <div className="flex items-center">
                      <h3 className="flex items-center font-medium">
                        {member.name}
                        {member.userId === user?.id && (
                          <span className="ml-2 hidden text-xs font-normal text-blue-500 sm:inline">
                            You
                          </span>
                        )}
                      </h3>
                      <div className="ml-2 flex items-center gap-0.5">
                        {member.status === 'invited' && (
                          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                            Invited
                          </span>
                        )}
                        {member.status === 'rejected' && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                            Rejected
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {member.invitedEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <span class={'hidden sm:block'}>
                    <MemberRoleBadge role={member.role} />
                  </span>
                  {canManageCurrentTeam && (
                    <MemberActionDropdown
                      onDeleteMember={() => {
                        deleteMember(teamId, member._id!).finally(() => {
                          pageProgressMessage.set('');
                        });
                      }}
                      isDisabled={member.userId === user?.id}
                      onUpdateMember={() => {
                        setMemberToUpdate(member);
                      }}
                      member={member}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {canManageCurrentTeam && (
        <div className="mt-4">
          <button
            disabled={teamMembers.length >= 25}
            onClick={() => setIsInvitingMember(true)}
            className="block w-full rounded-md border border-dashed border-gray-300 py-2 text-sm transition-colors hover:border-gray-600 hover:bg-gray-50 focus:outline-0"
          >
            + Invite Member
          </button>
        </div>
      )}

      {teamMembers.length >= 25 && canManageCurrentTeam && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">
          You have reached the maximum number of members in a team. Please reach
          out to us if you need more.
        </p>
      )}
    </div>
  );
}
