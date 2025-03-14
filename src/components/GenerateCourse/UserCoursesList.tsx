import { useQuery } from '@tanstack/react-query';
import {
  getAiCourseLimitOptions,
  listUserAiCoursesOptions,
  type ListUserAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { AICourseCard } from './AICourseCard';
import { useEffect, useState } from 'react';
import { Gift, Loader2, User2 } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { getUrlParams, setUrlParams, deleteUrlParam } from '../../lib/browser';
import { AICourseSearch } from './AICourseSearch';
import { Pagination } from '../Pagination/Pagination';

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
                  className="ml-1.5 flex items-center gap-1 rounded-full bg-yellow-600 py-0.5 pl-1.5 pr-2 text-xs text-white"
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

      {!isInitialLoading && !isUserAiCoursesLoading && !isAuthenticated && (
        <div className="flex min-h-[152px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-4">
          <User2 className="mb-2 size-8 text-gray-300" />
          <p className="max-w-sm text-balance text-center text-gray-500">
            <button
              onClick={() => {
                showLoginPopup();
              }}
              className="font-medium text-black underline underline-offset-2 hover:opacity-80"
            >
              Sign up (free and takes 2s) or login
            </button>{' '}
            to generate and save courses.
          </p>
        </div>
      )}

      {!isUserAiCoursesLoading && !isInitialLoading && courses.length === 0 && (
        <div className="flex min-h-[152px] items-center justify-center rounded-lg border border-gray-200 bg-white py-4">
          <p className="text-sm text-gray-600">
            You haven't generated any courses yet.
          </p>
        </div>
      )}

      {(isUserAiCoursesLoading || isInitialLoading) && (
        <div className="flex min-h-[152px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-4">
          <Loader2
            className="size-4 animate-spin text-gray-400"
            strokeWidth={2.5}
          />
          <p className="text-sm font-medium text-gray-600">Loading...</p>
        </div>
      )}

      {!isUserAiCoursesLoading && courses && courses.length > 0 && (
        <div className="flex flex-col gap-2">
          {courses.map((course) => (
            <AICourseCard key={course._id} course={course} />
          ))}

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
