import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { getCourseFineTuneData, type AiCourse } from '../../lib/ai';
import { AICourseContent } from './AICourseContent';
import { generateCourse } from '../../helper/generate-ai-course';
import { useQuery } from '@tanstack/react-query';
import { getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useAuth } from '../../hooks/use-auth';

type GenerateAICourseProps = {};

export function GenerateAICourse(props: GenerateAICourseProps) {
  const [term, setTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [goal, setGoal] = useState('');
  const [about, setAbout] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = useAuth();

  const [courseId, setCourseId] = useState('');
  const [courseSlug, setCourseSlug] = useState('');
  const [course, setCourse] = useState<AiCourse>({
    title: '',
    modules: [],
    difficulty: '',
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

    handleGenerateCourse({
      term: paramsTerm,
      difficulty: paramsDifficulty,
      instructions: paramsCustomInstructions,
      goal: paramsGoal,
      about: paramsAbout,
      src: paramsSrc,
    });
  }, [term, difficulty]);

  const handleGenerateCourse = async (options: {
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

    await generateCourse({
      term,
      difficulty,
      slug: courseSlug,
      onCourseIdChange: setCourseId,
      onCourseSlugChange: setCourseSlug,
      onCourseChange: setCourse,
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
      const { courseId, courseSlug, term, difficulty } = e.state || {};
      if (!courseId || !courseSlug) {
        window.location.reload();
        return;
      }

      setCourseId(courseId);
      setCourseSlug(courseSlug);
      setTerm(term);
      setDifficulty(difficulty);

      setIsLoading(true);
      handleGenerateCourse({ term, difficulty }).finally(() => {
        setIsLoading(false);
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <AICourseContent
      courseSlug={courseSlug}
      creatorId={currentUser?.id}
      course={course}
      isLoading={isLoading}
      error={error}
      onRegenerateOutline={(prompt) => {
        handleGenerateCourse({
          term,
          difficulty,
          isForce: true,
          prompt,
        });
      }}
    />
  );
}
