import { useEffect, useState } from "preact/hooks";
import { useTeamId } from "../../hooks/use-team-id";
import { httpGet } from "../../lib/http";
import { pageProgressMessage } from "../../stores/page";

export type UserProgress = {
  resourceTitle: string;
  resourceType: "roadmap" | "best-practice";
  resourceId: string;
  isFavorite: boolean;
  done: number;
  learning: number;
  skipped: number;
  total: number;
  updatedAt: string;
};
export type TeamMember = {
  _id: string;
  role: string;
  name: string;
  email: string;
  avatar: string;
  progress: UserProgress[];
}

export function TeamProgressPage() {
  const { teamId } = useTeamId();
  const [isPreparing, setIsPreparing] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  async function getAllProgress() {
    const { response, error } = await httpGet<{
      data: TeamMember[];
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-team-progress/${teamId}`);
    if (error || !response?.data) {
      console.log(error);
      return;
    }

    setTeamMembers(response.data);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }
    getAllProgress().finally(() => {
      pageProgressMessage.set('');
      setIsPreparing(false);
    })
  }, [teamId]);

  if (isPreparing) {
    return null
  }

  return <div className="grid grid-cols-2 gap-2">
    {
      teamMembers.map(member => {
        return (
          <a
            className="border p-4 rounded-md hover:bg-gray-50 h-full"
            key={member._id}
            href={`/team/progress/member?teamId=${teamId}&memberId=${member._id}`}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                {
                  member.progress.map(progress => {
                    return (
                      <div>
                        <span className="text-sm">
                          {progress.resourceTitle}
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Progress bar */}
                          <div className="grow relative rounded overflow-hidden">
                            <div className="h-2 bg-gray-100 w-full" />
                            <div style={{ width: `${progress.done / progress.total * 100}% ` }} className="absolute top-0 left-0 h-full bg-gray-400 w-full" />
                          </div>
                          <span className="text-xs text-gray-500">
                            {progress.done} / {progress.total}
                          </span>
                        </div>
                      </div>
                    )
                  })
                }
                {
                  member.progress.length === 0 && (
                    <div className="text-gray-500">
                      No progress
                    </div>
                  )
                }
              </div>
              <div className="mt-3">
                {member.name}
              </div>
            </div>
          </a>
        )
      })
    }
  </div>;
}
