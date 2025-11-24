import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Loader2Icon, SquareArrowOutUpRightIcon } from 'lucide-react';
import { listBuiltInRoadmaps } from '../../queries/roadmap';
import { queryClient } from '../../stores/query-client';

type RoadmapSlugListType = {
  roadmapSlug: string;
};

export function parseRoadmapSlugList(content: string): RoadmapSlugListType[] {
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
  roadmapSlugs: RoadmapSlugListType[];
};

export function RoadmapRecommendations(props: RoadmapRecommendationsProps) {
  const { roadmapSlugs } = props;

  const { data: roadmaps, isLoading } = useQuery(
    listBuiltInRoadmaps(),
    queryClient,
  );

  const progressItemWithText = useMemo(() => {
    return roadmapSlugs.map((item) => {
      const roadmap = roadmaps?.find(
        (mapping) => mapping.id === item.roadmapSlug,
      );

      return {
        ...item,
        title: roadmap?.title,
      };
    });
  }, [roadmapSlugs, roadmaps]);

  return (
    <div className="relative my-6 flex flex-wrap gap-1 first:mt-0 last:mb-0">
      {progressItemWithText.map((item) => (
        <a
          href={`/${item.roadmapSlug}/ai`}
          target="_blank"
          key={item.roadmapSlug}
          className="group flex h-[34px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-left text-sm text-gray-700 transition-all hover:border-gray-400 hover:text-black active:bg-gray-100"
        >
          {item.title}
          {isLoading && (
            <Loader2Icon className="size-3.5 animate-spin text-gray-400 group-hover:text-gray-600" />
          )}
          {!isLoading && (
            <SquareArrowOutUpRightIcon className="ml-1 size-3.5 text-gray-400 transition-transform group-hover:text-gray-600" />
          )}
        </a>
      ))}
    </div>
  );
}
