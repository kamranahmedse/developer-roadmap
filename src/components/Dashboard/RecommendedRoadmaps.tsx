import { useEffect, useState } from 'react';
import type { BuiltInRoadmap } from './PersonalDashboard';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';

type RecommendedRoadmapsProps = {
  roadmaps: BuiltInRoadmap[];
  isLoading: boolean;
};

export function RecommendedRoadmaps(props: RecommendedRoadmapsProps) {
  const { roadmaps, isLoading } = props;

  const [showAll, setShowAll] = useState(false);
  const roadmapsToShow = showAll ? roadmaps : roadmaps.slice(0, 12);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setShowAll(roadmaps.length < 12);
  }, [roadmaps]);

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
        <div className="relative">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
            {roadmapsToShow.map((roadmap) => (
              <div className="relative w-full" key={roadmap.id}>
                <a
                  key={roadmap.id}
                  className="block rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
                  href={roadmap.url}
                >
                  {roadmap.title}
                </a>

                {isMounted && (
                  <MarkFavorite
                    resourceId={roadmap.id}
                    resourceType={
                      roadmap.url.includes('best-practices')
                        ? 'best-practice'
                        : 'roadmap'
                    }
                    className='data-[is-favorite="true"]:text-gray-400'
                  />
                )}
              </div>
            ))}
          </div>

          {!showAll && (
            <div
              className="pointer-events-none absolute inset-0 z-50 -m-1 flex items-end justify-center bg-gradient-to-t from-white to-transparent"
              style={{
                background:
                  'linear-gradient(180deg, rgba(249,250,251,0) 0%, rgba(249,250,251,0.8) 50%, rgba(249,250,251,1) 100%)',
              }}
            >
              <button
                className="pointer-events-auto text-sm font-medium text-gray-600 hover:text-black focus:outline-none"
                onClick={() => setShowAll(true)}
              >
                + Show all
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function RecommendedCardSkeleton() {
  return (
    <div className="h-[38px] w-full animate-pulse rounded-md bg-gray-200" />
  );
}
