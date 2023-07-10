import { useEffect, useState } from "preact/hooks";
import { useTeamId } from "../../hooks/use-team-id";
import { httpGet } from "../../lib/http";
import { pageProgressMessage } from "../../stores/page";
import { getRelativeTimeString } from "../../lib/date";

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
  updatedAt: string;
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
      alert(error?.message || 'Failed to get team progress');
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

  return (
    <div>
      <div className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Team Members
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {teamMembers.map(member => {
          return (
            <div
              className="border rounded-md h-full flex flex-col min-h-[270px]"
              key={member._id}
            >
              <div className="flex items-center gap-3 p-3 border-b">
                <img src={
                  member.avatar
                    ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${member.avatar}`
                    : '/images/default-avatar.png'} alt={member.name || ''} className="w-8 h-8 rounded-full" />
                <div className="grow">
                  <h3>{member.name}</h3>
                  <p className="text-sm truncate">{member.email}</p>
                </div>
              </div>
              <div className="flex grow flex-col p-3 border-b space-y-2">
                {member.progress.map(progress => {
                  return (
                    <div className="relative border rounded-md overflow-hidden p-2">
                      <div className="relative z-10 text-sm flex items-center justify-between">
                        <h3>{progress.resourceTitle}</h3>
                        <span className="text-xs">{progress.done} / {progress.total}</span>
                      </div>
                      <div className="absolute inset-0 bg-gray-100"
                        style={{
                          width: `${progress.done / progress.total * 100}%`,
                        }}
                      />
                    </div>
                  )
                })}
                {member.progress.length === 0 && (
                  <div className="text-gray-500">
                    No progress
                  </div>
                )}
              </div>

              <div className="p-3 flex items-center justify-between text-sm">
                <span>{getRelativeTimeString(member?.updatedAt)}</span>
                <a href={`/team/progress/member?teamId=${teamId}&memberId=${member._id}`} className="ml-3 hover:underline">View Details</a>
              </div>
            </div>
          )
        })}
      </div>
    </div>)
}
