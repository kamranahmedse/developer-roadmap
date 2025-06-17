import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { getPercentage } from '../../lib/number';

type UserProgressListProps = {
  totalTopicCount: number;
  roadmapId: string;
};

export function UserProgressList(props: UserProgressListProps) {
  const { totalTopicCount, roadmapId } = props;

  const { data: userResourceProgressData } = useQuery(
    userResourceProgressOptions('roadmap', roadmapId),
    queryClient,
  );

  const doneCount = userResourceProgressData?.done?.length ?? 0;
  const skippedCount = userResourceProgressData?.skipped?.length ?? 0;

  const totalFinished = doneCount + skippedCount;
  const progressPercentage = getPercentage(totalFinished, totalTopicCount);

  return (
    <div className="relative my-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 first:mt-0 last:mb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
            {progressPercentage}%
          </span>
        </div>
        <span className="hidden text-sm font-medium text-gray-600 md:block">
          {totalFinished} / {totalTopicCount} topics
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>Completed: {doneCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-gray-400" />
          <span>Skipped: {skippedCount}</span>
        </div>
      </div>
    </div>
  );
}
