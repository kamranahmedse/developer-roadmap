import { useStore } from '@nanostores/react';
import type { TeamMember } from './TeamProgressPage';
import { useState } from 'react';
import { $currentTeam } from '../../stores/team';
import { cn } from '../../lib/classname';

type MemberProgressItemProps = {
  member: TeamMember;
  onShowResourceProgress: (
    resourceId: string,
    isCustomResource: boolean,
  ) => void;
  isMyProgress?: boolean;
  teamId: string;
};
export function MemberProgressItem(props: MemberProgressItemProps) {
  const {
    member,
    onShowResourceProgress,
    isMyProgress = false,
    teamId,
  } = props;

  const currentTeam = useStore($currentTeam);
  const memberProgress = member?.progress?.sort((a, b) => {
    return b.done - a.done;
  });

  const [showAll, setShowAll] = useState(false);

  const isPersonalProgressOnly =
    currentTeam?.personalProgressOnly &&
    currentTeam.role === 'member' &&
    String(member._id) !== currentTeam.memberId;
  const memberDetailsUrl = `/team/member?t=${teamId}&m=${member._id}`;

  return (
    <>
      <div
        className={`flex h-full min-h-[270px] flex-col overflow-hidden rounded-md border`}
        key={member._id}
      >
        <div className={`relative flex items-center gap-3 border-b p-3`}>
          <img
            src={
              member.avatar
                ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${member.avatar}`
                : '/images/default-avatar.png'
            }
            alt={member.name || ''}
            className="h-8 min-h-[32px] w-8 min-w-[32px] rounded-full"
          />
          <div className="inline-grid w-full">
            {!isMyProgress && (
              <a
                href={memberDetailsUrl}
                className={cn(
                  'truncate font-medium',
                  isPersonalProgressOnly
                    ? 'pointer-events-none cursor-default no-underline'
                    : '',
                )}
                onClick={(e) => {
                  if (isPersonalProgressOnly) {
                    e.preventDefault();
                  }
                }}
                aria-disabled={isPersonalProgressOnly}
              >
                {member.name}
              </a>
            )}
            {isMyProgress && (
              <div className="inline-grid grid-cols-[auto_32px] items-center gap-1.5">
                <a
                  href={memberDetailsUrl}
                  className={cn(
                    'truncate font-medium',
                    isPersonalProgressOnly
                      ? 'pointer-events-none cursor-default no-underline'
                      : '',
                  )}
                  onClick={(e) => {
                    if (isPersonalProgressOnly) {
                      e.preventDefault();
                    }
                  }}
                  aria-disabled={isPersonalProgressOnly}
                >
                  {member.name}
                </a>
                <span className="rounded-md bg-red-500 px-1 py-0.5 text-xs text-white">
                  You
                </span>
              </div>
            )}
            <p className="truncate text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
        <div className="relative flex grow flex-col space-y-2 p-3">
          {(showAll ? memberProgress : memberProgress.slice(0, 4)).map(
            (progress) => {
              return (
                <button
                  onClick={() =>
                    onShowResourceProgress(
                      progress.resourceId,
                      progress.isCustomResource!,
                    )
                  }
                  className="group relative overflow-hidden rounded-md border p-2 hover:border-gray-300 hover:text-black focus:outline-hidden"
                  key={progress.resourceId}
                >
                  <span className="relative z-10 flex items-center justify-between text-sm">
                    <span className="inline-grid">
                      <span className={'truncate'}>
                        {progress.resourceTitle}
                      </span>
                    </span>
                    <span className="ml-1.5 shrink-0 text-xs text-gray-400">
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
            },
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
