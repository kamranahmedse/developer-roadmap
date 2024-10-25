import { useState } from 'react';
import { Modal } from '../Modal';
import { Rating } from '../Rating/Rating';
import { cn } from '../../lib/classname';

type RateCourseFormProps = {
  defaultRating?: number;
  onClose: () => void;
};

export function RateCourseForm(props: RateCourseFormProps) {
  const { onClose, defaultRating = 0 } = props;

  const [userRating, setUserRating] = useState(defaultRating);
  const [userFeedback, setUserFeedback] = useState('');

  return (
    <Modal onClose={onClose} bodyClassName="bg-zinc-800 p-5 rounded-lg">
      <h3 className="font-semibold">Rate this Course</h3>
      <p className="mt-1 text-sm">Share your thoughts with us.</p>

      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
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
            Feedback{' '}
            <span className="font-normal text-zinc-400">(Optional)</span>
          </label>
          <textarea
            id="rating-feedback"
            className="min-h-24 rounded-md border border-zinc-700 bg-transparent p-2 text-sm outline-none focus:border-zinc-500"
            placeholder="Share your thoughts with the roadmap creator"
            value={userFeedback}
            onChange={(e) => {
              setUserFeedback(e.target.value);
            }}
          />
        </div>

        <div className={cn('mt-4 grid grid-cols-2 gap-1')}>
          <button
            className="h-10 w-full rounded-full border border-zinc-700 p-2.5 text-sm font-medium hover:bg-zinc-700/50 hover:text-white disabled:opacity-60"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex h-10 w-full items-center justify-center rounded-full bg-white p-2.5 text-sm font-medium text-black hover:bg-zinc-100 disabled:opacity-60"
            type="submit"
          >
            Submit Rating
          </button>
        </div>
      </form>
    </Modal>
  );
}
