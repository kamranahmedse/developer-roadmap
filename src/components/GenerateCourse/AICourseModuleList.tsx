import { type Dispatch, type SetStateAction, useState } from 'react';
import type { AiCourse } from '../../lib/ai';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../lib/classname';

type AICourseModuleListProps = {
  course: AiCourse;
  activeModuleIndex: number;
  setActiveModuleIndex: (index: number) => void;
  activeLessonIndex: number;
  setActiveLessonIndex: (index: number) => void;

  setSidebarOpen: (open: boolean) => void;

  viewMode: 'module' | 'full';
  setViewMode: (mode: 'module' | 'full') => void;

  expandedModules: Record<number, boolean>;
  setExpandedModules: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export function AICourseModuleList(props: AICourseModuleListProps) {
  const {
    course,
    activeModuleIndex,
    setActiveModuleIndex,
    activeLessonIndex,
    setActiveLessonIndex,
    setSidebarOpen,
    setViewMode,
    expandedModules,
    setExpandedModules,
  } = props;

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => {
      // If this module is already expanded, collapse it
      if (prev[index]) {
        return {
          ...prev,
          [index]: false,
        };
      }

      // Otherwise, collapse all modules and expand only this one
      const newState: Record<number, boolean> = {};
      // Set all modules to collapsed
      course.modules.forEach((_, idx) => {
        newState[idx] = false;
      });
      // Expand only the clicked module
      newState[index] = true;
      return newState;
    });
  };

  return (
    <nav className="space-y-1 px-2">
      {course.modules.map((module, moduleIdx) => (
        <div key={moduleIdx} className="rounded-md">
          <button
            onClick={() => toggleModule(moduleIdx)}
            className={cn(
              'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium',
              activeModuleIndex === moduleIdx
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-50',
            )}
          >
            <div className="flex min-w-0 items-start pr-2">
              <span className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                {moduleIdx + 1}
              </span>
              <span className="break-words">
                {module.title?.replace(/^Module\s*?\d+[\.:]\s*/, '')}
              </span>
            </div>
            {expandedModules[moduleIdx] ? (
              <ChevronDownIcon size={16} className="flex-shrink-0" />
            ) : (
              <ChevronRightIcon size={16} className="flex-shrink-0" />
            )}
          </button>

          {/* Lessons */}
          {expandedModules[moduleIdx] && (
            <div className="ml-8 mt-1 space-y-1">
              {module.lessons.map((lesson, lessonIdx) => (
                <button
                  key={lessonIdx}
                  onClick={() => {
                    setActiveModuleIndex(moduleIdx);
                    setActiveLessonIndex(lessonIdx);
                    // Expand only this module in the sidebar
                    setExpandedModules((prev) => {
                      const newState: Record<number, boolean> = {};
                      // Set all modules to collapsed
                      course.modules.forEach((_, idx) => {
                        newState[idx] = false;
                      });
                      // Expand only the current module
                      newState[moduleIdx] = true;
                      return newState;
                    });
                    // Ensure sidebar is visible on mobile
                    setSidebarOpen(true);
                    setViewMode('module');
                  }}
                  className={cn(
                    'flex w-full items-start rounded-md px-3 py-2 text-left text-sm',
                    activeModuleIndex === moduleIdx &&
                      activeLessonIndex === lessonIdx
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-600 hover:bg-gray-50',
                  )}
                >
                  <span className="relative top-[2px] mr-2 flex-shrink-0 text-xs">
                    {lessonIdx + 1}.
                  </span>
                  <span className="break-words">
                    {lesson?.replace(/^Lesson\s*?\d+[\.:]\s*/, '')}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
