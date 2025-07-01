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

  const hasMoreQuestions = activeQuestionIndex < questions.length - 1;
  const hasPreviousQuestions = activeQuestionIndex > 0;

  return (
    <div className="mx-auto w-full max-w-lg py-10">
      <div className="mb-10 flex items-center gap-3">
        <NavigationButton
          disabled={!hasPreviousQuestions}
          onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          icon={ChevronLeftIcon}
        />
        <span className="text-sm text-gray-500">
          Question {activeQuestionIndex + 1} of {questions.length}
        </span>
        <NavigationButton
          disabled={!hasMoreQuestions}
          onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          icon={ChevronRightIcon}
        />
      </div>

      {activeQuestion && activeQuestion.type === 'mcq' && (
        <AIMCQQuestion question={activeQuestion} />
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
