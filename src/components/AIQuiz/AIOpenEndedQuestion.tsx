import type { QuizQuestion } from '../../queries/ai-quiz';
import { cn } from '../../lib/classname';
import { InfoIcon, Loader2Icon } from 'lucide-react';
import { markdownToHtml } from '../../lib/markdown';
import { QuestionExplanation, QuestionTitle } from './AIMCQQuestion';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { httpPost } from '../../lib/query-http';
import { queryClient } from '../../stores/query-client';
import type { QuestionState } from './AIQuizContent';

type VerifyQuizAnswerResponse = {
  isCorrect?: boolean;
  correctAnswer?: string;
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
    mutate: verifyAnswer,
    isPending: isVerifying,
    data: verifyAnswerData,
  } = useMutation(
    {
      mutationFn: (answer: string) => {
        return httpPost<VerifyQuizAnswerResponse>(
          `/v1-verify-quiz-answer/${quizSlug}`,
          {
            question: question.title,
            userAnswer,
          },
        );
      },
      onSuccess: (data) => {
        setCorrectAnswer(data.correctAnswer ?? '');
        onSubmit?.(data.isCorrect ? 'correct' : 'incorrect');
      },
    },
    queryClient,
  );

  const handleSubmit = () => {
    if (isSubmitted) {
      onNext?.();
      return;
    }

    verifyAnswer(userAnswer);
  };

  const canSubmit = userAnswer.trim().length > 0;

  const markdownClassName =
    'prose prose-lg prose-p:text-lg prose-p:font-normal prose-p:my-0 prose-pre:my-0 prose-p:prose-code:text-base! prose-p:prose-code:px-2 prose-p:prose-code:py-0.5 prose-p:prose-code:rounded-lg prose-p:prose-code:border prose-p:prose-code:border-black text-left text-black';

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
              status === 'correct' &&
              'border-green-500 bg-green-50',
            isSubmitted && status === 'incorrect' && 'border-red-500 bg-red-50',
          )}
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isSubmitted || isVerifying}
        />
      </div>

      {!isVerifying && correctAnswer && (
        <QuestionExplanation explanation={correctAnswer} />
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
