import { getPercentage } from '../../helper/number';
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
      className="group relative flex min-h-[80px] w-full flex-col justify-between overflow-hidden rounded-md border border-gray-300 bg-white p-3 text-left text-sm transition-all hover:border-gray-400"
    >
      <h4 className="truncate font-medium text-gray-900">{resourceTitle}</h4>

      <div className="h-2 w-full overflow-hidden rounded-md bg-black/10">
        <div
          className="h-full bg-black/20"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </a>
  );
}
