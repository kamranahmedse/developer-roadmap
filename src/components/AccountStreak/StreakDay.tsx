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
        'relative flex flex-col items-center justify-center gap-1.5',
        {
          'text-red-400 opacity-40': isPreviousStreakDay,
          'text-slate-600': isRemainingStreakDay,
          'text-yellow-300': isCurrentStreakDay,
          'text-slate-400': isToday,
        },
      )}
    >
      <div
        className={cn('flex size-6 items-center justify-center rounded-full', {
          'bg-slate-700': isRemainingStreakDay,
          'border border-dashed border-slate-500 striped-bg': isToday,
        })}
      >
        {isToday ? null : icon}
      </div>
      <span className={cn('text-xs')}>{dayCount}</span>
      {isToday && (
        <ChevronDown className="absolute bottom-full left-1/2 h-3.5 w-3.5 -translate-y-[0.75px] -translate-x-1/2 transform stroke-[2.5px] text-slate-400" />
      )}
    </div>
  );
}
