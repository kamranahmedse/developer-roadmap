export function ProgressPercentageSkeleton() {
  return <div className="h-5 w-[120px] animate-pulse rounded bg-gray-200" />;
}

export function ChapterNumberSkeleton() {
  return (
    <div className="h-[28px] w-[28px] animate-pulse rounded rounded-full bg-gray-200" />
  );
}

export function LessonNumberSkeleton() {
  return (
    <div className="h-[20px] w-[20px] animate-pulse rounded rounded-full bg-gray-300 z-[10]" />
  );
}
