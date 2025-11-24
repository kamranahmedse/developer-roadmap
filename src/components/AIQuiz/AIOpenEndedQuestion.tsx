import { type QuizQuestion } from '../../queries/ai-quiz';
import { cn } from '../../lib/classname';
import { Loader2Icon } from 'lucide-react';
import { QuestionExplanation, QuestionTitle } from './AIMCQQuestion';
import type { QuestionState } from './AIQuizContent';
import { useVerifyAnswer } from '../../hooks/use-verify-answer';

export type VerifyQuizAnswerResponse = {
  status: 'correct' | 'incorrect' | 'can_be_improved';
  feedback: string;
};

type AIOpenEndedQuestionProps = {
  quizSlug: string;
  question: QuizQuestion;
  questionState: QuestionState;

  onSubmit: (status: QuestionState['status']) => void;
  onNext: () => void;

  setUserAnswer: (answer: string) => void;
  setCorrectAnswer: (answer: string) => void;

  isLastQuestion: boolean;
  onComplete: () => void;

  onSkip: () => void;
};

export function AIOpenEndedQuestion(props: AIOpenEndedQuestionProps) {
  const {
    quizSlug,
    question,
    questionState,
    onSubmit,
    onNext,
    setUserAnswer,
    setCorrectAnswer,
    isLastQuestion,
    onComplete,
    onSkip,
  } = props;
  const { title: questionText } = question;

  const {
    isSubmitted,
    userAnswer = '',
    correctAnswer = '',
    status,
  } = questionState;

  const {
    verifyAnswer,
    data: verificationData,
    status: verifyStatus,
  } = useVerifyAnswer({
    quizSlug,
    question: questionText,
    userAnswer,
    onFinish: (data) => {
      if (!data || !data.status) {
        console.error('No data or status', data);
        onSubmit('incorrect');
        return;
      }

      setCorrectAnswer(data.feedback || '');
      onSubmit(data?.status || 'incorrect');
    },
  });

  const handleSubmit = async () => {
    if (isSubmittedAndNotSkipped) {
      if (isLastQuestion) {
        onComplete();
      } else {
        onNext();
      }
      return;
    }

    await verifyAnswer();
  };

  const canSubmit = userAnswer.trim().length > 0;
  const isVerifying =
    verifyStatus === 'loading' || verifyStatus === 'streaming';
  const feedback = verificationData?.feedback || correctAnswer;
  const feedbackStatus = verificationData?.status || status;

  const isSubmittedAndNotSkipped = isSubmitted && status !== 'skipped';

  return (
    <div>
      <QuestionTitle title={questionText} />

      <div className="mt-6">
        <textarea
          data-clarity-unmask="true"
          className={cn(
            'min-h-[200px] w-full resize-none rounded-xl border border-gray-200 p-4 text-lg',
            'focus:border-gray-400 focus:ring-0 focus:outline-none',
            isSubmittedAndNotSkipped && 'bg-gray-50',
            isSubmittedAndNotSkipped &&
              feedbackStatus === 'correct' &&
              'border-green-500 bg-green-50',
            isSubmittedAndNotSkipped &&
              feedbackStatus === 'incorrect' &&
              'border-red-500 bg-red-50',
            isSubmittedAndNotSkipped &&
              feedbackStatus === 'can_be_improved' &&
              'border-yellow-500 bg-yellow-50',
          )}
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isSubmittedAndNotSkipped || isVerifying}
        />
      </div>

      {feedback && (
        <QuestionExplanation explanation={feedback} status={feedbackStatus} />
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onSkip}
          disabled={isSubmitted}
          className="rounded-xl bg-gray-100 px-8 py-3 text-base font-medium text-gray-800 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Skip Question
        </button>

        <button
          className={cn(
            'rounded-xl bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50',
          )}
          onClick={handleSubmit}
          disabled={!canSubmit || isVerifying}
        >
          {isVerifying ? (
            <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
          ) : isSubmittedAndNotSkipped ? (
            isLastQuestion ? (
              'Finish Quiz'
            ) : (
              'Next Question'
            )
          ) : (
            'Verify Answer'
          )}
        </button>
      </div>
    </div>
  );
}
