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
import type { ProjectFrontmatter } from '../../lib/project.ts';
import { ProjectSolutionModal } from './ProjectSolutionModal.tsx';
import { SortProjects } from './SortProjects.tsx';
import { ProjectSolutionRow } from './ProjectSolutionRow';

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

  updatedAt: Date;
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
  s?: string;
};

type PageState = {
  currentPage: number;
  language: string;
  sort: string;
};

type ListProjectSolutionsProps = {
  project: ProjectFrontmatter;
  projectId: string;
};

export function ListProjectSolutions(props: ListProjectSolutionsProps) {
  const { projectId, project: projectData } = props;

  const toast = useToast();
  const [pageState, setPageState] = useState<PageState>({
    currentPage: 0,
    language: '',
    sort: 'rating',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [solutions, setSolutions] = useState<ListProjectSolutionsResponse>();
  const [showLeavingRoadmapModal, setShowLeavingRoadmapModal] = useState<
    ListProjectSolutionsResponse['data'][number] | null
  >(null);

  const loadSolutions = async (
    page = 1,
    language: string = '',
    sort: string = 'rating',
  ) => {
    const { response, error } = await httpGet<ListProjectSolutionsResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-list-project-solutions/${projectId}`,
      {
        currPage: page,
        ...(language ? { languages: language } : {}),
        sort,
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

    pageProgressMessage.set('Submitting vote');
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
      language: queryParams.l || '',
      sort: queryParams.s || 'rating',
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!pageState.currentPage) {
      return;
    }

    if (
      pageState.currentPage !== 1 ||
      pageState.language !== '' ||
      pageState.sort !== 'rating'
    ) {
      setUrlParams({
        p: String(pageState.currentPage),
        l: pageState.language,
        s: pageState.sort,
      });
    } else {
      deleteUrlParam('p');
      deleteUrlParam('l');
      deleteUrlParam('s');
    }

    loadSolutions(
      pageState.currentPage,
      pageState.language,
      pageState.sort,
    ).finally(() => {
      setIsLoading(false);
    });
  }, [pageState]);

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

  const selectedLanguage = pageState.language;

  return (
    <div className="mb-4 overflow-hidden rounded-lg border bg-white p-3 sm:p-5">
      {leavingRoadmapModal}
      <div className="relative mb-5 hidden items-center justify-between sm:flex">
        <div>
          <h1 className="mb-1 text-xl font-semibold">
            {projectData.title} Solutions
          </h1>
          <p className="text-sm text-gray-500">{projectData.description}</p>
        </div>
        {!isLoading && (
          <div className="flex flex-shrink-0 items-center gap-2">
            <SortProjects
              selectedSort={pageState.sort}
              onSelectSort={(sort) => {
                setPageState((prev) => ({
                  ...prev,
                  sort,
                }));
              }}
            />
            <SelectLanguages
              projectId={projectId}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={(language) => {
                setPageState((prev) => ({
                  ...prev,
                  language: prev.language === language ? '' : language,
                }));
              }}
            />
          </div>
        )}
      </div>

      {isLoading ? (
        <LoadingSolutions />
      ) : (
        <>
          <div className="flex min-h-[500px] flex-col divide-y divide-gray-100">
            {solutions?.data.map((solution, counter) => (
              <ProjectSolutionRow
                key={solution._id}
                solution={solution}
                counter={counter}
                onVote={handleSubmitVote}
                onVisitSolution={setShowLeavingRoadmapModal}
              />
            ))}
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
    </div>
  );
}
