import { useState } from 'preact/hooks';
import type { GroupByRoadmap } from './TeamProgressPage';

type GroupRoadmapItemProps = {
  roadmap: GroupByRoadmap;
};

export function GroupRoadmapItem(props: GroupRoadmapItemProps) {
  const { members, resourceTitle } = props.roadmap;

  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex h-full min-h-[270px] flex-col rounded-md border">
      <div className="flex items-center gap-3 border-b p-3">
        <div className="flex min-w-0 flex-grow flex-col">
          <h3 className="truncate font-medium">{resourceTitle}</h3>
        </div>
      </div>
      <div className="relative flex grow flex-col space-y-2 p-3">
        {(showAll ? members : members.slice(0, 4)).map((member) => {
          if (!member.progress) return null;
          return (
            <div
              className="group relative overflow-hidden rounded-md border p-2 hover:border-gray-300 hover:text-black focus:outline-none"
              key={member?.member._id}
            >
              <span className="relative z-10 flex items-center justify-between text-sm">
                <span>{member?.member?.name}</span>
                <span className="text-xs text-gray-400">
                  {member?.progress?.done} / {member?.progress?.total}
                </span>
              </span>
              <span
                className="absolute inset-0 bg-gray-100 group-hover:bg-gray-200"
                style={{
                  width: `${
                    (member?.progress?.done / member?.progress?.total) * 100
                  }%`,
                }}
              />
            </div>
          );
        })}

        {members.length > 4 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className={'text-sm text-gray-400 underline'}
          >
            + {members.length - 4} more
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

        {members.length === 0 && (
          <div className="text-sm text-gray-500">No progress</div>
        )}
      </div>
    </div>
  );
}
