import { useEffect, useState, type CSSProperties } from 'react';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { formatCommaNumber } from '../../lib/number';
import { Rating } from '../Rating/Rating';
import { httpGet, httpPost } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/classname';
import { showLoginPopup } from '../../lib/popup';

type GetMyRoadmapRatingResponse = {
  id?: string;
  rating: number;
  feedback?: string;
};

type RateRoadmapFormProps = {
  ratings: RoadmapDocument['ratings'];
  roadmapSlug: string;
};

export function RateRoadmapForm(props: RateRoadmapFormProps) {
  const { ratings, roadmapSlug } = props;
  const { breakdown = {}, average: _average } = ratings || {};
  const average = _average || 0;

  const ratingsKeys = [5, 4, 3, 2, 1];
  const totalRatings = ratingsKeys.reduce(
    (total, rating) => total + breakdown?.[rating] || 0,
    0,
  );

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isRatingRoadmap, setIsRatingRoadmap] = useState(false);
  const [userRatingId, setUserRatingId] = useState<string | undefined>();
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState('');

  const loadMyRoadmapRating = async () => {
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

    setIsLoading(true);
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
      setIsLoading(false);
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
    <>
      <div className="flex items-center gap-2">
        <Rating rating={average} readOnly />
        <span className="font-medium">{average} out of 5</span>
      </div>

      <span className="mt-2 inline-block text-gray-500">
        {formatCommaNumber(totalRatings)} ratings
      </span>

      <ul className="mt-4 flex flex-col gap-2">
        {ratingsKeys.map((rating) => {
          const percentage =
            totalRatings <= 0
              ? 0
              : ((breakdown?.[rating] || 0) / totalRatings) * 100;

          return (
            <li key={`rating-${rating}`} className="flex items-center gap-2">
              <span className="shrink-0">{rating} star</span>
              <div
                className="relative h-6 w-full overflow-hidden rounded-md border after:absolute after:inset-0 after:w-[var(--rating-percentage)] after:bg-yellow-400 after:content-['']"
                style={
                  {
                    '--rating-percentage': `${percentage}%`,
                  } as CSSProperties
                }
              />
              <span className="w-14 shrink-0 text-sm text-gray-500">
                {percentage}%
              </span>
            </li>
          );
        })}
      </ul>

      <hr className="my-5 bg-gray-300" />

      <div>
        <h3 className="font-semibold">Rate this roadmap</h3>
        <p className="mt-1 text-sm">
          Share your thoughts with the roadmap creator.
        </p>

        {(isRatingRoadmap || userRatingId) && (
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
                Feedback
              </label>
              <textarea
                id="rating-feedback"
                className="min-h-24 rounded-md border p-1 outline-none focus:border-gray-500"
                value={userFeedback}
                onChange={(e) => {
                  setUserFeedback(e.target.value);
                }}
              />
              <p className="text-right text-xs text-gray-700">
                Feedback will be only visible to the creator.
              </p>
            </div>

            <div
              className={cn(
                'mt-4 grid gap-1',
                userRatingId ? 'grid-cols-1' : 'grid-cols-2',
              )}
            >
              {!userRatingId && (
                <button
                  className="h-10 w-full rounded-full border p-2.5 text-sm font-medium disabled:opacity-60"
                  onClick={() => {
                    setIsRatingRoadmap(false);
                  }}
                  type="button"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              )}
              <button
                className="flex h-10 w-full items-center justify-center rounded-full bg-black p-2.5 text-sm font-medium text-white disabled:opacity-60"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : userRatingId ? (
                  'Update Rating'
                ) : (
                  'Submit Rating'
                )}
              </button>
            </div>
          </form>
        )}

        {!isRatingRoadmap && !userRatingId && (
          <button
            className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-black p-2.5 text-sm font-medium text-white disabled:opacity-60"
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
        )}
      </div>
    </>
  );
}
