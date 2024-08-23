import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpGet, httpPost } from '../../lib/http';
import { LoadingSolutions } from './LoadingSolutions';
import { EmptySolutions } from './EmptySolutions';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { getRelativeTimeString } from '../../lib/date';
import { Pagination } from '../Pagination/Pagination';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { pageProgressMessage } from '../../stores/page';
import { LeavingRoadmapWarningModal } from './LeavingRoadmapWarningModal';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { VoteButton } from './VoteButton.tsx';
import { GitHubIcon } from '../ReactIcons/GitHubIcon.tsx';
import { SelectLanguages } from './SelectLanguages.tsx';

export interface ProjectStatusDocument {
  _id?: string;

  userId: string;
  projectId: string;

  startedAt?: Date;
  submittedAt?: Date;
  repositoryUrl?: string;
  languages?: string[];

  upvotes: number;
  downvotes: number;

  isVisible?: boolean;

  updated1t: Date;
}

const allowedVoteType = ['upvote', 'downvote'] as const;
export type AllowedVoteType = (typeof allowedVoteType)[number];

type ListProjectSolutionsResponse = {
  data: (ProjectStatusDocument & {
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    voteType?: AllowedVoteType | 'none';
  })[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

type QueryParams = {
  p?: string;
  l?: string;
};

type PageState = {
  currentPage: number;
  languages: string[];
};

const VISITED_SOLUTIONS_KEY = 'visited-project-solutions';

type ListProjectSolutionsProps = {
  projectId: string;
};

const submittedAlternatives = [
  'submitted their solution',
  'got it done',
  'submitted their take',
  'finished the project',
  'submitted their work',
  'completed the project',
  'got it done',
  'delivered their project',
  'handed in their solution',
  'provided their deliverables',
  'submitted their approach',
  'sent in their project',
  'presented their take',
  'shared their completed task',
  'submitted their approach',
  'completed it',
  'finalized their solution',
  'delivered their approach',
  'turned in their project',
  'submitted their final draft',
  'delivered their solution',
];

export function ListProjectSolutions(props: ListProjectSolutionsProps) {
  const { projectId } = props;

  const toast = useToast();
  const [pageState, setPageState] = useState<PageState>({
    currentPage: 0,
    languages: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [solutions, setSolutions] = useState<ListProjectSolutionsResponse>();
  const [showLeavingRoadmapModal, setShowLeavingRoadmapModal] = useState<
    ListProjectSolutionsResponse['data'][number] | null
  >(null);
  const [distinctLanguages, setDistinctLanguages] = useState<string[]>([]);

  const loadSolutions = async (page = 1, languages: string[] = []) => {
    const { response, error } = await httpGet<ListProjectSolutionsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-project-solutions/${projectId}`,
      {
        currPage: page,
        ...(languages.length > 0 ? { languages: languages.join(',') } : {}),
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load project solutions');
      setIsLoading(false);
      return;
    }

    setSolutions(response);
  };

  const loadDistinctLanguages = async () => {
    const { response, error } = await httpGet<string[]>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-project-languages/${projectId}`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load project languages');
      return;
    }

    setDistinctLanguages(response);
  };

  const handleSubmitVote = async (
    solutionId: string,
    voteType: AllowedVoteType,
  ) => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    pageProgressMessage.set('Submitting vote...');
    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-vote-project/${solutionId}`,
      {
        voteType,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to submit vote');
      pageProgressMessage.set('');
      return;
    }

    pageProgressMessage.set('');
    setSolutions((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        data: prev.data.map((solution) => {
          if (solution._id === solutionId) {
            return {
              ...solution,
              upvotes: response?.upvotes || 0,
              downvotes: response?.downvotes || 0,
              voteType,
            };
          }

          return solution;
        }),
      };
    });
  };

  useEffect(() => {
    const queryParams = getUrlParams() as QueryParams;
    setPageState({
      currentPage: +(queryParams.p || '1'),
      languages: (queryParams.l || '').split(',').filter(Boolean),
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!pageState.currentPage) {
      return;
    }

    if (pageState.currentPage !== 1 || pageState.languages.length > 0) {
      setUrlParams({
        p: String(pageState.currentPage),
        l: pageState.languages.join(','),
      });
    } else {
      deleteUrlParam('p');
      deleteUrlParam('l');
    }

    loadSolutions(pageState.currentPage, pageState.languages).finally(() => {
      setIsLoading(false);
    });
  }, [pageState]);

  useEffect(() => {
    loadDistinctLanguages().finally(() => {});
  }, []);

  const isEmpty = solutions?.data.length === 0;
  if (isEmpty) {
    return <EmptySolutions projectId={projectId} />;
  }

  const leavingRoadmapModal = showLeavingRoadmapModal ? (
    <LeavingRoadmapWarningModal
      onClose={() => setShowLeavingRoadmapModal(null)}
      repositoryUrl={showLeavingRoadmapModal?.repositoryUrl!}
    />
  ) : null;

  const selectedLanguages = pageState.languages;

  return (
    <section>
      {leavingRoadmapModal}
      <SelectLanguages
        languages={distinctLanguages}
        selectedLanguages={pageState.languages}
        onSelectLanguage={(language) => {
          const isAlreadySelected = selectedLanguages.includes(language);
          const newLanguages = isAlreadySelected
            ? selectedLanguages.filter((l) => l !== language)
            : [...selectedLanguages, language];

          setPageState({
            ...pageState,
            languages: newLanguages,
          });
        }}
      />

      {isLoading ? (
        <LoadingSolutions />
      ) : (
        <>
          <div className="flex min-h-[500px] flex-col divide-y divide-gray-100">
            {solutions?.data.map((solution, counter) => {
              const avatar = solution.user.avatar || '';
              return (
                <div
                  key={solution._id}
                  className="flex flex-col gap-2 py-2 text-sm text-gray-500"
                >
                  <div className="flex flex-col justify-between gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:gap-0">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={
                          avatar
                            ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
                            : '/images/default-avatar.png'
                        }
                        alt={solution.user.name}
                        className="mr-0.5 h-7 w-7 rounded-full"
                      />
                      <span className="font-medium text-black">
                        {solution.user.name}
                      </span>
                      <span className="hidden sm:inline">
                        {submittedAlternatives[
                          counter % submittedAlternatives.length
                        ] || 'submitted their solution'}
                      </span>{' '}
                      <span className="flex-grow text-right text-gray-400 sm:flex-grow-0 sm:text-left sm:font-medium sm:text-black">
                        {getRelativeTimeString(solution?.submittedAt!)}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-1">
                      <span className="flex shrink-0 overflow-hidden rounded-full border">
                        <VoteButton
                          icon={ThumbsUp}
                          isActive={solution?.voteType === 'upvote'}
                          count={solution.upvotes || 0}
                          onClick={() => {
                            handleSubmitVote(solution._id!, 'upvote');
                          }}
                        />

                        <VoteButton
                          icon={ThumbsDown}
                          isActive={solution?.voteType === 'downvote'}
                          count={solution.downvotes || 0}
                          hideCount={true}
                          onClick={() => {
                            handleSubmitVote(solution._id!, 'downvote');
                          }}
                        />
                      </span>

                      <button
                        className="ml-1 flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                        onClick={() => {
                          setShowLeavingRoadmapModal(solution);
                        }}
                      >
                        <GitHubIcon className="h-4 w-4 text-current" />
                        Visit Solution
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {(solutions?.totalPages || 0) > 1 && (
            <div className="mt-4">
              <Pagination
                totalPages={solutions?.totalPages || 1}
                currPage={solutions?.currPage || 1}
                perPage={solutions?.perPage || 21}
                totalCount={solutions?.totalCount || 0}
                onPageChange={(page) => {
                  setPageState({
                    ...pageState,
                    currentPage: page,
                  });
                }}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
