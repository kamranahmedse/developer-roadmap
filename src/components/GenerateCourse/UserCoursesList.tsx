import { useQuery } from '@tanstack/react-query';
import {
  getAiCourseLimitOptions,
  listUserAiCoursesOptions,
  type ListUserAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { AICourseCard } from './AICourseCard';
import { useEffect, useState } from 'react';
import { BookOpen, Gift } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { getUrlParams, setUrlParams, deleteUrlParam } from '../../lib/browser';
import { AICourseSearch } from './AICourseSearch';
import { Pagination } from '../Pagination/Pagination';
import { AILoadingState } from '../AITutor/AILoadingState';
import { AITutorTallMessage } from '../AITutor/AITutorTallMessage';

type UserCoursesListProps = {};

export function UserCoursesList(props: UserCoursesListProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListUserAiCoursesQuery>({
    perPage: '10',
    currPage: '1',
    query: '',
  });

  const { data: limits, isLoading: isLimitsLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { used, limit } = limits ?? { used: 0, limit: 0 };
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

  const { data: userAiCourses, isFetching: isUserAiCoursesLoading } = useQuery(
    listUserAiCoursesOptions(pageState),
    queryClient,
  );

  useEffect(() => {
    setIsInitialLoading(false);
  }, [userAiCourses]);

  const courses = userAiCourses?.data ?? [];
  const isAuthenticated = isLoggedIn();
  const limitUsedPercentage = Math.round((used / limit) * 100);

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
      <div className="mb-3 flex min-h-[35px] items-center justify-between max-sm:mb-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            <span className="max-md:hidden">Your </span>Courses
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {used > 0 && limit > 0 && !isPaidUserLoading && (
            <div
              className={cn(
                'pointer-events-none flex items-center gap-2 opacity-0 transition-opacity',
                {
                  'pointer-events-auto opacity-100': !isPaidUser,
                },
              )}
            >
              <p className="flex items-center text-sm text-yellow-600">
                <span className="max-md:hidden">
                  {limitUsedPercentage}% of daily limit used{' '}
                </span>
                <span className="inline md:hidden">
                  {limitUsedPercentage}% used
                </span>
                <button
                  onClick={() => {
                    setShowUpgradePopup(true);
                  }}
                  className="ml-1.5 flex items-center gap-1 rounded-full bg-yellow-600 py-0.5 pr-2 pl-1.5 text-xs text-white"
                >
                  <Gift className="size-4" />
                  Upgrade
                </button>
              </p>
            </div>
          )}

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
        </div>
      </div>

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
