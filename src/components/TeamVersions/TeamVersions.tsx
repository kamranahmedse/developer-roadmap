import { useState, useEffect } from 'preact/hooks';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';
import type { TeamResourceConfig } from '../CreateTeam/RoadmapSelector';
import { httpGet } from '../../lib/http';
import DropdownIcon from '../../icons/dropdown.svg';
import {
  clearResourceProgress,
  renderTopicProgress,
} from '../../lib/resource-progress';
import { renderResourceProgress } from '../../lib/resource-progress';
import { getUrlParams } from '../../lib/browser';

type TeamVersionsProps = {
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
};
type TeamVersionsResponse = {
  team: TeamDocument;
  config: TeamResourceConfig[0];
}[];

export function TeamVersions(props: TeamVersionsProps) {
  const { resourceId, resourceType } = props;
  const [isPreparing, setIsPreparing] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [teamVersions, setTeamVersions] = useState<TeamVersionsResponse>([]);
  const [selectedTeamVersion, setSelectedTeamVersion] = useState<
    TeamVersionsResponse[0] | null
  >(null);

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
      alert('Failed to load team versions.');
    } else {
      setTeamVersions(response);
    }
    setTimeout(() => {
      setIsPreparing(false);

      setTimeout(() => {
        setContainerOpacity(100);
      }, 50);
    }, 0);
  }

  useEffect(() => {
    loadTeamVersions();
  }, []);

  if (isPreparing) {
    return null;
  }

  const { t: teamId } = getUrlParams();
  useEffect(() => {
    if (!teamId) {
      return;
    }

    const team = teamVersions.find((team) => team.team._id === teamId);
    if (team) {
      setSelectedTeamVersion(team);
    }
  }, [teamId]);

  useEffect(() => {
    clearResourceProgress('removed');
    if (!selectedTeamVersion) {
      renderResourceProgress(resourceType, resourceId);
      return;
    }

    selectedTeamVersion.config.removed.forEach((topic) => {
      renderTopicProgress(topic, 'removed');
    });
  }, [selectedTeamVersion]);

  return (
    <div
      className={`relative transition-opacity duration-500 opacity-${containerOpacity}`}
    >
      <button
        className="inline-flex h-8 w-40 items-center justify-between rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-gray-50 sm:text-sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedTeamVersion?.team.name || 'Team Versions'}
        <img alt="Dropdown" src={DropdownIcon} class="h-4 w-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-white py-0.5 shadow-md">
          <button
            className="flex h-8 w-full items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-gray-100 sm:text-sm"
            onClick={() => {
              setSelectedTeamVersion(null);
              setIsDropdownOpen(false);
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div>Personal</div>
              {!selectedTeamVersion && (
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
              )}
            </div>
          </button>
          {teamVersions.map((team) => {
            return (
              <button
                className="flex h-8 w-full items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-gray-100 sm:text-sm"
                onClick={() => {
                  setSelectedTeamVersion(team);
                  setIsDropdownOpen(false);
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <div>{team.team.name}</div>
                  {selectedTeamVersion?.team._id === team.team._id && (
                    <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
