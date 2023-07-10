import { useEffect, useState } from "preact/hooks"
import { useParams } from "../../hooks/use-params"
import { httpGet } from "../../lib/http"
import { UpdateTeamForm } from "./UpdateTeamForm"

export function TeamSettingsPage() {
  const [team, setTeam] = useState<TeamDocument | null>(null)
  const { teamId } = useParams<{ teamId: string }>()
  async function getTeamDetails() {
    const { response, error } = await httpGet<TeamDocument>(`${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamId}`);
    if (error || !response) {
      console.log(error);
      return;
    }
    setTeam(response);
  }
  useEffect(() => {
    if (!teamId) {
      return;
    }
    getTeamDetails();
  }, [teamId])

  return (
    <div>
      <UpdateTeamForm />
    </div>
  )
}
