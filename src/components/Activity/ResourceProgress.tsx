import { getUser } from '../../lib/jwt';
import { getPercentage } from '../../helper/number';
import { ResourceProgressActions } from './ResourceProgressActions';

type ResourceProgressType = {
  resourceType: 'roadmap' | 'best-practice';
  resourceId: string;
  title: string;
  updatedAt: string;
  totalCount: number;
  doneCount: number;
  learningCount: number;
  skippedCount: number;
  onCleared?: () => void;
  showClearButton?: boolean;
  isCustomResource: boolean;
  roadmapSlug?: string;
};

export function ResourceProgress(props: ResourceProgressType) {
  const { showClearButton = true, isCustomResource } = props;

  const userId = getUser()?.id;

  const {
    updatedAt,
    resourceType,
    resourceId,
    title,
    totalCount,
    learningCount,
    doneCount,
    skippedCount,
    onCleared,
    roadmapSlug,
  } = props;

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
    <div className="relative">
      <a
        target="_blank"
        href={url}
        className="group relative flex items-center justify-between overflow-hidden rounded-md border border-gray-300 bg-white px-3 py-2 pr-7 text-left text-sm transition-all hover:border-gray-400"
      >
        <span className="flex-grow truncate">{title}</span>
        <span className="text-xs text-gray-400">
          {parseInt(progressPercentage, 10)}%
        </span>

        <span
          className="absolute left-0 top-0 block h-full cursor-pointer rounded-tl-md bg-black/5 transition-colors group-hover:bg-black/10"
          style={{
            width: `${progressPercentage}%`,
          }}
        ></span>
      </a>

      <div className="absolute right-2 top-0 flex h-full items-center">
        <ResourceProgressActions
          userId={userId!}
          resourceType={resourceType}
          resourceId={resourceId}
          isCustomResource={isCustomResource}
          onCleared={onCleared}
          showClearButton={showClearButton}
        />
      </div>
    </div>
  );
}
