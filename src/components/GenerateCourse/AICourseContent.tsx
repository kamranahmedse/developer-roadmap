import {
  ArrowLeft,
  BookOpenCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  Loader2,
  Menu,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { readAICourseStream } from '../../helper/read-stream';
import { markdownToHtml } from '../../lib/markdown';
import { getUrlParams } from '../../lib/browser';

// Define types for our course structure
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

type AICourseContentProps = {};

export function AICourseContent(props: AICourseContentProps) {
  const [term, setTerm] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');

  const [courseId, setCourseId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [courseContent, setCourseContent] = useState('');

  useEffect(() => {
    const urlParams = getUrlParams();
    const termFromUrl = urlParams.term as string | '';
    const difficultyFromUrl = urlParams.difficulty || 'beginner';

    if (!termFromUrl) {
      window.location.href = '/ai-tutor';
      return;
    }

    setTerm(termFromUrl);
    setDifficulty(difficultyFromUrl);
  }, []);

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
    if (!term && !courseId) {
      return;
    }

    if (courseId) {
      // fetchCourse();
    } else {
      generateCourse(term, difficulty);
    }
  }, [courseId, term, difficulty]);

  const generateCourse = async (term: string, difficulty: string) => {
    setIsLoading(true);
    setStreamedCourse({ title: '', modules: [] });
    setExpandedModules({});
    setViewMode('full');

    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL || ''}/v1-generate-ai-course`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: term,
            difficulty,
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
        return;
      }

      const reader = response.body?.getReader();

      if (!reader) {
        console.error('Failed to get reader from response');
        setIsLoading(false);
        return;
      }

      // Define regex patterns to extract course ID
      const COURSE_ID_REGEX = new RegExp('@COURSEID:(\\w+)@');

      await readAICourseStream(reader, {
        onStream: (result) => {
          // Check if the result contains a course ID
          if (result.includes('@COURSEID')) {
            const courseIdMatch = result.match(COURSE_ID_REGEX);
            const extractedCourseId = courseIdMatch?.[1] || '';

            if (extractedCourseId) {
              console.log('extractedCourseId', extractedCourseId);
              // setCourseId(extractedCourseId);

              // Remove the course ID token from the result
              result = result.replace(COURSE_ID_REGEX, '');
            }
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
          // Clean up any tokens from the final result
          result = result.replace(COURSE_ID_REGEX, '');
          setCourseContent(result);

          try {
            const lines = result.split('\n');
            const title = lines[0].replace('#', '').trim();
            const modules: Module[] = [];

            let currentModule: Module | null = null;

            for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim();

              if (line.startsWith('## ')) {
                // New module
                if (currentModule) {
                  modules.push(currentModule);
                }
                currentModule = {
                  title: line.replace('## ', ''),
                  lessons: [],
                };
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
            console.error('Error parsing course content:', e);
          }

          setIsLoading(false);
        },
      });
    } catch (error) {
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

  const goToPrevModule = () => {
    if (activeModuleIndex > 0) {
      const prevModuleIndex = activeModuleIndex - 1;
      setActiveModuleIndex(prevModuleIndex);
      setActiveLessonIndex(0);

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

  const currentModule = streamedCourse.modules[activeModuleIndex];
  const currentLesson = currentModule?.lessons[activeLessonIndex];
  const totalModules = streamedCourse.modules.length;
  const totalLessons = currentModule?.lessons.length || 0;

  return (
    <section className="flex h-screen flex-grow flex-col overflow-hidden bg-gray-50">
      {/* Top navigation bar */}
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

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-20 mt-16 w-80 transform overflow-y-auto border-r border-gray-200 bg-white pt-4 transition-transform duration-200 ease-in-out md:relative md:mt-0 md:translate-x-0`}
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
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeModuleIndex === moduleIdx
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
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
                        className={`flex w-full items-start rounded-md px-3 py-2 text-left text-sm ${
                          activeModuleIndex === moduleIdx &&
                          activeLessonIndex === lessonIdx
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
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

        {/* Main content */}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-200 ease-in-out ${
            sidebarOpen ? 'md:ml-0' : ''
          }`}
        >
          {viewMode === 'module' ? (
            <div className="mx-auto max-w-4xl">
              {/* Module and lesson navigation */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500">
                    Module {activeModuleIndex + 1} of {totalModules}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {currentModule?.title?.replace(
                      /^Module\s*?\d+[\.:]\s*/,
                      '',
                    ) || 'Loading...'}
                  </h2>
                </div>
              </div>

              {/* Current lesson */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Lesson {activeLessonIndex + 1} of {totalLessons}
                  </div>
                </div>

                <h3 className="mb-6 text-xl font-semibold">
                  {currentLesson?.replace(/^Lesson\s*?\d+[\.:]\s*/, '')}
                </h3>

                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    This lesson is part of the "{currentModule?.title}" module.
                  </p>
                </div>

                {/* Navigation buttons */}
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={goToPrevLesson}
                    disabled={
                      activeModuleIndex === 0 && activeLessonIndex === 0
                    }
                    className={`flex items-center rounded-md px-4 py-2 ${
                      activeModuleIndex === 0 && activeLessonIndex === 0
                        ? 'cursor-not-allowed text-gray-400'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ChevronLeft size={16} className="mr-2" />
                    Previous Lesson
                  </button>

                  <button
                    onClick={goToNextLesson}
                    disabled={
                      activeModuleIndex === totalModules - 1 &&
                      activeLessonIndex === totalLessons - 1
                    }
                    className={`flex items-center rounded-md px-4 py-2 ${
                      activeModuleIndex === totalModules - 1 &&
                      activeLessonIndex === totalLessons - 1
                        ? 'cursor-not-allowed text-gray-400'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    Next Lesson
                    <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Full course content view */
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

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </section>
  );
}
