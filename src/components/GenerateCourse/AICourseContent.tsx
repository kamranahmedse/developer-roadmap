import {
  BookOpenCheck,
  ChevronLeft,
  CircleAlert,
  CircleOff,
  Menu,
  X,
  Map,
  MessageCircleOffIcon,
  MessageCircleIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { type AiCourse } from '../../lib/ai';
import { cn } from '../../lib/classname';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';
import { AICourseLesson } from './AICourseLesson';
import { AICourseLimit } from './AICourseLimit';
import { AICourseSidebarModuleList } from './AICourseSidebarModuleList';
import { AILimitsPopup } from './AILimitsPopup';
import { AICourseOutlineView } from './AICourseOutlineView';
import { AICourseRoadmapView } from './AICourseRoadmapView';
import { AICourseFooter } from './AICourseFooter';
import { ForkCourseAlert } from './ForkCourseAlert';
import { ForkCourseConfirmation } from './ForkCourseConfirmation';
import { useAuth } from '../../hooks/use-auth';
import { getPercentage } from '../../lib/number';

type AICourseContentProps = {
  courseSlug?: string;
  course: AiCourse;
  isLoading: boolean;
  error?: string;
  onRegenerateOutline: (prompt?: string) => void;
  creatorId?: string;
};

export type AICourseViewMode = 'module' | 'outline' | 'roadmap';

export function AICourseContent(props: AICourseContentProps) {
  const {
    course,
    courseSlug,
    isLoading,
    error,
    onRegenerateOutline,
    creatorId,
  } = props;

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAILimitsPopup, setShowAILimitsPopup] = useState(false);
  const [isAIChatsOpen, setIsAIChatsOpen] = useState(true);

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<AICourseViewMode>('outline');
  const [isForkingCourse, setIsForkingCourse] = useState(false);

  const { isPaidUser } = useIsPaidUser();
  const currentUser = useAuth();

  const aiCourseProgress = course.done || [];

  const [expandedModules, setExpandedModules] = useState<
    Record<number, boolean>
  >({});

  const goToNextModule = () => {
    if (activeModuleIndex >= course.modules.length) {
      return;
    }

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
      return;
    }

    const prevModule = course.modules[activeModuleIndex - 1];
    if (!prevModule) {
      return;
    }

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
  };

  const currentModule = course.modules[activeModuleIndex];
  const currentLesson = currentModule?.lessons[activeLessonIndex];
  const totalModules = course.modules.length;
  const totalLessons = currentModule?.lessons.length || 0;

  const totalCourseLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  const totalDoneLessons = (course?.done || []).length;
  const finishedPercentage = getPercentage(
    totalDoneLessons,
    totalCourseLessons,
  );

  const modals = (
    <>
      {showUpgradeModal && (
        <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
      )}

      {showAILimitsPopup && (
        <AILimitsPopup
          onClose={() => setShowAILimitsPopup(false)}
          onUpgrade={() => {
            setShowAILimitsPopup(false);
            setShowUpgradeModal(true);
          }}
        />
      )}
    </>
  );

  useEffect(() => {
    if (window && window?.innerWidth < 1024 && isAIChatsOpen) {
      setIsAIChatsOpen(false);
    }
  }, []);

  if (error && !isLoading) {
    const isLimitReached = error.includes('limit');
    const isNotFound = error.includes('not exist');

    let icon = <ErrorIcon additionalClasses="mb-4 size-16" />;
    let title = 'Error occurred';
    let message = error;

    if (isLimitReached) {
      icon = <CircleAlert className="mb-4 size-16 text-yellow-500" />;
      title = 'Limit Reached';
      message =
        'You have reached the daily AI usage limit. Please upgrade your account to continue.';
    } else if (isNotFound) {
      icon = <CircleOff className="mb-4 size-16 text-gray-300" />;
      title = 'Course Not Found';
      message =
        'The course you are looking for does not exist. Why not create your own course?';
    }

    const showUpgradeButton = isLimitReached && !isPaidUser;

    return (
      <>
        {modals}
        <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
          {icon}
          <h1 className="mb-2 text-2xl font-bold">{title}</h1>
          <p className="max-w-sm text-balance text-gray-500">{message}</p>

          {showUpgradeButton && (
            <div className="my-5">
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="rounded-md bg-yellow-400 px-6 py-2 text-sm font-medium text-black hover:bg-yellow-500"
              >
                Upgrade to remove Limits
              </button>

              <p className="mt-5 text-sm text-black">
                <a
                  href="/ai"
                  className="font-medium underline underline-offset-2"
                >
                  Back to AI Tutor
                </a>
              </p>
            </div>
          )}

          {(isNotFound || !showUpgradeButton) && (
            <div className="my-5">
              <a
                href="/ai"
                className="hover:bg-opacity-80 rounded-md bg-black px-6 py-2 text-sm font-medium text-white"
              >
                Create a course with AI
              </a>
            </div>
          )}
        </div>
      </>
    );
  }

  const isViewingLesson = viewMode === 'module';
  const isForkable = !!currentUser?.id && currentUser.id !== creatorId;

  return (
    <section className="flex h-screen grow flex-col overflow-hidden bg-gray-50">
      {modals}

      <div className="border-b border-gray-200 bg-gray-100">
        <div className="flex items-center justify-between px-4 py-2">
          <a
            href="/ai"
            onClick={(e) => {
              if (isViewingLesson) {
                e.preventDefault();
                setViewMode('outline');
              }
            }}
            className="flex flex-row items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
            aria-label="Back to generator"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
            Back{' '}
            <span className="hidden lg:inline">
              {isViewingLesson ? 'to Outline' : 'to AI Tutor'}
            </span>
          </a>
          <div className="flex items-center gap-2">
            <div className="flex flex-row lg:hidden">
              <AICourseLimit
                onUpgrade={() => setShowUpgradeModal(true)}
                onShowLimits={() => setShowAILimitsPopup(true)}
              />
            </div>

            {viewMode === 'module' && (
              <button
                onClick={() => setIsAIChatsOpen(!isAIChatsOpen)}
                className="flex items-center justify-center text-gray-400 shadow-xs transition-colors hover:bg-gray-50 hover:text-gray-900 lg:hidden"
              >
                {isAIChatsOpen ? (
                  <MessageCircleOffIcon size={17} strokeWidth={3} />
                ) : (
                  <MessageCircleIcon size={17} strokeWidth={3} />
                )}
              </button>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center justify-center text-gray-400 shadow-xs transition-colors hover:bg-gray-50 hover:text-gray-900 lg:hidden"
            >
              {sidebarOpen ? (
                <X size={17} strokeWidth={3} />
              ) : (
                <Menu size={17} strokeWidth={3} />
              )}
            </button>
          </div>
        </div>
      </div>
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 max-lg:py-4 lg:h-[80px]">
        <div className="flex items-center">
          <div className="flex flex-col">
            <h1 className="text-xl leading-tight! font-bold text-balance text-gray-900 max-lg:mb-0.5 max-lg:text-lg">
              {course.title || 'Loading Course...'}
            </h1>
            <div className="mt-1 flex flex-row items-center gap-2 text-sm text-gray-600 max-lg:text-xs">
              <span className="font-medium">{totalModules} modules</span>
              <span className="text-gray-400">•</span>
              <span className="font-medium">{totalCourseLessons} lessons</span>

              {viewMode === 'module' && (
                <span className="flex flex-row items-center gap-1 lg:hidden">
                  <span className="text-gray-400">•</span>
                  <button
                    className="underline underline-offset-2"
                    onClick={() => {
                      setExpandedModules({});
                      setViewMode('outline');
                    }}
                  >
                    View outline
                  </button>
                </span>
              )}

              {finishedPercentage > 0 && !isLoading && (
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
        <div className="flex gap-2">
          <div className="hidden gap-2 lg:flex">
            <AICourseLimit
              onUpgrade={() => setShowUpgradeModal(true)}
              onShowLimits={() => setShowAILimitsPopup(true)}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-20 w-80 transform overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:relative lg:mt-0 lg:translate-x-0',
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
              <div className="flex w-full items-center justify-between text-xs text-black">
                <span>
                  <span className="relative z-10 rounded-full bg-yellow-400 px-1.5 py-0.5">
                    {finishedPercentage}%
                  </span>{' '}
                  <span className="relative z-10">Completed</span>
                </span>
                <span
                  style={{
                    width: `${finishedPercentage}%`,
                  }}
                  className={cn(
                    'absolute top-0 bottom-0 left-0',
                    'bg-gray-200/50',
                  )}
                ></span>

                <div className="flex gap-0 rounded-md bg-white p-0.5">
                  <button
                    onClick={() => {
                      setExpandedModules({});
                      setViewMode('outline');
                    }}
                    className={cn(
                      'flex items-center gap-1 rounded-sm px-2 py-1 text-xs transition-colors',
                      viewMode === 'outline'
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50',
                    )}
                  >
                    <BookOpenCheck size={14} />
                    Outline
                  </button>
                  <button
                    onClick={() => {
                      setExpandedModules({});
                      setViewMode('roadmap');
                    }}
                    className={cn(
                      'flex items-center gap-1 rounded-sm px-2 py-1 text-xs transition-colors',
                      viewMode === 'roadmap'
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50',
                    )}
                  >
                    <Map size={14} />
                    Map
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-1 hover:bg-gray-100 lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <AICourseSidebarModuleList
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
            'flex-1 overflow-y-scroll p-6 transition-all duration-200 ease-in-out max-lg:p-3',
            sidebarOpen ? 'lg:ml-0' : '',
            viewMode === 'module'
              ? 'flex flex-col overflow-hidden p-0 max-lg:p-0'
              : '',
          )}
          key={`${courseSlug}-${viewMode}`}
        >
          {isForkable &&
            courseSlug &&
            (viewMode === 'outline' || viewMode === 'roadmap') && (
              <ForkCourseAlert
                creatorId={creatorId}
                onForkCourse={() => {
                  setIsForkingCourse(true);
                }}
              />
            )}

          {isForkingCourse && (
            <ForkCourseConfirmation
              onClose={() => {
                setIsForkingCourse(false);
              }}
              courseSlug={courseSlug!}
            />
          )}

          {viewMode === 'module' && (
            <AICourseLesson
              courseSlug={courseSlug!}
              creatorId={creatorId}
              progress={aiCourseProgress}
              activeModuleIndex={activeModuleIndex}
              totalModules={totalModules}
              currentModuleTitle={currentModule?.title || ''}
              activeLessonIndex={activeLessonIndex}
              totalLessons={totalLessons}
              currentLessonTitle={currentLesson || ''}
              onGoToPrevLesson={goToPrevLesson}
              onGoToNextLesson={goToNextLesson}
              key={`${courseSlug}-${activeModuleIndex}-${activeLessonIndex}`}
              onUpgrade={() => setShowUpgradeModal(true)}
              isAIChatsOpen={isAIChatsOpen}
              setIsAIChatsOpen={setIsAIChatsOpen}
              isForkable={isForkable}
              onForkCourse={() => {
                setIsForkingCourse(true);
              }}
            />
          )}

          {viewMode === 'outline' && (
            <AICourseOutlineView
              course={course}
              isLoading={isLoading}
              onRegenerateOutline={onRegenerateOutline}
              setActiveModuleIndex={setActiveModuleIndex}
              setActiveLessonIndex={setActiveLessonIndex}
              setSidebarOpen={setSidebarOpen}
              setViewMode={setViewMode}
              setExpandedModules={setExpandedModules}
              viewMode={viewMode}
              isForkable={isForkable}
              onForkCourse={() => {
                setIsForkingCourse(true);
              }}
            />
          )}

          {viewMode === 'roadmap' && !isLoading && (
            <AICourseRoadmapView
              done={course.done}
              courseSlug={courseSlug!}
              course={course}
              isLoading={isLoading}
              onRegenerateOutline={onRegenerateOutline}
              setActiveModuleIndex={setActiveModuleIndex}
              setActiveLessonIndex={setActiveLessonIndex}
              setViewMode={setViewMode}
              setExpandedModules={setExpandedModules}
              onUpgradeClick={() => setShowUpgradeModal(true)}
              viewMode={viewMode}
              isForkable={isForkable}
              onForkCourse={() => {
                setIsForkingCourse(true);
              }}
            />
          )}

          <AICourseFooter className={viewMode === 'module' ? 'hidden' : ''} />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </section>
  );
}
