import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { getRelativeTimeString } from '../../lib/date';
import { VoteButton } from './VoteButton';
import { GitHubIcon } from '../ReactIcons/GitHubIcon';
import type {
  AllowedVoteType,
  ProjectStatusDocument,
} from './ListProjectSolutions';

export const submittedAlternatives = [
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

type ProjectSolutionRowProps = {
  solution: ProjectStatusDocument & {
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    voteType?: AllowedVoteType | 'none';
  };
  counter: number;
  onVote: (solutionId: string, voteType: AllowedVoteType) => void;
  onVisitSolution: (solution: ProjectSolutionRowProps['solution']) => void;
};

export function ProjectSolutionRow(props: ProjectSolutionRowProps) {
  const { solution, counter, onVote, onVisitSolution } = props;

  const avatar = solution.user.avatar || '';

  return (
    <div className="flex flex-col gap-2 py-2 text-sm text-gray-500">
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
          <span className="font-medium text-black">{solution.user.name}</span>
          <span className="hidden sm:inline">
            {submittedAlternatives[counter % submittedAlternatives.length] ||
              'submitted their solution'}
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
                onVote(solution._id!, 'upvote');
              }}
            />

            <VoteButton
              icon={ThumbsDown}
              isActive={solution?.voteType === 'downvote'}
              count={solution.downvotes || 0}
              hideCount={true}
              onClick={() => {
                onVote(solution._id!, 'downvote');
              }}
            />
          </span>

          <button
            className="ml-1 flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-black transition-colors hover:border-black hover:bg-black hover:text-white"
            onClick={() => {
              onVisitSolution(solution);
            }}
          >
            <GitHubIcon className="h-4 w-4 text-current" />
            Visit Solution
          </button>
        </div>
      </div>
    </div>
  );
}
