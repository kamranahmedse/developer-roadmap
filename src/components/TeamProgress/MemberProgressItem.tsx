import type { TeamMember } from './TeamProgressPage';
import { useState } from 'react';

type MemberProgressItemProps = {
  member: TeamMember;
  onShowResourceProgress: (resourceId: string) => void;
  isMyProgress?: boolean;
};
export function MemberProgressItem(props: MemberProgressItemProps) {
  const { member, onShowResourceProgress, isMyProgress = false } = props;

  const memberProgress = member?.progress?.sort((a, b) => {
    return b.done - a.done;
  });

  const [showAll, setShowAll] = useState(false);

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
            className="min-w-[32px] min-h-[32px] h-8 w-8 rounded-full"
          />
          <div className="inline-grid w-full">
            {!isMyProgress && (
              <h3 className="truncate font-medium">{member.name}</h3>
            )}
            {isMyProgress && (
              <div className="inline-grid grid-cols-[auto,32px] items-center gap-1.5">
                <h3 className="truncate font-medium">{member.name}</h3>
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
                  onClick={() => onShowResourceProgress(progress.resourceId)}
                  className="group relative overflow-hidden rounded-md border p-2 hover:border-gray-300 hover:text-black focus:outline-none"
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
