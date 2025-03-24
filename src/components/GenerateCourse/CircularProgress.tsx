import { cn } from '../../lib/classname';

export function ChapterNumberSkeleton() {
  return (
    <div className="h-[28px] w-[28px] animate-pulse rounded-full bg-gray-200" />
  );
}

type CircularProgressProps = {
  percentage: number;
  children: React.ReactNode;
  isVisible?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
};

export function CircularProgress(props: CircularProgressProps) {
  const {
    percentage,
    children,
    isVisible = true,
    isActive = false,
    isLoading = false,
  } = props;

  const circumference = 2 * Math.PI * 13;
  const strokeDasharray = `${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center">
      {isVisible && !isLoading && (
        <svg className="absolute h-full w-full -rotate-90">
          <circle
            cx="14"
            cy="14"
            r="13"
            stroke="currentColor"
            strokeWidth="1.75"
            fill="none"
            className={cn('text-gray-400/70', {
              'text-black': isActive,
            })}
            style={{
              strokeDasharray,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.3s ease',
            }}
          />
        </svg>
      )}

      {!isLoading && children}
      {isLoading && <ChapterNumberSkeleton />}
    </div>
  );
}
