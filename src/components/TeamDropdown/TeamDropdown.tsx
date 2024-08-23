import { useEffect, useRef, useState } from 'react';
import { httpGet } from '../../lib/http';
import { useAuth } from '../../hooks/use-auth';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { Spinner } from '../ReactIcons/Spinner';
import type { AllowedRoles } from '../CreateTeam/RoleDropdown';
import { $currentTeam, $teamList } from '../../stores/team';
import { useStore } from '@nanostores/react';
import { useTeamId } from '../../hooks/use-team-id';
import { useToast } from '../../hooks/use-toast';
import type { ValidTeamType } from '../CreateTeam/Step0';
import { DropdownIcon } from '../ReactIcons/DropdownIcon.tsx';

const allowedStatus = ['invited', 'joined', 'rejected'] as const;
export type AllowedMemberStatus = (typeof allowedStatus)[number];

export type UserTeamItem = {
  _id: string;
  name: string;
  avatar?: string;
  roadmaps: string[];
  type: ValidTeamType;
  role: AllowedRoles;
  status: AllowedMemberStatus;
  memberId: string;
  personalProgressOnly?: boolean;
};

export type TeamListResponse = UserTeamItem[];

export function TeamDropdown() {
  const user = useAuth();
  const { teamId } = useTeamId();

  const teamList = useStore($teamList);
  const currentTeam = useStore($currentTeam);

  const toast = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedAvatar = currentTeam ? currentTeam.avatar : user?.avatar;
  const selectedLabel = currentTeam ? currentTeam.name : user?.name;

  useOutsideClick(dropdownRef, () => {
    setShowDropdown(false);
  });

  async function getAllTeams() {
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
    if (!teamId || !teamList) {
      return;
    }

    $currentTeam.set(teamList.find((team) => team._id === teamId));
  }, [teamList, teamId]);

  useEffect(() => {
    setIsLoading(true);
    getAllTeams().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const pendingTeamIds = teamList
    .filter((team) => team.status === 'invited')
    .map((team) => team._id);

  return (
    <>
      <div className="relative mr-2">
        <span className="mb-2 flex items-center justify-between text-xs uppercase text-gray-400">
          <span>Choose Team</span>
        </span>
        <button
          className="relative flex w-full cursor-pointer items-center justify-between rounded border p-2 text-sm hover:bg-gray-100"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {pendingTeamIds.length > 0 && (
            <span className="absolute -left-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {pendingTeamIds.length}
            </span>
          )}
          <div className="mr-1.5 inline-grid grid-cols-[16px_auto] items-center gap-1.5">
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
                className="h-4 w-4 rounded-full object-cover"
              />
            )}
            <span className="truncate">
              {!isLoading && selectedLabel}
              {isLoading && 'Loading ..'}
            </span>
          </div>
          <DropdownIcon className={'h-4 w-4'} />
        </button>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-full z-50 mt-2 w-full rounded-md bg-slate-800 px-2 py-2 text-white shadow-md"
          >
            <ul>
              <li>
                <a
                  className="flex w-full cursor-pointer items-center gap-2 truncate rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                  href="/account"
                >
                  <span className="truncate">Personal Account</span>
                </a>
              </li>
              {teamList.map((team) => {
                let pageLink = '';
                if (team.status === 'invited') {
                  pageLink = `/respond-invite?i=${team.memberId}`;
                } else if (team.status === 'joined') {
                  pageLink = `/team/activity?t=${team._id}`;
                }

                return (
                  <li key={team?._id}>
                    <a
                      className="flex w-full cursor-pointer items-center gap-2 rounded p-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                      href={`${pageLink}`}
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
            </ul>
            <a
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-gray-100 p-2 text-sm font-medium text-slate-800 hover:opacity-90"
              href="/team/new"
            >
              <span>+</span>
              <span>New Team</span>
            </a>
          </div>
        )}
      </div>
      <hr className="my-4" />
    </>
  );
}
