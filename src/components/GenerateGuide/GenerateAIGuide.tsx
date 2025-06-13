import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { generateDocument } from '../../helper/generate-ai-document';
import { getCourseFineTuneData } from '../../lib/ai';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { AIDocumentContent } from './AIGuideContent';

type GenerateAIDocumentProps = {};

export function GenerateAIDocument(props: GenerateAIDocumentProps) {
  const [term, setTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [goal, setGoal] = useState('');
  const [about, setAbout] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [creatorId, setCreatorId] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [documentSlug, setDocumentSlug] = useState('');
  const [document, setDocument] = useState<string>('');

  // Once the course is generated, we fetch the course from the database
  // so that we get the up-to-date course data and also so that we
  // can reload the changes (e.g. progress) etc using queryClient.setQueryData
  const { data: aiCourse } = useQuery(
    getAiCourseOptions({ aiCourseSlug: documentSlug }),
    queryClient,
  );

  useEffect(() => {
    if (term || difficulty) {
      return;
    }

    const params = getUrlParams();
    const paramsTerm = params?.term;
    const paramsDifficulty = params?.difficulty;
    const paramsSrc = params?.src || 'search';
    if (!paramsTerm || !paramsDifficulty) {
      return;
    }

    setTerm(paramsTerm);
    setDifficulty(paramsDifficulty);

    const sessionId = params?.id;
    setSessionId(sessionId);

    let paramsGoal = '';
    let paramsAbout = '';
    let paramsCustomInstructions = '';

    if (sessionId) {
      const fineTuneData = getCourseFineTuneData(sessionId);
      if (fineTuneData) {
        paramsGoal = fineTuneData.goal;
        paramsAbout = fineTuneData.about;
        paramsCustomInstructions = fineTuneData.customInstructions;

        setGoal(paramsGoal);
        setAbout(paramsAbout);
        setCustomInstructions(paramsCustomInstructions);
      }
    }

    handleGenerateDocument({
      term: paramsTerm,
      difficulty: paramsDifficulty,
      instructions: paramsCustomInstructions,
      goal: paramsGoal,
      about: paramsAbout,
      src: paramsSrc,
    });
  }, [term, difficulty]);

  const handleGenerateDocument = async (options: {
    term: string;
    difficulty: string;
    instructions?: string;
    goal?: string;
    about?: string;
    isForce?: boolean;
    prompt?: string;
    src?: string;
  }) => {
    const {
      term,
      difficulty,
      isForce,
      prompt,
      instructions,
      goal,
      about,
      src,
    } = options;

    if (!isLoggedIn()) {
      window.location.href = '/ai';
      return;
    }

    await generateDocument({
      term,
      difficulty,
      slug: documentSlug,
      onDocumentIdChange: setDocumentId,
      onDocumentSlugChange: setDocumentSlug,
      onCreatorIdChange: setCreatorId,
      onDocumentChange: setDocument,
      onLoadingChange: setIsLoading,
      onError: setError,
      instructions,
      goal,
      about,
      isForce,
      prompt,
      src,
    });
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const { documentId, documentSlug, term, difficulty } = e.state || {};
      if (!documentId || !documentSlug) {
        window.location.reload();
        return;
      }

      setDocumentId(documentId);
      setDocumentSlug(documentSlug);
      setTerm(term);
      setDifficulty(difficulty);

      setIsLoading(true);
      handleGenerateDocument({ term, difficulty }).finally(() => {
        setIsLoading(false);
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <AIDocumentContent document={document} />;
}
