export function LoadingRoadmaps() {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {new Array(21).fill(0).map((_, index) => (
        <li
          key={index}
          className="h-[175px] animate-pulse rounded-md border bg-gray-200"
        />
      ))}
    </ul>
  );
}
