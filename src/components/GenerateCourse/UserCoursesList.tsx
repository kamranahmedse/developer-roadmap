import { useQuery } from '@tanstack/react-query';
import { listUserAiCoursesOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { AICourseCard } from './AICourseCard';
import { useEffect, useState } from 'react';
import { Loader2, Search, Lock } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';

type UserCoursesListProps = {};

export function UserCoursesList(props: UserCoursesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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

  return (
    <>
      <div className="mb-3 flex min-h-[35px] items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Your Courses</h2>
        </div>

        <div className="relative w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-200 bg-white py-1.5 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-gray-300 focus:outline-none focus:ring-blue-500 disabled:opacity-70 sm:text-sm"
            placeholder="Search your courses..."
            value={searchTerm}
            disabled={
              isInitialLoading ||
              isUserAiCoursesLoading ||
              !isAuthenticated ||
              userAiCourses?.length === 0
            }
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {!isInitialLoading && !isUserAiCoursesLoading && !isAuthenticated && (
        <div className="flex min-h-[152px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-4">
          <Lock className="mb-3 size-6 text-gray-300/90" strokeWidth={2.5} />
          <p className="max-w-sm text-balance text-center text-gray-500">
            <button
              onClick={() => {
                showLoginPopup();
              }}
              className="font-medium text-black underline underline-offset-2 hover:opacity-80"
            >
              Sign up (free and takes 2s) or login
            </button>{' '}
            to start generating courses.
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
