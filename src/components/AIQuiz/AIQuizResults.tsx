import {
  CheckCircle,
  PartyPopper,
  RefreshCcw,
  RotateCcw,
  XCircle,
  SkipForward,
  CheckCircle2Icon,
} from 'lucide-react';
import type { QuestionState } from './AIQuizContent';
import { getPercentage } from '../../lib/number';

type AIQuizResultsProps = {
  questionStates: Record<number, QuestionState>;
  totalQuestions: number;
  onRetry: () => void;
  onNewQuiz: () => void;
};

export function AIQuizResults(props: AIQuizResultsProps) {
  const { questionStates, totalQuestions, onRetry, onNewQuiz } = props;

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
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <PartyPopper className="mb-6 h-16 w-16 text-gray-400" />

      <div className="mb-2 text-4xl font-bold">
        {correctCount}/{totalQuestions}
      </div>

      <p className="mb-8 text-lg text-gray-600">
        Great job! You answered {correctCount} out of {totalQuestions} questions
        correctly — that's {accuracy}% accuracy!
      </p>

      <div className="mb-8 grid w-full max-w-sm grid-cols-3 gap-4">
        <div className="flex flex-col items-center rounded-xl bg-green-50 p-4 text-green-700">
          <CheckCircle2Icon className="mb-2 h-6 w-6" />
          <div className="text-xl font-semibold">{correctCount}</div>
          <div className="text-sm">Correct</div>
        </div>

        <div className="flex flex-col items-center rounded-xl bg-red-50 p-4 text-red-700">
          <XCircle className="mb-2 h-6 w-6" />
          <div className="text-xl font-semibold">{incorrectCount}</div>
          <div className="text-sm">Incorrect</div>
        </div>

        <div className="flex flex-col items-center rounded-xl bg-gray-50 p-4 text-gray-700">
          <SkipForward className="mb-2 h-6 w-6" />
          <div className="text-xl font-semibold">{skippedCount}</div>
          <div className="text-sm">Skipped</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
        <button
          onClick={onNewQuiz}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
        >
          <RefreshCcw className="h-4 w-4" />
          New Quiz
        </button>
      </div>
    </div>
  );
}
