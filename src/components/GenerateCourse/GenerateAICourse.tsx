import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { type AiCourse } from '../../lib/ai';
import { AICourseContent } from './AICourseContent';
import { generateCourse } from '../../helper/generate-ai-course';
import { useQuery } from '@tanstack/react-query';
import { getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';

type GenerateAICourseProps = {};

export function GenerateAICourse(props: GenerateAICourseProps) {
  const [term, setTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
    if (!paramsTerm || !paramsDifficulty) {
      return;
    }

    setTerm(paramsTerm);
    setDifficulty(paramsDifficulty);
    handleGenerateCourse({ term: paramsTerm, difficulty: paramsDifficulty });
  }, [term, difficulty]);

  const handleGenerateCourse = async (options: {
    term: string;
    difficulty: string;
    isForce?: boolean;
    prompt?: string;
  }) => {
    const { term, difficulty, isForce, prompt } = options;

    if (!isLoggedIn()) {
      window.location.href = '/ai-tutor';
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
      isForce,
      prompt,
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
