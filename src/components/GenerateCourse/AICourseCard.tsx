import type { AICourseWithLessonCount } from '../../queries/ai-course';
import type { DifficultyLevel } from './AICourse';
import { BookOpen } from 'lucide-react';
import { AICourseActions } from './AICourseActions';
import { getRelativeTimeString } from '../../lib/date';

type AICourseCardProps = {
  course: AICourseWithLessonCount;
  showActions?: boolean;
  showProgress?: boolean;
};

export function AICourseCard(props: AICourseCardProps) {
  const { course, showActions = true, showProgress = true } = props;

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
    <div className="relative flex flex-grow flex-col">
      <a
        href={`/ai/${course.slug}`}
        className="hover:border-gray-3 00 group relative flex h-full min-h-[300px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:bg-gray-50"
      >
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full text-xs font-medium capitalize opacity-80 ${difficultyColor}`}
          >
            {course.difficulty}
          </span>
        </div>

        <h3 className="my-2 text-base font-semibold text-balance text-gray-900">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 pt-2">
          <div className="flex items-center text-xs text-gray-600">
            <BookOpen className="mr-1 h-3.5 w-3.5" />
            <span>{modulesCount} modules</span>
          </div>

          <span className="text-xs text-gray-600">•</span>

          <div className="flex items-center text-xs text-gray-600">
            <BookOpen className="mr-1 h-3.5 w-3.5" />
            <span>{totalTopics} lessons</span>
          </div>
        </div>

        {showProgress && totalTopics > 0 && (
          <div className="mt-auto">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-600">Progress</span>

              <span className="text-xs font-medium text-gray-700">
                {progressPercentage}%
              </span>
            </div>

            <div className="mt-2.5 flex items-center">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-600">
            Last updated {updatedAgo}
          </span>
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
