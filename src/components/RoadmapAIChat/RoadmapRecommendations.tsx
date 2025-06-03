import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { useMemo } from 'react';
import { listBuiltInRoadmaps } from '../../queries/roadmap';
import { SquareArrowOutUpRightIcon } from 'lucide-react';

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
          <a
            href={`/${item.roadmapSlug}/ai`}
            target="_blank"
            key={item.roadmapSlug}
            className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-left text-sm text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100"
          >
            {item.title}
            <SquareArrowOutUpRightIcon className="size-3.5 text-gray-400 transition-transform group-hover:text-gray-600" />
          </a>
        ))}
      </div>
    </>
  );
}
