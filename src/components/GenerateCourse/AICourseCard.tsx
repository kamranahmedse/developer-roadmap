import type { AICourseListItem } from '../../queries/ai-course';
import type { DifficultyLevel } from './AICourse';
import { BookOpen, Calendar } from 'lucide-react';

type AICourseCardProps = {
  course: AICourseListItem;
};

export function AICourseCard(props: AICourseCardProps) {
  const { course } = props;

  // Format date if available
  const formattedDate = course.createdAt
    ? new Date(course.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  // Map difficulty to color
  const difficultyColor =
    {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-blue-100 text-blue-700',
      advanced: 'bg-purple-100 text-purple-700',
    }[course.difficulty as DifficultyLevel] || 'bg-gray-100 text-gray-700';

  // Get a short description preview if available
  const descriptionPreview = course.data
    ? JSON.parse(course.data)?.description?.substring(0, 100) +
      (JSON.parse(course.data)?.description?.length > 100 ? '...' : '')
    : null;

  // Calculate progress percentage
  const totalTopics = course.lessonCount || 0;
  const completedTopics = course.progress?.done?.length || 0;
  const progressPercentage =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <a
      href={`/ai-tutor/${course.slug}`}
      className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-white p-4 text-left transition-all hover:border-gray-3    00 hover:bg-gray-50"
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${difficultyColor}`}
        >
          {course.difficulty}
        </span>
        {formattedDate && (
          <span className="flex items-center text-xs text-gray-500">
            <Calendar className="mr-1 h-3 w-3" />
            {formattedDate}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-base font-semibold text-gray-900">
        {course.title}
      </h3>

      {descriptionPreview && (
        <p className="mb-3 text-xs text-gray-600">{descriptionPreview}</p>
      )}

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex items-center text-xs text-gray-600">
          <BookOpen className="mr-1 h-3.5 w-3.5" />
          <span>{totalTopics} topics</span>
        </div>

        {totalTopics > 0 && (
          <div className="flex items-center">
            <div className="mr-2 h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {progressPercentage}%
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
