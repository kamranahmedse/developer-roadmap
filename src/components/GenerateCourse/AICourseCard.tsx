import type { AICourseWithLessonCount } from '../../queries/ai-course';
import type { DifficultyLevel } from './AICourse';
import { BookOpen } from 'lucide-react';
import { AICourseActions } from './AICourseActions';
import { getRelativeTimeString } from '../../lib/date';
import { cn } from '../../lib/classname';

type AICourseCardProps = {
  course: AICourseWithLessonCount;
  showActions?: boolean;
  showProgress?: boolean;
  variant?: 'row' | 'column';
};

export function AICourseCard(props: AICourseCardProps) {
  const {
    course,
    showActions = true,
    showProgress = true,
    variant = 'row',
  } = props;

  const difficultyColor =
    {
      beginner: 'text-green-700',
      intermediate: 'text-blue-700',
      advanced: 'text-purple-700',
    }[course.difficulty as DifficultyLevel] || 'text-gray-700';

  const modulesCount = course.modules?.length || 0;
  const totalTopics = course.lessonCount || 0;
  const completedTopics = course.done?.length || 0;
  const progressPercentage =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const updatedAgo = getRelativeTimeString(course?.updatedAt);

  return (
    <div className="relative flex flex-grow">
      <a
        href={`/ai/${course.slug}`}
        className={cn(
          'group relative flex h-full w-full gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-gray-300 hover:bg-gray-50 sm:gap-4',
          variant === 'column' && 'flex-col',
          variant === 'row' && 'flex-row sm:flex-row sm:items-center',
        )}
      >
        {/* Title and difficulty section */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={`rounded-full text-xs font-medium capitalize opacity-80 ${difficultyColor}`}
            >
              {course.difficulty}
            </span>
          </div>

          <h3 className="line-clamp-2 text-base font-semibold text-balance text-gray-900">
            {course.title
              ?.replace(": A Beginner's Guide", '')
              ?.replace(' for beginners', '')}
          </h3>
        </div>

        {/* Course stats section */}
        <div className="mt-7 flex items-center gap-4 sm:gap-4">
          <div className="hidden items-center text-xs text-gray-600 sm:flex">
            <BookOpen className="mr-1 h-3.5 w-3.5" />
            <span>{modulesCount} modules</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="flex items-center">
              <BookOpen className="mr-1 h-3.5 w-3.5" />
              <span>{totalTopics} lessons</span>
            </div>

            {showProgress && totalTopics > 0 && (
              <>
                <span className="hidden text-gray-400 sm:inline">•</span>
                <div className="flex items-center">
                  <span className="flex items-center text-xs font-medium text-gray-700">
                    {progressPercentage}% complete
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </a>

      {showActions && course.slug && (
        <div className="absolute top-2 right-2">
          <AICourseActions courseSlug={course.slug} />
        </div>
      )}
    </div>
  );
}
