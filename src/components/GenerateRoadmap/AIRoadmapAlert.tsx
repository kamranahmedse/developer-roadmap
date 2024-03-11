import { BadgeCheck, Telescope, Wand } from 'lucide-react';

type AIRoadmapAlertProps = {
  isListing?: boolean;
};

export function AIRoadmapAlert(props: AIRoadmapAlertProps) {
  const { isListing = false } = props;

  return (
    <div className="mb-3 w-full rounded-xl bg-yellow-100 px-4 py-3 text-yellow-800">
      <h2 className="flex items-center text-base font-semibold text-yellow-800 sm:text-lg">
        AI Generated Roadmap{isListing ? 's' : ''}{' '}
        <span className="ml-1.5 rounded-md border border-yellow-500 bg-yellow-200 px-1.5 text-xs uppercase tracking-wide text-yellow-800">
          Beta
        </span>
      </h2>
      <p className="mb-2 mt-1">
        {isListing
          ? 'These are AI generated roadmaps and are not verified by'
          : 'This is an AI generated roadmap and is not verified by'}{' '}
        <span className={'font-semibold'}>roadmap.sh</span>. We are currently in
        beta and working hard to improve the quality of the generated roadmaps.
      </p>
      <p className="mb-1.5 mt-2 flex flex-col gap-2 text-sm sm:flex-row">
        {isListing ? (
          <a
            href="/ai"
            className="flex items-center gap-1.5 rounded-md border border-yellow-600 px-2 py-1 text-yellow-700 transition-colors hover:bg-yellow-300 hover:text-yellow-800"
          >
            <Wand size={15} />
            Create your own Roadmap with AI
          </a>
        ) : (
          <a
            href="/ai/explore"
            className="flex items-center gap-1.5 rounded-md border border-yellow-600 px-2 py-1 text-yellow-700 transition-colors hover:bg-yellow-300 hover:text-yellow-800"
          >
            <Telescope size={15} />
            Explore other AI Roadmaps
          </a>
        )}
        <a
          href="/roadmaps"
          className="flex items-center gap-1.5 rounded-md border border-yellow-600 bg-yellow-200 px-2 py-1 text-yellow-800 transition-colors hover:bg-yellow-300"
        >
          <BadgeCheck size={15} />
          Visit Official Roadmaps
        </a>
      </p>
    </div>
  );
}
