import { cn } from '../../lib/classname';
import {
  ArrowRightIcon,
  CheckIcon,
  CircleAlertIcon,
  SkipForwardIcon,
  XIcon,
} from 'lucide-react';
import type { QuestionState } from './AIQuizContent';

type AIQuizStripeProps = {
  activeQuestionIndex: number;
  questionStates: Record<number, QuestionState>;
  onReview?: (questionIndex: number) => void;
  onComplete?: () => void;
};

export function AIQuizStripe(props: AIQuizStripeProps) {
  const { activeQuestionIndex, questionStates, onReview, onComplete } = props;
  const states = Object.values(questionStates);

  return (
    <div className="fixed right-0 bottom-0 w-[calc(100vw-255px)] border-t border-gray-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full gap-2">
          {states.map((state, quizIndex) => (
            <QuizStateButton
              key={quizIndex}
              state={state}
              quizIndex={quizIndex}
              isActive={quizIndex === activeQuestionIndex}
              onReview={onReview}
            />
          ))}
        </div>

        <button
          className="flex shrink-0 items-center gap-2 rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-900 disabled:opacity-70"
          onClick={onComplete}
        >
          Show Results <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

type QuizStateButtonProps = {
  state: QuestionState;
  quizIndex: number;
  isActive: boolean;
  onReview?: (questionIndex: number) => void;
  className?: string;
};

export function QuizStateButton(props: QuizStateButtonProps) {
  const { state, quizIndex, isActive, onReview, className } = props;
  const { status } = state;

  const isCorrect = status === 'correct';
  const isIncorrect = status === 'incorrect';
  const isSkipped = status === 'skipped';
  const isCanBeImproved = status === 'can_be_improved';

  return (
    <button
      key={quizIndex}
      onClick={() => onReview?.(quizIndex)}
      className={cn(
        'flex aspect-square flex-col items-center justify-center rounded-xl border p-1 hover:opacity-80',
        isCorrect && 'border-green-700 bg-green-700 text-white',
        isIncorrect && 'border-red-700 bg-red-700 text-white',
        isSkipped && 'border-gray-700 bg-gray-700 text-white',
        isCanBeImproved && 'border-yellow-700 bg-yellow-700 text-white',
        !isActive && 'opacity-50',
        className,
      )}
    >
      {isCorrect && <CheckIcon className="h-6 w-6" />}
      {isIncorrect && <XIcon className="h-6 w-6" />}
      {isSkipped && <SkipForwardIcon className="h-6 w-6" />}
      {isCanBeImproved && <CircleAlertIcon className="h-6 w-6" />}
    </button>
  );
}
