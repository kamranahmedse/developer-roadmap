import CheckIcon from '../../icons/roadmap.svg';

export function EmptyActivity() {
  return (
    <div class="rounded-md">
      <div class="flex flex-col items-center p-7 text-center">
        <img
          alt="no roadmaps"
          src={CheckIcon}
          class="mb-2 h-[120px] w-[120px] opacity-10"
        />
        <h2 class="text-xl font-bold">No Progress</h2>
        <p className="my-2 max-w-[400px] text-gray-500">
          Progress will appear here as you start tracking your{' '}
          <a href="/roadmaps" class="mt-4 text-blue-500 hover:underline">
            Roadmaps
          </a>{' '}
          or{' '}
          <a href="/best-practices" class="mt-4 text-blue-500 hover:underline">
            Best Practices
          </a>{' '}
          progress.
        </p>
      </div>
    </div>
  );
}
