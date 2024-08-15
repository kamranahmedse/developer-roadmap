import { useEffect, useRef, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { ChevronDown, Flame, X } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';

type StreakResponse = {
  count: number;
  longestCount: number;
  previousCount?: number | null;
  firstVisitAt: Date;
  lastVisitAt: Date;
};

type AccountStreakProps = {};

export function AccountStreak(props: AccountStreakProps) {
  const toast = useToast();
  const dropdownRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [accountStreak, setAccountStreak] = useState<StreakResponse>({
    count: 0,
    longestCount: 0,
    firstVisitAt: new Date(),
    lastVisitAt: new Date(),
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const loadAccountStreak = async () => {
    if (!isLoggedIn()) {
      return;
    }

    setIsLoading(true);
    const { response, error } = await httpGet<StreakResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-streak`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load account streak');
      setIsLoading(false);
      return;
    }

    setAccountStreak(response);
    setIsLoading(false);
  };

  useOutsideClick(dropdownRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    loadAccountStreak().finally(() => {});
  }, []);

  if (!isLoggedIn() || isLoading) {
    return null;
  }

  let { count: currentCount } = accountStreak;
  const previousCount =
    accountStreak?.previousCount || accountStreak?.count || 0;

  // Adding one to show the current day
  const currentCircleCount = Math.min(currentCount, 5) + 1;
  // Adding one day to show the streak they broke
  const leftCircleCount = Math.min(5 - currentCircleCount, previousCount) + 1;
  const remainingCount = Math.max(0, 10 - leftCircleCount - currentCircleCount);

  return (
    <div className="relative z-[90] animate-fade-in">
      <button
        className="flex items-center justify-center rounded-lg bg-purple-100/10 p-1.5 px-2 hover:bg-purple-100/20 focus:outline-none"
        onClick={() => setShowDropdown(true)}
      >
        <Flame className="size-5" />
        <span className="ml-2 text-sm font-semibold">
          {accountStreak?.count}
        </span>
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full z-50 w-[280px] translate-y-1 rounded-lg border border-gray-200 bg-white text-black shadow-lg"
        >
          <div className="p-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-gray-500">
                Current Streak
                <span className="ml-2 font-medium text-black">
                  {accountStreak?.count || 0}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Longest Streak
                <span className="ml-2 font-medium text-black">
                  {accountStreak?.longestCount || 0}
                </span>
              </p>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-10 gap-2">
                {[...Array(leftCircleCount)].map((_, index) => {
                  const isLast = index === leftCircleCount - 1;
                  const dayCount =
                    previousCount - leftCircleCount + index + 1 + 1;

                  return (
                    <div
                      className="flex flex-col items-center justify-center gap-1.5"
                      key={`left-${index}`}
                    >
                      <div
                        key={index}
                        className="flex size-5 items-center justify-center rounded-full bg-red-200"
                      >
                        {isLast ? (
                          <X className="size-3 stroke-[2.5px] text-red-600" />
                        ) : (
                          <Flame className="size-3 text-red-600" />
                        )}
                      </div>
                      <span className="text-xs text-red-600">{dayCount}</span>
                    </div>
                  );
                })}
                {[...Array(currentCircleCount)].map((_, index) => {
                  const dayCount =
                    currentCount - currentCircleCount + index + 1 + 1;
                  const isLast = index === currentCircleCount - 1;

                  return (
                    <div
                      className="relative flex flex-col items-center justify-center gap-1.5"
                      key={`current-${index}`}
                    >
                      <div
                        key={index}
                        className={cn(
                          'flex size-5 items-center justify-center rounded-full',
                          isLast
                            ? 'border-2 border-dashed border-gray-400'
                            : 'bg-purple-200',
                        )}
                      >
                        {!isLast && (
                          <Flame className="size-3 text-purple-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-600">{dayCount}</span>
                      {isLast && (
                        <ChevronDown className="absolute bottom-full left-1/2 h-4 w-4 -translate-x-1/2 transform stroke-[2.5px] text-gray-400" />
                      )}
                    </div>
                  );
                })}

                {[...Array(remainingCount)].map((_, index) => {
                  const dayCount = currentCount + index + 1 + 1;

                  return (
                    <div
                      className="flex flex-col items-center justify-center gap-1.5"
                      key={`remaining-${index}`}
                    >
                      <div
                        key={index}
                        className={cn(
                          'flex size-5 items-center justify-center rounded-full',
                          'bg-gray-200',
                        )}
                      ></div>
                      <span className="text-xs text-gray-400">{dayCount}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
