import { useEffect, useRef, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { Flame, X, Zap, ZapOff } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { StreakDay } from './StreakDay';
import {
  navigationDropdownOpen,
  roadmapsDropdownOpen,
} from '../../stores/page.ts';
import { useStore } from '@nanostores/react';
import { cn } from '../../lib/classname.ts';
import { $accountStreak } from '../../stores/streak.ts';

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
  const accountStreak = useStore($accountStreak);
  const [showDropdown, setShowDropdown] = useState(false);

  const $roadmapsDropdownOpen = useStore(roadmapsDropdownOpen);
  const $navigationDropdownOpen = useStore(navigationDropdownOpen);

  useEffect(() => {
    if ($roadmapsDropdownOpen || $navigationDropdownOpen) {
      setShowDropdown(false);
    }
  }, [$roadmapsDropdownOpen, $navigationDropdownOpen]);

  const loadAccountStreak = async () => {
    if (!isLoggedIn()) {
      return;
    }

    if (accountStreak) {
      setIsLoading(false);
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

    $accountStreak.set(response);
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

  let { count: currentCount = 0 } = accountStreak || {};
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
        className={cn(
          'flex items-center justify-center rounded-lg p-1.5 px-2 text-purple-400 hover:bg-purple-100/10 focus:outline-none',
          {
            'bg-purple-100/10': showDropdown,
          },
        )}
        onClick={() => setShowDropdown(true)}
      >
        <Zap strokeWidth={1} className="size-5 fill-current" />
        <span className="ml-1.5 text-sm font-semibold">
          {accountStreak?.count}
        </span>
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full z-50 w-[335px] translate-y-1 rounded-lg bg-slate-800 shadow-xl"
        >
          <div className="py-5 pl-4 pr-5">
            <div className="flex items-center justify-between gap-2 text-sm text-slate-500">
              <p>
                Current Streak
                <span className="ml-2 font-medium text-white">
                  {accountStreak?.count || 0}
                </span>
              </p>
              <p>
                Longest Streak
                <span className="ml-2 font-medium text-white">
                  {accountStreak?.longestCount || 0}
                </span>
              </p>
            </div>

            <div className="mb-6 mt-9">
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: totalCircles }).map((_, index) => {
                  let dayCount,
                    icon,
                    isPreviousStreakDay,
                    isBrokenStreakDay,
                    isCurrentStreakDay,
                    isRemainingStreakDay,
                    isToday;

                  if (index < leftCircleCount) {
                    // Previous streak days
                    dayCount = previousCount - leftCircleCount + index + 1 + 1;
                    isPreviousStreakDay = true;
                    isBrokenStreakDay = index === leftCircleCount - 1;

                    icon = isBrokenStreakDay ? (
                      <ZapOff className="size-5 fill-current" />
                    ) : (
                      <Zap className="size-5 fill-current" />
                    );
                  } else if (index < leftCircleCount + currentCircleCount) {
                    // Current streak days
                    const currentIndex = index - leftCircleCount;
                    dayCount =
                      currentCount - currentCircleCount + currentIndex + 1 + 1;
                    isCurrentStreakDay = true;
                    isToday = currentIndex === currentCircleCount - 1;
                    icon = <Zap className="size-5 fill-current" />;
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
                      isBrokenStreakDay={isBrokenStreakDay}
                      isPreviousStreakDay={isPreviousStreakDay}
                      isCurrentStreakDay={isCurrentStreakDay}
                      isRemainingStreakDay={isRemainingStreakDay}
                      isToday={isToday}
                    />
                  );
                })}
              </div>
            </div>

            <p className="-mt-[0px] mb-[1.5px] text-center text-xs tracking-wide text-slate-500">
              Visit every day to keep your streak going!
            </p>
            <p className='text-xs mt-1.5 text-center'>
              <a href="/leaderboard" className="text-purple-400 hover:underline underline-offset-2">
                See how you compare to others
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
