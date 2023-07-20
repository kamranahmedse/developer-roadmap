import { useState, useEffect, useRef } from 'preact/hooks';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import type { TeamResourceConfig } from '../CreateTeam/RoadmapSelector';
import { httpGet } from '../../lib/http';
import DropdownIcon from '../../icons/dropdown.svg';
import {
  clearResourceProgress,
  refreshProgressCounters,
  renderTopicProgress,
} from '../../lib/resource-progress';
import { renderResourceProgress } from '../../lib/resource-progress';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { isLoggedIn } from '../../lib/jwt';
import { useAuth } from '../../hooks/use-auth';
import { useToast } from '../../hooks/use-toast';

type TeamVersionsProps = {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
};

type TeamVersionsResponse = {
  team: TeamDocument;
  config: TeamResourceConfig[0];
}[];

export function TeamVersions(props: TeamVersionsProps) {
  const { t: teamId } = getUrlParams();
  if (!isLoggedIn()) {
    return;
  }

  const { resourceId, resourceType } = props;
  const user = useAuth();
  const toast = useToast();
  const teamDropdownRef = useRef<HTMLDivElement>(null);

  const [isPreparing, setIsPreparing] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [teamVersions, setTeamVersions] = useState<TeamVersionsResponse>([]);
  const [selectedTeamVersion, setSelectedTeamVersion] = useState<
    TeamVersionsResponse[0] | null
  >(null);
  let shouldShowAvatar = true;
  const selectedAvatar = selectedTeamVersion
    ? selectedTeamVersion.team.avatar
    : user?.avatar;
  const selectedLabel = selectedTeamVersion
    ? selectedTeamVersion.team.name
    : user?.name;

  // Show avatar if team has one, or if user has one otherwise use first letter of name
  if (selectedTeamVersion?.team.avatar) {
    shouldShowAvatar = true;
  } else if (!selectedTeamVersion && user?.avatar) {
    shouldShowAvatar = true;
  } else {
    shouldShowAvatar = false;
  }

  useOutsideClick(teamDropdownRef, () => {
    setIsDropdownOpen(false);
  });

  useKeydown('Escape', () => {
    setIsDropdownOpen(false);
  });

  async function loadTeamVersions() {
    const { response, error } = await httpGet<TeamVersionsResponse>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-team-versions?${new URLSearchParams({
        resourceId,
        resourceType,
      })}`
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load team versions.');
      return;
    }

    setTeamVersions(response);
    if (teamId) {
      const foundVersion = response.find((v) => v.team._id === teamId) || null;
      setSelectedTeamVersion(foundVersion);
    }

    setTimeout(() => {
      setIsPreparing(false);

      setTimeout(() => {
        setContainerOpacity(100);
      }, 50);
    }, 0);
  }

  useEffect(() => {
    loadTeamVersions().finally(() => {
      //
    });
  }, []);

  if (isPreparing) {
    return null;
  }

  useEffect(() => {
    clearResourceProgress();
    if (!selectedTeamVersion) {
      deleteUrlParam('t');
      renderResourceProgress(resourceType, resourceId).then();
      return;
    }

    setUrlParams({ t: selectedTeamVersion.team._id! });

    renderResourceProgress(resourceType, resourceId).then(() => {
      selectedTeamVersion.config?.removed?.forEach((topic) => {
        renderTopicProgress(topic, 'removed');
      });
      refreshProgressCounters();
    });
  }, [selectedTeamVersion]);

  if (!teamVersions.length) {
    return null;
  }

  return (
    <div
      className={`relative h-7 transition-opacity duration-500 sm:h-auto opacity-${containerOpacity}`}
    >
      <button
        className="inline-flex h-7 items-center justify-between gap-1 rounded-md border px-1.5 py-1.5 text-xs font-medium hover:bg-gray-50 focus:outline-0 sm:h-8 sm:w-40 sm:px-3 sm:text-sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="hidden w-full items-center justify-between sm:flex">
          <span className="truncate">
            {selectedTeamVersion?.team.name || 'Team Versions'}
          </span>
          <img
            alt="Dropdown"
            src={DropdownIcon}
            class="h-3 w-3 sm:h-4 sm:w-4"
          />
        </div>
        <div className="sm:hidden">
          {shouldShowAvatar ? (
            <img
              src={
                selectedAvatar
                  ? `${
                      import.meta.env.PUBLIC_AVATAR_BASE_URL
                    }/${selectedAvatar}`
                  : '/images/default-avatar.png'
              }
              alt={`${selectedLabel} Avatar`}
              className="h-5 w-5 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs">
              {selectedLabel?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </button>
      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40 block bg-black/20 sm:hidden"
            aria-hidden="true"
          />
          <div
            ref={teamDropdownRef}
            className="fixed bottom-0 left-0 z-50 mt-1 h-fit w-full overflow-hidden rounded-md bg-white py-0.5 shadow-md sm:absolute sm:left-0 sm:right-0 sm:top-full sm:border"
          >
            <button
              className={`flex h-8 w-full items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-gray-100 sm:text-sm ${
                !selectedTeamVersion ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => {
                setSelectedTeamVersion(null);
                setIsDropdownOpen(false);
              }}
            >
              <div className="flex w-full items-center justify-between">
                <span className="truncate">Personal</span>
              </div>
            </button>
            {teamVersions.map((team) => {
              const isSelectedTeam =
                selectedTeamVersion?.team._id === team.team._id;

              return (
                <button
                  className={`flex h-8 w-full items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-gray-100 sm:text-sm ${
                    isSelectedTeam ? 'bg-gray-100' : 'bg-white'
                  }`}
                  onClick={() => {
                    setSelectedTeamVersion(team);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate">{team.team.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
