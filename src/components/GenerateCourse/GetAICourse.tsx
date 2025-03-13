import { useQuery } from '@tanstack/react-query';
import { getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useEffect, useState } from 'react';
import { AICourseContent } from './AICourseContent';
import { generateAiCourseStructure } from '../../lib/ai';
import { isLoggedIn } from '../../lib/jwt';
import { generateCourse } from '../../helper/generate-ai-course';

type GetAICourseProps = {
  courseSlug: string;
};

export function GetAICourse(props: GetAICourseProps) {
  const { courseSlug } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: aiCourse, error: queryError } = useQuery(
    {
      ...getAiCourseOptions({ aiCourseSlug: courseSlug }),
      select: (data) => {
        return {
          ...data,
          course: generateAiCourseStructure(data.data),
        };
      },
      enabled: !!courseSlug && !!isLoggedIn(),
    },
    queryClient,
  );

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = '/ai-tutor';
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!aiCourse) {
      return;
    }

    setIsLoading(false);
  }, [aiCourse]);

  useEffect(() => {
    if (!queryError) {
      return;
    }

    setIsLoading(false);
    setError(queryError.message);
  }, [queryError]);

  const handleRegenerateCourse = async () => {
    if (!aiCourse) {
      return;
    }

    await generateCourse({
      term: aiCourse.keyword,
      difficulty: aiCourse.difficulty,
      onLoadingChange: setIsLoading,
      onError: setError,
      isForce: true,
    });
  };

  return (
    <AICourseContent
      course={{
        title: aiCourse?.title || '',
        modules: aiCourse?.course.modules || [],
        difficulty: aiCourse?.difficulty || 'Easy',
      }}
      isLoading={isLoading}
      courseSlug={courseSlug}
      error={error}
      onRegenerateOutline={handleRegenerateCourse}
    />
  );
}
