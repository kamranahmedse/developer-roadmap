import { Check, type LucideIcon } from 'lucide-react';

type StepperActionProps = {
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
  icon: LucideIcon;
  text: string;
  number: number;
};

export function StepperAction(props: StepperActionProps) {
  const {
    isActive,
    onClick = () => null,
    isCompleted,
    icon: DisplayIcon,
    text,
    number,
  } = props;

  if (isActive) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 rounded-full bg-purple-600 py-1 pl-2 pr-2.5 text-sm text-white hover:bg-purple-700"
      >
        <DisplayIcon size={13} />
        <span>{text}</span>
      </button>
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
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400/70 text-xs text-white">
        {number}
      </span>
      <span>{text}</span>
    </span>
  );
}
