import { useQuery } from '@tanstack/react-query';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import {
  listUserAIGuidesOptions,
  type ListUserAIGuidesQuery,
} from '../../queries/ai-guide';
import { queryClient } from '../../stores/query-client';
import { AITutorHeader } from '../AITutor/AITutorHeader';
import { AITutorTallMessage } from '../AITutor/AITutorTallMessage';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { Pagination } from '../Pagination/Pagination';
import { AILoadingState } from '../AITutor/AILoadingState';
import { AICourseSearch } from '../GenerateCourse/AICourseSearch';
import { AIGuideCard } from '../AIGuide/AIGuideCard';

export function ListUserAIGuides() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const [pageState, setPageState] = useState<ListUserAIGuidesQuery>({
    perPage: '2',
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

  if (isUserAiGuidesLoading || isInitialLoading) {
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

  return (
    <>
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}

      <AITutorHeader
        title="Your Guides"
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
          placeholder="Search guides..."
        />
      </AITutorHeader>

      {(isUserAiGuidesLoading || isInitialLoading) && (
        <AILoadingState
          title="Loading your guides"
          subtitle="This may take a moment..."
        />
      )}

      {!isUserAiGuidesLoading && !isInitialLoading && guides.length > 0 && (
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

      {!isUserAiGuidesLoading && !isInitialLoading && guides.length === 0 && (
        <AITutorTallMessage
          title="No guides found"
          subtitle="You haven't generated any guides yet."
          icon={BookOpen}
          buttonText="Create your first guide"
          onButtonClick={() => {
            window.location.href = '/ai';
          }}
        />
      )}
    </>
  );
}
