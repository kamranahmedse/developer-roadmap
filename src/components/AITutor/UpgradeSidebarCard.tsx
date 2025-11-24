import { useQuery } from '@tanstack/react-query';
import { Zap } from 'lucide-react';
import { queryClient } from '../../stores/query-client';
import { aiLimitOptions } from '../../queries/ai-course';
import { getPercentage } from '../../lib/number';
import { cn } from '../../lib/classname';

type UpgradeSidebarCardProps = {
  onUpgrade: () => void;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  title?: string;
  description?: string;
  showLimit?: boolean;
};

export function UpgradeSidebarCard(props: UpgradeSidebarCardProps) {
  const {
    onUpgrade,
    title = 'Upgrade',
    description = 'Get access to all features and benefits of the AI Tutor.',
    descriptionClassName,
    titleClassName,
    className,
    showLimit = true,
  } = props;

  const { data: limits, isLoading: isLimitsLoading } = useQuery(
    aiLimitOptions(),
    queryClient,
  );

  const { used, limit } = limits ?? { used: 0, limit: 0 };
  const totalPercentage = getPercentage(used, limit);

  return (
    <button
      onClick={onUpgrade}
      className={cn(
        'animate-fade-in mx-4 mt-4 rounded-xl bg-amber-100 p-4 text-left transition-colors hover:bg-amber-200/80',
        className,
      )}
    >
      <span className="mb-2 flex items-center gap-2">
        <Zap className="size-4 text-amber-600" />
        <span className={cn('font-medium text-amber-900', titleClassName)}>
          {title}
        </span>
      </span>
      <span
        className={cn(
          'mt-1 block text-left text-xs leading-4 text-amber-700',
          descriptionClassName,
        )}
      >
        {description}
      </span>

      {showLimit && (
        <div className="mt-5">
          <div className="relative h-1 w-full rounded-full bg-amber-300/40">
            <div
              className="absolute inset-0 h-full rounded-full bg-amber-600/80"
              style={{
                width: `${totalPercentage}%`,
              }}
            ></div>
          </div>
          <span className="mt-2 block text-xs text-amber-700">
            {totalPercentage}% of the daily limit used
          </span>
        </div>
      )}
    </button>
  );
}
