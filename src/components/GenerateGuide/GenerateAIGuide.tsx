import { useEffect, useRef, useState } from 'react';
import { generateGuide } from '../../helper/generate-ai-guide';
import { getCourseFineTuneData } from '../../lib/ai';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { AIGuideContent } from './AIGuideContent';
import { queryClient } from '../../stores/query-client';
import { getAiGuideOptions } from '../../queries/ai-guide';
import { LoadingChip } from '../LoadingChip';

type GenerateAIGuideProps = {
  onGuideSlugChange?: (guideSlug: string) => void;
};

export function GenerateAIGuide(props: GenerateAIGuideProps) {
  const { onGuideSlugChange } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');

  const [content, setContent] = useState('');
  const [html, setHtml] = useState('');
  const htmlRef = useRef<string>('');

  useEffect(() => {
    const params = getUrlParams();
    const paramsTerm = params?.term;
    const paramsDepth = params?.depth;
    const paramsSrc = params?.src || 'search';
    if (!paramsTerm || !paramsDepth) {
      return;
    }

    let paramsGoal = '';
    let paramsAbout = '';
    let paramsCustomInstructions = '';

    const sessionId = params?.id;
    if (sessionId) {
      const fineTuneData = getCourseFineTuneData(sessionId);
      if (fineTuneData) {
        paramsGoal = fineTuneData.goal;
        paramsAbout = fineTuneData.about;
        paramsCustomInstructions = fineTuneData.customInstructions;
      }
    }

    handleGenerateDocument({
      term: paramsTerm,
      depth: paramsDepth,
      instructions: paramsCustomInstructions,
      goal: paramsGoal,
      about: paramsAbout,
      src: paramsSrc,
    });
  }, []);

  const handleGenerateDocument = async (options: {
    term: string;
    depth: string;
    instructions?: string;
    goal?: string;
    about?: string;
    isForce?: boolean;
    prompt?: string;
    src?: string;
  }) => {
    const { term, depth, isForce, prompt, instructions, goal, about, src } =
      options;

    if (!isLoggedIn()) {
      window.location.href = '/ai';
      return;
    }

    await generateGuide({
      term,
      depth,
      onDetailsChange: (details) => {
        const { guideId, guideSlug, creatorId, title } = details;

        const guideData = {
          _id: guideId,
          userId: creatorId,
          title,
          html: htmlRef.current,
          keyword: term,
          depth,
          content,
          tokens: {
            prompt: 0,
            completion: 0,
            total: 0,
          },
          relatedTopics: [],
          deepDiveTopics: [],
          questions: [],
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
      instructions,
      goal,
      about,
      isForce,
      prompt,
      src,
      onHtmlChange: (html) => {
        htmlRef.current = html;
        setHtml(html);
      },
      onStreamingChange: setIsStreaming,
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

  return <AIGuideContent html={html} />;
}
