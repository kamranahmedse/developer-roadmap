import { useEffect, useRef, useState } from 'preact/hooks';
import ChevronDown from '../../icons/dropdown.svg';
import { httpGet } from '../../lib/http';
import { useTeamId } from '../../hooks/use-team-id';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import { useAuth } from '../../hooks/use-auth';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { Spinner } from '../ReactIcons/Spinner';

export function TeamDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);
  const [teamList, setTeamList] = useState<TeamDocument[]>([]);

  const { teamId } = useTeamId();
  const user = useAuth();

  const selectedAvatar = teamId
    ? teamList.find((team) => team._id === teamId)?.avatar
    : user?.avatar;

  const selectedLabel = teamId
    ? teamList.find((team) => team._id === teamId)?.name
    : 'Personal';

  useOutsideClick(dropdownRef, () => {
    setShowDropdown(false);
  });

  async function getAllTeams() {
    const { response, error } = await httpGet<TeamDocument[]>(`${import.meta.env.PUBLIC_API_URL}/v1-get-user-teams`);
    if (error || !response) {
      alert(error?.message || 'Something went wrong');
      return;
    }

    setTeamList(response);
  }

  useEffect(() => {
    setIsLoading(true);
    getAllTeams().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="relative mr-2">
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded border p-2 text-sm hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-center gap-2">
          {isLoading && <Spinner className="h-4 w-4" isDualRing={false} />}
          {!isLoading && (
            <img
              src={
                selectedAvatar
                  ? `${
                      import.meta.env.PUBLIC_AVATAR_BASE_URL
                    }/${selectedAvatar}`
                  : '/images/default-avatar.png'
              }
              alt=""
              className="h-4 w-4 rounded-full"
            />
          )}
          <span className="truncate">
            {!isLoading && selectedLabel }
            {isLoading && 'Loading ..'}
          </span>
        </div>
        <img alt={'show dropdown'} src={ChevronDown} className="h-4 w-4" />
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full z-50 mt-2 w-full rounded-md bg-slate-800 px-2 py-2 text-white shadow-md"
        >
          <ul>
            <li>
              <a
                className="flex w-full cursor-pointer items-center gap-2 truncate rounded p-2 text-sm text-sm font-medium text-slate-100 hover:bg-slate-700"
                href="/account"
              >
                <span className="truncate">Personal Account</span>
              </a>
            </li>
            {teamList.map((team) => (
              <li>
                <a
                  className="flex w-full cursor-pointer items-center gap-2 rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                  href={`/team/progress?t=${team._id}`}
                >
                  <span className="truncate">{team.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-gray-100 p-2 text-sm font-medium text-slate-800 hover:opacity-90"
            href="/create-team"
          >
            <span>+</span>
            <span>New Team</span>
          </a>
        </div>
      )}
    </div>
  );
}
