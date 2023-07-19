import { useEffect, useState } from 'preact/hooks';
import { useTeamId } from '../../hooks/use-team-id';
import { httpGet } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { MemberProgressItem } from './MemberProgressItem';

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

export function TeamProgressPage() {
  const { teamId } = useTeamId();
  const [isLoading, setIsLoading] = useState(true);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  async function getTeamProgress() {
    const { response, error } = await httpGet<TeamMember[]>(`${import.meta.env.PUBLIC_API_URL}/v1-get-team-progress/${teamId}`);
    if (error || !response) {
      alert(error?.message || 'Failed to get team progress');
      return;
    }

    setTeamMembers(response);
  }

  useEffect(() => {
    if (!teamId) {
      return;
    }

    getTeamProgress().finally(() => {
      pageProgressMessage.set('');
      setIsLoading(false);
    });
  }, [teamId]);

  if (isLoading) {
    return null;
  }

  if (!teamId) {
    window.location.href = '/';
    return;
  }

  return (
    <div>

      <div className="grid gap-4 sm:grid-cols-2">
        {teamMembers.map((member) => (
          <MemberProgressItem teamId={teamId} member={member} />
        ))}
      </div>
    </div>
  );
}
