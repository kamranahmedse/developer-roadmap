import { List } from 'lucide-react';

export function EmptyStream() {
  return (
    <div className="rounded-md">
      <div className="flex flex-col items-center p-7 text-center">
        <List className="mb-4 h-14 w-14 opacity-10" />

        <h2 className="text-lg font-bold sm:text-xl">No Activity</h2>
        <p className="my-1 max-w-[400px] text-balance text-sm text-gray-500 sm:my-2 sm:text-base">
          Activities will appear here as you start tracking your progress.
        </p>
      </div>
    </div>
  );
}
