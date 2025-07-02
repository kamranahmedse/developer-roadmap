import {
  ChevronLeftIcon,
  ChevronRightIcon,
  type LucideIcon,
} from 'lucide-react';

type QuizTopNavigationProps = {
  activeQuestionIndex: number;
  totalQuestions: number;
  progressPercentage: number;

  onPrevious: () => void;
  onNext: () => void;
};

export function QuizTopNavigation(props: QuizTopNavigationProps) {
  const {
    activeQuestionIndex,
    totalQuestions,
    progressPercentage,
    onPrevious,
    onNext,
  } = props;

  const hasPreviousQuestions = activeQuestionIndex > 0;
  const hasMoreQuestions = activeQuestionIndex < totalQuestions - 1;

  return (
    <div className="mb-10 flex items-center gap-2">
      <span className="text-sm text-gray-500">
        Question {activeQuestionIndex + 1} of {totalQuestions}
      </span>

      <div className="relative mx-2 h-1.5 grow rounded-full bg-gray-200">
        <div
          className="absolute inset-0 rounded-full bg-black"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>

      <NavigationButton
        disabled={!hasPreviousQuestions}
        onClick={onPrevious}
        icon={ChevronLeftIcon}
      />
      <NavigationButton
        disabled={!hasMoreQuestions}
        onClick={onNext}
        icon={ChevronRightIcon}
      />
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
      className="flex size-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-black disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
}
