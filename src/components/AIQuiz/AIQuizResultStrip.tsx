import { cn } from '../../lib/classname';
import {
  ArrowRightIcon,
  CheckIcon,
  CircleAlertIcon,
  Minus, XIcon
} from 'lucide-react';
import type { QuestionState } from './AIQuizContent';

type AIQuizResultStripProps = {
  activeQuestionIndex: number;
  questionStates: Record<number, QuestionState>;
  onReview?: (questionIndex: number) => void;
  onComplete?: () => void;
};

export function AIQuizResultStrip(props: AIQuizResultStripProps) {
  const { activeQuestionIndex, questionStates, onReview, onComplete } = props;
  const states = Object.values(questionStates);

  return (
    <div className="border-t border-gray-200 bg-white p-3">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="flex w-full flex-wrap gap-1">
          {states.map((state, quizIndex) => (
            <QuizStateButton
              key={quizIndex}
              state={state}
              quizIndex={quizIndex}
              isActive={quizIndex === activeQuestionIndex}
              onReview={onReview}
              variant="small"
            />
          ))}
        </div>

        <button
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-900 disabled:opacity-70 md:w-auto md:justify-start"
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
  variant?: 'default' | 'small';
};

export function QuizStateButton(props: QuizStateButtonProps) {
  const {
    state,
    quizIndex,
    isActive,
    onReview,
    className,
    variant = 'default',
  } = props;
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
        isSkipped && 'border-gray-400 bg-gray-400 text-white',
        isCanBeImproved && 'border-yellow-700 bg-yellow-700 text-white',
        !isActive && 'opacity-50',
        variant === 'small' && 'rounded-lg',
        className,
      )}
    >
      {isCorrect && (
        <CheckIcon
          className={cn('size-6.5', variant === 'small' && 'size-5')}
        />
      )}
      {isIncorrect && (
        <XIcon className={cn('size-6.5', variant === 'small' && 'size-5')} />
      )}
      {isSkipped && (
        <Minus
          className={cn(
            'size-6.5 fill-current',
            variant === 'small' && 'size-5',
          )}
        />
      )}
      {isCanBeImproved && (
        <CircleAlertIcon
          className={cn('size-6.5', variant === 'small' && 'size-5')}
        />
      )}
    </button>
  );
}
