import {
  Blocks,
  Check,
  Flag,
  Hammer,
  type LucideIcon,
  Play,
  PlayCircle,
  Send,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/classname.ts';

type StepperActionProps = {
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
  icon: LucideIcon;
  text: string;
  number: number;
};

function StepperAction(props: StepperActionProps) {
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

type StepperStepSeparatorProps = {
  isActive: boolean;
};

function StepperStepSeparator(props: StepperStepSeparatorProps) {
  const { isActive } = props;

  return (
    <hr
      className={cn('flex-grow border border-gray-300', {
        'border-green-500': isActive,
      })}
    />
  );
}

type MilestoneStepProps = {
  icon: LucideIcon;
  text: string;
  isCompleted?: boolean;
};

function MilestoneStep(props: MilestoneStepProps) {
  const { icon: DisplayIcon, text, isCompleted } = props;

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

export function ProjectStepper() {
  const stickyElRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // on scroll check if the element has sticky class in effect
  useEffect(() => {
    const handleScroll = () => {
      if (stickyElRef.current) {
        setIsSticky(stickyElRef.current.getBoundingClientRect().top <= 8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={stickyElRef}
      className={cn(
        'sticky top-0 -mx-2 -mt-2 mb-5 overflow-hidden rounded-lg border bg-white transition-all',
        {
          '-mx-5 rounded-none border-x-0 border-t-0 bg-gray-50': isSticky,
        },
      )}
    >
      <div
        className={cn(
          'border-b bg-gray-100 px-4 py-2 text-sm text-gray-500 transition-colors',
          {
            'bg-purple-600 text-white': isSticky,
          },
        )}
      >
        Start building, submit solution and get feedback from the community.
      </div>

      <div className="flex min-h-[60px] items-center justify-between gap-3 px-4">
        <StepperAction
          isActive={true}
          icon={Play}
          text={'Start Building'}
          number={1}
        />
        <StepperStepSeparator isActive={false} />
        <StepperAction
          isActive={false}
          icon={Send}
          text={'Submit Solution'}
          number={2}
        />
        <StepperStepSeparator isActive={false} />
        <MilestoneStep isCompleted={false} icon={Flag} text={'5 upvotes'} />
        <StepperStepSeparator isActive={false} />
        <MilestoneStep isCompleted={false} icon={Flag} text={'10 upvotes'} />
      </div>
    </div>
  );
}
