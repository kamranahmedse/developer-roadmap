import { getPercentage } from '../../helper/number';
import { useCourseAILimit } from '../../hooks/use-course';

export function CourseAILimit() {
  const { data: tokenUsage, isLoading } = useCourseAILimit();

  if (isLoading || !tokenUsage) {
    return (
      <div className="h-5 w-1/4 animate-pulse rounded-md bg-zinc-600"></div>
    );
  }

  const percentageUsed = getPercentage(
    tokenUsage.usedTokenCount,
    tokenUsage.maxTokenCount,
  );

  return (
    <p className="text-sm text-yellow-500">
      <strong className="font-medium">{percentageUsed}%</strong> of daily limit
      used
    </p>
  );
}
