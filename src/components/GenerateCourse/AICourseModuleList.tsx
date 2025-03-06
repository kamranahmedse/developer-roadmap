import { type Dispatch, type SetStateAction, useState } from 'react';
import type { AiCourse } from '../../lib/ai';
import { Check, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../lib/classname';
import { getAiCourseProgressOptions } from '../../queries/ai-course';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { slugify } from '../../lib/slugger';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { CircularProgress } from './CircularProgress';

type AICourseModuleListProps = {
  course: AiCourse;
  courseSlug?: string;
  activeModuleIndex: number | undefined;
  setActiveModuleIndex: (index: number) => void;
  activeLessonIndex: number | undefined;
  setActiveLessonIndex: (index: number) => void;

  setSidebarOpen: (open: boolean) => void;

  viewMode: 'module' | 'full';
  setViewMode: (mode: 'module' | 'full') => void;

  expandedModules: Record<number, boolean>;
  setExpandedModules: Dispatch<SetStateAction<Record<number, boolean>>>;

  isLoading: boolean;
};

export function AICourseModuleList(props: AICourseModuleListProps) {
  const {
    course,
    courseSlug,
    activeModuleIndex,
    setActiveModuleIndex,
    activeLessonIndex,
    setActiveLessonIndex,
    setSidebarOpen,
    setViewMode,
    expandedModules,
    setExpandedModules,

    isLoading,
  } = props;

  const { data: aiCourseProgress } = useQuery(
    getAiCourseProgressOptions({ aiCourseSlug: courseSlug || '' }),
    queryClient,
  );

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

  const { done = [] } = aiCourseProgress || {};

  return (
    <nav className="bg-gray-100">
      {course.modules.map((courseModule, moduleIdx) => {
        const totalLessons = courseModule.lessons.length;
        const completedLessons = courseModule.lessons.filter((lesson) => {
          const key = `${slugify(courseModule.title)}__${slugify(lesson)}`;
          return done.includes(key);
        }).length;

        const percentage = Math.round((completedLessons / totalLessons) * 100);
        const isActive = expandedModules[moduleIdx];
        const isModuleCompleted = completedLessons === totalLessons;

        return (
          <div key={moduleIdx} className="rounded-md">
            <button
              onClick={() => toggleModule(moduleIdx)}
              className={cn(
                'relative z-10 flex w-full cursor-pointer flex-row items-center gap-2 border-b border-b-gray-200 bg-white px-2 py-3 text-base text-gray-600 hover:bg-gray-100',
                activeModuleIndex === moduleIdx
                  ? 'text-gray-900'
                  : 'text-gray-700',
                moduleIdx === 0 && 'pt-4',
              )}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="flex-shrink-0">
                  <CircularProgress
                    percentage={percentage}
                    isVisible={!isModuleCompleted}
                    isActive={isActive}
                    isLoading={isLoading}
                  >
                    <span
                      className={cn(
                        'flex size-[21px] flex-shrink-0 items-center justify-center rounded-full bg-gray-400/70 text-xs font-semibold text-white',
                        {
                          'bg-black': isActive,
                          'bg-green-600': isModuleCompleted,
                        },
                      )}
                    >
                      {!isModuleCompleted && moduleIdx + 1}
                      {isModuleCompleted && (
                        <Check className="size-3 stroke-[3] text-white" />
                      )}
                    </span>
                  </CircularProgress>
                </div>
                <span className="flex flex-1 items-center break-words text-left text-sm leading-relaxed">
                  {courseModule.title?.replace(/^Module\s*?\d+[\.:]\s*/, '')}
                </span>
              </div>
              <div className="ml-auto self-center">
                {expandedModules[moduleIdx] ? (
                  <ChevronDownIcon size={16} className="flex-shrink-0" />
                ) : (
                  <ChevronRightIcon size={16} className="flex-shrink-0" />
                )}
              </div>
            </button>

            {/* Lessons */}
            {expandedModules[moduleIdx] && (
              <div className="flex flex-col border-b border-b-gray-200 bg-gray-100">
                {courseModule.lessons.map((lesson, lessonIdx) => {
                  const key = `${slugify(courseModule.title)}__${slugify(lesson)}`;
                  const isCompleted = done.includes(key);

                  return (
                    <button
                      key={key}
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
                        setSidebarOpen(true);
                        setViewMode('module');
                      }}
                      className={cn(
                        'flex w-full cursor-pointer items-center py-3 pl-3.5 pr-2 text-left text-sm leading-relaxed',
                        activeModuleIndex === moduleIdx &&
                          activeLessonIndex === lessonIdx
                          ? 'bg-gray-200 text-black'
                          : 'text-gray-600 hover:bg-gray-200/70',
                      )}
                    >
                      {isCompleted ? (
                        <CheckIcon
                          additionalClasses={cn(
                            'size-[18px] relative bg-white rounded-full top-[2px] mr-2.5 flex-shrink-0 text-green-600',
                            {
                              'text-black':
                                activeModuleIndex === moduleIdx &&
                                activeLessonIndex === lessonIdx,
                            },
                          )}
                        />
                      ) : (
                        <span
                          className={cn(
                            'mr-2 flex size-[18px] flex-shrink-0 items-center justify-center rounded-full bg-gray-400/70 text-xs font-semibold text-white',
                            {
                              'bg-black':
                                activeModuleIndex === moduleIdx &&
                                activeLessonIndex === lessonIdx,
                            },
                          )}
                        >
                          {lessonIdx + 1}
                        </span>
                      )}
                      <span className="break-words">
                        {lesson?.replace(/^Lesson\s*?\d+[\.:]\s*/, '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
