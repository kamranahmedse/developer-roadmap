import { DashboardCardLink } from './DashboardCardLink';
import {
  BrainCircuit
} from 'lucide-react';

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
      <div className="mb-2 mt-6 flex items-center justify-between gap-2">
        <h2 className="text-xs uppercase text-gray-400">My AI Roadmaps</h2>

        <a
          href="/ai-roadmaps/explore"
          className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-300 hover:text-black"
        >
          AI Generated Roadmaps
        </a>
      </div>

      {!isLoading && roadmaps.length === 0 && (
        <DashboardCardLink
          className="mt-0"
          icon={BrainCircuit}
          href="/ai-roadmaps"
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
                key={roadmap.id}
                href={`/ai-roadmaps/${roadmap.slug}`}
                className="relative truncate rounded-md border bg-white p-2.5 text-left text-sm shadow-xs hover:border-gray-400 hover:bg-gray-50"
              >
                {roadmap.title}
              </a>
            ))}

            <a
              className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-600"
              href={'/ai-roadmaps'}
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

function RoadmapCardSkeleton(props: CustomProgressCardSkeletonProps) {
  return (
    <div className="h-[42px] w-full animate-pulse rounded-md bg-gray-200" />
  );
}
