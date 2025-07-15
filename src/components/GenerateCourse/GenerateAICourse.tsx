import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import type { AiCourse } from '../../lib/ai';
import { AICourseContent } from './AICourseContent';
import { generateCourse } from '../../helper/generate-ai-course';
import { useQuery } from '@tanstack/react-query';
import { getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { getQuestionAnswerChatMessages } from '../../lib/ai-questions';

type GenerateAICourseProps = {};

export function GenerateAICourse(props: GenerateAICourseProps) {
  const [term, setTerm] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [creatorId, setCreatorId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseSlug, setCourseSlug] = useState('');
  const [course, setCourse] = useState<AiCourse>({
    title: '',
    modules: [],
    done: [],
  });

  // Once the course is generated, we fetch the course from the database
  // so that we get the up-to-date course data and also so that we
  // can reload the changes (e.g. progress) etc using queryClient.setQueryData
  const { data: aiCourse } = useQuery(
    getAiCourseOptions({ aiCourseSlug: courseSlug }),
    queryClient,
  );

  useEffect(() => {
    if (aiCourse) {
      setCourse(aiCourse);
    }
  }, [aiCourse]);

  useEffect(() => {
    if (term) {
      return;
    }

    const params = getUrlParams();
    const paramsTerm = params?.term;
    const paramsSrc = params?.src || 'search';
    if (!paramsTerm) {
      return;
    }

    setTerm(paramsTerm);
    const sessionId = params?.id;
    let questionAndAnswers: QuestionAnswerChatMessage[] = [];
    if (sessionId) {
      questionAndAnswers = getQuestionAnswerChatMessages(sessionId);
    }

    handleGenerateCourse({
      term: paramsTerm,
      src: paramsSrc,
      questionAndAnswers,
    });
  }, [term]);

  const handleGenerateCourse = async (options: {
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

    await generateCourse({
      term,
      slug: courseSlug,
      onCourseIdChange: setCourseId,
      onCourseSlugChange: setCourseSlug,
      onCreatorIdChange: setCreatorId,
      onCourseChange: setCourse,
      onLoadingChange: setIsLoading,
      onError: setError,
      questionAndAnswers,
      isForce,
      prompt,
      src,
    });
  };

  return (
    <AICourseContent
      courseSlug={courseSlug}
      creatorId={creatorId}
      course={course}
      isLoading={isLoading}
      error={error}
      onRegenerateOutline={(prompt) => {
        handleGenerateCourse({
          term,
          isForce: true,
          prompt,
        });
      }}
    />
  );
}
