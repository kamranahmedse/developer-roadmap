import { useEffect, useRef, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { queryClient } from '../../stores/query-client';
import { LoadingChip } from '../LoadingChip';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { getQuestionAnswerChatMessages } from '../../lib/ai-questions';
import { aiRoadmapOptions, generateAIRoadmap } from '../../queries/ai-roadmap';
import { generateAIQuiz, type QuizQuestion } from '../../queries/ai-quiz';

type GenerateAIQuizProps = {
  onQuizSlugChange?: (quizSlug: string) => void;
};

export function GenerateAIQuiz(props: GenerateAIQuizProps) {
  const { onQuizSlugChange } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
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

    handleGenerateDocument({
      term: paramsTerm,
      format: paramsFormat,
      src: paramsSrc,
      questionAndAnswers,
    });
  }, []);

  const handleGenerateDocument = async (options: {
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
        // const { quizId, quizSlug, title, userId } = details;
        // const aiRoadmapData = {
        //   _id: quizId,
        //   userId,
        //   title,
        //   term,
        //   data: content,
        //   questionAndAnswers,
        //   viewCount: 0,
        //   svgHtml: svgRef.current || '',
        //   lastVisitedAt: new Date(),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // };
        // queryClient.setQueryData(
        //   aiRoadmapOptions(roadmapSlug).queryKey,
        //   aiRoadmapData,
        // );
        // onQuizSlugChange?.(roadmapSlug);
        // window.history.replaceState(null, '', `/ai-roadmaps/${roadmapSlug}`);
      },
      onLoadingChange: setIsLoading,
      onError: setError,
      onStreamingChange: setIsStreaming,
      onQuestionsChange: setQuestions,
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

  return <div>GenerateAIQuiz</div>;
}
