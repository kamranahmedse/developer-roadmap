import { getRelativeTimeString } from '../../lib/date';
import { getPercentage } from '../../lib/number';

type UserPublicProgressStats = {
  resourceType: 'roadmap';
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
  userId: string;
};

export function UserPublicProgressStats(props: UserPublicProgressStats) {
  const {
    updatedAt,
    resourceId,
    title,
    totalCount,
    learningCount,
    doneCount,
    skippedCount,
    roadmapSlug,
    isCustomResource = false,
    username,
    userId,
  } = props;

  // Currently we only support roadmap not (best-practices)
  const url = isCustomResource
    ? `/r/${roadmapSlug}`
    : `/${resourceId}?s=${userId}`;
  const totalMarked = doneCount + skippedCount;
  const progressPercentage = getPercentage(totalMarked, totalCount);

  return (
    <a
      href={url}
      target="_blank"
      className="group block rounded-md border p-2.5"
    >
      <h3 className="flex-1 cursor-pointer truncate text-lg font-medium">
        {title}
      </h3>
      <div className="relative mt-5 h-1 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className={`absolute left-0 top-0 h-full bg-black/40`}
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-sm text-gray-600">
          {progressPercentage}% completed
        </span>
        <span className="text-sm text-gray-400">
          Last updated {getRelativeTimeString(updatedAt)}
        </span>
      </div>
    </a>
  );
}
