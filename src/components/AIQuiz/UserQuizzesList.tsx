import { useQuery } from '@tanstack/react-query';
import { BookOpen, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { queryClient } from '../../stores/query-client';
import { AITutorTallMessage } from '../AITutor/AITutorTallMessage';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { Pagination } from '../Pagination/Pagination';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { AICourseSearch } from '../GenerateCourse/AICourseSearch';
import {
  listUserAiQuizzesOptions,
  type ListUserAiQuizzesQuery,
} from '../../queries/ai-quiz';
import { AIQuizCard } from './AIQuizCard';
import { aiLimitOptions } from '../../queries/ai-course';
import { useIsPaidUser } from '../../queries/billing';
import { AIUsageWarning } from '../AIUsageWarning/AIUsageWarning';

export function UserQuizzesList() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListUserAiQuizzesQuery>({
    perPage: '21',
    currPage: '1',
    query: '',
  });

  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();
  const { data: limits, isLoading: isLimitLoading } = useQuery(
    aiLimitOptions(),
    queryClient,
  );

  const selectedLimit = limits?.quiz;

  const { data: userAiQuizzes, isFetching: isUserAiQuizzesLoading } = useQuery(
    listUserAiQuizzesOptions(pageState),
    queryClient,
  );

  useEffect(() => {
    setIsInitialLoading(false);
  }, [userAiQuizzes]);

  const quizzes = userAiQuizzes?.data ?? [];

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
  const isAnyLoading =
    isUserAiQuizzesLoading ||
    isInitialLoading ||
    isPaidUserLoading ||
    isLimitLoading;

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
        placeholder="Search Quizzes..."
        disabled={isAnyLoading}
      />

      {isAnyLoading && (
        <p className="mb-4 flex flex-row items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your quizzes...
        </p>
      )}

      {!isAnyLoading && (
        <>
          <AIUsageWarning
            type="quiz"
            totalCount={userAiQuizzes?.totalCount}
            isPaidUser={isPaidUser}
            usedCount={selectedLimit?.used}
            limitCount={selectedLimit?.limit}
            onUpgrade={() => setShowUpgradePopup(true)}
          />

          {isUserAuthenticated && !isAnyLoading && quizzes.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                {quizzes.map((quiz) => (
                  <AIQuizCard variant="column" key={quiz._id} quiz={quiz} />
                ))}
              </div>

              <Pagination
                totalCount={userAiQuizzes?.totalCount || 0}
                totalPages={userAiQuizzes?.totalPages || 0}
                currPage={Number(userAiQuizzes?.currPage || 1)}
                perPage={Number(userAiQuizzes?.perPage || 10)}
                onPageChange={(page) => {
                  setPageState({ ...pageState, currPage: String(page) });
                }}
                className="rounded-lg border border-gray-200 bg-white p-4"
              />
            </div>
          )}

          {!isAnyLoading && quizzes.length === 0 && (
            <AITutorTallMessage
              title={
                isUserAuthenticated ? 'No quizzes found' : 'Sign up or login'
              }
              subtitle={
                isUserAuthenticated
                  ? "You haven't generated any quizzes yet."
                  : 'Takes 2s to sign up and generate your first quiz.'
              }
              icon={BookOpen}
              buttonText={
                isUserAuthenticated
                  ? 'Create your first quiz'
                  : 'Sign up or login'
              }
              onButtonClick={() => {
                if (isUserAuthenticated) {
                  window.location.href = '/ai/quiz';
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
