import { useMutation, useQuery } from '@tanstack/react-query';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { useMemo, useState } from 'react';
import { TopicResourcesModal } from './TopicResourcesModal';

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
};

export function RoadmapTopicList(props: RoadmapTopicListProps) {
  const { roadmapId, content } = props;

  const topicListItems = parseTopicList(content);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

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
    <>
      {selectedTopicId && (
        <TopicResourcesModal
          roadmapId={roadmapId}
          topicId={selectedTopicId}
          onClose={() => setSelectedTopicId(null)}
        />
      )}

      <div className="relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0">
        {progressItemWithText.map((item) => (
          <button
            key={item.topicId}
            className="rounded-lg border border-gray-200 bg-white p-1 px-1.5 text-left text-sm"
            onClick={() => setSelectedTopicId(item.topicId)}
          >
            {item.text}
          </button>
        ))}
      </div>
    </>
  );
}
