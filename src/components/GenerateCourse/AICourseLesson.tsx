import { useMutation } from '@tanstack/react-query';
import {
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  GitForkIcon,
  Loader2Icon,
  LockIcon,
  MessageCircleIcon,
  MessageCircleOffIcon,
  XIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { AICourseDocument } from '../../api/ai-roadmap';
import { readStream } from '../../lib/ai';
import { cn } from '../../lib/classname';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import {
  markdownToHtml,
  markdownToHtmlWithHighlighting,
} from '../../lib/markdown';
import { httpPatch } from '../../lib/query-http';
import { slugify } from '../../lib/slugger';
import {
  getAiCourseLimitOptions,
  getAiCourseOptions,
} from '../../queries/ai-course';
import { useIsPaidUser } from '../../queries/billing';
import { queryClient } from '../../stores/query-client';
import './AICourseLessonChat.css';
import { RegenerateLesson } from './RegenerateLesson';
import { TestMyKnowledgeAction } from './TestMyKnowledgeAction';
import {
  AICourseLessonChat,
  type AIChatHistoryType,
} from './AICourseLessonChat';
import { AICourseFooter } from './AICourseFooter';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './Resizeable';

function getQuestionsFromResult(result: string) {
  const matchedQuestions = result.match(
    /=START_QUESTIONS=(.*?)=END_QUESTIONS=/,
  );

  if (matchedQuestions) {
    return matchedQuestions[1].split('@@');
  }

  return [];
}

type AICourseLessonProps = {
  courseSlug: string;
  progress: string[];
  creatorId?: string;

  activeModuleIndex: number;
  totalModules: number;
  currentModuleTitle: string;
  activeLessonIndex: number;
  totalLessons: number;
  currentLessonTitle: string;

  onGoToPrevLesson: () => void;
  onGoToNextLesson: () => void;

  onUpgrade: () => void;

  isAIChatsOpen: boolean;
  setIsAIChatsOpen: (isOpen: boolean) => void;

  isForkable: boolean;
  onForkCourse: () => void;
};

export function AICourseLesson(props: AICourseLessonProps) {
  const {
    courseSlug,
    progress = [],
    creatorId,

    activeModuleIndex,
    totalModules,
    currentModuleTitle,
    activeLessonIndex,
    totalLessons,
    currentLessonTitle,

    onGoToPrevLesson,
    onGoToNextLesson,

    onUpgrade,

    isAIChatsOpen,
    setIsAIChatsOpen,

    isForkable,
    onForkCourse,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [defaultQuestions, setDefaultQuestions] = useState<string[]>([]);

  const [lessonHtml, setLessonHtml] = useState('');

  const lessonId = `${slugify(String(activeModuleIndex))}-${slugify(String(activeLessonIndex))}`;
  const isLessonDone = progress?.includes(lessonId);

  const [courseAIChatHistory, setCourseAIChatHistory] = useState<
    AIChatHistoryType[]
  >([
    {
      role: 'assistant',
      content: 'Hey, I am your AI instructor. How can I help you today? 🤖',
      isDefault: true,
    },
  ]);

  const { isPaidUser } = useIsPaidUser();

  const abortController = useMemo(
    () => new AbortController(),
    [activeModuleIndex, activeLessonIndex],
  );

  const generateAiCourseContent = async (
    isForce?: boolean,
    customPrompt?: string,
  ) => {
    setIsLoading(true);
    setError('');
    setLessonHtml('');

    if (!isLoggedIn()) {
      setIsLoading(false);
      setError('Please login to generate course content');
      return;
    }

    if (!currentModuleTitle || !currentLessonTitle) {
      setIsLoading(false);
      setError('Invalid module title or lesson title');
      return;
    }

    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-course-lesson/${courseSlug}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortController.signal,
        credentials: 'include',
        body: JSON.stringify({
          moduleIndex: activeModuleIndex,
          lessonIndex: activeLessonIndex,
          isForce,
          customPrompt,
        }),
      },
    );

    if (!response.ok) {
      const data = await response.json();

      setError(data?.message || 'Something went wrong');
      setIsLoading(false);

      // Logout user if token is invalid
      if (data.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
      return;
    }

    if (!response.body) {
      setIsLoading(false);
      setError('No response body received');
      return;
    }

    try {
      const reader = response.body.getReader();
      setIsLoading(false);
      setIsGenerating(true);
      await readStream(reader, {
        onStream: async (result) => {
          if (abortController.signal.aborted) {
            return;
          }

          const questions = getQuestionsFromResult(result);
          setDefaultQuestions(questions);
          const newResult = result.replace(
            /=START_QUESTIONS=.*?=END_QUESTIONS=/,
            '',
          );

          setLessonHtml(markdownToHtml(newResult, false));
        },
        onStreamEnd: async (result) => {
          if (abortController.signal.aborted) {
            return;
          }

          const questions = getQuestionsFromResult(result);
          setDefaultQuestions(questions);

          const newResult = result.replace(
            /=START_QUESTIONS=.*?=END_QUESTIONS=/,
            '',
          );

          const markdownHtml = await markdownToHtmlWithHighlighting(
            newResult,
          ).catch((e) => {
            console.error(e);
            return newResult;
          });

          setLessonHtml(markdownHtml);
          queryClient.invalidateQueries(getAiCourseLimitOptions());
          setIsGenerating(false);
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  const { mutate: toggleDone, isPending: isTogglingDone } = useMutation(
    {
      mutationFn: () => {
        return httpPatch<AICourseDocument>(
          `/v1-toggle-done-ai-lesson/${courseSlug}`,
          {
            moduleIndex: activeModuleIndex,
            lessonIndex: activeLessonIndex,
          },
        );
      },
      onSuccess: (data) => {
        queryClient.setQueryData(
          getAiCourseOptions({ aiCourseSlug: courseSlug }).queryKey,
          data,
        );
      },
    },
    queryClient,
  );

  useEffect(() => {
    generateAiCourseContent();
  }, [currentModuleTitle, currentLessonTitle]);

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  const cantGoForward =
    (activeModuleIndex === totalModules - 1 &&
      activeLessonIndex === totalLessons - 1) ||
    isGenerating ||
    isLoading;

  const cantGoBack =
    (activeModuleIndex === 0 && activeLessonIndex === 0) ||
    isGenerating ||
    isLoading;

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={isAIChatsOpen ? 70 : 100}
          minSize={40}
          id="course-text-content"
          className="h-full overflow-y-scroll! bg-white"
          order={1}
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="bg-white p-8 pb-0 max-lg:px-4 max-lg:pt-3">
              {(isGenerating || isLoading) && (
                <div className="absolute top-6 right-6 flex items-center justify-center">
                  <Loader2Icon
                    size={18}
                    strokeWidth={3}
                    className="animate-spin text-gray-400/70"
                  />
                </div>
              )}

              <div className="mb-4 flex max-sm:flex-col-reverse justify-between">
                <div className="text-sm text-gray-500">
                  Lesson {activeLessonIndex + 1} of {totalLessons}
                </div>

                {!isGenerating && !isLoading && (
                  <div className="md:absolute top-2 right-2 flex items-center max-sm:justify-end gap-2 lg:top-6 lg:right-6 mb-3">
                    <button
                      onClick={() => setIsAIChatsOpen(!isAIChatsOpen)}
                      className="rounded-full p-1 text-gray-400 hover:text-black max-lg:hidden"
                    >
                      {!isAIChatsOpen ? (
                        <MessageCircleIcon className="size-4 stroke-[2.5]" />
                      ) : (
                        <MessageCircleOffIcon className="size-4 stroke-[2.5]" />
                      )}
                    </button>

                    <RegenerateLesson
                      onRegenerateLesson={(prompt) => {
                        generateAiCourseContent(true, prompt);
                      }}
                      isForkable={isForkable}
                      onForkCourse={onForkCourse}
                    />

                    {isForkable && (
                      <button
                        onClick={onForkCourse}
                        className="flex items-center gap-1.5 rounded-full border bg-gray-100 py-1 pr-4 pl-3 text-sm text-black hover:bg-gray-200 disabled:opacity-50 max-lg:text-xs"
                      >
                        <GitForkIcon className="size-3.5" />
                        Fork Course
                      </button>
                    )}
                    <button
                      disabled={isLoading || isTogglingDone}
                      className={cn(
                        'flex items-center gap-1.5 rounded-full bg-black py-1 pr-3 pl-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50 max-lg:text-xs',
                        isLessonDone
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600',
                      )}
                      onClick={() => {
                        if (isForkable) {
                          onForkCourse();
                          return;
                        }

                        toggleDone();
                      }}
                    >
                      {isTogglingDone ? (
                        <>
                          <Loader2Icon
                            size={16}
                            strokeWidth={3}
                            className="animate-spin text-white"
                          />
                          Please wait ...
                        </>
                      ) : (
                        <>
                          {isLessonDone ? (
                            <>
                              <XIcon size={16} />
                              Mark as Undone
                            </>
                          ) : (
                            <>
                              <CheckIcon size={16} />
                              Mark as Done
                            </>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <h1 className="mb-6 text-3xl font-semibold text-balance max-lg:mb-3 max-lg:text-xl">
                {currentLessonTitle?.replace(/^Lesson\s*?\d+[\.:]\s*/, '')}
              </h1>

              {!error && isLoggedIn() && (
                <div
                  className="course-content prose prose-lg prose-headings:mb-3 prose-headings:mt-8 prose-blockquote:font-normal prose-pre:rounded-2xl prose-pre:text-lg prose-li:my-1 prose-thead:border-zinc-800 prose-tr:border-zinc-800 max-lg:prose-h2:mt-3 max-lg:prose-h2:text-lg max-lg:prose-h3:text-base max-lg:prose-pre:px-3 max-lg:prose-pre:text-sm mt-8 max-w-full text-black max-lg:mt-4 max-lg:text-base"
                  dangerouslySetInnerHTML={{ __html: lessonHtml }}
                />
              )}

              {error && isLoggedIn() && (
                <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-xl bg-red-50/80">
                  {error.includes('reached the limit') ? (
                    <div className="flex max-w-sm flex-col items-center text-center">
                      <h2 className="text-xl font-semibold text-red-600">
                        Limit reached
                      </h2>
                      <p className="my-3 text-red-600">
                        You have reached the AI usage limit for today.
                        {!isPaidUser && (
                          <>Please upgrade your account to continue.</>
                        )}
                        {isPaidUser && (
                          <>&nbsp;Please wait until tomorrow to continue.</>
                        )}
                      </p>

                      {!isPaidUser && (
                        <button
                          onClick={() => {
                            onUpgrade();
                          }}
                          className="rounded-full bg-red-600 px-4 py-1 text-white hover:bg-red-700"
                        >
                          Upgrade Account
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-600">{error}</p>
                  )}
                </div>
              )}

              {!isLoggedIn() && (
                <div className="mt-8 flex min-h-[152px] flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 p-8">
                  <LockIcon className="size-7 stroke-2 text-gray-400/90" />
                  <p className="text-sm text-gray-500">
                    Please login to generate course content
                  </p>
                </div>
              )}

              {!isLoading && !isGenerating && !error && (
                <TestMyKnowledgeAction
                  courseSlug={courseSlug}
                  activeModuleIndex={activeModuleIndex}
                  activeLessonIndex={activeLessonIndex}
                />
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={onGoToPrevLesson}
                  disabled={cantGoBack}
                  className={cn(
                    'flex items-center rounded-full px-4 py-2 disabled:opacity-50 max-lg:px-3 max-lg:py-1.5 max-lg:text-sm',
                    cantGoBack
                      ? 'cursor-not-allowed text-gray-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  )}
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Previous{' '}
                  <span className="hidden lg:inline">&nbsp;Lesson</span>
                </button>

                <div>
                  <button
                    onClick={() => {
                      if (!isLessonDone) {
                        toggleDone(undefined, {
                          onSuccess: () => {
                            onGoToNextLesson();
                          },
                        });
                      } else {
                        onGoToNextLesson();
                      }
                    }}
                    disabled={cantGoForward || isTogglingDone}
                    className={cn(
                      'flex items-center rounded-full px-4 py-2 disabled:opacity-50 max-lg:px-3 max-lg:py-1.5 max-lg:text-sm',
                      cantGoForward
                        ? 'cursor-not-allowed text-gray-400'
                        : 'bg-gray-800 text-white hover:bg-gray-700',
                    )}
                  >
                    {isTogglingDone ? (
                      <>
                        <Loader2Icon
                          size={16}
                          strokeWidth={3}
                          className="animate-spin text-white"
                        />
                        Please wait ...
                      </>
                    ) : (
                      <>
                        Next{' '}
                        <span className="hidden lg:inline">&nbsp;Lesson</span>
                        <ChevronRight size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <AICourseFooter />
            </div>
          </div>
        </ResizablePanel>
        {isAIChatsOpen && (
          <>
            <ResizableHandle withHandle={false} className="max-lg:hidden" />
            <AICourseLessonChat
              courseSlug={courseSlug}
              moduleTitle={currentModuleTitle}
              lessonTitle={currentLessonTitle}
              onUpgradeClick={onUpgrade}
              courseAIChatHistory={courseAIChatHistory}
              setCourseAIChatHistory={setCourseAIChatHistory}
              isDisabled={isGenerating || isLoading || isTogglingDone}
              isGeneratingLesson={isGenerating || isLoading}
              defaultQuestions={defaultQuestions}
              onClose={() => setIsAIChatsOpen(false)}
              isAIChatsOpen={isAIChatsOpen}
              setIsAIChatsOpen={setIsAIChatsOpen}
            />
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
