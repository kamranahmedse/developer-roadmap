import { useEffect, useState, type ReactNode } from 'react';
import { httpGet } from '../../lib/http';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { useToast } from '../../hooks/use-toast';
import { useStore } from '@nanostores/react';
import { $teamList } from '../../stores/team';
import type { TeamListResponse } from '../TeamDropdown/TeamDropdown';
import { cn } from '../../lib/classname';
import { DashboardTab } from './DashboardTab';
import { PersonalDashboard } from './PersonalDashboard';

type DashboardPageProps = {};

export function DashboardPage(props: DashboardPageProps) {
  const toast = useToast();
  const teamList = useStore($teamList);

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
    getAllTeams().finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container py-6 pb-14">
      <div className="flex flex-wrap items-center gap-1">
        <DashboardTab
          label="Personal"
          isActive={!selectedTeamId}
          onClick={() => setSelectedTeamId(undefined)}
        />
        {isLoading && (
          <>
            <DashboardTabLoading />
            <DashboardTabLoading />
            <DashboardTabLoading />
          </>
        )}

        {!isLoading && (
          <>
            {teamList.map((team) => (
              <DashboardTab
                key={team._id}
                label={team.name}
                isActive={team._id === selectedTeamId}
                onClick={() => setSelectedTeamId(team._id)}
              />
            ))}
            <DashboardTab
              label="+ Create Team"
              isActive={false}
              href="/team/new"
              className="border-black bg-black text-white"
            />
          </>
        )}
      </div>

      {!selectedTeamId && <PersonalDashboard />}
    </div>
  );
}

function DashboardTabLoading() {
  return (
    <div className="h-7 w-20 animate-pulse rounded-md border bg-gray-100"></div>
  );
}
