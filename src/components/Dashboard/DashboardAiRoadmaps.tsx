import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import { DashboardCustomProgressCard } from './DashboardCustomProgressCard';
import { DashboardCardLink } from './DashboardCardLink';
import { useState } from 'react';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { Simulate } from 'react-dom/test-utils';
import { Bot, BrainCircuit, Map, PencilRuler } from 'lucide-react';

type DashboardAiRoadmapsProps = {
  roadmaps: {
    id: string;
    title: string;
    slug: string;
  }[];
  isLoading?: boolean;
};

export function DashboardAiRoadmaps(props: DashboardAiRoadmapsProps) {
  const { roadmaps, isLoading = false } = props;

  return (
    <>
      <h2 className="mb-2 mt-6 text-xs uppercase text-gray-400">
        AI Generated Roadmaps
      </h2>

      {!isLoading && roadmaps.length === 0 && (
        <DashboardCardLink
          className="mt-0"
          icon={BrainCircuit}
          href="/ai"
          title="Generate Roadmaps with AI"
          description="You can generate your own roadmap with AI"
        />
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {isLoading && (
          <>
            {Array.from({ length: 9 }).map((_, index) => (
              <RoadmapCardSkeleton key={index} />
            ))}
          </>
        )}

        {!isLoading && roadmaps.length > 0 && (
          <>
            {roadmaps.map((roadmap) => (
              <a
                href={`/ai/${roadmap.slug}`}
                className="relative rounded-md border bg-white p-2.5 text-left text-sm shadow-sm truncate hover:border-gray-400 hover:bg-gray-50"
              >
                {roadmap.title}
              </a>
            ))}

            <a
              className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-600"
              href={'/ai'}
            >
              + Generate New
            </a>
          </>
        )}
      </div>
    </>
  );
}

type CustomProgressCardSkeletonProps = {};

function RoadmapCardSkeleton(
  props: CustomProgressCardSkeletonProps,
) {
  return (
    <div className="h-[42px] w-full animate-pulse rounded-md bg-gray-200" />
  );
}
