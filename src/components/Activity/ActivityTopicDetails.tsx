import { useRef, useState } from 'react';
import type { ResourceType } from '../../lib/resource-progress';
import type { AllowedActivityActionType } from './ActivityStream';
import { httpPost } from '../../lib/http';
import { cn } from '../../lib/classname';
import { Spinner } from '../ReactIcons/Spinner';
import { useKeydown } from '../../hooks/use-keydown';
import { useOutsideClick } from '../../hooks/use-outside-click';

type ActivityTopicDetailsProps = {
  activityId: string;
  resourceId: string;
  resourceType: ResourceType | 'question';
  isCustomResource?: boolean;
  topicTitlesCache: Map<string, Record<string, string>>;
  topicIds: string[];
  topicCount: number;
  actionType: AllowedActivityActionType;
};

export function ActivityTopicDetails(props: ActivityTopicDetailsProps) {
  const {
    activityId,
    resourceId,
    resourceType,
    isCustomResource,
    topicTitlesCache,
    topicIds = [],
    topicCount,
    actionType,
  } = props;

  const activityPopoverRef = useRef<HTMLDivElement | null>(null);

  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topicTitles, setTopicTitles] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const loadTopicTitles = async () => {
    if (isLoading) {
      return;
    }

    if (topicTitlesCache.has(activityId)) {
      setTopicTitles(topicTitlesCache.get(activityId)!);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-activity-topic-titles`,
      {
        resourceId,
        resourceType,
        isCustomResource,
        topicIds,
      },
    );

    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      setIsLoading(false);
      return;
    }

    topicTitlesCache.set(activityId, response);
    setTopicTitles(response);
    setIsLoading(false);
  };

  const shouldShowDetails = topicCount > 0 && resourceType !== 'question';

  const handleClick = () => {
    if (!shouldShowDetails) {
      return;
    }

    setShowDetails(true);
    loadTopicTitles().finally(() => null);
  };

  const handleClose = () => {
    setShowDetails(false);
    setIsLoading(false);
    setError(null);
  };

  useKeydown('Escape', handleClose);
  useOutsideClick(activityPopoverRef, handleClose);

  return (
    <div className="relative inline">
      <button
        className={cn(
          'font-medium text-black',
          shouldShowDetails && 'cursor-pointer underline hover:no-underline',
        )}
        onClick={handleClick}
        disabled={!shouldShowDetails}
      >
        {topicCount}&nbsp;
        {actionType === 'answered'
          ? topicCount > 1
            ? 'questions'
            : 'question'
          : topicCount > 1
            ? 'items'
            : 'item'}
      </button>

      {showDetails && shouldShowDetails && (
        <div className="absolute bottom-full left-0 z-10 w-64 rounded border border-gray-200 bg-white shadow-md">
          {isLoading && (
            <div className="flex h-full items-center justify-center p-2 py-4">
              <Spinner className="h-4 w-4" />
            </div>
          )}
          {error && <div className="p-2 text-red-500">{error}</div>}
          {!isLoading && !error && (
            <ul>
              {topicIds.map((topicId) => {
                const isLast =
                  topicIds.indexOf(topicId) === topicIds.length - 1;
                const topicTitle = topicTitles[topicId] || 'Unknown Topic';

                return (
                  <li
                    key={topicId}
                    className={cn(
                      'p-0.5 px-1 text-sm',
                      isLast ? 'border-b-0' : 'border-b',
                    )}
                  >
                    {topicTitle}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
