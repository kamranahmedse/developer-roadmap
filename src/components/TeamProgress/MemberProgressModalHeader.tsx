import type { MemberProgressResponse } from './MemberCustomProgressModal';
import type { TeamMember } from './TeamProgressPage';

type MemberProgressModalHeaderProps = {
  member: TeamMember;
  progress?: MemberProgressResponse;
  resourceId: string;
  isLoading: boolean;
  onShowMyProgress: () => void;
  isCurrentUser: boolean;
};

export function MemberProgressModalHeader(
  props: MemberProgressModalHeaderProps
) {
  const {
    progress: memberProgress,
    member,
    resourceId,
    isLoading,
    onShowMyProgress,
    isCurrentUser,
  } = props;

  const removedTopics = memberProgress?.removed || [];
  const memberDone =
    memberProgress?.done.filter((id) => !removedTopics.includes(id)).length ||
    0;
  const memberLearning =
    memberProgress?.learning.filter((id) => !removedTopics.includes(id))
      .length || 0;
  const memberSkipped =
    memberProgress?.skipped.filter((id) => !removedTopics.includes(id))
      .length || 0;

  const currProgress = member.progress.find((p) => p.resourceId === resourceId);
  const memberTotal = currProgress?.total || 0;

  const progressPercentage = Math.round((memberDone / memberTotal) * 100);

  return (
    <>
      {isCurrentUser && (
        <div className="sticky top-1 z-50 mx-1 mb-0 mt-1 rounded-xl bg-gray-900 p-4 text-gray-300">
          <h2 className={'mb-1.5 text-base'}>
            Follow the Instructions below to update your progress
          </h2>
          <ul className="flex flex-col gap-1">
            <li className="leading-loose">
              <kbd className="rounded-md bg-yellow-200 px-2 py-1.5 text-xs text-gray-900">
                Right Mouse Click
              </kbd>{' '}
              on a topic to mark as{' '}
              <span className={'font-medium text-white'}>Done</span>.
            </li>
            <li className="leading-loose">
              <kbd className="rounded-md bg-yellow-200 px-2 py-1.5 text-xs text-gray-900">
                Shift
              </kbd>{' '}
              +{' '}
              <kbd className="rounded-md bg-yellow-200 px-2 py-1.5 text-xs text-gray-900">
                Click
              </kbd>{' '}
              on a topic to mark as{' '}
              <span className="font-medium text-white">In progress</span>.
            </li>
          </ul>
        </div>
      )}

      <div className="p-4">
        {!isCurrentUser && (
          <div className="mb-5 mt-0 text-left md:mt-4 md:text-center">
            <h2 className={'mb-1 text-lg font-bold md:text-2xl'}>
              {member.name}'s Progress
            </h2>
            <p
              className={
                'hidden text-xs text-gray-500 sm:text-sm md:block md:text-base'
              }
            >
              You are looking at {member.name}'s progress.{' '}
              <button
                className="text-blue-600 underline"
                onClick={onShowMyProgress}
              >
                View your progress
              </button>
              .
            </p>
            <p className={'block text-gray-500 md:hidden'}>
              <button
                className="text-blue-600 underline"
                onClick={onShowMyProgress}
              >
                View your progress.
              </button>
            </p>
          </div>
        )}
        <p
          className={`-mx-4 mb-3 flex items-center justify-start border-b border-t px-4 py-2 text-sm sm:hidden ${
            isLoading ? 'striped-loader' : ''
          }`}
        >
          <span className="mr-2.5 block rounded-xs bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
            <span>{progressPercentage}</span>% Done
          </span>

          <span>
            <span>{memberDone}</span> of <span>{memberTotal}</span> done
          </span>
        </p>
        <p
          className={`-mx-4 mb-3 hidden items-center justify-center border-b border-t py-2 text-sm sm:flex ${
            isLoading ? 'striped-loader' : ''
          }`}
        >
          <span className="mr-2.5 block rounded-xs bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
            <span>{progressPercentage}</span>% Done
          </span>

          <span>
            <span>{memberDone}</span> completed
          </span>
          <span className="mx-1.5 text-gray-400">·</span>
          <span>
            <span data-progress-learning="">{memberLearning}</span> in progress
          </span>

          {memberSkipped > 0 && (
            <>
              <span className="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-skipped="">{memberSkipped}</span> skipped
              </span>
            </>
          )}

          <span className="mx-1.5 text-gray-400">·</span>
          <span>
            <span data-progress-total="">{memberTotal}</span> Total
          </span>
        </p>
      </div>
    </>
  );
}
