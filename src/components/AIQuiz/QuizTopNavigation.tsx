import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../lib/classname';

type QuizTopNavigationProps = {
  activeQuestionIndex: number;
  totalQuestions: number;
  progressPercentage: number;
  onSkip: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isStreaming?: boolean;
};

export function QuizTopNavigation(props: QuizTopNavigationProps) {
  const {
    activeQuestionIndex,
    totalQuestions,
    progressPercentage,
    onPrevious,
    onNext,
    onSkip,
    isStreaming = false,
  } = props;

  return (
    <div className="mb-8 space-y-4">
      {/* Header with question count and navigation */}
      <div className="flex items-center justify-center lg:justify-between">
        <div className="flex w-full items-center gap-3">
          <NavigationButton
            disabled={activeQuestionIndex === 0}
            onClick={onPrevious}
            icon={ChevronLeftIcon}
          />
          <span className="text-center text-sm font-medium text-gray-600 max-lg:w-full">
            Question{' '}
            <span className="text-black">{activeQuestionIndex + 1}</span> of{' '}
            {totalQuestions}
          </span>
          <NavigationButton
            disabled={false}
            onClick={onSkip}
            icon={ChevronRightIcon}
          />
        </div>

        {!isStreaming && (
          <div
            className={cn(
              'hidden flex-shrink-0 text-sm font-medium text-gray-500 min-lg:flex',
            )}
          >
            {Math.round(progressPercentage)}% complete
          </div>
        )}
        {isStreaming && (
          <div className="text-sm font-medium text-gray-500">
            <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
          </div>
        )}
      </div>

      {/* Enhanced progress bar */}
      <div className="relative h-2 overflow-hidden rounded-full bg-gray-100 shadow-inner">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-black transition-all duration-300 ease-out"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
        {/* Subtle shine effect */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-300 ease-out"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  );
}

type NavigationButtonProps = {
  disabled: boolean;
  onClick: () => void;
  icon: LucideIcon;
};

function NavigationButton(props: NavigationButtonProps) {
  const { disabled, onClick, icon: Icon } = props;
  return (
    <button
      className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all duration-150 hover:border-gray-300 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-400 disabled:hover:shadow-sm"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
}
