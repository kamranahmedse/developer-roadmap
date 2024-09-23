import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { useStore } from '@nanostores/react';
import { $teamList } from '../../stores/team';
import type { TeamListResponse } from '../TeamDropdown/TeamDropdown';
import { DashboardTab } from './DashboardTab';
import { PersonalDashboard, type BuiltInRoadmap } from './PersonalDashboard';
import { TeamDashboard } from './TeamDashboard';
import { getUser } from '../../lib/jwt';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { useParams } from '../../hooks/use-params';

type DashboardPageProps = {
  builtInRoleRoadmaps?: BuiltInRoadmap[];
  builtInSkillRoadmaps?: BuiltInRoadmap[];
  builtInBestPractices?: BuiltInRoadmap[];
};

export function DashboardPage(props: DashboardPageProps) {
  const { builtInRoleRoadmaps, builtInBestPractices, builtInSkillRoadmaps } =
    props;

  const currentUser = getUser();
  const toast = useToast();
  const teamList = useStore($teamList);

  const { t: currTeamId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeamId, setSelectedTeamId] = useState<string>();

  async function getAllTeams() {
    if (teamList.length > 0) {
      return;
    }

    const { response, error } = await httpGet<TeamListResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-teams`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    $teamList.set(response);
  }

  useEffect(() => {
    getAllTeams().finally(() => {
      if (currTeamId) {
        setSelectedTeamId(currTeamId);
      }

      setIsLoading(false);
    });
  }, [currTeamId]);

  const userAvatar =
    currentUser?.avatar && !isLoading
      ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${currentUser.avatar}`
      : '/images/default-avatar.png';

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="container">
        <div className="mb-6 flex flex-wrap items-center gap-1.5 sm:mb-8">
          <DashboardTab
            label="Personal"
            isActive={!selectedTeamId}
            onClick={() => {
              setSelectedTeamId(undefined);
              deleteUrlParam('t');
            }}
            avatar={userAvatar}
          />

          {isLoading && (
            <>
              <DashboardTabSkeleton />
              <DashboardTabSkeleton />
            </>
          )}

          {!isLoading && (
            <>
              {teamList.map((team) => {
                const { avatar } = team;
                const avatarUrl = avatar
                  ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
                  : '/images/default-avatar.png';
                return (
                  <DashboardTab
                    key={team._id}
                    label={team.name}
                    isActive={team._id === selectedTeamId}
                    {...(team.status === 'invited'
                      ? {
                          href: `/respond-invite?i=${team.memberId}`,
                        }
                      : {
                          onClick: () => {
                            setSelectedTeamId(team._id);
                            setUrlParams({ t: team._id });
                          },
                        })}
                    avatar={avatarUrl}
                  />
                );
              })}
              <DashboardTab
                label="+ Create Team"
                isActive={false}
                href="/team/new"
                className="border border-dashed border-gray-300 bg-transparent px-3 text-[13px] text-sm text-gray-500 hover:border-gray-600 hover:text-black"
              />
            </>
          )}
        </div>

        {!selectedTeamId && (
          <PersonalDashboard
            builtInRoleRoadmaps={builtInRoleRoadmaps}
            builtInSkillRoadmaps={builtInSkillRoadmaps}
            builtInBestPractices={builtInBestPractices}
          />
        )}
        {selectedTeamId && (
          <TeamDashboard
            builtInRoleRoadmaps={builtInRoleRoadmaps!}
            builtInSkillRoadmaps={builtInSkillRoadmaps!}
            teamId={selectedTeamId}
          />
        )}
      </div>
    </div>
  );
}

function DashboardTabSkeleton() {
  return (
    <div className="h-[30px] w-[114px] animate-pulse rounded-md border bg-white"></div>
  );
}
