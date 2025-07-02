import { useState } from 'react';
import type { QuizQuestion } from '../../queries/ai-quiz';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  type LucideIcon,
} from 'lucide-react';
import { AIMCQQuestion } from './AIMCQQuestion';

type AIQuizContentProps = {
  questions: QuizQuestion[];
  isLoading?: boolean;
};

export function AIQuizContent(props: AIQuizContentProps) {
  const { questions, isLoading } = props;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestion = questions[activeQuestionIndex];

  const [selectedOptions, setSelectedOptions] = useState<
    Record<
      number,
      {
        selectedOptions: number[];
        isSubmitted: boolean;
      }
    >
  >({});

  const hasMoreQuestions = activeQuestionIndex < questions.length - 1;
  const hasPreviousQuestions = activeQuestionIndex > 0;

  const activeQuestionSelectedOptions =
    selectedOptions[activeQuestionIndex]?.selectedOptions ?? [];
  const activeQuestionIsSubmitted =
    selectedOptions[activeQuestionIndex]?.isSubmitted ?? false;

  const handleSubmit = (questionIndex: number) => {
    setSelectedOptions((prev) => {
      const newSelectedOptions = {
        ...prev,
        [questionIndex]: {
          selectedOptions: prev[questionIndex].selectedOptions,
          isSubmitted: true,
        },
      };

      return newSelectedOptions;
    });
  };

  const handleSelectOptions = (questionIndex: number, options: number[]) => {
    setSelectedOptions((prev) => {
      const newSelectedOptions = {
        ...prev,
        [questionIndex]: { selectedOptions: options, isSubmitted: false },
      };

      return newSelectedOptions;
    });
  };

  const progressPercentage = isLoading
    ? 0
    : Math.min(((activeQuestionIndex + 1) / questions.length) * 100, 100);

  return (
    <div className="mx-auto w-full max-w-lg py-10">
      <div className="mb-10 flex items-center gap-2">
        <span className="text-sm text-gray-500">
          Question {activeQuestionIndex + 1} of {questions.length}
        </span>

        <div className="relative h-1.5 mx-2 grow rounded-full bg-gray-200">
          <div
            className="absolute inset-0 rounded-full bg-black"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        <NavigationButton
          disabled={!hasPreviousQuestions}
          onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          icon={ChevronLeftIcon}
        />
        <NavigationButton
          disabled={!hasMoreQuestions}
          onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          icon={ChevronRightIcon}
        />
      </div>

      {activeQuestion && activeQuestion.type === 'mcq' && (
        <AIMCQQuestion
          question={activeQuestion}
          selectedOptions={activeQuestionSelectedOptions}
          isSubmitted={activeQuestionIsSubmitted}
          setSelectedOptions={(options) =>
            handleSelectOptions(activeQuestionIndex, options)
          }
          onSubmit={() => handleSubmit(activeQuestionIndex)}
          onNext={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
        />
      )}
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
