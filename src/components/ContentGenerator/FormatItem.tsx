import { type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type FormatItemProps = {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  isSelected: boolean;
};

export function FormatItem(props: FormatItemProps) {
  const { label, onClick, icon: Icon, isSelected } = props;

  return (
    <button
      type="button"
      className={cn(
        'flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 p-2 py-6',
        isSelected
          ? 'border-gray-200 bg-white'
          : 'bg-gray-50 text-gray-400 hover:bg-gray-50',
      )}
      onClick={onClick}
    >
      <Icon className="size-6" />
      <span>{label}</span>
    </button>
  );
}
