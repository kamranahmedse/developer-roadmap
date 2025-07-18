import { useEffect, useRef, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { LoadingChip } from '../LoadingChip';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { getQuestionAnswerChatMessages } from '../../lib/ai-questions';
import {
  aiQuizOptions,
  generateAIQuiz,
  type QuizQuestion,
} from '../../queries/ai-quiz';
import { queryClient } from '../../stores/query-client';
import { AIQuizContent } from './AIQuizContent';
import { AlertCircleIcon } from 'lucide-react';
import { useIsPaidUser } from '../../queries/billing';
import { useQuery } from '@tanstack/react-query';
import { aiLimitOptions } from '../../queries/ai-course';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type GenerateAIQuizProps = {
  onQuizSlugChange?: (quizSlug: string) => void;
};

export function GenerateAIQuiz(props: GenerateAIQuizProps) {
  const { onQuizSlugChange } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const questionsRef = useRef<QuizQuestion[]>([]);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();
  const { data: limits, isLoading: isLimitLoading } = useQuery(
    aiLimitOptions(),
    queryClient,
  );

  const isLimitDataLoading = isPaidUserLoading || isLimitLoading;

  useEffect(() => {
    if (isLimitDataLoading) {
      return;
    }

    if (!isPaidUser && limits && limits?.quiz?.used >= limits?.quiz?.limit) {
      setError('You have reached the limit for this format');
      setIsLoading(false);
      setShowUpgradeModal(true);
      return;
    }

    const params = getUrlParams();
    const paramsTerm = params?.term;
    const paramsFormat = params?.format;
    const paramsSrc = params?.src || 'search';
    if (!paramsTerm) {
      return;
    }

    let questionAndAnswers: QuestionAnswerChatMessage[] = [];
    const sessionId = params?.id;
    if (sessionId) {
      questionAndAnswers = getQuestionAnswerChatMessages(sessionId);
    }

    handleGenerateQuiz({
      term: paramsTerm,
      format: paramsFormat,
      src: paramsSrc,
      questionAndAnswers,
    });
  }, [isLimitDataLoading, isPaidUser]);

  const handleGenerateQuiz = async (options: {
    term: string;
    format: string;
    isForce?: boolean;
    prompt?: string;
    src?: string;
    questionAndAnswers?: QuestionAnswerChatMessage[];
  }) => {
    const { term, format, isForce, prompt, src, questionAndAnswers } = options;

    if (!isLoggedIn()) {
      window.location.href = '/ai';
      return;
    }

    await generateAIQuiz({
      term,
      format,
      isForce,
      prompt,
      questionAndAnswers,
      onDetailsChange: (details) => {
        const { quizId, quizSlug, title, userId } = details;
        const aiQuizData = {
          _id: quizId,
          userId,
          title,
          slug: quizSlug,
          keyword: term,
          format,
          content: '',
          questionAndAnswers: questionAndAnswers || [],
          questions: questionsRef.current || [],
          viewCount: 0,
          lastVisitedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        queryClient.setQueryData(aiQuizOptions(quizSlug).queryKey, aiQuizData);
        onQuizSlugChange?.(quizSlug);
        window.history.replaceState(null, '', `/ai/quiz/${quizSlug}`);
      },
      onLoadingChange: setIsLoading,
      onError: setError,
      onStreamingChange: setIsStreaming,
      onQuestionsChange: (questions) => {
        setQuestions(questions);
        questionsRef.current = questions;
      },
    });
  };

  const upgradeModal = showUpgradeModal ? (
    <UpgradeAccountModal
      onClose={() => {
        window.location.href = '/ai/quiz';
      }}
    />
  ) : null;

  if (error) {
    return (
      <>
        {upgradeModal}
        <div className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center bg-white">
          <div className="flex flex-col items-center justify-center gap-2">
            <AlertCircleIcon className="size-10 text-gray-500" />
            <p className="text-center">{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {upgradeModal}
        <div className="flex h-full w-full items-center justify-center">
          <LoadingChip message="Please wait..." />
        </div>
      </>
    );
  }

  return (
    <>
      {upgradeModal}
      <AIQuizContent isStreaming={isStreaming} questions={questions} />
    </>
  );
}
