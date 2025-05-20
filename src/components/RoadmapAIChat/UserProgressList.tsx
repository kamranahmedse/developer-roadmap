import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { roadmapDetailsOptions } from '../../queries/roadmap';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { userResourceProgressOptions } from '../../queries/resource-progress';

type UserProgressListProps = {
  roadmapId: string;
};

export function UserProgressList(props: UserProgressListProps) {
  const { roadmapId } = props;

  const { data: roadmapTreeData } = useQuery(
    roadmapTreeMappingOptions(roadmapId),
    queryClient,
  );
  const { data: userResourceProgressData } = useQuery(
    userResourceProgressOptions('roadmap', roadmapId),
    queryClient,
  );

  const doneCount = userResourceProgressData?.done?.length ?? 0;
  const learningCount = userResourceProgressData?.learning?.length ?? 0;
  const skippedCount = userResourceProgressData?.skipped?.length ?? 0;

  return (
    <div className="relative my-6 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-2 first:mt-0 last:mb-0">
      <span>
        Done: <span className="font-bold">{doneCount}</span>
      </span>
      <span>
        Learning: <span className="font-bold">{learningCount}</span>
      </span>
      <span>
        Skipped: <span className="font-bold">{skippedCount}</span>
      </span>
    </div>
  );
}
