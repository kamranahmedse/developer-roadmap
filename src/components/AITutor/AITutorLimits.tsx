import { Gift } from 'lucide-react';
import { cn } from '../../lib/classname';

type AITutorLimitsProps = {
  used: number;
  limit: number;
  isPaidUser: boolean;
  isPaidUserLoading: boolean;
  onUpgradeClick: () => void;
};

export function AITutorLimits(props: AITutorLimitsProps) {
  const limitUsedPercentage = Math.round((props.used / props.limit) * 100);

  if (props.used <= 0 || props.limit <= 0 || props.isPaidUserLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        'pointer-events-none flex items-center gap-2 opacity-0 transition-opacity',
        {
          'pointer-events-auto opacity-100': !props.isPaidUser,
        },
      )}
    >
      <p className="flex items-center text-sm text-yellow-600">
        <span className="max-md:hidden">
          {limitUsedPercentage}% of daily limit used{' '}
        </span>
        <span className="inline md:hidden">
          {limitUsedPercentage}% used
        </span>
        <button
          onClick={props.onUpgradeClick}
          className="ml-1.5 flex items-center gap-1 rounded-full bg-yellow-600 py-0.5 pr-2 pl-1.5 text-xs text-white"
        >
          <Gift className="size-4" />
          Upgrade
        </button>
      </p>
    </div>
  );
} 