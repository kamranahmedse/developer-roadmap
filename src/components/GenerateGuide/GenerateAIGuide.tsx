import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { generateGuide } from '../../helper/generate-ai-guide';
import { getCourseFineTuneData } from '../../lib/ai';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { queryClient } from '../../stores/query-client';
import { AIGuideContent } from './AIGuideContent';
import { getAiGuideOptions } from '../../queries/ai-guide';

type GenerateAIGuideProps = {};

export function GenerateAIGuide(props: GenerateAIGuideProps) {
  const [term, setTerm] = useState('');
  const [depth, setDepth] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [documentSlug, setDocumentSlug] = useState('');
  const [html, setHtml] = useState('');

  // Once the course is generated, we fetch the course from the database
  // so that we get the up-to-date course data and also so that we
  // can reload the changes (e.g. progress) etc using queryClient.setQueryData
  const { data: aiGuide } = useQuery(
    getAiGuideOptions(documentSlug),
    queryClient,
  );

  useEffect(() => {
    if (term || depth) {
      return;
    }

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
  }, [term, depth]);

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
      slug: documentSlug,
      onGuideSlugChange: (slug) => {
        setDocumentSlug(slug);
        window.history.replaceState(null, '', `/ai/guide/${slug}`);
      },
      onLoadingChange: setIsLoading,
      onError: setError,
      instructions,
      goal,
      about,
      isForce,
      prompt,
      src,
      onHtmlChange: setHtml,
    });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <AIGuideContent html={html} />;
}
