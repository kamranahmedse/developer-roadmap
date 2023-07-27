import { MemberActionDropdown } from "./MemberActionDropdown";
import { MemberRoleBadge } from "./RoleBadge";
import type { TeamMemberItem } from "./TeamMembersPage";

type TeamMemberProps = {
  member: TeamMemberItem;
  userId: string;
  index: number;
  teamId: string;
  canManageCurrentTeam: boolean;
  handleDeleteMember: () => void;
  onUpdateMember: () => void;
};

export function TeamMemberItem(props: TeamMemberProps) {
  const { member, index, teamId, onUpdateMember, canManageCurrentTeam, userId, handleDeleteMember } = props;
  const hasProgress = member.progress.length > 0;

  return (
    <div
      className={`flex items-center justify-between gap-2 p-3 ${index === 0 ? '' : 'border-t'
        }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={
            member.avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${member.avatar
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
            <h3 className="inline-grid grid-cols-[auto_auto] items-center font-medium">
              <span className="truncate">{member.name}</span>
              {member.userId === userId && (
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
            onDeleteMember={handleDeleteMember}
            isDisabled={member.userId === userId}
            onUpdateMember={onUpdateMember}
            member={member}
          />
        )}
      </div>
    </div>
  )
}
