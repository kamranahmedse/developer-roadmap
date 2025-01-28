import { cn } from '../../lib/classname.ts';
import { type LucideIcon, ThumbsUp } from 'lucide-react';

type VoteButtonProps = {
  icon: LucideIcon;
  isActive: boolean;
  count: number;
  hideCount?: boolean;
  onClick: () => void;
};
export function VoteButton(props: VoteButtonProps) {
  const { icon: VoteIcon, isActive, hideCount = false, count, onClick } = props;
  return (
    <button
      className={cn(
        'flex gap-1 px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-black focus:outline-hidden',
        {
          'bg-gray-100 text-orange-600 hover:text-orange-700': isActive,
          'bg-transparent text-gray-500 hover:text-black': !isActive,
        },
      )}
      disabled={isActive}
      onClick={onClick}
    >
      <VoteIcon className={cn('size-3.5 stroke-[2.5px]', {
          'top-[1.5px] relative mr-0.5': hideCount
      })} />
      {!hideCount && (
        <span className="relative -top-[0.5px] text-xs font-medium tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
