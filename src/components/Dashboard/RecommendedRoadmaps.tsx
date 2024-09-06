import type { BuiltInRoadmap } from './PersonalDashboard';
import { ArrowUpRight } from 'lucide-react';

type RecommendedRoadmapsProps = {
  roadmaps: BuiltInRoadmap[];
  isLoading: boolean;
};

export function RecommendedRoadmaps(props: RecommendedRoadmapsProps) {
  const { roadmaps: roadmapsToShow, isLoading } = props;

  return (
    <>
      <h2 className="mb-3 mt-8 text-xs uppercase text-gray-400">
        Recommended Roadmaps
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <RecommendedCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
          {roadmapsToShow.map((roadmap) => (
            <RecommendedRoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      )}
    </>
  );
}

type RecommendedRoadmapCardProps = {
  roadmap: BuiltInRoadmap;
};

export function RecommendedRoadmapCard(props: RecommendedRoadmapCardProps) {
  const { roadmap } = props;
  const { title, url, description } = roadmap;

  return (
    <a
      href={url}
      className="group relative flex flex-col rounded-md border bg-white px-3 py-2 text-left shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
    >
      <span className="truncate">{title}</span>
      <span className="mt-1 text-sm text-gray-400">{description}</span>

      <ArrowUpRight className="absolute right-2 top-2 h-4 w-4 text-gray-300 transition-colors group-hover:text-gray-500" />
    </a>
  );
}

function RecommendedCardSkeleton() {
  return (
    <div className="h-[86px] w-full animate-pulse rounded-md bg-gray-200" />
  );
}
