import { RotateCcw, BarChart3, Zap, Check, X, Minus } from 'lucide-react';
import { cn } from '../../lib/classname';
import { getPercentage } from '../../lib/number';
import type { QuestionState } from './AIQuizContent';
import { QuizStateButton } from './AIQuizResultStrip';
import { CircularProgress } from './CircularProgress';

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

  const getPerformanceLevel = (): {
    level: string;
    color: 'emerald' | 'green' | 'blue' | 'orange' | 'red';
  } => {
    if (accuracy >= 90) return { level: 'Excellent', color: 'emerald' };
    if (accuracy >= 75) return { level: 'Great', color: 'green' };
    if (accuracy >= 60) return { level: 'Good', color: 'blue' };
    if (accuracy >= 40) return { level: 'Fair', color: 'orange' };
    return { level: 'Needs Work', color: 'red' };
  };

  const performance = getPerformanceLevel();

  const canReview = onReview && states.some((state) => state.isSubmitted);

  return (
    <div className="mx-auto mt-8 max-w-4xl space-y-6">
      {/* Header Card with Performance Overview */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Quiz Complete!
            </h2>
            <p
              className={cn(
                'text-lg font-semibold',
                performance.color === 'emerald' && 'text-emerald-600',
                performance.color === 'green' && 'text-green-600',
                performance.color === 'blue' && 'text-blue-600',
                performance.color === 'orange' && 'text-orange-600',
                performance.color === 'red' && 'text-red-600',
              )}
            >
              {performance.level}
            </p>
            <p className="text-sm text-gray-600 md:text-base">
              You scored {correctCount} out of {totalQuestions} questions
              correctly
            </p>
          </div>

          <CircularProgress accuracy={accuracy} color={performance.color} />
        </div>
      </div>

      {/* Compact Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 md:text-base">
          Results Breakdown
        </h3>
        <div className="space-y-3">
          <StatRow
            icon={<Check className="h-4 w-4" />}
            label="Correct"
            value={correctCount}
            total={totalQuestions}
            color="green"
          />
          <StatRow
            icon={<X className="h-4 w-4" />}
            label="Incorrect"
            value={incorrectCount}
            total={totalQuestions}
            color="red"
          />
          <StatRow
            icon={<Minus className="h-4 w-4" />}
            label="Skipped"
            value={skippedCount}
            total={totalQuestions}
            color="gray"
          />
        </div>
      </div>

      {/* Question Review Section */}
      {canReview && totalQuestions <= 20 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900 md:text-base">
                Question Breakdown
              </h3>
            </div>
            <span className="text-sm text-gray-500 sm:ml-auto">
              Click to review
            </span>
          </div>
          <div
            className={cn(
              'grid gap-2',
              totalQuestions <= 8
                ? 'grid-cols-4 sm:grid-cols-8'
                : totalQuestions <= 12
                  ? 'grid-cols-4 sm:grid-cols-6'
                  : 'grid-cols-5',
            )}
          >
            {states.map((state, quizIndex) => (
              <QuizStateButton
                key={quizIndex}
                state={state}
                quizIndex={quizIndex}
                isActive={true}
                onReview={onReview}
                className="p-2 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <ActionButton
          variant="secondary"
          icon={<RotateCcw className="h-4 w-4" />}
          onClick={onRetry}
        >
          Try Again
        </ActionButton>
        <ActionButton
          variant="secondary"
          icon={<Zap className="h-4 w-4" />}
          onClick={onNewQuiz}
        >
          New Quiz
        </ActionButton>
      </div>

      {/* Performance Insights */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-6">
        <div className="space-y-4">
          <div>
            <h4 className="mb-1 flex items-center text-sm font-semibold text-gray-900 md:text-base">
              Performance Insight
            </h4>
            <p className="text-sm leading-relaxed text-balance text-gray-600">
              {accuracy >= 90 &&
                "Outstanding work! You've mastered this topic. Consider challenging yourself with more advanced questions."}
              {accuracy >= 75 &&
                accuracy < 90 &&
                'Great job! You have a solid understanding. A few more practice sessions could get you to mastery.'}
              {accuracy >= 60 &&
                accuracy < 75 &&
                "Good progress! You're on the right track. Focus on reviewing the questions you missed."}
              {accuracy >= 40 &&
                accuracy < 60 &&
                'Keep practicing! Consider reviewing the fundamentals before attempting another quiz.'}
              {accuracy < 40 &&
                "Don't give up! Learning takes time. Review the material thoroughly and try again when you're ready."}
            </p>
          </div>

          {/* Action Items */}
          <div className="mt-5 border-t border-gray-200 pt-5 -mx-6 px-6">
            <h5 className="mb-3 text-sm font-medium text-gray-900">
              Here's what you can do next
            </h5>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <ActionLink
                href="/ai"
                label="Learn a Topic"
                description="Create a course or guide"
                variant="secondary"
              />
              <ActionLink
                href="/ai/chat"
                label="Chat with AI Tutor"
                description="Learn while you chat"
                variant="secondary"
              />
              <ActionLink
                href="/ai/quiz"
                label="Take another Quiz"
                description="Challenge yourself"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatRowProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  total: number;
  color: 'green' | 'red' | 'gray';
};

function StatRow(props: StatRowProps) {
  const { icon, label, value, total, color } = props;
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'rounded-md p-1.5',
            color === 'green' && 'bg-green-100 text-green-600',
            color === 'red' && 'bg-red-100 text-red-600',
            color === 'gray' && 'bg-gray-100 text-gray-600',
          )}
        >
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{value}</span>
          <span>({percentage}%)</span>
        </div>
        <div className="h-2 w-16 rounded-full bg-gray-200">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-500',
              color === 'green' && 'bg-green-500',
              color === 'red' && 'bg-red-500',
              color === 'gray' && 'bg-gray-400',
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

type ActionButtonProps = {
  variant: 'primary' | 'secondary';
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
};

function ActionButton(props: ActionButtonProps) {
  const { variant, icon, onClick, children } = props;

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-all duration-200 md:px-6',
        variant === 'primary' && 'bg-black text-white hover:bg-gray-800',
        variant === 'secondary' &&
          'border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50',
      )}
    >
      {icon}
      {children}
    </button>
  );
}

type ActionLinkProps = {
  href: string;
  label: string;
  description: string;
  variant: 'primary' | 'secondary';
};

function ActionLink(props: ActionLinkProps) {
  const { href, label, description, variant } = props;

  return (
    <a
      href={href}
      className={cn(
        'block rounded-lg border p-3 text-left transition-all duration-200',
        variant === 'primary' &&
          'border-black bg-black text-white hover:bg-gray-800',
        variant === 'secondary' &&
          'border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:bg-gray-50',
      )}
    >
      <div className="text-sm font-medium">{label}</div>
      <div
        className={cn(
          'text-xs',
          variant === 'primary' && 'text-gray-300',
          variant === 'secondary' && 'text-gray-600',
        )}
      >
        {description}
      </div>
    </a>
  );
}

// Keep the old components for backward compatibility
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
        'flex flex-col items-center rounded-xl bg-gray-50 px-4 py-6 text-gray-700 transition-all duration-200',
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
        'flex flex-grow items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800',
        className,
      )}
    >
      {icon}
      {label}
    </button>
  );
}
