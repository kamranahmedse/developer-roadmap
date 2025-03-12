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
  onLanguageClick?: (language: string) => void;
};

export function ProjectSolutionRow(props: ProjectSolutionRowProps) {
  const { solution, counter, onVote, onVisitSolution, onLanguageClick } = props;

  const avatar = solution.user.avatar || '';

  return (
    <div className="group flex flex-col border-gray-100 px-3 py-2.5 text-sm hover:bg-gray-50/50 sm:flex-row sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <img
          src={
            avatar
              ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
              : '/images/default-avatar.png'
          }
          alt={solution.user.name}
          className="h-7 w-7 flex-shrink-0 rounded-full sm:h-8 sm:w-8"
        />
        <div className="min-w-0 flex-auto">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="max-w-[150px] truncate font-medium text-gray-900 sm:max-w-[180px]">
              {solution.user.name}
            </span>
            <span className="hidden truncate text-xs text-gray-500 sm:block sm:text-sm">
              {submittedAlternatives[counter % submittedAlternatives.length] ||
                'submitted their solution'}
            </span>
            <span
              className="text-xs text-gray-400"
              title={new Date(solution?.submittedAt!).toLocaleString()}
            >
              · {getRelativeTimeString(solution?.submittedAt!)}
            </span>
          </div>

          <div className="mt-2.5 flex gap-1.5">
            <div className="flex gap-1">
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
            </div>

            <button
              className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-black transition-colors hover:border-black hover:bg-black hover:text-white"
              onClick={() => {
                onVisitSolution(solution);
              }}
            >
              <GitHubIcon className="h-3.5 w-3.5 text-current" />
              <span>Visit Solution</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2.5 hidden sm:mt-0 sm:block sm:pl-4">
        {solution.languages && solution.languages.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {solution.languages.slice(0, 2).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageClick?.(lang)}
                className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
