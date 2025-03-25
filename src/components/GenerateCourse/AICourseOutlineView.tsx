import { cn } from '../../lib/classname';
import type { AiCourse } from '../../lib/ai';
import { slugify } from '../../lib/slugger';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import type { Dispatch, SetStateAction } from 'react';
import { Loader2Icon } from 'lucide-react';
import type { AICourseViewMode } from './AICourseContent';
import { AICourseOutlineHeader } from './AICourseOutlineHeader';

type AICourseOutlineViewProps = {
  course: AiCourse;
  isLoading: boolean;
  onRegenerateOutline: (prompt?: string) => void;
  setActiveModuleIndex: (index: number) => void;
  setActiveLessonIndex: (index: number) => void;
  setSidebarOpen: (open: boolean) => void;
  setViewMode: (mode: AICourseViewMode) => void;
  setExpandedModules: Dispatch<SetStateAction<Record<number, boolean>>>;
  viewMode: AICourseViewMode;
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
    viewMode,
  } = props;

  const aiCourseProgress = course.done || [];

  return (
    <div className="mx-auto rounded-xl border border-gray-200 bg-white shadow-sm lg:max-w-5xl">
      <AICourseOutlineHeader
        course={course}
        isLoading={isLoading}
        onRegenerateOutline={onRegenerateOutline}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
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
