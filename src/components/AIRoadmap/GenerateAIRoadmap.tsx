import { useEffect, useRef, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { queryClient } from '../../stores/query-client';
import { LoadingChip } from '../LoadingChip';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { getQuestionAnswerChatMessages } from '../../lib/ai-questions';
import { aiRoadmapOptions, generateAIRoadmap } from '../../queries/ai-roadmap';
import { replaceChildren } from '../../lib/dom';

type GenerateAIRoadmapProps = {
  onRoadmapSlugChange?: (roadmapSlug: string) => void;
};

export function GenerateAIRoadmap(props: GenerateAIRoadmapProps) {
  const { onRoadmapSlugChange } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');

  const [content, setContent] = useState('');
  const svgRef = useRef<SVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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
          svg: svgRef.current,
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
        svgRef.current = svg;
        if (containerRef.current) {
          replaceChildren(containerRef.current, svg);
        }
      },
    });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingChip message="Please wait..." />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="roadmap-container"
      className="relative min-h-[400px] px-4 py-5 [&>svg]:mx-auto [&>svg]:max-w-[1300px]"
    />
  );
}
