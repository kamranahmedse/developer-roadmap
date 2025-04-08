import { useQuery } from '@tanstack/react-query';
import {
  listFeaturedAiCoursesOptions,
  listUserAiCoursesOptions,
  type ListUserAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getUrlParams, setUrlParams, deleteUrlParam } from '../../lib/browser';
import { AICourseCard } from '../GenerateCourse/AICourseCard';
import { Pagination } from '../Pagination/Pagination';

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

  return (
    <>
      <div className="mb-3 flex min-h-[35px] items-center justify-between max-sm:mb-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Stuff Picks</h2>
        </div>
      </div>

      {(isFeaturedAiCoursesLoading || isInitialLoading) && (
        <div className="flex min-h-[152px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-4">
          <Loader2
            className="size-4 animate-spin text-gray-400"
            strokeWidth={2.5}
          />
          <p className="text-sm font-medium text-gray-600">Loading...</p>
        </div>
      )}

      {!isFeaturedAiCoursesLoading && courses && courses.length > 0 && (
        <div className="flex flex-col gap-2">
          {courses.map((course) => (
            <AICourseCard
              key={course._id}
              course={course}
              showActions={false}
              showProgress={false}
            />
          ))}

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
    </>
  );
}
