import { useState } from 'react';
import { Rating } from '../Rating/Rating';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { CustomRoadmapRatingsModal } from './CustomRoadmapRatingsModal';
import { Star } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt.ts';
import { showLoginPopup } from '../../lib/popup.ts';

type CustomRoadmapRatingsProps = {
  roadmapSlug: string;
  ratings: RoadmapDocument['ratings'];
  canManage?: boolean;
  unseenRatingCount: number;
};

export function CustomRoadmapRatings(props: CustomRoadmapRatingsProps) {
  const { ratings, roadmapSlug, canManage, unseenRatingCount } = props;
  const average = ratings?.average || 0;

  const totalPeopleWhoRated = Object.keys(ratings?.breakdown || {}).reduce(
    (acc, key) => acc + ratings?.breakdown[key as any],
    0,
  );

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      {isDetailsOpen && (
        <CustomRoadmapRatingsModal
          roadmapSlug={roadmapSlug}
          onClose={() => {
            setIsDetailsOpen(false);
          }}
          ratings={ratings}
          canManage={canManage}
        />
      )}
      {average === 0 && (
        <>
          {!canManage && (
            <button
              className="flex h-[34px] items-center gap-2 rounded-md border border-gray-300 bg-white py-1 pl-2 pr-3 text-sm font-medium hover:border-black"
              onClick={() => {
                if (!isLoggedIn()) {
                  showLoginPopup();
                  return;
                }

                setIsDetailsOpen(true);
              }}
            >
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="hidden md:block">Rate this roadmap</span>
              <span className="block md:hidden">Rate</span>
            </button>
          )}
          {canManage && (
            <span className="flex h-[34px] cursor-default items-center gap-2 rounded-md border border-gray-300 bg-white py-1 pl-2 pr-3 text-sm font-medium opacity-50">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="hidden md:block">No ratings yet</span>
              <span className="block md:hidden">Rate</span>
            </span>
          )}
        </>
      )}

      {average > 0 && (
        <button
          className="relative flex h-[34px] items-center gap-2 rounded-md border border-gray-300 bg-white py-1 pl-2 pr-3 text-sm font-medium hover:border-black"
          onClick={() => {
            setIsDetailsOpen(true);
          }}
        >
          {average.toFixed(1)}
          <span className="hidden lg:block">
            <Rating
              starSize={16}
              rating={average}
              className={'pointer-events-none gap-px'}
              readOnly
            />
          </span>
          <span className="lg:hidden">
            <Star className="size-5 fill-yellow-400 text-yellow-400" />
          </span>
          ({totalPeopleWhoRated})
          {canManage && unseenRatingCount > 0 && (
            <span className="absolute right-0 top-0 flex size-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium leading-none text-white">
              {unseenRatingCount}
            </span>
          )}
        </button>
      )}
    </>
  );
}
