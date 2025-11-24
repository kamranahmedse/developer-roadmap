import { BookOpenCheckIcon, SignpostIcon, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/classname';
import type { AICourseViewMode } from './AICourseContent';

type AIRoadmapViewSwitchProps = {
  viewMode: AICourseViewMode;
  setViewMode: (mode: AICourseViewMode) => void;
  isLoading: boolean;
  variant?: 'icon' | 'text';
};

export function AIRoadmapViewSwitch(props: AIRoadmapViewSwitchProps) {
  const { viewMode, setViewMode, isLoading, variant = 'icon' } = props;

  return (
    <div
      className={cn(
        'grid shrink-0 grid-cols-2 gap-0.5 rounded-md border border-gray-300 bg-white p-0.5 shadow-xs',
      )}
    >
      <SwitchButton
        onClick={() => setViewMode('outline')}
        isActive={viewMode === 'outline'}
        disabled={isLoading}
        variant={variant}
        icon={BookOpenCheckIcon}
        label="Outline"
      />

      <SwitchButton
        onClick={() => setViewMode('roadmap')}
        isActive={viewMode === 'roadmap'}
        disabled={isLoading}
        variant={variant}
        icon={SignpostIcon}
        label="Roadmap"
      />
    </div>
  );
}

type SwitchButtonProps = {
  onClick: () => void;
  isActive: boolean;
  disabled: boolean;
  variant?: 'icon' | 'text';
  icon: LucideIcon;
  label: string;
};

export function SwitchButton(props: SwitchButtonProps) {
  const {
    onClick,
    isActive,
    disabled,
    variant = 'icon',
    icon: Icon,
    label,
  } = props;

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-1.5 rounded-sm text-sm hover:bg-gray-100 disabled:cursor-not-allowed',
        isActive && 'bg-gray-100 text-gray-800',
        variant === 'text' ? 'px-2 py-1.5' : 'p-[5px]',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        className={cn(
          'size-4',
          variant === 'icon' && 'h-3 w-3',
          isActive && 'text-gray-800',
        )}
      />
      {variant === 'text' && label}
    </button>
  );
}
