import { getUser } from '../../lib/jwt';
import { ResourceProgressActions } from './ResourceProgressActions';
import { cn } from '../../lib/classname';
import { getPercentage } from '../../lib/number';

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
  showActions?: boolean;
  onResourceClick?: () => void;
};

export function ResourceProgress(props: ResourceProgressType) {
  const {
    showClearButton = true,
    isCustomResource,
    showActions = true,
    onResourceClick,
  } = props;

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

  const Slot = onResourceClick ? 'button' : 'a';

  return (
    <div className="relative">
      <Slot
        {...(onResourceClick
          ? {
              onClick: onResourceClick,
            }
          : {
              href: url,
              target: '_blank',
            })}
        className={cn(
          'group relative flex w-full items-center justify-between overflow-hidden rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm transition-all hover:border-gray-400',
          showActions ? 'pr-7' : '',
        )}
      >
        <span className="flex-grow truncate">{title}</span>
        <span className="text-xs text-gray-400">
          {parseInt(progressPercentage.toString(), 10)}%
        </span>

        <span
          className="absolute left-0 top-0 block h-full cursor-pointer rounded-tl-md bg-black/5 transition-colors group-hover:bg-black/10"
          style={{
            width: `${progressPercentage}%`,
          }}
        ></span>
      </Slot>

      {showActions && (
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
      )}
    </div>
  );
}
