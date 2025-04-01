import { cn } from '../../lib/classname';
import { ResourceProgressStats } from './ResourceProgressStats';

type RoadmapHintProps = {
  roadmapId: string;
  roadmapTitle: string;
};

export function RoadmapHint(props: RoadmapHintProps) {
  const { roadmapTitle, roadmapId } = props;

  return (
    <div
      className={cn(
        'mb-0 mt-4 rounded-md border-0 sm:-mb-[65px] sm:mt-7 sm:border',
      )}
    >
      <ResourceProgressStats
        isSecondaryBanner={false}
        resourceId={roadmapId}
        resourceType="roadmap"
      />
    </div>
  );
}
