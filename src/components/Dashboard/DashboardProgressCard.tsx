import { getPercentage } from '../../helper/number';
import { getRelativeTimeString } from '../../lib/date';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';

type DashboardProgressCardProps = {
  progress: UserProgress;
};

export function DashboardProgressCard(props: DashboardProgressCardProps) {
  const { progress } = props;

  const {
    resourceType,
    resourceId,
    resourceTitle,
    total: totalCount,
    done: doneCount,
    skipped: skippedCount,
    roadmapSlug,
    isCustomResource,
    updatedAt,
  } = progress;

  let url =
    resourceType === 'roadmap'
      ? `/${resourceId}`
      : `/best-practices/${resourceId}`;

  if (isCustomResource) {
    url = `/r/${roadmapSlug}`;
  }

  const totalMarked = doneCount + skippedCount;
  const progressPercentage = getPercentage(totalMarked, totalCount);

  return (
    <a
      href={url}
      className="group relative flex min-h-[80px] w-full flex-col justify-between overflow-hidden rounded-md border bg-white p-3 text-left text-sm shadow-sm transition-all hover:border-gray-300"
    >
      <h4 className="truncate font-medium text-gray-900">{resourceTitle}</h4>

      <div className="mt-6 flex items-center gap-2">
        <div className="h-2 w-full overflow-hidden rounded-md bg-black/10">
          <div
            className="h-full bg-black/20"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500">
          {Math.floor(+progressPercentage)}%
        </span>
      </div>

      <p className="mt-1 text-xs text-gray-400">
        {isCustomResource ? (
          <>Last updated {getRelativeTimeString(updatedAt)}</>
        ) : (
          <>Last practiced {getRelativeTimeString(updatedAt)}</>
        )}
      </p>
    </a>
  );
}
