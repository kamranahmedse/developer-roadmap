import { useState } from 'react';
import { Rating } from '../Rating/Rating';

type CertificateViewProps = {
  currentCourseId: string;
};

export function CertificateView(props: CertificateViewProps) {
  const { currentCourseId } = props;

  const [rating, setRating] = useState(0);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold">Congratulations!</h1>
        <p className="mt-3 text-center text-lg text-zinc-200">
          You finished the course. Download the completion certificate below and
          share it with the world.
        </p>
        <button>
          <a
            target="_blank"
            rel="noreferrer"
            className="mt-8 block rounded-full bg-zinc-700 px-6 py-2.5 font-medium text-white"
          >
            Download Certificate
          </a>
        </button>
      </div>

      <div className="mt-24 flex flex-col items-center gap-3">
        <Rating
          rating={rating}
          onRatingChange={(rating) => setRating(rating)}
          starSize={36}
        />
        <span>Rate your experience</span>
      </div>
    </div>
  );
}
