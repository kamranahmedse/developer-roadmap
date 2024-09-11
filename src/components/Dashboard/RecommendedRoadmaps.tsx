import type { BuiltInRoadmap } from './PersonalDashboard';
import { ArrowUpRight } from 'lucide-react';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite.tsx';

type RecommendedRoadmapsProps = {
  roadmaps: BuiltInRoadmap[];
  isLoading: boolean;
};

export function RecommendedRoadmaps(props: RecommendedRoadmapsProps) {
  const { roadmaps: roadmapsToShow, isLoading } = props;

  return (
    <>
      <div className="mb-2 mt-8 flex items-center justify-between gap-2">
        <h2 className="text-xs uppercase text-gray-400">
          Recommended Roadmaps
        </h2>

        <a
          href="/roadmaps"
          className="flex items-center gap-1 rounded-full bg-gray-500 px-2 py-0.5 text-xs font-medium text-white transition-colors hover:bg-black"
        >
          <ArrowUpRight size={12} strokeWidth={2.5} />
          All Roadmaps
        </a>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
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

      <div className="mt-6 text-sm text-gray-500">
        Need some help getting started? Check out our{' '}<a href="/get-started" className="text-blue-600 underline">Getting Started Guide</a>.
      </div>
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
      className="font-regular text-base group relative block rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-black no-underline hover:border-gray-400 hover:bg-gray-50"
    >
      <MarkFavorite className={'opacity-30'} resourceType={'roadmap'} resourceId={roadmap.id} />
      {title}
    </a>
  );
}

function RecommendedCardSkeleton() {
  return (
    <div className="h-[42px] w-full animate-pulse rounded-md bg-gray-200" />
  );
}
