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
        'flex w-full flex-col items-center justify-center gap-2.5 rounded-xl border border-gray-200 p-2 py-8',
        isSelected
          ? 'border-gray-400 font-medium bg-white'
          : 'bg-white text-gray-400 hover:bg-white hover:border-gray-300',
      )}
      onClick={onClick}
    >
      <Icon className="size-6" />
      <span>{label}</span>
    </button>
  );
}
