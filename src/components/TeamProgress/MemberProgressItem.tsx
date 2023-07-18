import type { GetTeamResponse, TeamMember } from './TeamProgressPage';
import { useState } from 'preact/hooks';

type MemberProgressItemProps = {
  team: GetTeamResponse;
  member: TeamMember;
};
export function MemberProgressItem(props: MemberProgressItemProps) {
  const { member, team } = props;

  const teamRoadmapIds = team.roadmaps.map((roadmap) => roadmap.id);
  const memberProgress = member.progress.filter((progress) => {
    return teamRoadmapIds.includes(progress.resourceId);
  });

  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div
        className="flex h-full min-h-[270px] flex-col rounded-md border"
        key={member._id}
      >
        <div className="flex items-center gap-3 border-b p-3">
          <img
            src={
              member.avatar
                ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${member.avatar}`
                : '/images/default-avatar.png'
            }
            alt={member.name || ''}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex min-w-0 flex-grow flex-col">
            <h3 className="truncate font-medium">{member.name}</h3>
            <p className="truncate text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
        <div className="relative flex grow flex-col space-y-2 p-3">
          {(showAll ? memberProgress : memberProgress.slice(0, 4)).map(
            (progress) => {
              return (
                <button
                  className="group relative overflow-hidden rounded-md border p-2 hover:border-gray-300 hover:text-black"
                  key={progress.resourceId}
                >
                  <span className="relative z-10 flex items-center justify-between text-sm">
                    <span>{progress.resourceTitle}</span>
                    <span className="text-xs text-gray-400">
                      {progress.done} / {progress.total}
                    </span>
                  </span>
                  <span
                    className="absolute inset-0 bg-gray-100 group-hover:bg-gray-200"
                    style={{
                      width: `${(progress.done / progress.total) * 100}%`,
                    }}
                  />
                </button>
              );
            }
          )}

          {memberProgress.length > 4 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className={'text-sm text-gray-400 underline'}
            >
              + {memberProgress.length - 4} more
            </button>
          )}

          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className={'text-sm text-gray-400 underline'}
            >
              - Show less
            </button>
          )}

          {memberProgress.length === 0 && (
            <div className="text-sm text-gray-500">No progress</div>
          )}
        </div>
      </div>
    </>
  );
}
