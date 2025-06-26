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
  listUserAiRoadmapsOptions,
  type ListUserAiRoadmapsQuery,
} from '../../queries/ai-roadmap';
import { AIRoadmapCard } from './AIRoadmapCard';

export function UserRoadmapsList() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListUserAiRoadmapsQuery>({
    perPage: '21',
    currPage: '1',
    query: '',
  });

  const { data: userAiRoadmaps, isFetching: isUserAiRoadmapsLoading } =
    useQuery(listUserAiRoadmapsOptions(pageState), queryClient);

  useEffect(() => {
    setIsInitialLoading(false);
  }, [userAiRoadmaps]);

  const roadmaps = userAiRoadmaps?.data ?? [];

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
  const isAnyLoading = isUserAiRoadmapsLoading || isInitialLoading;

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
        placeholder="Search Roadmaps..."
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
              ? `You have generated ${userAiRoadmaps?.totalCount} roadmaps so far.`
              : 'Sign up or login to generate your first roadmap. Takes 2s to do so.'}
          </p>

          {isUserAuthenticated && !isAnyLoading && roadmaps.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                {roadmaps.map((roadmap) => (
                  <AIRoadmapCard variant="column" key={roadmap._id} roadmap={roadmap} />
                ))}
              </div>

              <Pagination
                totalCount={userAiRoadmaps?.totalCount || 0}
                totalPages={userAiRoadmaps?.totalPages || 0}
                currPage={Number(userAiRoadmaps?.currPage || 1)}
                perPage={Number(userAiRoadmaps?.perPage || 10)}
                onPageChange={(page) => {
                  setPageState({ ...pageState, currPage: String(page) });
                }}
                className="rounded-lg border border-gray-200 bg-white p-4"
              />
            </div>
          )}

          {!isAnyLoading && roadmaps.length === 0 && (
            <AITutorTallMessage
              title={
                isUserAuthenticated ? 'No roadmaps found' : 'Sign up or login'
              }
              subtitle={
                isUserAuthenticated
                  ? "You haven't generated any roadmaps yet."
                  : 'Takes 2s to sign up and generate your first roadmap.'
              }
              icon={BookOpen}
              buttonText={
                isUserAuthenticated
                  ? 'Create your first roadmap'
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
