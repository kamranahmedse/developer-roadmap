import { useQuery } from '@tanstack/react-query';
import { BookOpen, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import {
  listUserAIGuidesOptions,
  type ListUserAIGuidesQuery,
} from '../../queries/ai-guide';
import { queryClient } from '../../stores/query-client';
import { AITutorTallMessage } from '../AITutor/AITutorTallMessage';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { Pagination } from '../Pagination/Pagination';
import { AICourseSearch } from '../GenerateCourse/AICourseSearch';
import { AIGuideCard } from '../AIGuide/AIGuideCard';

export function UserGuidesList() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListUserAIGuidesQuery>({
    perPage: '21',
    currPage: '1',
    query: '',
  });

  const { data: userAiGuides, isFetching: isUserAiGuidesLoading } = useQuery(
    listUserAIGuidesOptions(pageState),
    queryClient,
  );

  useEffect(() => {
    setIsInitialLoading(false);
  }, [userAiGuides]);

  const guides = userAiGuides?.data ?? [];

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
  const isAnyLoading = isUserAiGuidesLoading || isInitialLoading;

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
        placeholder="Search guides..."
      />

      {isAnyLoading && (
        <p className="mb-4 flex flex-row items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your guides...
        </p>
      )}

      {!isAnyLoading && (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {isUserAuthenticated
              ? `You have generated ${userAiGuides?.totalCount} guides so far.`
              : 'Sign up or login to generate your first guide. Takes 2s to do so.'}
          </p>

          {isUserAuthenticated && !isAnyLoading && guides.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                {guides.map((guide) => (
                  <AIGuideCard key={guide._id} guide={guide} />
                ))}
              </div>

              <Pagination
                totalCount={userAiGuides?.totalCount || 0}
                totalPages={userAiGuides?.totalPages || 0}
                currPage={Number(userAiGuides?.currPage || 1)}
                perPage={Number(userAiGuides?.perPage || 10)}
                onPageChange={(page) => {
                  setPageState({ ...pageState, currPage: String(page) });
                }}
                className="rounded-lg border border-gray-200 bg-white p-4"
              />
            </div>
          )}

          {!isAnyLoading && guides.length === 0 && (
            <AITutorTallMessage
              title={
                isUserAuthenticated ? 'No guides found' : 'Sign up or login'
              }
              subtitle={
                isUserAuthenticated
                  ? "You haven't generated any guides yet."
                  : 'Takes 2s to sign up and generate your first guide.'
              }
              icon={BookOpen}
              buttonText={
                isUserAuthenticated
                  ? 'Create your first guide'
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
