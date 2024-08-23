import { Check, type LucideIcon } from 'lucide-react';

type MilestoneStepProps = {
  icon: LucideIcon;
  text: string;
  isCompleted?: boolean;
  isActive?: boolean;
};

export function MilestoneStep(props: MilestoneStepProps) {
  const { icon: DisplayIcon, text, isActive = false, isCompleted } = props;

  if (isActive) {
    return (
      <span className="flex cursor-default items-center gap-1.5 rounded-md border border-dashed border-current px-1.5 py-0.5 text-sm font-medium text-gray-400">
        <DisplayIcon size={14} />
        <span>{text}</span>
      </span>
    );
  }

  if (isCompleted) {
    return (
      <span className="flex cursor-default items-center gap-1.5 text-sm font-medium text-green-600">
        <Check size={14} strokeWidth={3} />
        <span>{text}</span>
      </span>
    );
  }

  return (
    <span className="flex cursor-default items-center gap-1.5 text-sm text-gray-400">
      <DisplayIcon size={14} />
      <span>{text}</span>
    </span>
  );
}
