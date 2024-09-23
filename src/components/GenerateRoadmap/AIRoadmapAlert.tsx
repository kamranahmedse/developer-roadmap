import { BadgeCheck, Bot, Telescope, Wand } from 'lucide-react';
import { RoadmapAlert } from '../RoadmapAlert';

type AIRoadmapAlertProps = {
  isListing?: boolean;
};

export function AIRoadmapAlert(props: AIRoadmapAlertProps) {
  const { isListing = false } = props;

  return (
    <RoadmapAlert
      title={`AI Generated Roadmap${isListing ? 's' : ''}`}
      badgeText="Beta"
      description={
        <>
          {isListing
            ? 'These are AI generated roadmaps and are not verified by'
            : 'This is an AI generated roadmap and is not verified by'}{' '}
          <span className={'font-semibold'}>roadmap.sh</span>. We are currently
          in beta and working hard to improve the quality of the generated
          roadmaps.
        </>
      }
      floatingIcon={Bot}
    />
  );
}
