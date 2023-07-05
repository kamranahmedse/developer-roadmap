import { useEffect, useState } from 'preact/hooks';
import ChevronDown from '../../icons/chevron-down-dark.svg';
import { httpGet } from '../../lib/http';
import { useTeamId } from '../../hooks/use-team-id';

export interface TeamDocument {
  _id?: string;
  name: string;
  creatorId: string;
  website?: string;
  type: 'company' | 'learning_club';
  teamSize?:
    | '0-1'
    | '2-10'
    | '11-50'
    | '51-200'
    | '201-500'
    | '501-1000'
    | '1000+';
  identifier: string;
  roadmapIds?: string[];
  bestPracticeIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function TeamDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [teamList, setTeamList] = useState<TeamDocument[]>([]);
  const { teamId } = useTeamId();

  async function getAllTeam() {
    const { response, error } = await httpGet<{
      data: TeamDocument[];
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-user-all-team`);
    if (error || !response?.data) {
      console.log(error);
      return;
    }

    setTeamList(response?.data);
  }

  useEffect(() => {
    getAllTeam();
  }, []);

  return (
    <div className="relative">
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded-l border border-r-0 p-2 text-sm hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>
          {teamList.find((team) => team._id === teamId)?.name || 'Select Team'}
        </span>
        <img src={ChevronDown} className="h-4 w-4" />
      </button>

      {showDropdown && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-md bg-slate-800 px-2 py-2 text-white shadow-md">
          <ul>
            {teamList.map((team) => (
              <li>
                <a
                  className="flex w-full cursor-pointer items-center rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                  href={`/team/progress?teamId=${team._id}`}
                >
                  {team.name}
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
