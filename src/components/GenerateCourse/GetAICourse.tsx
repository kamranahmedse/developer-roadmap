import { useQuery } from '@tanstack/react-query';
import { getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useEffect, useState } from 'react';
import { AICourseContent } from './AICourseContent';
import { generateAiCourseStructure } from '../../lib/ai';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type GetAICourseProps = {
  courseSlug: string;
};

export function GetAICourse(props: GetAICourseProps) {
  const { courseSlug } = props;

  const [isLoading, setIsLoading] = useState(true);
  const { data: aiCourse, error } = useQuery(
    {
      ...getAiCourseOptions({ aiCourseSlug: courseSlug }),
      select: (data) => {
        return {
          ...data,
          course: generateAiCourseStructure(data.data),
        };
      },
      enabled: !!courseSlug,
    },
    queryClient,
  );

  useEffect(() => {
    if (!aiCourse) {
      return;
    }

    setIsLoading(false);
  }, [aiCourse]);

  useEffect(() => {
    if (!error) {
      return;
    }

    setIsLoading(false);
  }, [error]);

  return (
    <>
      <UpgradeAccountModal />
      <AICourseContent
        course={{
          title: aiCourse?.title || '',
          modules: aiCourse?.course.modules || [],
          difficulty: aiCourse?.difficulty || 'Easy',
        }}
        isLoading={isLoading}
        courseSlug={courseSlug}
        error={error?.message}
      />
    </>
  );
}
