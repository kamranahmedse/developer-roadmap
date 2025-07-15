import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { Users2 } from 'lucide-react';
import { httpGet } from '../../lib/http';
import { cn } from '../../lib/classname';
import type { UserTeamItem } from '../TeamDropdown/TeamDropdown';

type TransferToTeamListProps = {
  teams: UserTeamItem[];
  setTeams: (teams: UserTeamItem[]) => void;

  currentTeamId?: string;
  selectedTeamId: string | null;
  setSelectedTeamId: (teamId: string | null) => void;

  isTeamMembersLoading: boolean;
  setIsTeamMembersLoading: (isLoading: boolean) => void;
  onTeamChange: (teamId: string | null) => void;
};

export function TransferToTeamList(props: TransferToTeamListProps) {
  const {
    teams,
    setTeams,
    selectedTeamId,
    setSelectedTeamId,
    isTeamMembersLoading,
    currentTeamId,
    setIsTeamMembersLoading,
    onTeamChange,
  } = props;

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  async function getAllTeams() {
    if (teams.length > 0) {
      return;
    }

    const { response, error } = await httpGet<UserTeamItem[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-teams`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setTeams(
      response.filter((team) => ['admin', 'manager'].includes(team.role)),
    );
  }

  useEffect(() => {
    getAllTeams().finally(() => setIsLoading(false));
  }, []);

  const loadingTeams = isLoading && (
    <ul className="mt-2 grid grid-cols-3 gap-1.5">
      {[...Array(3)].map((_, index) => (
        <li key={index}>
          <div className="relative flex w-full items-center gap-2 rounded-md border p-2">
            <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-gray-200" />
            <div className="inline-grid w-full">
              <div className="h-4 animate-pulse rounded-sm bg-gray-200" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {(teams.length > 0 || isLoading) && (
        <p className="text-sm">Select a team to transfer this roadmap to</p>
      )}

      {loadingTeams}
      {teams.length > 0 && !isLoading && (
        <ul className="mt-2 grid grid-cols-3 gap-1.5">
          {teams.map((team) => {
            const isSelected = team._id === selectedTeamId;
            if (team._id === currentTeamId) {
              return null;
            }

            return (
              <li key={team._id}>
                <button
                  className={cn(
                    'relative flex w-full items-center gap-2.5 rounded-lg border p-2.5 disabled:cursor-not-allowed disabled:opacity-70',
                    isSelected && 'border-gray-500 bg-gray-100 text-black',
                  )}
                  disabled={isTeamMembersLoading}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTeamId(null);
                    } else {
                      setSelectedTeamId(team._id);
                    }
                    onTeamChange(team._id);
                  }}
                >
                  <img
                    src={
                      team.avatar
                        ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${
                            team.avatar
                          }`
                        : '/images/default-avatar.png'
                    }
                    alt={team.name || ''}
                    className="h-6 w-6 shrink-0 rounded-full"
                  />
                  <div className="inline-grid w-full">
                    <h3 className="truncate text-left font-normal">
                      {team.name}
                    </h3>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {teams.length === 0 && !isLoading && (
        <div className="flex grow flex-col items-center justify-center gap-2">
          <Users2 className="h-12 w-12 text-gray-500" />
          <p className="text-gray-500">You are not a member of any team.</p>
        </div>
      )}
    </>
  );
}
