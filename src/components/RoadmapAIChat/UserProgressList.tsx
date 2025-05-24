import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { userResourceProgressOptions } from '../../queries/resource-progress';
import { getPercentage } from '../../lib/number';

type UserProgressListProps = {
  roadmapId: string;
};

export function UserProgressList(props: UserProgressListProps) {
  const { roadmapId } = props;

  const { data: userResourceProgressData } = useQuery(
    userResourceProgressOptions('roadmap', roadmapId),
    queryClient,
  );

  const totalTopicCount = userResourceProgressData?.totalTopicCount ?? 0;
  const doneCount = userResourceProgressData?.done?.length ?? 0;
  const skippedCount = userResourceProgressData?.skipped?.length ?? 0;

  const totalFinished = doneCount + skippedCount;
  const progressPercentage = getPercentage(totalFinished, totalTopicCount);

  return (
    <div className="relative my-6 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-2 first:mt-0 last:mb-0">
      <div className="flex items-center gap-4">
        <div className="relative h-1.5 grow overflow-hidden rounded-md bg-gray-200">
          <div
            className="absolute inset-0 bg-gray-400"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <span className="text-sm font-medium text-gray-500">
          {totalFinished} / {totalTopicCount}
        </span>
      </div>
    </div>
  );
}
