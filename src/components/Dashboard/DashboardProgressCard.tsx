import { getPercentage } from '../../helper/number';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

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
      key={resourceId}
      className="group relative flex w-full items-center justify-between overflow-hidden rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm transition-all hover:border-gray-400"
    >
      <span className="flex-grow truncate">{resourceTitle}</span>
      <span className="text-xs text-gray-400">
        {parseInt(progressPercentage, 10)}%
      </span>

      <span
        className="absolute left-0 top-0 block h-full cursor-pointer rounded-tl-md bg-black/5 transition-colors group-hover:bg-black/10"
        style={{
          width: `${progressPercentage}%`,
        }}
      />
    </a>
  );
}
