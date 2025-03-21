import { RegenerateOutline } from './RegenerateOutline';
import { cn } from '../../lib/classname';
import type { AiCourse } from '../../lib/ai';
import { slugify } from '../../lib/slugger';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import type { Dispatch, SetStateAction } from 'react';
import { Loader2Icon } from 'lucide-react';
import type { AICourseViewMode } from './AICourseContent';

type AICourseOutlineViewProps = {
  course: AiCourse;
  isLoading: boolean;
  onRegenerateOutline: (prompt?: string) => void;
  setActiveModuleIndex: (index: number) => void;
  setActiveLessonIndex: (index: number) => void;
  setSidebarOpen: (open: boolean) => void;
  setViewMode: (mode: AICourseViewMode) => void;
  setExpandedModules: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export function AICourseOutlineView(props: AICourseOutlineViewProps) {
  const {
    course,
    isLoading,
    onRegenerateOutline,
    setActiveModuleIndex,
    setActiveLessonIndex,
    setSidebarOpen,
    setViewMode,
    setExpandedModules,
  } = props;

  const aiCourseProgress = course.done || [];

  return (
    <div className="mx-auto rounded-xl border border-gray-200 bg-white shadow-sm lg:max-w-3xl">
      <div
        className={cn(
          'relative mb-1 flex items-start justify-between border-b border-gray-100 p-6 max-lg:hidden',
          isLoading && 'striped-loader',
        )}
      >
        <div>
          <h2 className="mb-1 text-balance text-2xl font-bold max-lg:text-lg max-lg:leading-tight">
            {course.title || 'Loading course ..'}
          </h2>
          <p className="text-sm capitalize text-gray-500">
            {course.title ? course.difficulty : 'Please wait ..'}
          </p>
        </div>

        {!isLoading && (
          <RegenerateOutline onRegenerateOutline={onRegenerateOutline} />
        )}
      </div>
      {course.title ? (
        <div className="flex flex-col p-6 max-lg:mt-0.5 max-lg:p-4">
          {course.modules.map((courseModule, moduleIdx) => {
            return (
              <div
                key={moduleIdx}
                className="mb-5 pb-4 last:border-0 last:pb-0 max-lg:mb-2"
              >
                <h2 className="mb-4 text-xl font-bold text-gray-800 max-lg:mb-2 max-lg:text-lg max-lg:leading-tight">
                  {courseModule.title}
                </h2>
                <div className="divide-y divide-gray-100">
                  {courseModule.lessons.map((lesson, lessonIdx) => {
                    const key = `${slugify(String(moduleIdx))}-${slugify(String(lessonIdx))}`;
                    const isCompleted = aiCourseProgress.includes(key);

                    return (
                      <div
                        key={key}
                        className="flex cursor-pointer items-center gap-2 px-2 py-2.5 transition-colors hover:bg-gray-100 max-lg:px-0 max-lg:py-1.5"
                        onClick={() => {
                          setActiveModuleIndex(moduleIdx);
                          setActiveLessonIndex(lessonIdx);
                          setExpandedModules((prev) => {
                            const newState: Record<number, boolean> = {};
                            course.modules.forEach((_, idx) => {
                              newState[idx] = false;
                            });
                            newState[moduleIdx] = true;
                            return newState;
                          });

                          setSidebarOpen(false);
                          setViewMode('module');
                        }}
                      >
                        {!isCompleted && (
                          <span
                            className={cn(
                              'flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-800 max-lg:size-5 max-lg:text-xs',
                            )}
                          >
                            {lessonIdx + 1}
                          </span>
                        )}

                        {isCompleted && (
                          <CheckIcon additionalClasses="size-6 flex-shrink-0 text-green-500" />
                        )}

                        <p className="flex-1 truncate text-base text-gray-800 max-lg:text-sm">
                          {lesson.replace(/^Lesson\s*?\d+[\.:]\s*/, '')}
                        </p>
                        <span className="text-sm font-medium text-gray-700 max-lg:hidden">
                          {isCompleted ? 'View' : 'Start'} →
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <Loader2Icon size={36} className="animate-spin text-gray-300" />
        </div>
      )}
    </div>
  );
}
