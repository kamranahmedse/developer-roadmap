import { ChevronLeft, Loader2, Plus, Users } from 'lucide-react';
import { $teamList } from '../../stores/team';
import { httpGet } from '../../lib/http';
import type { TeamListResponse } from '../TeamDropdown/TeamDropdown';
import { useToast } from '../../hooks/use-toast';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { Spinner } from '../ReactIcons/Spinner';

type DropdownTeamListProps = {
  setIsTeamsOpen: (isOpen: boolean) => void;
};

export function DropdownTeamList(props: DropdownTeamListProps) {
  const { setIsTeamsOpen } = props;

  const toast = useToast();
  const teamList = useStore($teamList);

  const [isLoading, setIsLoading] = useState(true);

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

    $teamList.set(response);
  }

  useEffect(() => {
    getAllTeams().finally(() => setIsLoading(false));
  }, []);

  const loadingIndicator = isLoading && (
    <div className="mt-2 flex animate-pulse flex-col gap-1 px-1 text-center">
      <div className="h-[35px] rounded-md bg-gray-700"></div>
      <div className="h-[35px] rounded-md bg-gray-700"></div>
      <div className="h-[35px] rounded-md bg-gray-700"></div>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <button
          className="mt-1 flex h-5 w-5 items-center justify-center rounded-sm text-slate-400 hover:bg-slate-50/10 hover:text-slate-50"
          onClick={() => setIsTeamsOpen(false)}
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5px]" />
        </button>
        <a
          className="mt-1 flex h-5 w-5 items-center justify-center rounded-sm text-slate-400 hover:bg-slate-50/10 hover:text-slate-50"
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
              pageLink = `/team/activity?t=${team._id}`;
            }

            return (
              <li key={team._id} className="px-1">
                <a
                  href={pageLink}
                  className="block truncate rounded-sm px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                >
                  {team.name}
                </a>
              </li>
            );
          })}

          {teamList.length === 0 && !isLoading && (
            <li className="mt-2 px-1 text-center">
              <p className="block rounded-sm px-4 py-2 text-sm font-medium text-slate-500">
                <Users className="mx-auto mb-2 h-7 w-7 text-slate-600" />
                No teams found.{' '}
                <a
                  className="font-medium text-slate-400 underline underline-offset-2 hover:text-slate-300"
                  href="/team/new"
                >
                  Create a team
                </a>
                .
              </p>
            </li>
          )}
        </ul>
      )}
    </>
  );
}
