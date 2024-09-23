type LoadingProgressProps = {};

export function LoadingProgress(props: LoadingProgressProps) {
  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[38px] w-full animate-pulse rounded-md border border-gray-300 bg-gray-100"
        ></div>
      ))}
    </div>
  );
}
