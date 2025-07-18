import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import type { AiCourse } from '../../lib/ai';
import { AICourseContent } from './AICourseContent';
import { generateCourse } from '../../helper/generate-ai-course';
import { useQuery } from '@tanstack/react-query';
import { aiLimitOptions, getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { getQuestionAnswerChatMessages } from '../../lib/ai-questions';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type GenerateAICourseProps = {};

export function GenerateAICourse(props: GenerateAICourseProps) {
  const [term, setTerm] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [creatorId, setCreatorId] = useState('');
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

  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();
  const { data: limits, isLoading: isLimitLoading } = useQuery(
    aiLimitOptions(),
    queryClient,
  );

  useEffect(() => {
    if (!aiCourse) {
      return;
    }

    setCourse(aiCourse);
  }, [aiCourse]);

  const isLimitDataLoading = isPaidUserLoading || isLimitLoading;
  useEffect(() => {
    if (term || isLimitDataLoading) {
      return;
    }

    if (
      !isPaidUser &&
      limits &&
      limits?.course?.used >= limits?.course?.limit
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
  }, [term, isLimitDataLoading]);

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
    <>
      {showUpgradeModal && (
        <UpgradeAccountModal
          onClose={() => {
            window.location.href = '/ai';
          }}
        />
      )}

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
    </>
  );
}
