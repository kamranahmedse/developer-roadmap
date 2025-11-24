import { useEffect, useState } from 'react';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { formatCommaNumber } from '../../lib/number';
import { Rating } from '../Rating/Rating';
import { httpGet, httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { Loader2, Star } from 'lucide-react';
import { cn } from '../../lib/classname';
import { showLoginPopup } from '../../lib/popup';
import { Spinner } from '../ReactIcons/Spinner.tsx';

type GetMyRoadmapRatingResponse = {
  id?: string;
  rating: number;
  feedback?: string;
};

type RateRoadmapFormProps = {
  ratings: RoadmapDocument['ratings'];
  roadmapSlug: string;
  canManage?: boolean;
};

export function RateRoadmapForm(props: RateRoadmapFormProps) {
  const { ratings, canManage = false, roadmapSlug } = props;
  const { breakdown = {}, average: _average } = ratings || {};
  const average = _average || 0;

  const ratingsKeys = [5, 4, 3, 2, 1];
  const totalRatings = ratingsKeys.reduce(
    (total, rating) => total + breakdown?.[rating] || 0,
    0,
  );

  // if no rating then only show the ratings breakdown if the user can manage the roadmap
  const showRatingsBreakdown = average > 0 || canManage;

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isRatingRoadmap, setIsRatingRoadmap] = useState(!showRatingsBreakdown);
  const [userRatingId, setUserRatingId] = useState<string | undefined>();
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState('');

  const loadMyRoadmapRating = async () => {
    // user can't have the rating for their own roadmap
    if (canManage) {
      setIsLoading(false);
      return;
    }

    const { response, error } = await httpGet<GetMyRoadmapRatingResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-my-roadmap-rating/${roadmapSlug}`,
    );

    if (!response || error) {
      toast.error(error?.message || 'Something went wrong');
      setIsLoading(false);
      return;
    }

    setUserRatingId(response?.id);
    setUserRating(response?.rating);
    setUserFeedback(response?.feedback || '');
    setIsLoading(false);
  };

  const submitMyRoadmapRating = async () => {
    if (userRating <= 0) {
      toast.error('At least give it a star');
      return;
    }

    setIsSubmitting(true);
    const path = userRatingId
      ? 'v1-update-custom-roadmap-rating'
      : 'v1-rate-custom-roadmap';
    const { response, error } = await httpPost<{
      id: string;
    }>(`${import.meta.env.PUBLIC_API_URL}/${path}/${roadmapSlug}`, {
      rating: userRating,
      feedback: userFeedback,
    });

    if (!response || error) {
      toast.error(error?.message || 'Something went wrong');
      setIsSubmitting(false);
      return;
    }

    window.location.reload();
  };

  useEffect(() => {
    if (!isLoggedIn() || !roadmapSlug) {
      setIsLoading(false);
      return;
    }

    loadMyRoadmapRating().then();
  }, [roadmapSlug]);

  return (
    <div className="flex flex-col gap-3">
      {showRatingsBreakdown && !isRatingRoadmap && (
        <>
          <ul className="flex flex-col gap-1 rounded-lg bg-white p-5">
            {ratingsKeys.map((rating) => {
              const percentage =
                totalRatings <= 0
                  ? 0
                  : ((breakdown?.[rating] || 0) / totalRatings) * 100;

              return (
                <li
                  key={`rating-${rating}`}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="shrink-0">{rating} star</span>
                  <div className="relative h-8 w-full overflow-hidden rounded-md border">
                    <div
                      className="h-full bg-yellow-300"
                      style={{ width: `${percentage}%` }}
                    ></div>

                    {percentage > 0 && (
                      <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-xs text-black">
                        {formatCommaNumber(breakdown?.[rating] || 0)}
                      </span>
                    )}
                  </div>

                  <span className="w-[35px] shrink-0 text-xs text-gray-500">
                    {parseInt(`${percentage}`, 10)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {!canManage && !isRatingRoadmap && (
        <div className="relative min-h-[100px] rounded-lg bg-white p-4">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner isDualRing={false} className="h-5 w-5" />
            </div>
          )}

          {!isLoading && !isRatingRoadmap && !userRatingId && (
            <>
              <p className="mb-2 text-center text-sm font-medium">
                Rate and share your thoughts with the roadmap creator.
              </p>
              <button
                className="flex h-10 w-full items-center justify-center rounded-full bg-black p-2.5 text-sm font-medium text-white disabled:opacity-60"
                onClick={() => {
                  if (!isLoggedIn()) {
                    showLoginPopup();
                    return;
                  }

                  setIsRatingRoadmap(true);
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  'Rate Roadmap'
                )}
              </button>
            </>
          )}

          {!isLoading && !isRatingRoadmap && userRatingId && (
            <div>
              <h3 className="mb-2.5 flex items-center justify-between text-base font-semibold">
                Your Feedback
                <button
                  className="ml-2 text-sm font-medium text-blue-500 underline underline-offset-2"
                  onClick={() => {
                    setIsRatingRoadmap(true);
                  }}
                >
                  Edit Rating
                </button>
              </h3>
              <div className="flex items-center gap-2">
                <Rating rating={userRating} starSize={19} readOnly /> (
                {userRating})
              </div>
              {userFeedback && <p className="mt-2 text-sm">{userFeedback}</p>}
            </div>
          )}
        </div>
      )}

      {!canManage && isRatingRoadmap && (
        <div className="rounded-lg bg-white p-5">
          <h3 className="font-semibold">Rate this roadmap</h3>
          <p className="mt-1 text-sm">
            Share your thoughts with the roadmap creator.
          </p>

          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitMyRoadmapRating().then();
            }}
          >
            <Rating
              rating={userRating}
              onRatingChange={(rating) => {
                setUserRating(rating);
              }}
              starSize={32}
            />
            <div className="mt-3 flex flex-col gap-1">
              <label
                htmlFor="rating-feedback"
                className="block text-sm font-medium"
              >
                Feedback to Creator{' '}
                <span className="font-normal text-gray-400">(Optional)</span>
              </label>
              <textarea
                id="rating-feedback"
                className="min-h-24 rounded-md border p-2 text-sm outline-hidden focus:border-gray-500"
                placeholder="Share your thoughts with the roadmap creator"
                value={userFeedback}
                onChange={(e) => {
                  setUserFeedback(e.target.value);
                }}
              />
            </div>

            <div className={cn('mt-4 grid grid-cols-2 gap-1')}>
              <button
                className="h-10 w-full rounded-full border p-2.5 text-sm font-medium disabled:opacity-60"
                onClick={() => {
                  setIsRatingRoadmap(false);
                }}
                type="button"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="flex h-10 w-full items-center justify-center rounded-full bg-black p-2.5 text-sm font-medium text-white disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : userRatingId ? (
                  'Update Rating'
                ) : (
                  'Submit Rating'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
