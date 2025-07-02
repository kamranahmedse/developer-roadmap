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
      onSubmit(data.status);
    },
  });

  const handleSubmit = async () => {
    if (isSubmitted) {
      onNext?.();
      return;
    }

    await verifyAnswer();
  };

  const canSubmit = userAnswer.trim().length > 0;
  const isVerifying =
    verifyStatus === 'loading' || verifyStatus === 'streaming';
  const feedback = verificationData?.feedback || correctAnswer;
  const feedbackStatus = verificationData?.status || status;

  return (
    <div>
      <QuestionTitle title={questionText} />

      <div className="mt-6">
        <textarea
          className={cn(
            'min-h-[200px] w-full resize-none rounded-xl border border-gray-200 p-4 text-lg',
            'focus:border-gray-400 focus:ring-0 focus:outline-none',
            isSubmitted && 'bg-gray-50',
            isSubmitted &&
              feedbackStatus === 'correct' &&
              'border-green-500 bg-green-50',
            isSubmitted &&
              feedbackStatus === 'incorrect' &&
              'border-red-500 bg-red-50',
            isSubmitted &&
              feedbackStatus === 'can_be_improved' &&
              'border-yellow-500 bg-yellow-50',
          )}
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isSubmitted || isVerifying}
        />
      </div>

      {feedback && (
        <QuestionExplanation
          title={
            feedbackStatus === 'can_be_improved'
              ? 'Can be improved'
              : 'Feedback'
          }
          explanation={feedback}
        />
      )}

      <button
        className={cn(
          'mt-4 flex h-10 min-w-[142px] items-center justify-center rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-900 disabled:opacity-70',
        )}
        onClick={handleSubmit}
        disabled={!canSubmit || isVerifying}
      >
        {isVerifying ? (
          <Loader2Icon className="size-4 animate-spin stroke-[2.5]" />
        ) : isSubmitted ? (
          'Next Question'
        ) : (
          'Submit Answer'
        )}
      </button>
    </div>
  );
}
