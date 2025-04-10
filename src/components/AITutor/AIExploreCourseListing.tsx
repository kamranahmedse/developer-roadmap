import { useListExploreAiCourses } from '../../queries/ai-course';
import { useEffect, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { AICourseCard } from '../GenerateCourse/AICourseCard';
import { AILoadingState } from './AILoadingState';
import { AITutorHeader } from './AITutorHeader';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

export function AIExploreCourseListing() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading: isExploreAiCoursesLoading,
  } = useListExploreAiCourses();

  useEffect(() => {
    setIsInitialLoading(false);
  }, [data]);

  const courses = data?.pages.flatMap((page) => page.data) ?? [];

  if (isInitialLoading || isExploreAiCoursesLoading) {
    return (
      <AILoadingState
        title="Loading courses"
        subtitle="This may take a moment..."
      />
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[152px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-4">
        <AlertCircle className="size-4 text-red-500" />
        <p className="text-sm font-medium text-red-600">
          {error?.message ?? 'Error loading courses.'}
        </p>
      </div>
    );
  }

  return (
    <>
      {showUpgradePopup && (
        <UpgradeAccountModal onClose={() => setShowUpgradePopup(false)} />
      )}

      <AITutorHeader
        title="Explore Courses"
        onUpgradeClick={() => setShowUpgradePopup(true)}
      />

      {courses && courses.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {courses.map((course) => (
            <AICourseCard
              key={course._id}
              course={course}
              showActions={false}
              showProgress={false}
            />
          ))}
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
          >
            Load more
          </button>
        </div>
      )}

      {isFetchingNextPage && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Loader2
            className="size-4 animate-spin text-gray-400"
            strokeWidth={2.5}
          />
          <p className="text-sm font-medium text-gray-600">
            Loading more courses...
          </p>
        </div>
      )}
    </>
  );
}
