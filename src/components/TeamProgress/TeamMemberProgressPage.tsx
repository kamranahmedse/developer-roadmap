import { useEffect, useState } from 'preact/hooks';
import { useParams } from '../../hooks/use-params';
import { httpGet } from '../../lib/http';
import type { TeamMember } from './TeamProgressPage';
import { pageProgressMessage } from '../../stores/page';
import { EmptyActivity } from '../Activity/EmptyActivity';
import { TeamResourceProgress } from './TeamResourceProgress';
import { useTeamId } from '../../hooks/use-team-id';

export function TeamMemberProgressPage() {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const { teamId } = useTeamId();
  const { memberId } = useParams<{ memberId: string }>();

  async function getTeamMember() {
    const { response, error } = await httpGet<TeamMember>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-team-member-progress/${teamId}/${memberId}`
    );
    if (error || !response) {
      console.log(error);
      return;
    }

    setTeamMember(response);
  }

  useEffect(() => {
    if (!teamId || !memberId) {
      return;
    }
    getTeamMember().finally(() => {
      pageProgressMessage.set('');
    });
  }, [teamId, memberId]);

  if (!teamMember) {
    return null;
  }

  return (
    <div>
      <h2 className="text-gray-500">Team Member / {teamMember.name}</h2>
      <div className="my-10 flex items-center gap-4">
        <img
          src={
            teamMember.avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${teamMember.avatar}`
              : '/images/default-avatar.png'
          }
          alt={teamMember.name || ''}
          className="h-16 w-16 rounded-full"
        />
        <div className="grow">
          <h3 className="text-2xl font-semibold">{teamMember.name}</h3>
          <p className="truncate text-sm">{teamMember.email}</p>
        </div>
      </div>
      <div className="border-t pt-6">
        <h3 className="text-sm uppercase text-gray-500">Progress</h3>
        <div className="mt-3 space-y-3">
          {teamMember?.progress.map((progress) => (
            <TeamResourceProgress
              key={progress.resourceId}
              doneCount={progress.done || 0}
              learningCount={progress.learning || 0}
              totalCount={progress.total || 0}
              skippedCount={progress.skipped || 0}
              resourceId={progress.resourceId}
              resourceType={progress.resourceType}
              updatedAt={progress.updatedAt}
              title={progress.resourceTitle}
            />
          ))}
          {teamMember?.progress.length === 0 && <EmptyActivity />}
        </div>
      </div>
    </div>
  );
}
