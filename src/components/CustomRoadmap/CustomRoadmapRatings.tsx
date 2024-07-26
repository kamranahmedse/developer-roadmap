import { useState } from 'react';
import { Rating } from '../Rating/Rating';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { CustomRoadmapRatingsModal } from './CustomRoadmapRatingsModal';

type CustomRoadmapRatingsProps = {
  roadmapSlug: string;
  ratings: RoadmapDocument['ratings'];
};

export function CustomRoadmapRatings(props: CustomRoadmapRatingsProps) {
  const { ratings, roadmapSlug } = props;
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
        />
      )}
      <div className="flex items-center gap-2">
        <Rating rating={average} readOnly />
        <button
          className="text-sm font-medium underline"
          onClick={() => {
            setIsDetailsOpen(true);
          }}
        >
          {average} out of 5
        </button>
      </div>
    </>
  );
}
