import { useEffect, useState } from 'preact/hooks';
import { useParams } from '../../hooks/use-params';
import { httpGet } from '../../lib/http';
import { MemberActionDropdown } from './MemberActionDropdown';
import { useAuth } from '../../hooks/use-auth';
import { pageProgressMessage } from '../../stores/page';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import { LeaveTeamButton } from './LeaveTeamButton';
import { useTeamId } from '../../hooks/use-team-id';
import type { AllowedRoles } from '../CreateTeam/RoleDropdown';
import type { AllowedMemberStatus } from '../TeamDropdown/TeamDropdown';

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

interface TeamMemberList extends TeamMemberDocument {
  name: string;
  avatar: string;
}

export function TeamMembersPage() {
  const [isPreparing, setIsPreparing] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMemberList[]>([]);
  const [team, setTeam] = useState<TeamDocument>();

  const { teamId } = useTeamId();
  const user = useAuth();

  async function loadTeam() {
    const { response, error } = await httpGet<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamId}`
    );
    if (error || !response) {
      alert(error?.message || 'Failed to load team');
      return;
    }

    if (response) {
      setTeam(response);
    }
  }

  async function getTeamMemberList() {
    const { response, error } = await httpGet<TeamMemberList[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-list/${teamId}`
    );
    if (error || !response) {
      alert(error?.message || 'Failed to load team member list');
      return;
    }

    setTeamMembers(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    Promise.all([loadTeam(), getTeamMemberList()]).finally(() => {
      setIsPreparing(false);
      pageProgressMessage.set('');
    });

    window.addEventListener('invite-member', getTeamMemberList);

    return () => {
      window.removeEventListener('invite-member', getTeamMemberList);
    };
  }, [teamId]);

  if (isPreparing) {
    return null;
  }

  return (
    <div>
      <div>
        <div className="rounded-b-sm rounded-t-md border">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <p className="text-sm">
              {teamMembers.length} people in the {team?.name} team.
            </p>
            <LeaveTeamButton teamId={team?._id!} />
          </div>
          {teamMembers.map((member, index) => {
            return (
              <div
                className={`flex items-center justify-between gap-2 p-3 ${
                  index === 0 ? '' : 'border-t'
                }`}
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
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h3>{member.name}</h3>
                    <p className="text-sm">{member.invitedEmail}</p>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <span>{member.status}</span>
                  <span aria-hidden="true" class="select-none px-1.5">
                    ·
                  </span>
                  <span>{member.role}</span>
                  {member.userId !== user?.id && (
                    <MemberActionDropdown member={member} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {team?.canMemberSendInvite && (
        <div className="mt-8">
          <button
            disabled={teamMembers.length >= 25}
            data-popup="invite-member-popup"
            className="flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-75"
          >
            + Invite Member
          </button>
        </div>
      )}
      {teamMembers.length >= 25 && (
        <p className="mt-2 rounded-lg bg-red-100 p-2 text-red-700">
          You have reached the maximum number of members in a team. Please reach
          out to us if you need more.
        </p>
      )}
    </div>
  );
}
