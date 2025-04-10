import { useQuery } from '@tanstack/react-query';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import {
  listUserAiCoursesOptions,
  type ListUserAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { AILoadingState } from '../AITutor/AILoadingState';
import { AITutorHeader } from '../AITutor/AITutorHeader';
import { AITutorTallMessage } from '../AITutor/AITutorTallMessage';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { Pagination } from '../Pagination/Pagination';
import { AICourseCard } from './AICourseCard';
import { AICourseSearch } from './AICourseSearch';

export function UserCoursesList() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListUserAiCoursesQuery>({
    perPage: '21',
    currPage: '1',
    query: '',
  });

  const { data: userAiCourses, isFetching: isUserAiCoursesLoading } = useQuery(
    listUserAiCoursesOptions(pageState),
    queryClient,
  );

  useEffect(() => {
    setIsInitialLoading(false);
  }, [userAiCourses]);

  const courses = userAiCourses?.data ?? [];

  useEffect(() => {
    const queryParams = getUrlParams();

    setPageState({
      ...pageState,
      currPage: queryParams?.p || '1',
      query: queryParams?.q || '',
    });
  }, []);

  useEffect(() => {
    if (pageState?.currPage !== '1' || pageState?.query !== '') {
      setUrlParams({
        p: pageState?.currPage || '1',
        q: pageState?.query || '',
      });
    } else {
      deleteUrlParam('p');
      deleteUrlParam('q');
    }
  }, [pageState]);

  if (isInitialLoading || isUserAiCoursesLoading) {
    return (
      <AILoadingState
        title="Loading your courses"
        subtitle="This may take a moment..."
      />
    );
  }

  if (!isLoggedIn()) {
    return (
      <AITutorTallMessage
        title="Sign up or login"
        subtitle="Takes 2s to sign up and generate your first course."
        icon={BookOpen}
        buttonText="Sign up or Login"
        onButtonClick={() => {
          showLoginPopup();
        }}
      />
    );
  }

  if (courses.length === 0) {
    return (
      <AITutorTallMessage
        title="No courses found"
        subtitle="You haven't generated any courses yet."
        icon={BookOpen}
        buttonText="Create your first course"
        onButtonClick={() => {
          window.location.href = '/ai';
        }}
      />
    );
  }

  return (
    <>
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}

      <AITutorHeader
        title="Your Courses"
        onUpgradeClick={() => setShowUpgradePopup(true)}
      >
        <AICourseSearch
          value={pageState?.query || ''}
          onChange={(value) => {
            setPageState({
              ...pageState,
              query: value,
              currPage: '1',
            });
          }}
        />
      </AITutorHeader>

      {!isUserAiCoursesLoading && courses && courses.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {courses.map((course) => (
              <AICourseCard key={course._id} course={course} />
            ))}
          </div>

          <Pagination
            totalCount={userAiCourses?.totalCount || 0}
            totalPages={userAiCourses?.totalPages || 0}
            currPage={Number(userAiCourses?.currPage || 1)}
            perPage={Number(userAiCourses?.perPage || 10)}
            onPageChange={(page) => {
              setPageState({ ...pageState, currPage: String(page) });
            }}
            className="rounded-lg border border-gray-200 bg-white p-4"
          />
        </div>
      )}

      {!isUserAiCoursesLoading &&
        (userAiCourses?.data?.length || 0 > 0) &&
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
