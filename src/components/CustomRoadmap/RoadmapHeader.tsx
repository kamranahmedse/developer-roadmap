import { Pencil } from 'lucide-react';
import { RoadmapHint } from './RoadmapHint';

type RoadmapHeaderProps = {
  title: string;
  description: string;
  roadmapId: string;
  allowEdit?: boolean;
};

export function RoadmapHeader(props: RoadmapHeaderProps) {
  const { title, description, roadmapId, allowEdit } = props;

  return (
    <div className="border-b">
      <div className="container relative py-5 sm:py-12">
        <div className="mb-3 mt-0 sm:mb-4">
          <h1 className="text-2xl font-bold sm:mb-2 sm:text-4xl">{title}</h1>
          <p className="mt-0.5 text-sm text-gray-500 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="flex justify-between gap-2 sm:gap-0">
          <div className="flex gap-1 sm:gap-2">
            <a
              href="/roadmaps"
              className="rounded-md bg-gray-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-600 sm:text-sm"
              aria-label="Back to All Roadmaps"
            >
              &larr;<span className="hidden sm:inline">&nbsp;All Roadmaps</span>
            </a>

            <button
              data-guest-required
              data-popup="login-popup"
              className="inline-flex hidden items-center justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-medium hover:bg-yellow-500 sm:text-sm"
              aria-label="Subscribe for Updates"
            >
              <span className="ml-2">Subscribe</span>
            </button>
          </div>
          <div>
            {allowEdit && (
              <a
                href={`${import.meta.env.PUBLIC_EDITOR_APP_URL}/${roadmapId}`}
                className="inline-flex items-center justify-center rounded-md bg-gray-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-600 sm:text-sm"
                aria-label="Edit current Roadmap"
              >
                <Pencil className="h-3 w-3 stroke-[2.5]" />
                <span className="hidden sm:inline">&nbsp;Edit Roadmap</span>
              </a>
            )}
          </div>
        </div>

        <RoadmapHint
          roadmapTitle={title}
          hasTNSBanner={false}
          roadmapId={roadmapId}
        />
      </div>
    </div>
  );
}
