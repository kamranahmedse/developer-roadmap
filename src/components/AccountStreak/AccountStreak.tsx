import { useEffect, useRef, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { Flame, X } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { StreakDay } from './StreakDay';

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
  // In the maximum case, we will show 10 circles
  const remainingCount = Math.max(0, 10 - leftCircleCount - currentCircleCount);
  const totalCircles = leftCircleCount + currentCircleCount + remainingCount;

  return (
    <div className="relative z-[90] animate-fade-in">
      <button
        className="flex items-center justify-center rounded-lg p-1.5 px-2 text-purple-400 hover:bg-purple-100/10 focus:outline-none"
        onClick={() => setShowDropdown(true)}
      >
        <Flame className="size-5" />
        <span className="ml-1 text-sm font-semibold">
          {accountStreak?.count}
        </span>
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full z-50 w-[320px] translate-y-1 rounded-lg bg-slate-800 shadow-xl"
        >
          <div className="px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-slate-400">
                Current Streak
                <span className="ml-2 font-medium text-white">
                  {accountStreak?.count || 0}
                </span>
              </p>
              <p className="text-sm text-slate-400">
                Longest Streak
                <span className="ml-2 font-medium text-white">
                  {accountStreak?.longestCount || 0}
                </span>
              </p>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: totalCircles }).map((_, index) => {
                  let dayCount,
                    icon,
                    isPreviousStreakDay,
                    isCurrentStreakDay,
                    isRemainingStreakDay,
                    isToday;

                  if (index < leftCircleCount) {
                    // Previous streak days
                    dayCount = previousCount - leftCircleCount + index + 1 + 1;
                    isPreviousStreakDay = true;
                    icon =
                      index === leftCircleCount - 1 ? (
                        <X className="size-3.5 text-white" />
                      ) : (
                        <Flame className="size-3.5 text-white" />
                      );
                  } else if (index < leftCircleCount + currentCircleCount) {
                    // Current streak days
                    const currentIndex = index - leftCircleCount;
                    dayCount =
                      currentCount - currentCircleCount + currentIndex + 1 + 1;
                    isCurrentStreakDay = true;
                    isToday = currentIndex === currentCircleCount - 1;
                    icon = <Flame className="size-3.5 text-white" />;
                  } else {
                    // Remaining streak days
                    const remainingIndex =
                      index - leftCircleCount - currentCircleCount;
                    dayCount = currentCount + remainingIndex + 1 + 1;
                    isRemainingStreakDay = true;
                  }

                  return (
                    <StreakDay
                      key={`streak-${index}`}
                      dayCount={dayCount}
                      icon={icon}
                      isPreviousStreakDay={isPreviousStreakDay}
                      isCurrentStreakDay={isCurrentStreakDay}
                      isRemainingStreakDay={isRemainingStreakDay}
                      isToday={isToday}
                    />
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
