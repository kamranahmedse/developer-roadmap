import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { Loader2, MessageCircle, ServerCrash } from 'lucide-react';
import { Rating } from '../Rating/Rating';
import { Spinner } from '../ReactIcons/Spinner.tsx';
import { getRelativeTimeString } from '../../lib/date.ts';
import { cn } from '../../lib/classname.ts';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal.tsx';

export interface RoadmapRatingDocument {
  _id?: string;
  roadmapId: string;
  userId: string;
  rating: number;
  feedback?: string;

  createdAt: Date;
  updatedAt: Date;
}

type ListRoadmapRatingsResponse = (RoadmapRatingDocument & {
  name: string;
  avatar: string;
})[];

type ListRoadmapRatingsProps = {
  roadmapSlug: string;
  ratings: RoadmapDocument['ratings'];
};

export function ListRoadmapRatings(props: ListRoadmapRatingsProps) {
  const { roadmapSlug, ratings: ratingSummary } = props;

  const totalWhoRated = Object.keys(ratingSummary.breakdown || {}).reduce(
    (acc, key) => acc + ratingSummary.breakdown[key as any],
    0,
  );
  const averageRating = ratingSummary.average;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [ratings, setRatings] = useState<ListRoadmapRatingsResponse>([]);

  const listRoadmapRatings = async () => {
    const { response, error } = await httpGet<ListRoadmapRatingsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-roadmap-ratings/${roadmapSlug}`,
    );

    if (!response || error) {
      setError(error?.message || 'Something went wrong');
      setIsLoading(false);
      return;
    }

    setRatings(response);
    setError('');
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }

    listRoadmapRatings().then();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-white py-10">
        <ServerCrash className="size-12 text-red-500" />
        <p className="mt-3 text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100px] rounded-lg bg-white p-2 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner isDualRing={false} />
        </div>
      )}

      {!isLoading && ratings.length > 0 && (
        <div>
          <div className='text-sm px-2 py-1.5 text-yellow-900 mb-2 rounded-lg bg-yellow-50 flex items-center gap-1 justify-center'>
            <span>Rated <span className="font-medium">{averageRating.toFixed(1)}</span></span>
            <Rating starSize={15} rating={averageRating} readOnly />
            by <span className="font-medium">{totalWhoRated} user{totalWhoRated > 1 && 's'}</span>
          </div>

          <div className="flex flex-col">
            {ratings.map((rating) => {
              const userAvatar = rating?.avatar
                ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${rating.avatar}`
                : '/images/default-avatar.png';

              const isLastRating =
                ratings[ratings.length - 1]._id === rating._id;

              return (
                <div
                  key={rating._id}
                  className={cn('px-2 py-2.5', {
                    'border-b': !isLastRating,
                  })}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        src={userAvatar}
                        alt={rating.name}
                        className="h-4 w-4 rounded-full"
                      />
                      <span className="text-sm font-medium">{rating.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {getRelativeTimeString(rating.createdAt)}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <Rating rating={rating.rating} readOnly />

                    {rating.feedback && (
                      <p className="mt-2 text-sm text-gray-500">
                        {rating.feedback}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isLoading && ratings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <MessageCircle className="size-12 text-gray-600" />
          <p className="mt-3 text-lg text-gray-600">No Feedbacks</p>
        </div>
      )}
    </div>
  );
}
