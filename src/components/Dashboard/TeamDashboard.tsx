import { useEffect, useState } from 'react';
import type { TeamMember } from '../TeamProgress/TeamProgressPage';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { getUser } from '../../lib/jwt';
import { TeamActivityPage } from '../TeamActivity/TeamActivityPage';
import { cn } from '../../lib/classname';
import { Tooltip } from '../Tooltip';
import { DashboardTeamRoadmaps } from './DashboardTeamRoadmaps';
import type { BuiltInRoadmap } from './PersonalDashboard';
import { InviteMemberPopup } from '../TeamMembers/InviteMemberPopup';

type TeamDashboardProps = {
  builtInRoleRoadmaps: BuiltInRoadmap[];
  builtInSkillRoadmaps: BuiltInRoadmap[];
  teamId: string;
};

export function TeamDashboard(props: TeamDashboardProps) {
  const { teamId, builtInRoleRoadmaps, builtInSkillRoadmaps } = props;

  const toast = useToast();
  const currentUser = getUser();

  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isInvitingMember, setIsInvitingMember] = useState(false);

  async function getTeamProgress() {
    const { response, error } = await httpGet<TeamMember[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-progress/${teamId}`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to get team progress');
      return;
    }

    setTeamMembers(
      response.sort((a, b) => {
        if (a.email === currentUser?.email) {
          return -1;
        }
        if (b.email === currentUser?.email) {
          return 1;
        }
        return 0;
      }),
    );
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    setIsLoading(true);
    setTeamMembers([]);
    getTeamProgress().finally(() => setIsLoading(false));
  }, [teamId]);

  const currentMember = teamMembers.find(
    (member) => member.email === currentUser?.email,
  );
  const learningRoadmapsToShow =
    currentMember?.progress?.filter(
      (progress) => progress.resourceType === 'roadmap',
    ) || [];

  const allMembersWithoutCurrentUser = teamMembers.sort((a, b) => {
    if (a.email === currentUser?.email) {
      return -1;
    }

    if (b.email === currentUser?.email) {
      return 1;
    }

    return 0;
  });

  const canManageCurrentTeam = ['admin', 'manager'].includes(
    currentMember?.role!,
  );

  return (
    <section className="mt-8">
      {isInvitingMember && (
        <InviteMemberPopup
          onInvited={() => {
            toast.success('Invite sent');
            getTeamProgress().finally(() => null);
            setIsInvitingMember(false);
          }}
          onClose={() => {
            setIsInvitingMember(false);
          }}
        />
      )}

      <DashboardTeamRoadmaps
        isLoading={isLoading}
        teamId={teamId}
        learningRoadmapsToShow={learningRoadmapsToShow}
        canManageCurrentTeam={canManageCurrentTeam}
        onUpdate={getTeamProgress}
        builtInRoleRoadmaps={builtInRoleRoadmaps}
        builtInSkillRoadmaps={builtInSkillRoadmaps}
      />

      <h2 className="mb-3 mt-6 flex h-[20px] items-center justify-between text-xs uppercase text-gray-400">
        Team Members
        {canManageCurrentTeam && (
          <a
            href={`/team/members?t=${teamId}`}
            className="rounded-full bg-gray-400 px-2.5 py-0.5 text-xs text-white transition-colors hover:bg-black"
          >
            Manage Members
          </a>
        )}
      </h2>
      {isLoading && <TeamMemberLoading className="mb-6" />}
      {!isLoading && (
        <div className="mb-6 flex flex-wrap gap-2">
          {allMembersWithoutCurrentUser.map((member) => {
            const avatar = member?.avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${member.avatar}`
              : '/images/default-avatar.png';
            return (
              <a
                className="group relative"
                key={member.email}
                href={`/team/member?t=${teamId}&m=${member._id}`}
              >
                <figure className="relative aspect-square size-8 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={avatar}
                    alt={member.name || ''}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </figure>
                <Tooltip position="top-center" additionalClass="text-sm">
                  {member.name}
                </Tooltip>
              </a>
            );
          })}

          {canManageCurrentTeam && (
            <button
              className="group relative"
              onClick={() => setIsInvitingMember(true)}
            >
              <span className="relative flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md border border-dashed bg-gray-100">
                +
              </span>
              <Tooltip position="top-center" additionalClass="text-sm">
                Add Member
              </Tooltip>
            </button>
          )}
        </div>
      )}

      <TeamActivityPage teamId={teamId} />
    </section>
  );
}

type TeamMemberLoadingProps = {
  className?: string;
};

function TeamMemberLoading(props: TeamMemberLoadingProps) {
  const { className } = props;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="size-8 animate-pulse rounded-md bg-gray-200"
        ></div>
      ))}
    </div>
  );
}
