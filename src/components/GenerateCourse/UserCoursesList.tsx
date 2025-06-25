import { useQuery } from '@tanstack/react-query';
import { BookOpen, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import {
  listUserAiCoursesOptions,
  type ListUserAiCoursesQuery,
} from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { AITutorTallMessage } from '../AITutor/AITutorTallMessage';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { Pagination } from '../Pagination/Pagination';
import { AICourseCard } from './AICourseCard';
import { AICourseSearch } from './AICourseSearch';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';

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

  const isUserAuthenticated = isLoggedIn();
  const isAnyLoading = isUserAiCoursesLoading || isInitialLoading;

  return (
    <>
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
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
        disabled={isAnyLoading}
      />

      {isAnyLoading && (
        <p className="mb-4 flex flex-row items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your courses...
        </p>
      )}

      {!isAnyLoading && (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {isUserAuthenticated
              ? `You have generated ${userAiCourses?.totalCount} courses so far.`
              : 'Sign up or login to generate your first course. Takes 2s to do so.'}
          </p>

          {isUserAuthenticated && !isAnyLoading && courses.length > 0 && (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {courses.map((course) => (
                <AICourseCard variant="column" key={course._id} course={course} />
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

          {!isAnyLoading && courses.length === 0 && (
            <AITutorTallMessage
              title={
                isUserAuthenticated ? 'No courses found' : 'Sign up or login'
              }
              subtitle={
                isUserAuthenticated
                  ? "You haven't generated any courses yet."
                  : 'Takes 2s to sign up and generate your first course.'
              }
              icon={BookOpen}
              buttonText={
                isUserAuthenticated
                  ? 'Create your first course'
                  : 'Sign up or login'
              }
              onButtonClick={() => {
                if (isUserAuthenticated) {
                  window.location.href = '/ai';
                } else {
                  showLoginPopup();
                }
              }}
            />
          )}
        </>
      )}
    </>
  );
}
