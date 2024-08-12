import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpGet, httpPost } from '../../lib/http';
import { LoadingSolutions } from './LoadingSolutions';
import { EmptySolutions } from './EmptySolutions';
import { ArrowDown, ArrowUp, CalendarCheck } from 'lucide-react';
import { getRelativeTimeString } from '../../lib/date';
import { Pagination } from '../Pagination/Pagination';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { pageProgressMessage } from '../../stores/page';
import { cn } from '../../lib/classname';
import { LeavingRoadmapWarningModal } from './LeavingRoadmapWarningModal';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';

export interface ProjectStatusDocument {
  _id?: string;

  userId: string;
  projectId: string;

  startedAt?: Date;
  submittedAt?: Date;
  repositoryUrl?: string;

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
};

type PageState = {
  currentPage: number;
};

const VISITED_SOLUTIONS_KEY = 'visited-project-solutions';

type ListProjectSolutionsProps = {
  projectId: string;
};

export function ListProjectSolutions(props: ListProjectSolutionsProps) {
  const { projectId } = props;

  const toast = useToast();
  const [pageState, setPageState] = useState<PageState>({
    currentPage: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [solutions, setSolutions] = useState<ListProjectSolutionsResponse>();
  const [alreadyVisitedSolutions, setAlreadyVisitedSolutions] = useState<
    Record<string, boolean>
  >({});
  const [showLeavingRoadmapModal, setShowLeavingRoadmapModal] = useState<
    ListProjectSolutionsResponse['data'][number] | null
  >(null);

  const loadSolutions = async (page = 1) => {
    const { response, error } = await httpGet<ListProjectSolutionsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-project-solutions/${projectId}`,
      {
        currPage: page,
      },
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load project solutions');
      setIsLoading(false);
      return;
    }

    setSolutions(response);
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
    const alreadyVisitedSolutions = JSON.parse(
      localStorage.getItem(VISITED_SOLUTIONS_KEY) || '{}',
    );

    setAlreadyVisitedSolutions(alreadyVisitedSolutions);
    setPageState({
      currentPage: +(queryParams.p || '1'),
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!pageState.currentPage) {
      return;
    }

    if (pageState.currentPage !== 1) {
      setUrlParams({
        p: String(pageState.currentPage),
      });
    } else {
      deleteUrlParam('p');
    }

    loadSolutions(pageState.currentPage).finally(() => {
      setIsLoading(false);
    });
  }, [pageState]);

  if (isLoading) {
    return <LoadingSolutions />;
  }

  const isEmpty = solutions?.data.length === 0;
  if (isEmpty) {
    return <EmptySolutions projectId={projectId} />;
  }

  const leavingRoadmapModal = showLeavingRoadmapModal ? (
    <LeavingRoadmapWarningModal
      onClose={() => setShowLeavingRoadmapModal(null)}
      onContinue={() => {
        const visitedSolutions = {
          ...alreadyVisitedSolutions,
          [showLeavingRoadmapModal._id!]: true,
        };
        localStorage.setItem(
          VISITED_SOLUTIONS_KEY,
          JSON.stringify(visitedSolutions),
        );

        window.open(showLeavingRoadmapModal.repositoryUrl, '_blank');
      }}
    />
  ) : null;

  return (
    <section className="-mx-2">
      {leavingRoadmapModal}

      <Pagination
        variant="minimal"
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

      <div className="my-4 flex flex-col gap-2">
        {solutions?.data.map((solution) => {
          const repoUrlParts = solution?.repositoryUrl
            ?.replace(/https?:\/\/(www\.)?github\.com/, '')
            .split('/');
          const username = repoUrlParts?.[1];
          const repoName = repoUrlParts?.[2];

          const isVisited = alreadyVisitedSolutions[solution._id!];

          return (
            <div
              key={solution._id}
              className="flex items-center justify-between gap-2 rounded-md bg-gray-100 p-2.5"
            >
              <div>
                <a
                  href={solution.repositoryUrl}
                  target="_blank"
                  className="font-medium underline underline-offset-2"
                  onClick={(e) => {
                    if (!isVisited) {
                      e.preventDefault();
                      setShowLeavingRoadmapModal(solution);
                    }
                  }}
                >
                  {username}/{repoName}
                </a>

                <div className="mt-2 flex items-center">
                  <button
                    className={cn(
                      'flex items-center gap-1 text-sm text-gray-500 hover:text-black',
                      solution?.voteType === 'upvote' &&
                        'text-orange-600 hover:text-orange-700',
                    )}
                    disabled={solution?.voteType === 'upvote'}
                    onClick={() => {
                      handleSubmitVote(solution._id!, 'upvote');
                    }}
                  >
                    <ArrowUp className="size-3.5 stroke-[2.5px]" />
                    {solution.upvotes}
                  </button>
                  <span className="mx-2">&middot;</span>
                  <button
                    className={cn(
                      'flex items-center gap-1 text-sm text-gray-500 hover:text-black',
                      solution?.voteType === 'downvote' &&
                        'text-orange-600 hover:text-orange-700',
                    )}
                    disabled={solution?.voteType === 'downvote'}
                    onClick={() => {
                      handleSubmitVote(solution._id!, 'downvote');
                    }}
                  >
                    <ArrowDown className="size-3.5 stroke-[2.5px]" />
                    {solution.downvotes}
                  </button>
                  <span className="mx-2">&middot;</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <CalendarCheck className="size-3.5 stroke-[2.5px]" />
                    {getRelativeTimeString(solution?.submittedAt!)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
    </section>
  );
}
