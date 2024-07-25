import { useState } from 'react';
import { cn } from '../../lib/classname';

type StarValue = 0 | 0.5 | 1;

type RatingProps = {
  ratings?: number;
  size?: number;
};

export function Rating(props: RatingProps) {
  const { ratings = 0, size } = props;

  const [stars, setStars] = useState(
    Array.from({ length: 5 }, (_, i) => {
      const rating = Math.floor(ratings);
      if (i < rating) {
        return 1;
      }

      if (i === rating && ratings % 1 !== 0) {
        return 0.5;
      }

      return 0;
    }),
  );

  const [dynamicStars, setDynamicStars] = useState(stars);

  return (
    <div className="mt-4 flex">
      {dynamicStars.map((star, counter) => (
        <RatingStar
          key={`star-${counter}`}
          value={star}
          onValueChange={(value) => {
            const newStars = [...stars];
            newStars.fill(1, 0, counter);
            newStars[counter] = value;
            newStars.fill(0, counter + 1);

            setDynamicStars(newStars);
          }}
          onClick={(value) => {
            const newStars = [...stars];
            newStars.fill(1, 0, counter);
            newStars[counter] = value;
            newStars.fill(0, counter + 1);

            setStars(newStars);
            setDynamicStars(newStars);
          }}
          onMouseLeave={() => {
            setDynamicStars(stars);
          }}
        />
      ))}
    </div>
  );
}

type RatingStarProps = {
  value: StarValue;
  onValueChange?: (value: StarValue) => void;
  onMouseLeave?: () => void;
  onClick: (value: StarValue) => void;
  startSize?: number;
};

export function RatingStar(props: RatingStarProps) {
  const { value, onValueChange, onClick, onMouseLeave, startSize = 20 } = props;

  return (
    <span
      onMouseMove={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        const mid = rect.width / 2;
        const value = e.clientX < rect.left + mid ? 0.5 : 1;
        onValueChange?.(value);
      }}
      onMouseEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        const mid = rect.width / 2;
        const value = e.clientX < rect.left + mid ? 0.5 : 1;
        onValueChange?.(value);
      }}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        onClick(value);
      }}
      className="relative block cursor-pointer"
      style={{
        width: `${startSize}px`,
        height: `${startSize}px`,
      }}
    >
      <span
        className={cn(
          'absolute overflow-hidden',
          value === 0.5 ? 'w-1/2' : 'w-0',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-red"
          style={{
            width: `${startSize}px`,
            height: `${startSize}px`,
          }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </span>

      <span className="absolute">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('', value === 1 ? 'fill-red' : 'fill-none')}
          style={{
            width: `${startSize}px`,
            height: `${startSize}px`,
          }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </span>
    </span>
  );
}
