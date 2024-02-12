import { getRelativeTimeString } from '../../lib/date';

type UserPublicProgressStats = {
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
  title: string;
  updatedAt: string;
  totalCount: number;
  doneCount: number;
  learningCount: number;
  skippedCount: number;
  showClearButton?: boolean;
  isCustomResource?: boolean;
  roadmapSlug?: string;
  username: string;
};

export function UserPublicProgressStats(props: UserPublicProgressStats) {
  const {
    updatedAt,
    resourceType,
    resourceId,
    title,
    totalCount,
    learningCount,
    doneCount,
    skippedCount,
    roadmapSlug,
    isCustomResource = false,
    username,
  } = props;

  // Currently we only support roadmap not (best-practices)
  const url = `/u/${username}/${isCustomResource ? roadmapSlug : resourceId}`;
  const totalMarked = doneCount + skippedCount;
  const progressPercentage = Math.round((totalMarked / totalCount) * 100);

  return (
    <div>
      <a
        href={url}
        className="group relative flex cursor-pointer items-center rounded-t-md border p-3 text-gray-600 hover:border-gray-300 hover:text-black"
      >
        <span
          className={`absolute left-0 top-0 block h-full cursor-pointer rounded-tl-md bg-black/5 group-hover:bg-black/10`}
          style={{
            width: `${progressPercentage}%`,
          }}
        ></span>
        <span className="relative  flex-1 cursor-pointer truncate">
          {title}
        </span>
        <span className="ml-1 cursor-pointer text-sm text-gray-400">
          {getRelativeTimeString(updatedAt)}
        </span>
      </a>
      <div className="sm:space-between flex flex-row items-start rounded-b-md border border-t-0 px-2 py-2 text-xs text-gray-500">
        <span className="hidden flex-1 gap-1 sm:flex">
          {doneCount > 0 && (
            <>
              <span>{doneCount} done</span> &bull;
            </>
          )}
          {learningCount > 0 && (
            <>
              <span>{learningCount} in progress</span> &bull;
            </>
          )}
          {skippedCount > 0 && (
            <>
              <span>{skippedCount} skipped</span> &bull;
            </>
          )}
          <span>{totalCount} total</span>
        </span>
      </div>
    </div>
  );
}
