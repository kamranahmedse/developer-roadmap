import { useQuery } from '@tanstack/react-query';
import {
  getAiCourseOptions,
  getAiCourseProgressOptions,
} from '../../queries/ai-course';
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
  const [isRegenerating, setIsRegenerating] = useState(false);

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

  const handleRegenerateCourse = async (prompt?: string) => {
    if (!aiCourse) {
      return;
    }

    await generateCourse({
      term: aiCourse.keyword,
      difficulty: aiCourse.difficulty,
      slug: courseSlug,
      prompt,
      onCourseChange: (course, rawData) => {
        queryClient.setQueryData(
          getAiCourseOptions({ aiCourseSlug: courseSlug }).queryKey,
          {
            ...aiCourse,
            title: course.title,
            difficulty: course.difficulty,
            data: rawData,
          },
        );
      },
      onLoadingChange: (isNewLoading) => {
        setIsRegenerating(isNewLoading);
        if (!isNewLoading) {
          queryClient.invalidateQueries({
            queryKey: getAiCourseProgressOptions({
              aiCourseSlug: courseSlug,
            }).queryKey,
          });
        }
      },
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
      isLoading={isLoading || isRegenerating}
      courseSlug={courseSlug}
      error={error}
      onRegenerateOutline={handleRegenerateCourse}
    />
  );
}
