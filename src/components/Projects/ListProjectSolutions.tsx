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
import { cn } from '../../lib/classname.ts';

const languageColors = new Map([
  ['JavaScript', 'bg-[#f1e05a]'],
  ['Python', 'bg-[#3572A5]'],
  ['Java', 'bg-[#b07219]'],
  ['HTML', 'bg-[#e34c26]'],
  ['CSS', 'bg-[#563d7c]'],
  ['C++', 'bg-[#f34b7d]'],
  ['C', 'bg-[#555555]'],
  ['Go', 'bg-[#00ADD8]'],
  ['TypeScript', 'bg-[#2b7489]'],
  ['Shell', 'bg-[#89e051]'],
  ['Ruby', 'bg-[#701516]'],
  ['PHP', 'bg-[#4F5D95]'],
  ['Rust', 'bg-[#dea584]'],
  ['Swift', 'bg-[#ffac45]'],
  ['Kotlin', 'bg-[#A97BFF]'],
  ['Dart', 'bg-[#00B4AB]'],
  ['Scala', 'bg-[#c22d40]'],
  ['Objective-C', 'bg-[#438eff]'],
  ['Vue', 'bg-[#41b883]'],
  ['R', 'bg-[#198CE7]'],
  ['Perl', 'bg-[#0298c3]'],
  ['Haskell', 'bg-[#5e5086]'],
  ['Lua', 'bg-[#000080]'],
  ['Matlab', 'bg-[#e16737]'],
  ['Vim script', 'bg-[#199f4b]'],
  ['Elixir', 'bg-[#6e4a7e]'],
  ['Erlang', 'bg-[#B83998]'],
  ['Clojure', 'bg-[#db5855]'],
  ['Markdown', 'bg-[#083fa1]'],
  ['TeX', 'bg-[#3D6117]'],
  ['SQL', 'bg-[#e38c00]'],
]);

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

      <div className="flex min-h-[500px] flex-col divide-y divide-gray-100">
        {solutions?.data.map((solution, counter) => {
          const avatar = solution.user.avatar || '';
          const languages = solution?.languages || [];

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
                  <span className="flex overflow-hidden rounded-full border">
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

                  <a
                    className="ml-1 flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLeavingRoadmapModal(solution);
                    }}
                    target="_blank"
                    href={solution.repositoryUrl}
                  >
                    <GitHubIcon className="h-4 w-4 text-current" />
                    Visit Solution
                  </a>
                </div>
              </div>

              <div className="flex justify-end gap-2.5">
                {languages.map((language) => (
                  <span
                    key={language}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full',
                        languageColors.get(language) || 'bg-gray-400',
                      )}
                    />
                    {language}
                  </span>
                ))}
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
