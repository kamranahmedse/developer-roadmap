import { List } from 'lucide-react';

export function EmptyStream() {
  return (
    <div className="rounded-md">
      <div className="flex flex-col items-center p-7 text-center">
        <List className="mb-4 h-[60px] w-[60px] opacity-10 sm:h-[60px] sm:w-[60px]" />

        <h2 className="text-lg font-bold sm:text-xl">No Activities</h2>
        <p className="my-1 max-w-[400px] text-balance text-sm text-gray-500 sm:my-2 sm:text-base">
          Activities will appear here as you start tracking your&nbsp;
          <a href="/roadmaps" className="mt-4 text-blue-500 hover:underline">
            Roadmaps
          </a>
          ,&nbsp;
          <a
            href="/best-practices"
            className="mt-4 text-blue-500 hover:underline"
          >
            Best Practices
          </a>
          &nbsp;or&nbsp;
          <a href="/questions" className="mt-4 text-blue-500 hover:underline">
            Questions
          </a>
          &nbsp;progress.
        </p>
      </div>
    </div>
  );
}
