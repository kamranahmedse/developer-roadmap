import { useQuery } from '@tanstack/react-query';
import {
  listFeaturedAiCoursesOptions, type ListUserAiCoursesQuery
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useEffect, useState } from 'react';
import { getUrlParams, setUrlParams, deleteUrlParam } from '../../lib/browser';
import { AICourseCard } from '../GenerateCourse/AICourseCard';
import { Pagination } from '../Pagination/Pagination';
import { AILoadingState } from './AILoadingState';
import { AITutorTallMessage } from './AITutorTallMessage';
import { BookOpen } from 'lucide-react';
import { AITutorHeader } from './AITutorHeader';

type AIFeaturedCoursesListingProps = {};

export function AIFeaturedCoursesListing(props: AIFeaturedCoursesListingProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [pageState, setPageState] = useState<ListUserAiCoursesQuery>({
    perPage: '20',
    currPage: '1',
  });

  const { data: featuredAiCourses, isFetching: isFeaturedAiCoursesLoading } =
    useQuery(listFeaturedAiCoursesOptions(pageState), queryClient);

  useEffect(() => {
    setIsInitialLoading(false);
  }, [featuredAiCourses]);

  const courses = featuredAiCourses?.data ?? [];

  useEffect(() => {
    const queryParams = getUrlParams();

    setPageState({
      ...pageState,
      currPage: queryParams?.p || '1',
    });
  }, []);

  useEffect(() => {
    if (pageState?.currPage !== '1') {
      setUrlParams({
        p: pageState?.currPage || '1',
      });
    } else {
      deleteUrlParam('p');
    }
  }, [pageState]);

  if (isInitialLoading || isFeaturedAiCoursesLoading) {
    return (
      <AILoadingState
        title="Loading featured courses"
        subtitle="This may take a moment..."
      />
    );
  }

  if (courses.length === 0) {
    return (
      <AITutorTallMessage
        title="No featured courses"
        subtitle="There are no featured courses available at the moment."
        icon={BookOpen}
        buttonText="Browse all courses"
        onButtonClick={() => {
          window.location.href = '/ai';
        }}
      />
    );
  }

  return (
    <div className="w-full">
      <AITutorHeader title="Featured Courses" />

      {!isFeaturedAiCoursesLoading && courses && courses.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {courses.map((course) => (
              <AICourseCard
                key={course._id}
                course={course}
                showActions={false}
                showProgress={false}
              />
            ))}
          </div>

          <Pagination
            totalCount={featuredAiCourses?.totalCount || 0}
            totalPages={featuredAiCourses?.totalPages || 0}
            currPage={Number(featuredAiCourses?.currPage || 1)}
            perPage={Number(featuredAiCourses?.perPage || 10)}
            onPageChange={(page) => {
              setPageState({ ...pageState, currPage: String(page) });
            }}
            className="rounded-lg border border-gray-200 bg-white p-4"
          />
        </div>
      )}

      {!isFeaturedAiCoursesLoading &&
        (featuredAiCourses?.data?.length || 0 > 0) &&
        courses.length === 0 && (
          <div className="flex min-h-[114px] items-center justify-center rounded-lg border border-gray-200 bg-white py-4">
            <p className="text-sm text-gray-600">
              No courses match your search.
            </p>
          </div>
        )}
    </div>
  );
}
