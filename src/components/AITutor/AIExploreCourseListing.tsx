import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AICourseCard } from '../GenerateCourse/AICourseCard';
import { AITutorHeader } from './AITutorHeader';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import {
  listExploreAiCoursesOptions,
  type ListExploreAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { Pagination } from '../Pagination/Pagination';
import { AICourseSearch } from '../GenerateCourse/AICourseSearch';
import { AITutorTallMessage } from './AITutorTallMessage';
import { BookOpen, Loader2 } from 'lucide-react';
import { humanizeNumber } from '../../lib/number';

export function AIExploreCourseListing() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListExploreAiCoursesQuery>({
    perPage: '42',
    currPage: '1',
    query: '',
  });

  const {
    data: exploreAiCourses,
    isFetching: isExploreAiCoursesLoading,
    isRefetching: isExploreAiCoursesRefetching,
  } = useQuery(listExploreAiCoursesOptions(pageState), queryClient);

  useEffect(() => {
    setIsInitialLoading(false);
  }, [exploreAiCourses]);

  const courses = exploreAiCourses?.data ?? [];
  const isAnyLoading = isExploreAiCoursesLoading || isInitialLoading;

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
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}

      <AITutorHeader
        title="Explore Courses"
        subtitle="Explore the AI courses created by community"
        onUpgradeClick={() => setShowUpgradePopup(true)}
      />
      <AICourseSearch
        value={pageState?.query || ''}
        onChange={(value) => {
          setPageState({
            ...pageState,
            query: value,
            currPage: '1',
          });
        }}
        disabled={isAnyLoading}
      />

      {isAnyLoading && (
        <p className="mb-4 flex flex-row items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading courses...
        </p>
      )}

      {!isAnyLoading && (
        <>
          <p className="mb-4 text-sm text-gray-500">
            Community has generated{' '}
            {humanizeNumber(exploreAiCourses?.totalCount || 0)} courses
          </p>

          {courses && courses.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <AICourseCard
                    key={course._id}
                    course={course}
                    showActions={false}
                    showProgress={false}
                    variant="column"
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

          {courses.length === 0 && (
            <AITutorTallMessage
              title="No courses found"
              subtitle="Try a different search or check back later."
              icon={BookOpen}
              buttonText="Create your first course"
              onButtonClick={() => {
                window.location.href = '/ai';
              }}
            />
          )}
        </>
      )}
    </>
  );
}
