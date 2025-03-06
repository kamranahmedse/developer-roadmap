import { useQuery } from '@tanstack/react-query';
import { BookOpenCheck, ChevronLeft, Loader2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { type AiCourse } from '../../lib/ai';
import { cn } from '../../lib/classname';
import { slugify } from '../../lib/slugger';
import { getAiCourseProgressOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { CheckIcon } from '../ReactIcons/CheckIcon';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';
import { AICourseLimit } from './AICourseLimit';
import { AICourseModuleList } from './AICourseModuleList';
import { AICourseModuleView } from './AICourseModuleView';

type AICourseContentProps = {
  courseSlug?: string;
  course: AiCourse;
  isLoading: boolean;
  error?: string;
};

export function AICourseContent(props: AICourseContentProps) {
  const { course, courseSlug, isLoading, error } = props;

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'module' | 'full'>('full');

  const { data: aiCourseProgress } = useQuery(
    getAiCourseProgressOptions({ aiCourseSlug: courseSlug || '' }),
    queryClient,
  );

  const [expandedModules, setExpandedModules] = useState<
    Record<number, boolean>
  >({});

  const goToNextModule = () => {
    if (activeModuleIndex < course.modules.length - 1) {
      const nextModuleIndex = activeModuleIndex + 1;
      setActiveModuleIndex(nextModuleIndex);
      setActiveLessonIndex(0);

      setExpandedModules((prev) => {
        const newState: Record<number, boolean> = {};
        course.modules.forEach((_, idx) => {
          newState[idx] = false;
        });

        newState[nextModuleIndex] = true;
        return newState;
      });
    }
  };

  const goToNextLesson = () => {
    const currentModule = course.modules[activeModuleIndex];
    if (currentModule && activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else {
      goToNextModule();
    }
  };

  const goToPrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    } else {
      const prevModule = course.modules[activeModuleIndex - 1];
      if (prevModule) {
        const prevModuleIndex = activeModuleIndex - 1;
        setActiveModuleIndex(prevModuleIndex);
        setActiveLessonIndex(prevModule.lessons.length - 1);

        // Expand the previous module in the sidebar
        setExpandedModules((prev) => {
          const newState: Record<number, boolean> = {};
          // Set all modules to collapsed
          course.modules.forEach((_, idx) => {
            newState[idx] = false;
          });
          // Expand only the previous module
          newState[prevModuleIndex] = true;
          return newState;
        });
      }
    }
  };

  const currentModule = course.modules[activeModuleIndex];
  const currentLesson = currentModule?.lessons[activeLessonIndex];
  const totalModules = course.modules.length;
  const totalLessons = currentModule?.lessons.length || 0;

  const totalCourseLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );
  const totalDoneLessons = aiCourseProgress?.done?.length || 0;
  const finishedPercentage = Math.round(
    (totalDoneLessons / totalCourseLessons) * 100,
  );

  if (error && !isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
        <ErrorIcon additionalClasses="h-24 w-24" />
        <h1 className="mt-2.5 text-2xl font-bold">Error Generating Course</h1>
        <p className="mt-1 text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="flex h-screen flex-grow flex-col overflow-hidden bg-gray-50">
      <div className="border-b border-gray-200 bg-gray-100">
        <div className="flex items-center px-4 py-2">
          <a
            href="/ai-tutor"
            className="flex flex-row items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
            aria-label="Back to generator"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
            Back to Generator
          </a>
        </div>
      </div>
      <header className="flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
        <div className="flex items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900">
              {course.title || 'Loading Course...'}
            </h1>
            <div className="mt-1 flex flex-row items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{totalModules} modules</span>
              <span className="text-gray-400">•</span>
              <span className="font-medium">{totalCourseLessons} lessons</span>
              {finishedPercentage > 0 && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-green-600">
                    {finishedPercentage}% complete
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AICourseLimit />

          {viewMode === 'module' && (
            <button
              onClick={() => {
                setExpandedModules({});
                setViewMode('full');
              }}
              className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              <BookOpenCheck size={18} className="mr-2" />
              View Course Outline
            </button>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 md:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-20 w-80 transform overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out md:relative md:mt-0 md:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div
            className={cn(
              'relative flex min-h-[40px] items-center justify-between border-b border-gray-200 px-3',
              isLoading && 'striped-loader bg-gray-50',
            )}
          >
            {!isLoading && (
              <div className="text-xs text-black">
                <span className="relative z-10 rounded-full bg-yellow-400 px-1.5 py-0.5">
                  {finishedPercentage}%
                </span>{' '}
                <span className="relative z-10">Completed</span>
                <span
                  style={{
                    width: `${finishedPercentage}%`,
                  }}
                  className={cn(
                    'absolute bottom-0 left-0 top-0',
                    'bg-gray-200/50',
                  )}
                ></span>
              </div>
            )}

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-1 hover:bg-gray-100 md:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <AICourseModuleList
            course={course}
            courseSlug={courseSlug}
            activeModuleIndex={
              viewMode === 'module' ? activeModuleIndex : undefined
            }
            setActiveModuleIndex={setActiveModuleIndex}
            activeLessonIndex={
              viewMode === 'module' ? activeLessonIndex : undefined
            }
            setActiveLessonIndex={setActiveLessonIndex}
            setSidebarOpen={setSidebarOpen}
            viewMode={viewMode}
            setViewMode={setViewMode}
            expandedModules={expandedModules}
            setExpandedModules={setExpandedModules}
            isLoading={isLoading}
          />
        </aside>

        <main
          className={cn(
            'flex-1 overflow-y-auto p-6 transition-all duration-200 ease-in-out',
            sidebarOpen ? 'md:ml-0' : '',
          )}
        >
          {viewMode === 'module' && (
            <AICourseModuleView
              courseSlug={courseSlug!}
              activeModuleIndex={activeModuleIndex}
              totalModules={totalModules}
              currentModuleTitle={currentModule?.title || ''}
              activeLessonIndex={activeLessonIndex}
              totalLessons={totalLessons}
              currentLessonTitle={currentLesson || ''}
              onGoToPrevLesson={goToPrevLesson}
              onGoToNextLesson={goToNextLesson}
              key={`${courseSlug}-${activeModuleIndex}-${activeLessonIndex}`}
            />
          )}

          {viewMode === 'full' && (
            <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white shadow-sm">
              <div
                className={cn(
                  'mb-8 flex items-start justify-between border-b border-gray-100 p-6',
                  isLoading && 'striped-loader',
                )}
              >
                <div>
                  <h2 className="mb-1 text-2xl font-bold">
                    {course.title || 'Loading course ..'}
                  </h2>
                  <p className="text-sm capitalize text-gray-500">
                    {course.title ? course.difficulty : 'Please wait ..'}
                  </p>
                </div>
              </div>
              {course.title ? (
                <div className="flex flex-col px-6 pb-6">
                  {course.modules.map((courseModule, moduleIdx) => {
                    return (
                      <div
                        key={moduleIdx}
                        className="mb-5 pb-4 last:border-0 last:pb-0"
                      >
                        <h2 className="mb-4 text-xl font-bold text-gray-800">
                          {courseModule.title}
                        </h2>
                        <div className="divide-y divide-gray-100">
                          {courseModule.lessons.map((lesson, lessonIdx) => {
                            const key = `${slugify(courseModule.title)}__${slugify(lesson)}`;
                            const isCompleted =
                              aiCourseProgress?.done.includes(key);

                            return (
                              <div
                                key={key}
                                className="flex cursor-pointer items-center gap-2 px-2 py-2.5 transition-colors hover:bg-gray-100"
                                onClick={() => {
                                  setActiveModuleIndex(moduleIdx);
                                  setActiveLessonIndex(lessonIdx);
                                  setExpandedModules((prev) => {
                                    const newState: Record<number, boolean> =
                                      {};
                                    course.modules.forEach((_, idx) => {
                                      newState[idx] = false;
                                    });
                                    newState[moduleIdx] = true;
                                    return newState;
                                  });

                                  setViewMode('module');
                                }}
                              >
                                {!isCompleted && (
                                  <span
                                    className={cn(
                                      'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-800',
                                    )}
                                  >
                                    {lessonIdx + 1}
                                  </span>
                                )}

                                {isCompleted && (
                                  <CheckIcon additionalClasses="size-6 flex-shrink-0 text-green-500" />
                                )}

                                <p className="flex-1 truncate text-base text-gray-800">
                                  {lesson.replace(/^Lesson\s*?\d+[\.:]\s*/, '')}
                                </p>
                                <span className="text-sm font-medium text-gray-700">
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
                  <Loader2 size={36} className="animate-spin text-gray-300" />
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </section>
  );
}
