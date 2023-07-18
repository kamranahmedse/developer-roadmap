import { useEffect, useState } from 'preact/hooks';
import { useTeamId } from '../../hooks/use-team-id';
import { httpGet } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { MemberProgressItem } from './MemberProgressItem';
import type { TeamDocument } from '../CreateTeam/CreateTeamForm';

export type UserProgress = {
  resourceTitle: string;
  resourceType: 'roadmap' | 'best-practice';
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
};

export type GetTeamResponse = TeamDocument & {
  roadmaps: {
    id: string;
    title: string;
    originalTopicCount: number;
    removedTopicCount: number;
    totalTopicCount: number;
  }[];
};

export function TeamProgressPage() {
  const { teamId } = useTeamId();
  const [isLoading, setIsLoading] = useState(true);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [team, setTeam] = useState<GetTeamResponse | null>(null);

  async function getTeamProgress() {
    const { response, error } = await httpGet<{
      data: TeamMember[];
    }>(`${import.meta.env.PUBLIC_API_URL}/v1-get-team-progress/${teamId}`);
    if (error || !response?.data) {
      alert(error?.message || 'Failed to get team progress');
      return;
    }

    setTeamMembers(response.data);
  }

  async function getTeam() {
    const { response, error } = await httpGet<GetTeamResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team/${teamId}`
    );

    if (error || !response) {
      alert(error?.message || 'Failed to get team progress');
      return;
    }

    setTeam(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    Promise.any([getTeam(), getTeamProgress()]).finally(() => {
      pageProgressMessage.set('');
      setIsLoading(false);
    });
  }, [teamId]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold sm:text-4xl">Progress</h2>
        <p className="mt-2 text-gray-400">
          Click on a progress bar to see more details.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <MemberProgressItem team={team!} member={member} />
        ))}
      </div>
    </div>
  );
}
