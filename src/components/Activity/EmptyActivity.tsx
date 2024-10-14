import { RoadmapIcon } from "../ReactIcons/RoadmapIcon";

export function EmptyActivity() {
  return (
    <div className="rounded-md">
      <div className="flex flex-col items-center p-7 text-center">
        <RoadmapIcon className="mb-2  h-14 w-14 opacity-10" />

        <h2 className="text-lg sm:text-xl font-bold">No Progress</h2>
        <p className="my-1 sm:my-2 max-w-[400px] text-gray-500 text-sm sm:text-base">
          Progress will appear here as you start tracking your{' '}
          <a href="/roadmaps" className="mt-4 text-blue-500 hover:underline">
            Roadmaps
          </a>{' '}
          or{' '}
          <a href="/best-practices" className="mt-4 text-blue-500 hover:underline">
            Best Practices
          </a>{' '}
          progress.
        </p>
      </div>
    </div>
  );
}
