import { ArrowUpRight, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';
import { getRelativeTimeString } from '../../lib/date';
import { httpGet, httpPost } from '../../lib/http';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { pageProgressMessage } from '../../stores/page';
import { Modal } from '../Modal';
import { GitHubIcon } from '../ReactIcons/GitHubIcon';
import { ModalLoader } from '../UserProgress/ModalLoader';
import { type AllowedVoteType } from './ListProjectSolutions';
import { VoteButton } from './VoteButton';

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
      wrapperClassName={'max-w-lg'}
      bodyClassName={'h-auto'}
    >
      <div className="relative p-6">
        <h1 className="mb-1 text-balance text-2xl font-bold text-gray-900">
          {projectTitle}
        </h1>
        <p className="text-balance text-sm text-gray-600">
          {projectDescription}
        </p>

        <div className="my-5 rounded-lg bg-gray-100 p-4">
          <div className="flex items-center gap-3">
            <img
              src={
                avatar
                  ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
                  : '/images/default-avatar.png'
              }
              alt={solution?.user?.name}
              className="h-12 w-12 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {solution?.user.name}'s Solution
              </h2>
              <p className="text-sm text-gray-600">
                Submitted their solution{' '}
                {getRelativeTimeString(solution?.submittedAt!)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <a
            className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            href={solution?.repositoryUrl}
            target="_blank"
          >
            <GitHubIcon className="h-5 w-5 text-current" />
            View Solution on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <div className="flex overflow-hidden rounded-full border">
            <VoteButton
              icon={ThumbsUp}
              isActive={solution?.voteType === 'upvote'}
              count={solution?.upvotes || 0}
              onClick={() => handleSubmitVote(solution?.id!, 'upvote')}
            />
            <VoteButton
              icon={ThumbsDown}
              isActive={solution?.voteType === 'downvote'}
              count={solution?.downvotes || 0}
              hideCount={true}
              onClick={() => handleSubmitVote(solution?.id!, 'downvote')}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
