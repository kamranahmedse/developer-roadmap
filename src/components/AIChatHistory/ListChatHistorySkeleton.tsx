export function ListChatHistorySkeleton() {
  return (
    <>
      <div className="h-9 w-full animate-pulse rounded-lg bg-gray-200" />

      <div className="relative mt-2">
        <div className="h-9 w-full animate-pulse rounded-lg bg-gray-200" />
        <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {['Today', 'Last 7 Days', 'Older'].map((group) => (
          <div key={group}>
            <div className="ml-2 h-4 w-16 animate-pulse rounded bg-gray-200" />
            <ul className="mt-1 space-y-0.5 px-2">
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
