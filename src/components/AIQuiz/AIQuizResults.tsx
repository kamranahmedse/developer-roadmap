import {
  PartyPopper,
  RotateCcw,
  XCircle,
  SkipForward,
  CheckCircle2Icon,
  PlusIcon,
} from 'lucide-react';
import type { QuestionState } from './AIQuizContent';
import { getPercentage } from '../../lib/number';
import { cn } from '../../lib/classname';
import { QuizStateButton } from './AIQuizResultStrip';

type AIQuizResultsProps = {
  questionStates: Record<number, QuestionState>;
  totalQuestions: number;
  onRetry: () => void;
  onNewQuiz: () => void;
  onReview?: (questionIndex: number) => void;
};

export function AIQuizResults(props: AIQuizResultsProps) {
  const { questionStates, totalQuestions, onRetry, onNewQuiz, onReview } =
    props;

  const states = Object.values(questionStates);
  const correctCount = states.filter(
    (state) => state.status === 'correct',
  ).length;

  const incorrectCount = states.filter(
    (state) => state.status === 'incorrect',
  ).length;

  const skippedCount = states.filter(
    (state) => state.status === 'skipped',
  ).length;

  const accuracy = getPercentage(correctCount, totalQuestions);

  return (
    <div className="mx-auto mt-10 flex max-w-sm flex-col items-center justify-center text-center">
      <PartyPopper className="mb-6 h-16 w-16 text-gray-400" />

      <div className="mb-2 text-4xl font-bold">
        {correctCount}/{totalQuestions}
      </div>

      <p className="mb-8 text-lg text-balance text-gray-600">
        Great job! You answered{' '}
        <span className="font-bold">{correctCount}</span> out of{' '}
        <span className="font-bold">{totalQuestions}</span> questions correctly
        with <span className="font-bold">{accuracy}%</span> accuracy.
      </p>

      <div className="mb-6 grid w-full grid-cols-5 gap-2">
        {states.map((state, quizIndex) => {
          return (
            <QuizStateButton
              key={quizIndex}
              state={state}
              quizIndex={quizIndex}
              isActive={true}
              onReview={onReview}
              className="p-2"
            />
          );
        })}
      </div>

      <div className="mb-8 grid w-full grid-cols-3 gap-4">
        <ResultCard
          count={correctCount}
          label="Correct"
          icon={<CheckCircle2Icon className="mb-2 h-6 w-6" />}
          className="bg-green-50 text-green-700"
        />

        <ResultCard
          count={incorrectCount}
          label="Incorrect"
          icon={<XCircle className="mb-2 h-6 w-6" />}
          className="bg-red-50 text-red-700"
        />

        <ResultCard
          count={skippedCount}
          label="Skipped"
          icon={<SkipForward className="mb-2 h-6 w-6" />}
          className="bg-gray-50 text-gray-700"
        />
      </div>

      <div className="flex gap-2">
        <ResultAction
          label="Try Again"
          icon={<RotateCcw className="h-4 w-4" />}
          onClick={onRetry}
          className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        />
        <ResultAction
          label="New Quiz"
          icon={<PlusIcon className="h-4 w-4" />}
          onClick={onNewQuiz}
        />
      </div>
    </div>
  );
}

type ResultCardProps = {
  count: number;
  label: string;
  icon: React.ReactNode;
  className?: string;
};

export function ResultCard(props: ResultCardProps) {
  const { count, label, icon, className } = props;

  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl bg-gray-50 p-4 text-gray-700',
        className,
      )}
    >
      {icon}
      <div className="text-xl font-semibold">{count}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

type ResultActionProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export function ResultAction(props: ResultActionProps) {
  const { label, icon, onClick, className } = props;

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-10 items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900',
        className,
      )}
    >
      {icon}
      {label}
    </button>
  );
}
