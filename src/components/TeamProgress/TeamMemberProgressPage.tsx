import { useEffect, useState } from "preact/hooks";
import { useParams } from "../../hooks/use-params";
import { httpGet } from "../../lib/http";
import type { TeamMember } from "./TeamProgressPage";
import { ResourceProgress } from "../Activity/ResourceProgress";
import type { TeamDocument } from "../CreateTeam/TeamActionForm";

export function TeamMemberProgressPage() {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [team, setTeam] = useState<TeamDocument | null>(null);
  const { memberId, teamId } = useParams<{
    memberId: string;
    teamId: string;
  }>();

  async function getTeamMember() {
    const { response, error } = await httpGet<{
      data: {
        team: TeamDocument;
        user: TeamMember
      }
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-team-member-progress/${teamId}/${memberId}`);
    if (error || !response?.data) {
      console.log(error);
      return;
    }

    setTeam(response.data.team);
    setTeamMember(response.data.user);
  }

  useEffect(() => {
    if (!teamId || !memberId) {
      return;
    }
    getTeamMember();
  }, [teamId, memberId]);

  if (!teamMember || !team) {
    return null
  }

  return <div>
    <div>
      <p className="flex items-center gap-2 text-sm">
        <span>{team?.name}</span>/<span>{teamMember?.name}</span>
      </p>
    </div>
    <div className="mt-6 space-y-3">
      {
        teamMember?.progress.map((progress) => {
          return <ResourceProgress key={progress.resourceId}
            doneCount={progress.done || 0}
            learningCount={progress.learning || 0}
            totalCount={progress.total || 0}
            skippedCount={progress.skipped || 0}
            resourceId={progress.resourceId}
            resourceType={progress.resourceType}
            updatedAt={progress.updatedAt}
            title={progress.resourceTitle}
            showClearButton={false}
          />
        })
      }
    </div>
  </div>;
}
