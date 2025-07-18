import { useEffect, useRef, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { queryClient } from '../../stores/query-client';
import { LoadingChip } from '../LoadingChip';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { getQuestionAnswerChatMessages } from '../../lib/ai-questions';
import { aiRoadmapOptions, generateAIRoadmap } from '../../queries/ai-roadmap';
import { AIRoadmapContent } from './AIRoadmapContent';
import { useIsPaidUser } from '../../queries/billing';
import { useQuery } from '@tanstack/react-query';
import { aiLimitOptions } from '../../queries/ai-course';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type GenerateAIRoadmapProps = {
  onRoadmapSlugChange?: (roadmapSlug: string) => void;
};

export function GenerateAIRoadmap(props: GenerateAIRoadmapProps) {
  const { onRoadmapSlugChange } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [svgHtml, setSvgHtml] = useState('');
  const [content, setContent] = useState('');
  const svgRef = useRef<string | null>(null);

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

    if (
      !isPaidUser &&
      limits &&
      limits?.roadmap?.used >= limits?.roadmap?.limit
    ) {
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

    await generateAIRoadmap({
      term,
      isForce,
      prompt,
      questionAndAnswers,
      onDetailsChange: (details) => {
        const { roadmapId, roadmapSlug, title, userId } = details;

        const aiRoadmapData = {
          _id: roadmapId,
          userId,
          title,
          term,
          data: content,
          questionAndAnswers,
          viewCount: 0,
          svgHtml: svgRef.current || '',
          lastVisitedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        queryClient.setQueryData(
          aiRoadmapOptions(roadmapSlug).queryKey,
          aiRoadmapData,
        );

        onRoadmapSlugChange?.(roadmapSlug);
        window.history.replaceState(null, '', `/ai-roadmaps/${roadmapSlug}`);
      },
      onLoadingChange: setIsLoading,
      onError: setError,
      onStreamingChange: setIsStreaming,
      onRoadmapSvgChange: (svg) => {
        const svgHtml = svg.outerHTML;
        svgRef.current = svgHtml;
        setSvgHtml(svgHtml);
      },
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

      <AIRoadmapContent isLoading={isLoading} svgHtml={svgHtml} />
    </>
  );
}
