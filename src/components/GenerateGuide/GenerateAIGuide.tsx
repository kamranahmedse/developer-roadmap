import { useEffect, useRef, useState } from 'react';
import { generateGuide } from '../../helper/generate-ai-guide';
import { getCourseFineTuneData } from '../../lib/ai';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { AIGuideContent } from './AIGuideContent';
import { queryClient } from '../../stores/query-client';
import { getAiGuideOptions } from '../../queries/ai-guide';
import { LoadingChip } from '../LoadingChip';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { getQuestionAnswerChatMessages } from '../../lib/ai-questions';
import { useIsPaidUser } from '../../queries/billing';
import { useQuery } from '@tanstack/react-query';
import { aiLimitOptions } from '../../queries/ai-course';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type GenerateAIGuideProps = {
  onGuideSlugChange?: (guideSlug: string) => void;
};

export function GenerateAIGuide(props: GenerateAIGuideProps) {
  const { onGuideSlugChange } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [content, setContent] = useState('');
  const [html, setHtml] = useState('');
  const htmlRef = useRef<string>('');

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

    if (!isPaidUser && limits && limits?.guide?.used >= limits?.guide?.limit) {
      setError('You have reached the limit for this format');
      setIsLoading(false);
      setShowUpgradeModal(true);
      return;
    }

    const params = getUrlParams();
    const paramsTerm = params?.term;
    const paramsSrc = params?.src || 'search';
    if (!paramsTerm) {
      return;
    }

    let questionAndAnswers: QuestionAnswerChatMessage[] = [];
    const sessionId = params?.id;
    if (sessionId) {
      questionAndAnswers = getQuestionAnswerChatMessages(sessionId);
    }

    handleGenerateDocument({
      term: paramsTerm,
      src: paramsSrc,
      questionAndAnswers,
    });
  }, [isLimitDataLoading, isPaidUser]);

  const handleGenerateDocument = async (options: {
    term: string;
    isForce?: boolean;
    prompt?: string;
    src?: string;
    questionAndAnswers?: QuestionAnswerChatMessage[];
  }) => {
    const { term, isForce, prompt, src, questionAndAnswers } = options;

    if (!isLoggedIn()) {
      window.location.href = '/ai';
      return;
    }

    await generateGuide({
      term,
      onDetailsChange: (details) => {
        const { guideId, guideSlug, creatorId, title } = details;

        const guideData = {
          _id: guideId,
          userId: creatorId,
          title,
          html: htmlRef.current,
          keyword: term,
          content,
          tokens: {
            prompt: 0,
            completion: 0,
            total: 0,
          },
          relatedTopics: [],
          deepDiveTopics: [],
          questions: [],
          questionAndAnswers,
          viewCount: 0,
          lastVisitedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        queryClient.setQueryData(
          getAiGuideOptions(guideSlug).queryKey,
          guideData,
        );

        onGuideSlugChange?.(guideSlug);
        window.history.replaceState(null, '', `/ai/guide/${guideSlug}`);
      },
      onLoadingChange: setIsLoading,
      onError: setError,
      isForce,
      prompt,
      src,
      questionAndAnswers,
      onHtmlChange: (html) => {
        htmlRef.current = html;
        setHtml(html);
      },
      onStreamingChange: setIsStreaming,
    });
  };

  const upgradeModal = showUpgradeModal ? (
    <UpgradeAccountModal
      onClose={() => {
        window.location.href = '/ai';
      }}
    />
  ) : null;

  if (error) {
    return (
      <>
        {upgradeModal}
        <div className="text-red-500">{error}</div>
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
      <AIGuideContent html={html} />
    </>
  );
}
