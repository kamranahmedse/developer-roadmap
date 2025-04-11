import { useQuery } from '@tanstack/react-query';
import {
  listFeaturedAiCoursesOptions,
  type ListUserAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useEffect, useState } from 'react';
import { getUrlParams, setUrlParams, deleteUrlParam } from '../../lib/browser';
import { AICourseCard } from '../GenerateCourse/AICourseCard';
import { Pagination } from '../Pagination/Pagination';
import { AITutorHeader } from './AITutorHeader';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { AITutorTallMessage } from './AITutorTallMessage';
import { BookOpen } from 'lucide-react';
import { AILoadingState } from './AILoadingState';

export function AIFeaturedCoursesListing() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListUserAiCoursesQuery>({
    perPage: '21',
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
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}

      <AITutorHeader
        title="Featured Courses"
        onUpgradeClick={() => setShowUpgradePopup(true)}
      />

      {(isFeaturedAiCoursesLoading || isInitialLoading) && (
        <AILoadingState
          title="Loading featured courses"
          subtitle="This may take a moment..."
        />
      )}

      {!isFeaturedAiCoursesLoading &&
        !isInitialLoading &&
        courses.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
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
        !isInitialLoading &&
        courses.length === 0 && (
          <AITutorTallMessage
            title="No featured courses"
            subtitle="There are no featured courses available at the moment."
            icon={BookOpen}
            buttonText="Browse all courses"
            onButtonClick={() => {
              window.location.href = '/ai';
            }}
          />
        )}
    </>
  );
}
