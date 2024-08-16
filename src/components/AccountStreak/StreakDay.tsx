import type { ReactNode } from 'react';
import { cn } from '../../lib/classname';
import { ChevronDown } from 'lucide-react';

type StreakDayProps = {
  isToday?: boolean;
  isCurrentStreakDay?: boolean;
  isPreviousStreakDay?: boolean;
  isRemainingStreakDay?: boolean;
  dayCount: number;
  icon?: ReactNode;
};

export function StreakDay(props: StreakDayProps) {
  const {
    isCurrentStreakDay,
    isPreviousStreakDay,
    isRemainingStreakDay,
    dayCount,
    icon,
    isToday = false,
  } = props;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-1.5',
        isCurrentStreakDay && 'relative',
      )}
    >
      <div
        className={cn(
          'flex size-6 items-center justify-center rounded-full',
          isPreviousStreakDay && 'bg-red-500',
          isCurrentStreakDay && 'bg-purple-500',
          isRemainingStreakDay && 'bg-slate-700',
          isToday && 'border-2 border-dashed border-slate-500 bg-transparent',
        )}
      >
        {isToday ? null : icon}
      </div>
      <span
        className={cn(
          'text-sm',
          isPreviousStreakDay && 'text-slate-400',
          (isCurrentStreakDay || isRemainingStreakDay) && 'text-slate-100',
        )}
      >
        {dayCount}
      </span>
      {isToday && (
        <ChevronDown className="absolute bottom-full left-1/2 h-4 w-4 -translate-x-1/2 transform stroke-[2.5px] text-slate-400" />
      )}
    </div>
  );
}
