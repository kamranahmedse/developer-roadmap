import { useQuery } from '@tanstack/react-query';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { Fragment, useMemo } from 'react';
import { ChevronRightIcon } from 'lucide-react';

type TopicListType = {
  topicId: string;
};

function parseTopicList(content: string): TopicListType[] {
  const items: TopicListType[] = [];

  const topicListRegex = /<topic-id>.*?<\/topic-id>/gs;
  const topicListItems = content.match(topicListRegex);
  if (!topicListItems) {
    return items;
  }

  for (const topicListItem of topicListItems) {
    const topicIdRegex = /<topic-id>(.*?)<\/topic-id>/;
    const topicId = topicListItem.match(topicIdRegex)?.[1]?.trim();
    if (!topicId) {
      continue;
    }

    items.push({
      topicId,
    });
  }

  return items;
}

type RoadmapTopicListProps = {
  roadmapId: string;
  content: string;
  onTopicClick?: (topicId: string, topicTitle: string) => void;
};

export function RoadmapTopicList(props: RoadmapTopicListProps) {
  const { roadmapId, content, onTopicClick } = props;

  const topicListItems = parseTopicList(content);

  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient,
  );

  const progressItemWithText = useMemo(() => {
    return topicListItems.map((item) => {
      const roadmapTreeItem = roadmapTreeData?.find(
        (mapping) => mapping.nodeId === item.topicId,
      );

      return {
        ...item,
        text: (roadmapTreeItem?.text || item.topicId)
          ?.split(' > ')
          .slice(1)
          .join(' > '),
      };
    });
  }, [topicListItems, roadmapTreeData]);

  return (
    <div className="relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0">
      {progressItemWithText.map((item) => {
        const labelParts = item.text.split(' > ').slice(-2);
        const labelPartCount = labelParts.length;

        return (
          <button
            key={item.topicId}
            className="collapse-if-empty flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 px-2 text-left text-sm hover:bg-gray-50"
            onClick={() => {
              onTopicClick?.(item.topicId, item.text);
            }}
          >
            {labelParts.map((part, index) => {
              return (
                <Fragment key={index}>
                  <span>{part}</span>
                  {index < labelPartCount - 1 && (
                    <ChevronRightIcon
                      className="size-3 text-gray-400"
                      strokeWidth={2.5}
                    />
                  )}
                </Fragment>
              );
            })}
          </button>
        );
      })}
    </div>
  );
}
