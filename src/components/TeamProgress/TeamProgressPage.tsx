import { useEffect, useState } from 'preact/hooks';
import { useTeamId } from '../../hooks/use-team-id';
import { httpGet } from '../../lib/http';
import { pageProgressMessage } from '../../stores/page';
import { MemberProgressItem } from './MemberProgressItem';
import { useToast } from '../../hooks/use-toast';
import { useStore } from '@nanostores/preact';
import { $currentTeam } from '../../stores/team';
import { GroupRoadmapItem } from './GroupRoadmapItem';

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

export type GroupByRoadmap = {
  resourceId: string;
  resourceTitle: string;
  resourceType: string;
  members: {
    member: TeamMember;
    progress: UserProgress | undefined;
  }[];
};

export function TeamProgressPage() {
  const { teamId } = useTeamId();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const currentTeam = useStore($currentTeam);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedGrouping, setSelectedGrouping] = useState<
    'roadmap' | 'member'
  >('member');

  async function getTeamProgress() {
    const { response, error } = await httpGet<TeamMember[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-team-progress/${teamId}`
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to get team progress');
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

  const groupByRoadmap: GroupByRoadmap[] =
    currentTeam?.roadmaps.map((roadmap) => {
      const members =
        teamMembers.map((member) => {
          const memberProgress =
            member.progress.find(
              (progress) => progress.resourceId === roadmap
            ) || undefined;
          return {
            member: member,
            progress: memberProgress,
          };
        }) || [];
      return {
        resourceId: roadmap,
        resourceTitle: members?.[0].progress?.resourceTitle || '',
        resourceType: 'roadmap',
        members,
      };
    }) || [];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Team progress</h1>
        <p className="text-gray-500">
          See how your team is progressing through the roadmaps.
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <button
          className={`rounded-md border p-1 px-2 text-sm ${
            selectedGrouping === 'member' ? ' border-gray-500 bg-gray-300 ' : ''
          }`}
          onClick={() => setSelectedGrouping('member')}
        >
          Members
        </button>
        <button
          className={`rounded-md border p-1 px-2 text-sm ${
            selectedGrouping === 'roadmap'
              ? ' border-gray-500 bg-gray-300 '
              : ''
          }`}
          onClick={() => setSelectedGrouping('roadmap')}
        >
          Group by Roadmap
        </button>
      </div>

      <div className="mt-6">
        {selectedGrouping === 'roadmap' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {groupByRoadmap.map((roadmap) => {
              return (
                <GroupRoadmapItem key={roadmap.resourceId} roadmap={roadmap} />
              );
            })}
          </div>
        )}
        {selectedGrouping === 'member' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <MemberProgressItem teamId={teamId} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
