import {
  RotateCcw,
  BarChart3,
  Zap,
  Check,
  X,
  Minus,
  BookOpenIcon,
  FileTextIcon,
} from 'lucide-react';
import { cn } from '../../lib/classname';
import { getPercentage } from '../../lib/number';
import type {
  AIQuizResultFeedbackResponse,
  QuestionState,
} from './AIQuizContent';
import { QuizStateButton } from './AIQuizResultStrip';
import { CircularProgress } from './CircularProgress';
import { markdownToHtml } from '../../lib/markdown';
import { markdownClassName } from './AIMCQQuestion';

type AIQuizResultsProps = {
  questionStates: Record<number, QuestionState>;
  totalQuestions: number;
  onRetry: () => void;
  onNewQuiz: () => void;
  onReview?: (questionIndex: number) => void;

  isFeedbackLoading?: boolean;
  feedback?: AIQuizResultFeedbackResponse;
};

export function AIQuizResults(props: AIQuizResultsProps) {
  const {
    questionStates,
    totalQuestions,
    onRetry,
    onNewQuiz,
    onReview,
    isFeedbackLoading,
    feedback,
  } = props;

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

      {feedback && (
        <>
          <div className="rounded-xl border border-gray-200 bg-gray-50">
            {feedback.summary && (
              <div className="border-b border-gray-200 p-4 md:p-6">
                <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-900 md:text-base">
                  Summary of your quiz
                </h4>

                <div
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtml(feedback.summary, false),
                  }}
                  className={cn(
                    markdownClassName,
                    'prose-sm prose-p:text-sm prose-p:leading-relaxed prose-p:text-balance',
                  )}
                />
              </div>
            )}

            {feedback.guideTopics?.length && feedback.courseTopics?.length && (
              <>
                <div className="p-4 md:p-6">
                  <div className="mb-4">
                    <h4 className="mb-1 flex items-center text-sm font-semibold text-gray-900 md:text-base">
                      Suggested Resources
                    </h4>

                    <p className="text-sm leading-relaxed text-balance text-gray-600">
                      You can follow these courses or guides to improve your
                      understanding of the topic you missed in the quiz
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {feedback.courseTopics?.map((topic, index) => (
                      <ResourceCard
                        key={`course-${index}`}
                        icon={<BookOpenIcon className="h-5 w-5" />}
                        title={topic}
                        type="course"
                        href={`/ai/course?term=${encodeURIComponent(topic)}&format=course`}
                      />
                    ))}
                    {feedback.guideTopics?.map((topic, index) => (
                      <ResourceCard
                        key={`guide-${index}`}
                        icon={<FileTextIcon className="h-5 w-5" />}
                        title={topic}
                        type="guide"
                        href={`/ai/guide?term=${encodeURIComponent(topic)}&format=guide`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {isFeedbackLoading && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
              <span className="text-sm md:text-base">
                Generating personalized feedback...
              </span>
            </div>
          </div>
        </div>
      )}
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

type ResourceCardProps = {
  icon: React.ReactNode;
  title: string;
  type: 'guide' | 'course';
  href: string;
};

function ResourceCard(props: ResourceCardProps) {
  const { icon, title, type, href } = props;

  return (
    <a
      href={href}
      className="block rounded-lg border border-gray-200 bg-white p-2.5 text-left hover:border-gray-400 hover:bg-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="text-gray-500">{icon}</div>
        <div className="truncate text-sm text-gray-900">{title}</div>
      </div>
    </a>
  );
}
