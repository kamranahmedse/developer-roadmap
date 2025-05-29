import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type QuickActionButtonProps = {
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
};

export function QuickActionButton(props: QuickActionButtonProps) {
  const { icon: Icon, label, onClick, className } = props;

  return (
    <button
      className={cn(
        'pointer-events-auto flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-black',
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="size-4" />}
      {label}
    </button>
  );
}
