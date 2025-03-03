import {
  ArrowLeft,
  BookOpenCheck,
  ChevronDown,
  ChevronRight,
  Loader2,
  Menu,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { readAICourseStream } from '../../helper/read-stream';
import { cn } from '../../lib/classname';
import { getUrlParams } from '../../lib/browser';
import { AICourseModuleView } from './AICourseModuleView';
import { showLoginPopup } from '../../lib/popup';
import { isLoggedIn } from '../../lib/jwt';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';

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
  slug?: string;
  term?: string;
  difficulty?: string;
};

export function AICourseContent(props: AICourseContentProps) {
  const {
    term: defaultTerm,
    difficulty: defaultDifficulty,
    slug: defaultSlug,
  } = props;

  const [term, setTerm] = useState(defaultTerm || '');
  const [difficulty, setDifficulty] = useState(defaultDifficulty || 'beginner');
  const [courseSlug, setCourseSlug] = useState(defaultSlug || '');

  const [courseId, setCourseId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [courseContent, setCourseContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [streamedCourse, setStreamedCourse] = useState<{
    title: string;
    modules: Module[];
  }>({
    title: '',
    modules: [],
  });
  const [expandedModules, setExpandedModules] = useState<
    Record<number, boolean>
  >({});
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'module' | 'full'>('full');

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
      streamedCourse.modules.forEach((_, idx) => {
        newState[idx] = false;
      });
      // Expand only the clicked module
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    if (!term || !difficulty) {
      return;
    }

    generateCourse({ term, difficulty });
  }, [term, difficulty]);

  useEffect(() => {
    if (!defaultSlug) {
      return;
    }

    generateCourse({ slug: defaultSlug });
  }, [defaultSlug]);

  useEffect(() => {
    if (term || courseSlug) {
      return;
    }

    const params = getUrlParams();
    const paramsTerm = params?.term;
    const paramsDifficulty = params?.difficulty;
    if (!paramsTerm || !paramsDifficulty) {
      return;
    }

    setTerm(paramsTerm);
    setDifficulty(paramsDifficulty);
  }, [term, difficulty, courseSlug]);

  const generateCourse = async ({
    term,
    difficulty,
    slug: slugToBeUsed,
  }: {
    term?: string;
    difficulty?: string;
    slug?: string;
  }) => {
    // it means that they are not logged in and they are not generating a course from a slug
    // so we need to show the login popup - basically they are trying to generate a course from the search page
    if (!isLoggedIn() && !defaultSlug) {
      showLoginPopup();
      return;
    }

    setIsLoading(true);
    setStreamedCourse({ title: '', modules: [] });
    setExpandedModules({});
    setViewMode('full');
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL || ''}/v1-generate-ai-course`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...(slugToBeUsed
              ? { slug: slugToBeUsed }
              : {
                  keyword: term,
                  difficulty,
                }),
          }),
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const data = await response.json();
        console.error(
          'Error generating course:',
          data?.message || 'Something went wrong',
        );
        setIsLoading(false);
        setError(data?.message || 'Something went wrong');
        return;
      }

      const reader = response.body?.getReader();

      if (!reader) {
        console.error('Failed to get reader from response');
        setError('Something went wrong');
        setIsLoading(false);
        return;
      }

      const COURSE_ID_REGEX = new RegExp('@COURSEID:(\\w+)@');
      const COURSE_SLUG_REGEX = new RegExp(/@COURSESLUG:([\w-]+)@/);

      await readAICourseStream(reader, {
        onStream: (result) => {
          if (result.includes('@COURSEID') || result.includes('@COURSESLUG')) {
            const courseIdMatch = result.match(COURSE_ID_REGEX);
            const courseSlugMatch = result.match(COURSE_SLUG_REGEX);
            const extractedCourseId = courseIdMatch?.[1] || '';
            const extractedCourseSlug = courseSlugMatch?.[1] || '';

            if (extractedCourseSlug && !defaultSlug) {
              window.history.replaceState(
                {
                  courseId,
                  courseSlug: extractedCourseSlug,
                },
                '',
                `${origin}/ai-tutor/${extractedCourseSlug}`,
              );
            }

            result = result
              .replace(COURSE_ID_REGEX, '')
              .replace(COURSE_SLUG_REGEX, '');

            setCourseId(extractedCourseId);
            setCourseSlug(extractedCourseSlug);
          }

          // Store the raw content and log it
          setCourseContent(result);

          // Parse the streamed content to update the sidebar in real-time
          try {
            const lines = result.split('\n');
            let title = '';
            const modules: Module[] = [];
            let currentModule: Module | null = null;

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].trim();

              if (i === 0 && line.startsWith('#')) {
                // First line is the title
                title = line.replace('#', '').trim();
              } else if (line.startsWith('## ')) {
                // New module
                if (currentModule) {
                  modules.push(currentModule);
                }
                currentModule = {
                  title: line.replace('## ', ''),
                  lessons: [],
                };
                // Removed auto-expand code to keep modules collapsed by default
              } else if (line.startsWith('- ') && currentModule) {
                // Lesson within current module
                currentModule.lessons.push(line.replace('- ', ''));
              }
            }

            // Add the last module if it exists
            if (currentModule) {
              modules.push(currentModule);
            }

            setStreamedCourse({
              title,
              modules,
            });
          } catch (e) {
            console.error('Error parsing streamed course content:', e);
          }
        },
        onStreamEnd: (result) => {
          result = result
            .replace(COURSE_ID_REGEX, '')
            .replace(COURSE_SLUG_REGEX, '');
          setCourseContent(result);
          setIsLoading(false);
        },
      });
    } catch (error: any) {
      setError(error?.message || 'Something went wrong');
      console.error('Error in course generation:', error);
      setIsLoading(false);
    }
  };

  // Navigation helpers
  const goToNextModule = () => {
    if (activeModuleIndex < streamedCourse.modules.length - 1) {
      const nextModuleIndex = activeModuleIndex + 1;
      setActiveModuleIndex(nextModuleIndex);
      setActiveLessonIndex(0);

      // Expand the next module in the sidebar
      setExpandedModules((prev) => {
        const newState: Record<number, boolean> = {};
        // Set all modules to collapsed
        streamedCourse.modules.forEach((_, idx) => {
          newState[idx] = false;
        });
        // Expand only the next module
        newState[nextModuleIndex] = true;
        return newState;
      });
    }
  };

  const goToNextLesson = () => {
    const currentModule = streamedCourse.modules[activeModuleIndex];
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
      const prevModule = streamedCourse.modules[activeModuleIndex - 1];
      if (prevModule) {
        const prevModuleIndex = activeModuleIndex - 1;
        setActiveModuleIndex(prevModuleIndex);
        setActiveLessonIndex(prevModule.lessons.length - 1);

        // Expand the previous module in the sidebar
        setExpandedModules((prev) => {
          const newState: Record<number, boolean> = {};
          // Set all modules to collapsed
          streamedCourse.modules.forEach((_, idx) => {
            newState[idx] = false;
          });
          // Expand only the previous module
          newState[prevModuleIndex] = true;
          return newState;
        });
      }
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const { courseId, courseSlug } = e.state || {};
      if (!courseId || !courseSlug) {
        window.location.reload();
        return;
      }

      setCourseId(courseId);
      setCourseSlug(courseSlug);

      setIsLoading(true);
      generateCourse({ slug: courseSlug }).finally(() => {
        setIsLoading(false);
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const currentModule = streamedCourse.modules[activeModuleIndex];
  const currentLesson = currentModule?.lessons[activeLessonIndex];
  const totalModules = streamedCourse.modules.length;
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
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/ai-tutor/search';
              }
            }}
            className="mr-4 rounded-md p-2 hover:bg-gray-100"
            aria-label="Back to generator"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">
            {streamedCourse.title || 'Loading Course...'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {viewMode === 'module' && (
            <button
              onClick={() => {
                // Collapse all modules in the sidebar when switching to outline view
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
          {/* Course title */}
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
              {streamedCourse.modules.reduce(
                (total, module) => total + module.lessons.length,
                0,
              )}{' '}
              lessons
            </div>
          </div>

          {/* Module list */}
          <nav className="space-y-1 px-2">
            {streamedCourse.modules.map((module, moduleIdx) => (
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
                    <ChevronDown size={16} className="flex-shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="flex-shrink-0" />
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
                            streamedCourse.modules.forEach((_, idx) => {
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
        </aside>

        <main
          className={cn(
            'flex-1 overflow-y-auto p-6 transition-all duration-200 ease-in-out',
            sidebarOpen ? 'md:ml-0' : '',
          )}
        >
          {viewMode === 'module' && (
            <AICourseModuleView
              courseSlug={courseSlug}
              activeModuleIndex={activeModuleIndex}
              totalModules={totalModules}
              currentModuleTitle={currentModule?.title || ''}
              activeLessonIndex={activeLessonIndex}
              totalLessons={totalLessons}
              currentLessonTitle={currentLesson || ''}
              onGoToPrevLesson={goToPrevLesson}
              onGoToNextLesson={goToNextLesson}
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
              {streamedCourse.title ? (
                <div className="flex flex-col">
                  {streamedCourse.modules.map((module, moduleIdx) => (
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
                                streamedCourse.modules.forEach((_, idx) => {
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
