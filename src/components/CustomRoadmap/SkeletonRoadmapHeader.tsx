export function SkeletonRoadmapHeader() {
  return (
    <div className="border-b">
      <div className="container relative py-5 sm:py-12">
        <div className="mb-3 mt-0 sm:mb-4">
          <div className="h-8 sm:mb-2 sm:h-10" />
          <div className="mt-0.5 h-5 bg-gray-500 sm:h-7" />
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
            {/* {allowEdit && (
              <a
                href={`${import.meta.env.PUBLIC_EDITOR_APP_URL}/${roadmapId}`}
                className="flex items-center rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-medium text-black hover:bg-yellow-500 sm:text-sm"
                aria-label="Edit current Roadmap"
              >
                <Pencil className="h-3 w-3 stroke-[2.5]" />
                <span className="hidden sm:inline">&nbsp;Edit Roadmap</span>
              </a>
            )} */}

            <button
              data-guest-required
              data-popup="login-popup"
              className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-medium hover:bg-yellow-500 sm:text-sm"
              aria-label="Subscribe for Updates"
            >
              <span className="ml-2">Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
