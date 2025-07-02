import { useState } from 'react';
import type { QuizQuestion } from '../../queries/ai-quiz';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  type LucideIcon,
} from 'lucide-react';
import { AIMCQQuestion } from './AIMCQQuestion';
import { AIOpenEndedQuestion } from './AIOpenEndedQuestion';

export type QuestionState = {
  isSubmitted: boolean;
  selectedOptions?: number[];
  userAnswer?: string;
  correctAnswer?: string;
  status: 'correct' | 'incorrect' | 'skipped' | 'pending';
};

const DEFAULT_QUESTION_STATE: QuestionState = {
  isSubmitted: false,
  selectedOptions: [],
  userAnswer: '',
  correctAnswer: '',
  status: 'pending',
};

type AIQuizContentProps = {
  quizSlug?: string;
  questions: QuizQuestion[];
  isLoading?: boolean;
};

export function AIQuizContent(props: AIQuizContentProps) {
  const { quizSlug, questions, isLoading } = props;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQuestion = questions[activeQuestionIndex];

  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, QuestionState>
  >({});

  const hasMoreQuestions = activeQuestionIndex < questions.length - 1;
  const hasPreviousQuestions = activeQuestionIndex > 0;

  const activeQuestionState =
    selectedOptions[activeQuestionIndex] ?? DEFAULT_QUESTION_STATE;

  const activeQuestionSelectedOptions =
    activeQuestionState.selectedOptions ?? [];
  const activeQuestionIsSubmitted = activeQuestionState.isSubmitted ?? false;

  const handleSubmit = (
    questionIndex: number,
    status: QuestionState['status'],
  ) => {
    setSelectedOptions((prev) => {
      const oldState = prev[questionIndex] ?? DEFAULT_QUESTION_STATE;

      const newSelectedOptions = {
        ...prev,
        [questionIndex]: {
          ...oldState,
          isSubmitted: true,
          status,
        },
      };

      return newSelectedOptions;
    });
  };

  const handleSetUserAnswer = (questionIndex: number, userAnswer: string) => {
    setSelectedOptions((prev) => {
      const oldState = prev[questionIndex] ?? DEFAULT_QUESTION_STATE;

      const newSelectedOptions = {
        ...prev,
        [questionIndex]: {
          ...oldState,
          userAnswer,
        },
      };

      return newSelectedOptions;
    });
  };

  const handleSetCorrectAnswer = (
    questionIndex: number,
    correctAnswer: string,
  ) => {
    setSelectedOptions((prev) => {
      const oldState = prev[questionIndex] ?? DEFAULT_QUESTION_STATE;

      const newSelectedOptions = {
        ...prev,
        [questionIndex]: {
          ...oldState,
          correctAnswer,
        },
      };

      return newSelectedOptions;
    });
  };

  const handleSelectOptions = (questionIndex: number, options: number[]) => {
    setSelectedOptions((prev) => {
      const oldState = prev[questionIndex] ?? DEFAULT_QUESTION_STATE;

      const newSelectedOptions = {
        ...prev,
        [questionIndex]: {
          ...oldState,
          selectedOptions: options,
          isSubmitted: true,
        },
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
          onSubmit={(status) => handleSubmit(activeQuestionIndex, status)}
          onNext={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
        />
      )}

      {activeQuestion && activeQuestion.type === 'open-ended' && (
        <AIOpenEndedQuestion
          quizSlug={quizSlug ?? ''}
          question={activeQuestion}
          isSubmitted={activeQuestionIsSubmitted}
          onSubmit={(status) => handleSubmit(activeQuestionIndex, status)}
          onNext={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          userAnswer={activeQuestionState.userAnswer ?? ''}
          setUserAnswer={(userAnswer) =>
            handleSetUserAnswer(activeQuestionIndex, userAnswer)
          }
          correctAnswer={activeQuestionState.correctAnswer ?? ''}
          setCorrectAnswer={(correctAnswer) =>
            handleSetCorrectAnswer(activeQuestionIndex, correctAnswer)
          }
          status={activeQuestionState.status}
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
