import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { AICourseCard } from '../GenerateCourse/AICourseCard';
import { AILoadingState } from './AILoadingState';
import { AITutorHeader } from './AITutorHeader';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import {
  listExploreAiCoursesOptions,
  type ListExploreAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { Pagination } from '../Pagination/Pagination';

export function AIExploreCourseListing() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListExploreAiCoursesQuery>({
    perPage: '21',
    currPage: '1',
  });

  const { data: exploreAiCourses, isFetching: isExploreAiCoursesLoading } =
    useQuery(listExploreAiCoursesOptions(pageState), queryClient);

  useEffect(() => {
    setIsInitialLoading(false);
  }, [exploreAiCourses]);

  const courses = exploreAiCourses?.data ?? [];

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

  if (isInitialLoading || isExploreAiCoursesLoading) {
    return (
      <AILoadingState
        title="Loading courses"
        subtitle="This may take a moment..."
      />
    );
  }

  if (!exploreAiCourses?.data) {
    return (
      <div className="flex min-h-[152px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-4">
        <AlertCircle className="size-4 text-red-500" />
        <p className="text-sm font-medium text-red-600">
          Error loading courses.
        </p>
      </div>
    );
  }

  return (
    <>
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}

      <AITutorHeader
        title="Explore Courses"
        onUpgradeClick={() => setShowUpgradePopup(true)}
      />

      {courses && courses.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
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
            totalCount={exploreAiCourses?.totalCount || 0}
            totalPages={exploreAiCourses?.totalPages || 0}
            currPage={Number(exploreAiCourses?.currPage || 1)}
            perPage={Number(exploreAiCourses?.perPage || 21)}
            onPageChange={(page) => {
              setPageState({ ...pageState, currPage: String(page) });
            }}
            className="rounded-lg border border-gray-200 bg-white p-4"
          />
        </div>
      )}

      {!isExploreAiCoursesLoading && courses.length === 0 && (
        <div className="flex min-h-[114px] items-center justify-center rounded-lg border border-gray-200 bg-white py-4">
          <p className="text-sm text-gray-600">No courses found.</p>
        </div>
      )}
    </>
  );
}
