import {
  useMutation, useQuery
} from '@tanstack/react-query';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { useMemo, useState } from 'react';
import { renderTopicProgress } from '../../lib/resource-progress';
import { updateResourceProgress } from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import type { ResourceProgressType } from '../../lib/resource-progress';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { useToast } from '../../hooks/use-toast';
import { Loader2Icon } from 'lucide-react';
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
  const itemCountToShow = 3;
  const itemsToShow = showAll
    ? progressItemWithText
    : progressItemWithText.slice(0, itemCountToShow);

  const hasMoreItemsToShow = progressItemWithText.length > itemCountToShow;

  return (
    <div className="relative my-6 w-full overflow-hidden rounded-lg border border-gray-200 p-2 first:mt-0 last:mb-0">
      <div className="relative flex flex-col gap-0.5">
        {itemsToShow.map((item) => (
          <ProgressItem
            key={item.id}
            roadmapId={roadmapId}
            topicId={item.id}
            text={item.text}
            action={item.action}
            isBulkUpdating={isBulkUpdating}
            isBulkUpdateSuccess={isBulkUpdateSuccess}
          />
        ))}

        {hasMoreItemsToShow && (
          <div className="absolute inset-x-0 right-0 bottom-0.5 translate-y-1/2">
            <div className="flex items-center justify-center gap-2">
              <button
                className="rounded-md bg-gray-100 px-2 py-1 text-[10px] leading-none font-medium disabled:cursor-not-allowed disabled:opacity-70"
                onClick={() => setShowAll(!showAll)}
                disabled={isLoading}
              >
                {isLoading && <Loader2Icon className="size-2.5 animate-spin" />}

                {!isLoading && (
                  <>
                    {showAll
                      ? '- Show Less'
                      : `+${progressItemWithText.length - itemCountToShow} more`}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {hasMoreItemsToShow && (
        <div className="absolute top-0 right-0">
          <button
            className="flex items-center gap-1 rounded-b-md bg-green-100 px-2 py-1 text-[10px] leading-none font-medium text-green-600"
            disabled={isBulkUpdating}
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
              <Loader2Icon className="size-2.5 animate-spin" />
            )}
            {!isBulkUpdating && <CheckIcon additionalClasses="size-2.5" />}
            Apply All
          </button>
        </div>
      )}
    </div>
  );
}

type ProgressItemProps = {
  roadmapId: string;
  topicId: string;
  text: string;
  action: UpdateUserProgress['action'];
  isBulkUpdating: boolean;
  isBulkUpdateSuccess: boolean;
};

function ProgressItem(props: ProgressItemProps) {
  const {
    roadmapId,
    topicId,
    text,
    action,
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
      onMutate: () => {
      },
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

  return (
    <div className="flex bg-white items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-1">
      <span className="truncate text-sm text-gray-500">{text}</span>
      {!isSuccess && !isBulkUpdateSuccess && (
        <button
          className="min-h-[30px] shrink-0 rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-sm"
          onClick={() => updateTopicStatus(action)}
          disabled={isUpdating || isBulkUpdating}
        >
          {isUpdating ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <>Mark it as {action}</>
          )}
        </button>
      )}
      {(isSuccess || isBulkUpdateSuccess) && (
        <span className="flex size-[30px] items-center justify-center text-green-500">
          <CheckIcon additionalClasses="size-4" />
        </span>
      )}
    </div>
  );
}
