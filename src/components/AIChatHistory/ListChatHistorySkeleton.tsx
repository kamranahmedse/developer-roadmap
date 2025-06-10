export function ListChatHistorySkeleton() {
  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />

          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
        </div>

        <div className="h-9 w-full animate-pulse rounded-lg bg-gray-200" />

        <div className="relative mt-2">
          <div className="h-9 w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
            <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      <div className="scrollbar-track-transparent scrollbar-thin scrollbar-thumb-gray-300 -mx-2 mt-6 grow space-y-4 overflow-y-scroll px-2">
        {['Today', 'Last 7 Days', 'Older'].map((group) => (
          <div key={group}>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <ul className="mt-1 space-y-0.5">
              {[1, 2, 3].map((i) => (
                <li
                  key={i}
                  className="h-9 animate-pulse rounded-lg bg-gray-100"
                ></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
