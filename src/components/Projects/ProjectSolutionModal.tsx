import { useEffect, useState } from 'react';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';
import { ModalLoader } from '../UserProgress/ModalLoader';
import { Modal } from '../Modal';
import { httpGet, httpPost } from '../../lib/http';
import {
  submittedAlternatives,
  type AllowedVoteType,
} from './ListProjectSolutions';
import { getRelativeTimeString } from '../../lib/date';
import { ArrowUpRight, ThumbsDown, ThumbsUp } from 'lucide-react';
import { VoteButton } from './VoteButton';
import { GitHubIcon } from '../ReactIcons/GitHubIcon';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';

type UserProjectSolutionResponse = {
  id?: string;

  startedAt?: Date;
  submittedAt?: Date;
  repositoryUrl?: string;

  upvotes?: number;
  downvotes?: number;

  voteType?: AllowedVoteType | 'none';
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

type ProjectSolutionModalProps = {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
};

export function ProjectSolutionModal(props: ProjectSolutionModalProps) {
  const { projectId, projectTitle, projectDescription } = props;

  const { u: userId } = getUrlParams();
  if (!userId) {
    return null;
  }

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [solution, setSolution] = useState<UserProjectSolutionResponse>();

  const loadUserProjectSolution = async () => {
    setIsLoading(true);
    setError('');

    const { response, error } = await httpGet<UserProjectSolutionResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-project-solution/${projectId}/${userId}`,
    );

    if (error || !response) {
      setError(error?.message || 'Something went wrong');
      setIsLoading(false);
      return;
    }

    setSolution(response);
    setIsLoading(false);
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
    setSolution((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        upvotes: response?.upvotes || 0,
        downvotes: response?.downvotes || 0,
        voteType,
      };
    });
  };

  useEffect(() => {
    loadUserProjectSolution().finally();
  }, []);

  if (isLoading || error) {
    return (
      <ModalLoader
        text="Loading project solution..."
        isLoading={isLoading}
        error={error}
      />
    );
  }

  const avatar = solution?.user.avatar;

  return (
    <Modal
      onClose={() => {
        deleteUrlParam('u');
        window.location.reload();
      }}
    >
      <div className="relative p-4">
        <h1 className="text-xl font-semibold">{projectTitle}</h1>
        <p className="mt-1 max-w-xs text-sm text-gray-500">
          {projectDescription}
        </p>

        <hr className="-mx-4 my-4 border-gray-300" />

        <div className="flex items-center gap-1.5">
          <img
            src={
              avatar
                ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
                : '/images/default-avatar.png'
            }
            alt={solution?.user?.name}
            className="mr-0.5 h-7 w-7 rounded-full"
          />
          <span className="font-medium text-black">{solution?.user.name}</span>
          <span className="hidden sm:inline">
            {submittedAlternatives[
              Math.floor(Math.random() * submittedAlternatives.length)
            ] || 'submitted their solution'}
          </span>{' '}
          <span className="flex-grow text-right text-gray-400 sm:flex-grow-0 sm:text-left sm:font-medium sm:text-black">
            {getRelativeTimeString(solution?.submittedAt!)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <a
            className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-black transition-colors hover:border-black hover:bg-black hover:text-white"
            href={solution?.repositoryUrl}
            target="_blank"
          >
            <GitHubIcon className="h-4 w-4 text-current" />
            View Solution
          </a>

          <div className="flex shrink-0 overflow-hidden rounded-full border">
            <VoteButton
              icon={ThumbsUp}
              isActive={solution?.voteType === 'upvote'}
              count={solution?.upvotes || 0}
              onClick={() => {
                handleSubmitVote(solution?.id!, 'upvote');
              }}
            />

            <VoteButton
              icon={ThumbsDown}
              isActive={solution?.voteType === 'downvote'}
              count={solution?.downvotes || 0}
              hideCount={true}
              onClick={() => {
                handleSubmitVote(solution?.id!, 'downvote');
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
