import type { UserProgressResponse } from './UserProgressModal';

type UserProgressModalHeaderProps = {
  isLoading: boolean;
  progressResponse: UserProgressResponse | undefined;
};

export function UserProgressModalHeader(props: UserProgressModalHeaderProps) {
  const { isLoading, progressResponse } = props;

  const user = progressResponse?.user;
  const progress = progressResponse?.progress;

  const userProgressTotal = progress?.total || 0;
  const userDone = progress?.done?.length || 0;
  const userSkipped = progress?.skipped?.length || 0;
  const progressPercentage =
    Math.round(((userDone + userSkipped) / userProgressTotal) * 100) || 0;
  const userLearning = progress?.learning?.length || 0;

  return (
    <div className="p-4">
      <div className="mb-5 mt-0 min-h-[28px] text-left sm:text-center md:mt-4 md:h-[60px]">
        <h2 className={'mb-1 text-lg font-bold md:text-2xl'}>
          {user?.name}'s Progress
        </h2>
        <p
          className={
            'hidden text-xs text-gray-500 sm:text-sm md:block md:text-base'
          }
        >
          You can close this popup and start tracking your progress.
        </p>
      </div>
      <p
        className={`-mx-4 mb-3 flex items-center justify-start border-b border-t px-4 py-2 text-sm sm:hidden`}
      >
        <span className="mr-2.5 block rounded-xs bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
          <span>{progressPercentage}</span>% Done
        </span>

        <span>
          <span>{userDone}</span> of <span>{userProgressTotal}</span> done
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
          <span>{userDone}</span> completed
        </span>
        <span className="mx-1.5 text-gray-400">·</span>
        <span>
          <span>{userLearning}</span> in progress
        </span>

        {userSkipped > 0 && (
          <>
            <span className="mx-1.5 text-gray-400">·</span>
            <span>
              <span>{userSkipped}</span> skipped
            </span>
          </>
        )}

        <span className="mx-1.5 text-gray-400">·</span>
        <span>
          <span>{userProgressTotal}</span> Total
        </span>
      </p>
    </div>
  );
}
