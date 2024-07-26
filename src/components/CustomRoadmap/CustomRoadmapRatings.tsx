import { useState, type CSSProperties } from 'react';
import { Rating } from '../Rating/Rating';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { CustomRoadmapRatingsModal } from './CustomRoadmapRatingsModal';
import { Star } from 'lucide-react';
import { cn } from '../../lib/classname';

type CustomRoadmapRatingsProps = {
  roadmapSlug: string;
  ratings: RoadmapDocument['ratings'];
  canManage?: boolean;
  unseenRatingCount: number;
};

export function CustomRoadmapRatings(props: CustomRoadmapRatingsProps) {
  const { ratings, roadmapSlug, canManage, unseenRatingCount } = props;
  const average = ratings?.average || 0;

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
      <div className="flex items-center gap-2">
        <span className="hidden lg:block">
          <Rating rating={average} readOnly />
        </span>

        <button
          className="relative flex items-center gap-2 text-sm font-medium underline"
          onClick={() => {
            setIsDetailsOpen(true);
          }}
        >
          <span className="lg:hidden">
            <Star className="size-5 fill-yellow-400 text-yellow-400" />
          </span>
          <span className="hidden lg:block">{average} out of 5</span>
          <span className="lg:hidden">{average}/5</span>

          {canManage && unseenRatingCount > 0 && (
            <span className="absolute right-0 top-0 flex size-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium leading-none text-white">
              {unseenRatingCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
