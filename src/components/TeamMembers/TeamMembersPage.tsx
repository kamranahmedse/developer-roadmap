import { useEffect, useState } from 'preact/hooks';
import { useParams } from '../../hooks/use-params';
import { httpGet } from '../../lib/http';
import { MemberActionDropdown } from './MemberActionDropdown';
import { useAuth } from '../../hooks/use-auth';

export interface TeamMemberDocument {
  _id?: string;
  userId?: string;
  invitedEmail?: string;
  teamId: string;
  role: 'creator' | 'member';
  status: 'invited' | 'joined' | 'rejected' | 'accepted';
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMemberList extends TeamMemberDocument {
  name: string;
}

export function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberList[]>([]);
  const { teamId } = useParams<{ teamId: string }>();
  const user = useAuth();
  async function getTeamMemberList() {
    const { response, error } = await httpGet<TeamMemberList[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-list/${teamId}`
    );
    if (error || !response) {
      console.log(error);
      return;
    }

    console.log(response);
    setTeamMembers(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    getTeamMemberList();
    window.addEventListener('invite-member', getTeamMemberList);

    return () => {
      window.removeEventListener('invite-member', getTeamMemberList);
    };
  }, [teamId]);

  const isCreator = teamMembers.find(
    (teamMember) => teamMember.userId === user?.id
  )?.role === 'creator';

  return (
    <div>
      <div>
        <div className="grid w-full grid-cols-4 gap-2 text-sm text-gray-500">
          <span className="col-span-2">Name</span>
          <span>Status</span>
        </div>

        <div className="space-y-2">
          {teamMembers.map((teamMember) => (
            <div className="grid w-full grid-cols-4 gap-2 items-center">
              <span className="col-span-2 flex flex-col">
                <span>{teamMember.name}</span>
                {teamMember.invitedEmail}
              </span>
              <span>{teamMember.status}</span>
              {isCreator &&
                <MemberActionDropdown member={teamMember} />
              }
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <button
          data-popup="invite-member-popup"
          className="flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          + Invite Member
        </button>
      </div>
    </div>
  );
}
