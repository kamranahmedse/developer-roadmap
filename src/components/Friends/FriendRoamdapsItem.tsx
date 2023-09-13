import { useState } from 'react';
import type { GroupByFriendRoadmap } from './SharedRoadmapList';

type FriendRoamdapsItemProps = {
  friend: GroupByFriendRoadmap;
};
export function FriendRoamdapsItem(props: FriendRoamdapsItemProps) {
  const { friend } = props;

  const friendRoadmaps = friend?.roadmaps?.sort((a, b) => {
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div
        className={`flex h-full min-h-[270px] flex-col overflow-hidden rounded-md border`}
      >
        <div className={`relative flex items-center gap-3 border-b p-3`}>
          <img
            src={
              friend.avatar
                ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${friend.avatar}`
                : '/images/default-avatar.png'
            }
            alt={friend.name || ''}
            className="h-8 min-h-[32px] w-8 min-w-[32px] rounded-full"
          />
          <div className="inline-grid w-full">
            <div className="inline-grid grid-cols-[auto,32px] items-center gap-1.5">
              <h3 className="truncate font-medium">{friend.name}</h3>
            </div>
            <p className="truncate text-sm text-gray-500">{friend.email}</p>
          </div>
        </div>
        <div className="relative flex grow flex-col space-y-2 p-3">
          {(showAll ? friendRoadmaps : friendRoadmaps.slice(0, 4)).map(
            (roadmap) => {
              return (
                <a
                  href={`/r?id=${roadmap._id}`}
                  className="group relative overflow-hidden rounded-md border p-2 hover:border-gray-300 hover:text-black focus:outline-none"
                  key={roadmap.title}
                >
                  <span className="relative z-10 flex items-center justify-between text-sm">
                    <span className="inline-grid">
                      <span className={'truncate'}>{roadmap.title}</span>
                    </span>
                  </span>
                </a>
              );
            }
          )}

          {friendRoadmaps.length > 4 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className={'text-sm text-gray-400 underline'}
            >
              + {friendRoadmaps.length - 4} more
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

          {friendRoadmaps.length === 0 && (
            <div className="text-sm text-gray-500">No progress</div>
          )}
        </div>
      </div>
    </>
  );
}
