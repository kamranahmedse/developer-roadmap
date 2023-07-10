import { useEffect, useState } from 'preact/hooks';
import ChevronDown from '../../icons/dropdown.svg';
import { httpGet } from '../../lib/http';
import { useTeamId } from '../../hooks/use-team-id';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import { useAuth } from '../../hooks/use-auth';

export function TeamDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [teamList, setTeamList] = useState<TeamDocument[]>([]);
  const { teamId } = useTeamId();
  const user = useAuth()

  const selectedAvatar = teamList.find((team) => team._id === teamId)?.avatar || user?.avatar || '';

  async function getAllTeam() {
    const { response, error } = await httpGet<{
      data: TeamDocument[];
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-user-all-team`);
    if (error || !response?.data) {
      alert(error?.message || 'Something went wrong');
      return;
    }

    setTeamList(response?.data);
  }

  useEffect(() => {
    getAllTeam();
  }, []);

  return (
    <div className="relative mr-2">
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded border p-2 text-sm hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-center gap-2">
          <img src={
            selectedAvatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${selectedAvatar}`
              : '/images/default-avatar.png'
          } alt='' className="w-4 h-4 rounded-full" />
          <span className="truncate">
            {teamList.find((team) => team._id === teamId)?.name || 'Personal Account'}
          </span>
        </div>
        <img src={ChevronDown} className="h-4 w-4" />
      </button >

      {showDropdown && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-md bg-slate-800 px-2 py-2 text-white shadow-md">
          <ul>
            <li>
              <a
                className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700 gap-2 text-sm truncate"
                href="/account"
              >
                <img src={
                  user?.avatar
                    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${user?.avatar}`
                    : '/images/default-avatar.png'
                } alt={user?.name || ''} className="w-6 h-6 rounded-full" />
                <span className="truncate">Personal Account</span>
              </a>
            </li>
            {teamList.map((team) => (
              <li>
                <a
                  className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700 gap-2"
                  href={`/team/progress?teamId=${team._id}`}
                >
                  <img src={
                    team.avatar
                      ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${team.avatar}`
                      : '/images/default-avatar.png'
                  } alt={team.name || ''} className="w-6 h-6 rounded-full" />
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
      )
      }
    </div >
  );
}
