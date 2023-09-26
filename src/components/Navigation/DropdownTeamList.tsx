import { ChevronLeft, Loader2, Plus } from 'lucide-react';
import { $teamList } from '../../stores/team';
import { httpGet } from '../../lib/http';
import type { TeamListResponse } from '../TeamDropdown/TeamDropdown';
import { useToast } from '../../hooks/use-toast';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';

type DropdownTeamListProps = {
  setIsTeamsOpen: (isOpen: boolean) => void;
};

export function DropdownTeamList(props: DropdownTeamListProps) {
  const { setIsTeamsOpen } = props;

  const toast = useToast();
  const teamList = useStore($teamList);

  const [isLoading, setIsLoading] = useState(false);

  async function getAllTeams() {
    if (teamList.length > 0) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<TeamListResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-teams`
    );
    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    setIsLoading(false);
    $teamList.set(response);
  }

  useEffect(() => {
    getAllTeams();
  }, []);

  const pendingTeamIds = teamList
    .filter((team) => team.status === 'invited')
    .map((team) => team._id);

  const loadingIndicator = isLoading && (
    <div className="flex items-center justify-center py-2">
      <Loader2 className="h-5 w-5 animate-spin stroke-[2.5px]" />
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <button
          className="mt-1 flex h-5 w-5 items-center justify-center rounded hover:bg-slate-50/10"
          onClick={() => setIsTeamsOpen(false)}
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5px]" />
        </button>
        <a
          className="mt-1 flex h-5 w-5 items-center justify-center rounded hover:bg-slate-50/10"
          href="/team/new"
        >
          <Plus className="h-4 w-4 stroke-[2.5px]" />
        </a>
      </div>

      {loadingIndicator}
      {!isLoading && (
        <ul className="mt-2">
          {teamList?.map((team) => {
            let pageLink = '';
            if (team.status === 'invited') {
              pageLink = `/respond-invite?i=${team.memberId}`;
            } else if (team.status === 'joined') {
              pageLink = `/team/progress?t=${team._id}`;
            }

            return (
              <li key={team._id} className="px-1">
                <a
                  href={pageLink}
                  className="block rounded px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  <span className="min-w-0 flex-grow truncate">
                    {team.name}
                  </span>
                  {pendingTeamIds.includes(team._id) && (
                    <span className="flex rounded-md bg-red-500 px-2 text-xs text-white">
                      Invite
                    </span>
                  )}
                </a>
              </li>
            );
          })}

          {teamList.length === 0 && !isLoading && (
            <li className="px-1">
              <a
                href="/team/new"
                className="block rounded border border-dashed border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
              >
                Create Team
              </a>
            </li>
          )}
        </ul>
      )}
    </>
  );
}
