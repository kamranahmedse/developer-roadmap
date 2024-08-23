import type { ReactNode } from 'react';
import { cn } from '../../lib/classname';
import { ChevronDown } from 'lucide-react';

type StreakDayProps = {
  isToday?: boolean;
  isCurrentStreakDay?: boolean;
  isPreviousStreakDay?: boolean;
  isBrokenStreakDay?: boolean;
  isRemainingStreakDay?: boolean;
  dayCount: number;
  icon?: ReactNode;
};

export function StreakDay(props: StreakDayProps) {
  const {
    isCurrentStreakDay,
    isPreviousStreakDay,
    isBrokenStreakDay,
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
        className={cn('flex size-6 items-center justify-center rounded-full', {
          'bg-red-500': isPreviousStreakDay,
          'bg-purple-500': isCurrentStreakDay,
          'bg-slate-700': isRemainingStreakDay,
          'border-2 border-dashed border-slate-500 bg-transparent': isToday,
        })}
      >
        {isToday ? null : icon}
      </div>
      <span
        className={cn('text-sm', {
          'text-slate-500': isPreviousStreakDay,
          'text-slate-100': isCurrentStreakDay || isRemainingStreakDay,
        })}
      >
        {dayCount}
      </span>
      {isToday && (
        <ChevronDown className="absolute bottom-full left-1/2 h-4 w-4 -translate-x-1/2 transform stroke-[2.5px] text-slate-400" />
      )}
    </div>
  );
}
