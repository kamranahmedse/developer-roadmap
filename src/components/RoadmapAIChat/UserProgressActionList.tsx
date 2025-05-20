import { useMutation, useQuery } from '@tanstack/react-query';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { useMemo } from 'react';
import { renderTopicProgress } from '../../lib/resource-progress';
import { updateResourceProgress } from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import type { ResourceProgressType } from '../../lib/resource-progress';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { useToast } from '../../hooks/use-toast';
import { Loader2Icon } from 'lucide-react';
import { CheckIcon } from '../ReactIcons/CheckIcon';

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

type UserProgressActionListProps = {
  roadmapId: string;
  content: string;
};

export function UserProgressActionList(props: UserProgressActionListProps) {
  const { roadmapId, content } = props;

  const updateUserProgress = parseUserProgress(content);

  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
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

  return (
    <div className="relative my-6 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-2 first:mt-0 last:mb-0">
      {progressItemWithText.map((item) => (
        <ProgressItem
          key={item.id}
          roadmapId={roadmapId}
          topicId={item.id}
          text={item.text}
          action={item.action}
        />
      ))}
    </div>
  );
}

type ProgressItemProps = {
  roadmapId: string;
  topicId: string;
  text: string;
  action: UpdateUserProgress['action'];
};

function ProgressItem(props: ProgressItemProps) {
  const { roadmapId, topicId, text, action } = props;

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
        pageProgressMessage.set('Updating progress');
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
    <div className="flex items-center justify-between gap-2 rounded-md border border-gray-200 p-2">
      <span className="truncate text-sm text-gray-500">{text}</span>
      {!isSuccess && (
        <button
          className="min-h-[30px] shrink-0 rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-sm"
          onClick={() => updateTopicStatus(action)}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <>Mark it as {action}</>
          )}
        </button>
      )}
      {isSuccess && (
        <span className="flex size-[30px] items-center justify-center text-green-500">
          <CheckIcon additionalClasses="size-4" />
        </span>
      )}
    </div>
  );
}
