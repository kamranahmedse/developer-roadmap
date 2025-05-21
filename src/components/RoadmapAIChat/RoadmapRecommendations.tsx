import { useMutation, useQuery } from '@tanstack/react-query';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { queryClient } from '../../stores/query-client';
import { useMemo, useState } from 'react';
import { TopicResourcesModal } from './TopicResourcesModal';
import { listBuiltInRoadmaps } from '../../queries/roadmap';

type RoadmapSlugListType = {
  roadmapSlug: string;
};

function parseRoadmapSlugList(content: string): RoadmapSlugListType[] {
  const items: RoadmapSlugListType[] = [];

  const roadmapSlugListRegex = /<roadmap-slug>.*?<\/roadmap-slug>/gs;
  const roadmapSlugListItems = content.match(roadmapSlugListRegex);
  if (!roadmapSlugListItems) {
    return items;
  }

  for (const roadmapSlugListItem of roadmapSlugListItems) {
    const roadmapSlugRegex = /<roadmap-slug>(.*?)<\/roadmap-slug>/;
    const roadmapSlug = roadmapSlugListItem
      .match(roadmapSlugRegex)?.[1]
      ?.trim();
    if (!roadmapSlug) {
      continue;
    }

    items.push({
      roadmapSlug,
    });
  }

  return items;
}

type RoadmapRecommendationsProps = {
  roadmapId: string;
  content: string;
};

export function RoadmapRecommendations(props: RoadmapRecommendationsProps) {
  const { content } = props;

  const roadmapSlugListItems = parseRoadmapSlugList(content);

  const { data: roadmaps } = useQuery(listBuiltInRoadmaps(), queryClient);

  const progressItemWithText = useMemo(() => {
    return roadmapSlugListItems.map((item) => {
      const roadmap = roadmaps?.find(
        (mapping) => mapping.id === item.roadmapSlug,
      );

      return {
        ...item,
        title: roadmap?.title,
      };
    });
  }, [roadmapSlugListItems, roadmaps]);

  return (
    <>
      <div className="relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0">
        {progressItemWithText.map((item) => (
          <button
            key={item.roadmapSlug}
            className="rounded-lg border border-gray-200 bg-white p-1 px-1.5 text-left text-sm"
          >
            {item.title}
          </button>
        ))}
      </div>
    </>
  );
}
