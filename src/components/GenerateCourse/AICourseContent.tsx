import { ArrowLeft, BookOpenCheck, Loader2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';
import { type AiCourse } from '../../lib/ai';
import { getAiCourseProgressOptions } from '../../queries/ai-course';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { AICourseModuleList } from './AICourseModuleList';
import { AICourseModuleView } from './AICourseModuleView';

type Lesson = string;

type Module = {
  title: string;
  lessons: Lesson[];
};

type Course = {
  title: string;
  modules: Module[];
  difficulty: string;
};

type AICourseContentProps = {
  courseSlug?: string;
  course: AiCourse;
  isLoading: boolean;
};

export function AICourseContent(props: AICourseContentProps) {
  const { course, courseSlug, isLoading } = props;

  const [courseId, setCourseId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'module' | 'full'>('full');

  const [expandedModules, setExpandedModules] = useState<
    Record<number, boolean>
  >({});

  const { data: aiCourseProgress } = useQuery(
    getAiCourseProgressOptions({ aiCourseSlug: courseSlug || '' }),
    queryClient,
  );

  // Navigation helpers
  const goToNextModule = () => {
    if (activeModuleIndex < course.modules.length - 1) {
      const nextModuleIndex = activeModuleIndex + 1;
      setActiveModuleIndex(nextModuleIndex);
      setActiveLessonIndex(0);

      // Expand the next module in the sidebar
      setExpandedModules((prev) => {
        const newState: Record<number, boolean> = {};
        // Set all modules to collapsed
        course.modules.forEach((_, idx) => {
          newState[idx] = false;
        });
        // Expand only the next module
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
      <header className="flex h-16 items-center justify-between bg-white px-4 shadow-sm">
        <div className="flex items-center">
          <a
            href="/ai-tutor"
            className="mr-4 rounded-md p-2 hover:bg-gray-100"
            aria-label="Back to generator"
          >
            <ArrowLeft size={20} />
          </a>
          <h1 className="text-xl font-bold">
            {course.title || 'Loading Course...'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {viewMode === 'module' && (
            <button
              onClick={() => {
                setExpandedModules({});
                setViewMode('full');
              }}
              className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
            >
              <BookOpenCheck size={16} className="mr-2" />
              View Course Outline
            </button>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 md:hidden"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-20 mt-16 w-80 transform overflow-y-auto border-r border-gray-200 bg-white pt-4 transition-transform duration-200 ease-in-out md:relative md:mt-0 md:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="mb-4 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Course Content</h2>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2
                    size={16}
                    className="mr-2 animate-spin text-gray-400"
                  />
                )}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-md p-1 hover:bg-gray-100 md:hidden"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {totalModules} modules •{' '}
              {course.modules.reduce(
                (total, module) => total + module.lessons.length,
                0,
              )}{' '}
              lessons
            </div>
          </div>

          <AICourseModuleList
            course={course}
            activeModuleIndex={activeModuleIndex}
            setActiveModuleIndex={setActiveModuleIndex}
            activeLessonIndex={activeLessonIndex}
            setActiveLessonIndex={setActiveLessonIndex}
            setSidebarOpen={setSidebarOpen}
            viewMode={viewMode}
            setViewMode={setViewMode}
            expandedModules={expandedModules}
            setExpandedModules={setExpandedModules}
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
            <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Course Outline</h2>
                {isLoading && (
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                )}
              </div>
              {course.title ? (
                <div className="flex flex-col">
                  {course.modules.map((module, moduleIdx) => (
                    <div
                      key={moduleIdx}
                      className="mb-5 pb-4 last:border-0 last:pb-0"
                    >
                      <h2 className="mb-2 text-xl font-bold text-gray-800">
                        {module.title}
                      </h2>
                      <div className="ml-2 space-y-1">
                        {module.lessons.map((lesson, lessonIdx) => (
                          <div
                            key={lessonIdx}
                            className="flex cursor-pointer items-start rounded-md border border-gray-100 p-2 transition-colors hover:border-gray-300 hover:bg-blue-50"
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
                          >
                            <span className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                              {lessonIdx + 1}
                            </span>
                            <p className="flex-1 pt-0.5 text-gray-700">
                              {lesson}
                            </p>
                            <span className="text-sm font-medium text-blue-600">
                              View →
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center">
                  <Loader2 size={40} className="animate-spin text-gray-400" />
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
