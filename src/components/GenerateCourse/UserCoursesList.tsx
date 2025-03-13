import { useQuery } from '@tanstack/react-query';
import {
  getAiCourseLimitOptions,
  listUserAiCoursesOptions,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { AICourseCard } from './AICourseCard';
import { useEffect, useState } from 'react';
import { Gift, Loader2, Search, User2 } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname';
import { billingDetailsOptions } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type UserCoursesListProps = {};

export function UserCoursesList(props: UserCoursesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const { data: limits, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { used, limit } = limits ?? { used: 0, limit: 0 };

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isPaidUser = userBillingDetails?.status !== 'active';

  const { data: userAiCourses, isFetching: isUserAiCoursesLoading } = useQuery(
    listUserAiCoursesOptions(),
    queryClient,
  );

  useEffect(() => {
    setIsInitialLoading(false);
  }, [userAiCourses]);

  const filteredCourses = userAiCourses?.filter((course) => {
    if (!searchTerm.trim()) {
      return true;
    }

    const searchLower = searchTerm.toLowerCase();

    return (
      course.title.toLowerCase().includes(searchLower) ||
      course.keyword.toLowerCase().includes(searchLower)
    );
  });

  const isAuthenticated = isLoggedIn();

  const canSearch =
    !isInitialLoading &&
    !isUserAiCoursesLoading &&
    isAuthenticated &&
    userAiCourses?.length !== 0;

  const limitUsedPercentage = Math.round((used / limit) * 100);

  return (
    <>
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}
      <div className="mb-3 flex min-h-[35px] items-center justify-between max-sm:mb-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            <span className='max-md:hidden'>Your </span>Courses
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-2 opacity-0 transition-opacity',
              {
                'opacity-100': !isPaidUser,
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

          <div className={cn('relative w-64 max-sm:hidden', {})}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-200 bg-white py-1.5 pl-10 pr-3 leading-5 placeholder-gray-500 transition-all focus:border-gray-300 focus:outline-none focus:ring-blue-500 disabled:opacity-70 sm:text-sm"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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

      {!isUserAiCoursesLoading &&
        !isInitialLoading &&
        userAiCourses?.length === 0 && (
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

      {!isUserAiCoursesLoading &&
        filteredCourses &&
        filteredCourses.length > 0 && (
          <div className="flex flex-col gap-2">
            {filteredCourses.map((course) => (
              <AICourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

      {!isUserAiCoursesLoading &&
        (userAiCourses?.length || 0 > 0) &&
        filteredCourses?.length === 0 && (
          <div className="flex min-h-[114px] items-center justify-center rounded-lg border border-gray-200 bg-white py-4">
            <p className="text-sm text-gray-600">
              No courses match your search.
            </p>
          </div>
        )}
    </>
  );
}
