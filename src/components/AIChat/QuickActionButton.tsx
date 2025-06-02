import { Loader2Icon, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type QuickActionButtonProps = {
  icon?: LucideIcon;
  label?: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
};

export function QuickActionButton(props: QuickActionButtonProps) {
  const { icon: Icon, label, onClick, className, isLoading } = props;

  return (
    <button
      className={cn(
        'pointer-events-auto flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      {Icon && !isLoading && <Icon className="size-4" />}
      {isLoading && Icon && <Loader2Icon className="size-4 animate-spin" />}
      {label}
    </button>
  );
}
