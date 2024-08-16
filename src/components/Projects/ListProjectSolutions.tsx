import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { httpGet, httpPost } from '../../lib/http';
import { LoadingSolutions } from './LoadingSolutions';
import { EmptySolutions } from './EmptySolutions';
import {
  ArrowDown,
  ArrowUp,
  CalendarCheck,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { getRelativeTimeString } from '../../lib/date';
import { Pagination } from '../Pagination/Pagination';
import { deleteUrlParam, getUrlParams, setUrlParams } from '../../lib/browser';
import { pageProgressMessage } from '../../stores/page';
import { cn } from '../../lib/classname';
import { LeavingRoadmapWarningModal } from './LeavingRoadmapWarningModal';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { CheckIcon } from '../ReactIcons/CheckIcon.tsx';
import { VoteButton } from './VoteButton.tsx';
import { GitHubIcon } from '../ReactIcons/GitHubIcon.tsx';

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
    <section>
      {leavingRoadmapModal}

      <div className="flex flex-col divide-y divide-gray-100 min-h-[500px]">
        {solutions?.data.map((solution, counter) => {
          const isVisited = alreadyVisitedSolutions[solution._id!];
          const avatar = solution.user.avatar || '';

          return (
            <div
              key={solution._id}
              className="group flex items-center justify-between py-2 text-sm text-gray-500"
            >
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
                {submittedAlternatives[
                  counter % submittedAlternatives.length
                ] || 'submitted their solution'}{' '}
                <span className="font-medium text-black">
                  {getRelativeTimeString(solution?.submittedAt!)}
                </span>
              </div>

              <div className="5 flex items-center gap-1">
                <span className="flex items-center overflow-hidden rounded-full border">
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
                    onClick={() => {
                      handleSubmitVote(solution._id!, 'downvote');
                    }}
                  />
                </span>

                <a
                  className="ml-1 flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                  onClick={(e) => {
                    if (!isVisited) {
                      e.preventDefault();
                      setShowLeavingRoadmapModal(solution);
                    }
                  }}
                  target="_blank"
                  href={solution.repositoryUrl}
                >
                  <GitHubIcon className="h-4 w-4 text-current" />
                  Visit Solution
                </a>
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
    </section>
  );
}
