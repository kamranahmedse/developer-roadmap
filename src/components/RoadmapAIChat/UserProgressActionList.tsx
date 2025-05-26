import { useMutation, useQuery } from '@tanstack/react-query';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { Fragment, useMemo, useState } from 'react';
import { renderTopicProgress } from '../../lib/resource-progress';
import { updateResourceProgress } from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import type { ResourceProgressType } from '../../lib/resource-progress';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { useToast } from '../../hooks/use-toast';
import { Check, ChevronRightIcon, Loader2Icon } from 'lucide-react';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { httpPost } from '../../lib/query-http';

type UpdateUserProgress = {
  id: string;
  action: 'done' | 'learning' | 'skipped' | 'pending';
};

function parseUserProgress(content: string): UpdateUserProgress[] {
  const items: UpdateUserProgress[] = [];

  const progressRegex = /<update-progress-item>.*?<\/update-progress-item>/gs;
  const progressItems = content.match(progressRegex);
  if (!progressItems) {
    return items;
  }

  for (const progressItem of progressItems) {
    const progressItemRegex = /<topic-id>(.*?)<\/topic-id>/;
    const topicId = progressItem.match(progressItemRegex)?.[1]?.trim();
    const topicActionRegex = /<topic-action>(.*?)<\/topic-action>/;
    const topicAction = progressItem
      .match(topicActionRegex)?.[1]
      .trim()
      ?.toLowerCase();

    if (!topicId || !topicAction) {
      continue;
    }

    items.push({
      id: topicId,
      action: topicAction as UpdateUserProgress['action'],
    });
  }

  return items;
}

type BulkUpdateResourceProgressBody = {
  done: string[];
  learning: string[];
  skipped: string[];
  pending: string[];
};

type BulkUpdateResourceProgressResponse = {
  done: string[];
  learning: string[];
  skipped: string[];
};

type UserProgressActionListProps = {
  roadmapId: string;
  content: string;
  isLoading?: boolean;
};

export function UserProgressActionList(props: UserProgressActionListProps) {
  const { roadmapId, content, isLoading = false } = props;

  const toast = useToast();
  const updateUserProgress = parseUserProgress(content);

  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient,
  );

  const {
    mutate: bulkUpdateResourceProgress,
    isPending: isBulkUpdating,
    isSuccess: isBulkUpdateSuccess,
  } = useMutation(
    {
      mutationFn: (body: BulkUpdateResourceProgressBody) => {
        return httpPost<BulkUpdateResourceProgressResponse>(
          `/v1-bulk-update-resource-progress/${roadmapId}`,
          body,
        );
      },
      onSuccess: () => {
        return queryClient.invalidateQueries(
          userResourceProgressOptions('roadmap', roadmapId),
        );
      },
      onSettled: () => {
        pageProgressMessage.set('');
      },
      onError: (error) => {
        toast.error(
          error?.message ?? 'Something went wrong, please try again.',
        );
      },
    },
    queryClient,
  );

  const progressItemWithText = useMemo(() => {
    return updateUserProgress.map((item) => {
      const roadmapTreeItem = roadmapTreeData?.find(
        (mapping) => mapping.nodeId === item.id,
      );

      return {
        ...item,
        text: (roadmapTreeItem?.text || item.id)
          ?.split(' > ')
          .slice(1)
          .join(' > '),
      };
    });
  }, [updateUserProgress, roadmapTreeData]);

  const [showAll, setShowAll] = useState(false);
  const itemCountToShow = 4;
  const itemsToShow = showAll
    ? progressItemWithText
    : progressItemWithText.slice(0, itemCountToShow);

  const hasMoreItemsToShow = progressItemWithText.length > itemCountToShow;

  return (
    <div className="relative my-6 w-full first:mt-0 last:mb-0">
      <div className="relative flex flex-col gap-0.5">
        {itemsToShow.map((item) => (
          <ProgressItem
            key={item.id}
            roadmapId={roadmapId}
            topicId={item.id}
            text={item.text}
            action={item.action}
            isStreaming={isLoading}
            isBulkUpdating={isBulkUpdating}
            isBulkUpdateSuccess={isBulkUpdateSuccess}
          />
        ))}

        {hasMoreItemsToShow && (
          <div className="relative mt-1 flex items-center justify-between gap-2">
            <button
              className="z-50 flex items-center gap-1 rounded-md bg-gray-400 px-2 py-1 text-xs font-medium text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() => setShowAll(!showAll)}
              disabled={isLoading}
            >
              {isLoading && (
                <>
                  <Loader2Icon className="size-3 animate-spin" />
                  {progressItemWithText.length} loaded ..
                </>
              )}

              {!isLoading && (
                <>
                  {showAll
                    ? '- Show Less'
                    : `+ Show ${progressItemWithText.length - itemCountToShow} More`}
                </>
              )}
            </button>

            <button
              className="z-50 flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isBulkUpdating || isLoading}
              onClick={() => {
                const done = updateUserProgress
                  .filter((item) => item.action === 'done')
                  .map((item) => item.id);
                const learning = updateUserProgress
                  .filter((item) => item.action === 'learning')
                  .map((item) => item.id);
                const skipped = updateUserProgress
                  .filter((item) => item.action === 'skipped')
                  .map((item) => item.id);
                const pending = updateUserProgress
                  .filter((item) => item.action === 'pending')
                  .map((item) => item.id);

                bulkUpdateResourceProgress({
                  done,
                  learning,
                  skipped,
                  pending,
                });
              }}
            >
              {isBulkUpdating && (
                <Loader2Icon className="size-3 animate-spin" />
              )}
              {!isBulkUpdating && <CheckIcon additionalClasses="size-3" />}
              Apply All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type ProgressItemProps = {
  roadmapId: string;
  topicId: string;
  text: string;
  action: UpdateUserProgress['action'];
  isStreaming: boolean;
  isBulkUpdating: boolean;
  isBulkUpdateSuccess: boolean;
};

function ProgressItem(props: ProgressItemProps) {
  const {
    roadmapId,
    topicId,
    text,
    action,
    isStreaming,
    isBulkUpdating,
    isBulkUpdateSuccess,
  } = props;

  const toast = useToast();

  const {
    mutate: updateTopicStatus,
    isSuccess,
    isPending: isUpdating,
  } = useMutation(
    {
      mutationFn: (action: ResourceProgressType) => {
        return updateResourceProgress(
          {
            resourceId: roadmapId,
            resourceType: 'roadmap',
            topicId,
          },
          action,
        );
      },
      onMutate: () => {},
      onSuccess: () => {
        renderTopicProgress(topicId, action);
      },
      onError: () => {
        toast.error('Something went wrong, please try again.');
      },
      onSettled: () => {
        pageProgressMessage.set('');
        return queryClient.invalidateQueries(
          userResourceProgressOptions('roadmap', roadmapId),
        );
      },
    },
    queryClient,
  );

  const textParts = text.split(' > ');
  const lastIndex = textParts.length - 1;

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white py-1 pr-1 pl-3">
      <span className="flex items-center gap-1 truncate text-sm text-gray-500">
        {textParts.map((part, index) => {
          return (
            <Fragment key={index}>
              {part}
              {index !== lastIndex && (
                <span className="text-gray-500">
                  <ChevronRightIcon className="size-3 shrink-0" />{' '}
                </span>
              )}
            </Fragment>
          );
        })}
      </span>
      {!isSuccess && !isBulkUpdateSuccess && (
        <>
          {!isStreaming && (
            <button
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-sm hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-40"
              onClick={() => updateTopicStatus(action)}
              disabled={isStreaming || isUpdating || isBulkUpdating}
            >
              {(isUpdating || isBulkUpdating) && (
                <Loader2Icon className="size-4 animate-spin" />
              )}
              {!isUpdating && !isBulkUpdating && (
                <Check strokeWidth={3} className="size-4" />
              )}
              Mark it as {action}
            </button>
          )}
          {isStreaming && (
            <span className="flex size-[30px] items-center justify-center text-gray-300">
              <Loader2Icon className="size-4 animate-spin" />
            </span>
          )}
        </>
      )}
      {(isSuccess || isBulkUpdateSuccess) && (
        <span className="flex size-[30px] items-center justify-center text-green-500">
          <CheckIcon additionalClasses="size-4" />
        </span>
      )}
    </div>
  );
}
