import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { Loader2, MessageCircle, ServerCrash } from 'lucide-react';
import { Rating } from '../Rating/Rating';

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
};

export function ListRoadmapRatings(props: ListRoadmapRatingsProps) {
  const { roadmapSlug } = props;

  const toast = useToast();
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
      <div className="flex flex-col items-center justify-center py-10">
        <ServerCrash className="size-12 text-red-500" />
        <p className="mt-3 text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />
        </div>
      )}

      {!isLoading && ratings.length > 0 && (
        <div className="flex flex-col gap-2">
          {ratings.map((rating) => {
            const userAvatar = rating?.avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${rating.avatar}`
              : '/images/default-avatar.png';

            return (
              <div key={rating._id} className="rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <img
                    src={userAvatar}
                    alt={rating.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-lg font-medium">{rating.name}</span>
                </div>

                <div className="mt-2.5">
                  <Rating rating={rating.rating} readOnly />

                  {rating.feedback && (
                    <p className="mt-2 text-gray-500">{rating.feedback}</p>
                  )}
                </div>
              </div>
            );
          })}
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
