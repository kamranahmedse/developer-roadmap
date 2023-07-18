import { getUrlParams } from '../lib/browser';
import { useEffect, useState } from 'preact/hooks';
import type { TeamDocument } from './CreateTeam/CreateTeamForm';
import type { TeamResourceConfig } from './CreateTeam/RoadmapSelector';
import { RoadmapSelector } from './CreateTeam/RoadmapSelector';
import { httpGet } from '../lib/http';
import { pageProgressMessage } from '../stores/page';

export function TeamRoadmaps() {
  const { t: teamId } = getUrlParams();
  const [team, setTeam] = useState<TeamDocument>();
  const [resourceConfig, setResourceConfig] = useState<TeamResourceConfig>([]);

  async function loadTeam(teamIdToFetch: string) {
    const { response, error } = await httpGet<TeamDocument>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamIdToFetch}`
    );

    if (error || !response) {
      alert('Error loading team');
      window.location.href = '/account';
      return;
    }

    setTeam(response);
  }

  async function loadTeamResourceConfig(teamId: string) {
    const { error, response } = await httpGet<TeamResourceConfig>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-resource-config/${teamId}`
    );
    if (error || !Array.isArray(response)) {
      console.error(error);
      return;
    }

    setResourceConfig(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    Promise.all([loadTeam(teamId), loadTeamResourceConfig(teamId)]).finally(
      () => {
        pageProgressMessage.set('');
      }
    );
  }, [teamId]);

  if (!team) {
    return null;
  }

  return (
    <div>
      <RoadmapSelector
        team={team!}
        teamResourceConfig={resourceConfig}
        setTeamResourceConfig={(a) => null}
      />
    </div>
  );
}
