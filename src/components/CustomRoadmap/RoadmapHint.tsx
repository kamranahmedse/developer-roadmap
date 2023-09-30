import { cn } from '../../lib/classname';
import { ResourceProgressStats } from './ResourceProgressStats';

type RoadmapHintProps = {
  roadmapId: string;
  roadmapTitle: string;
  hasTNSBanner?: boolean;
  tnsBannerLink?: string;
};

export function RoadmapHint(props: RoadmapHintProps) {
  const {
    roadmapTitle,
    roadmapId,
    hasTNSBanner = false,
    tnsBannerLink = '',
  } = props;

  return (
    <div
      className={cn('mb-0 mt-4 rounded-md border-0 sm:mt-7 sm:border', {
        'sm:-mb-[82px]': hasTNSBanner,
        'sm:-mb-[65px]': !hasTNSBanner,
      })}
    >
      {hasTNSBanner && (
        <div className="hidden border-b bg-gray-100 px-2 py-1.5 sm:block">
          <p className="text-sm">
            Get the latest {roadmapTitle} news from our sister site{' '}
            <a
              href={tnsBannerLink}
              target="_blank"
              className="font-semibold underline"
            >
              TheNewStack.io
            </a>
          </p>
        </div>
      )}

      <ResourceProgressStats
        isSecondaryBanner={hasTNSBanner}
        resourceId={roadmapId}
        resourceType="roadmap"
      />
    </div>
  );
}
