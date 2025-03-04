import { ChevronLeft, ChevronRight, Loader2Icon, LockIcon } from 'lucide-react';
import { cn } from '../../lib/classname';
import { useEffect, useMemo, useState } from 'react';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import { readAICourseLessonStream } from '../../helper/read-stream';
import {
  markdownToHtml,
  markdownToHtmlWithHighlighting,
} from '../../lib/markdown';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { slugify } from '../../lib/slugger';
import {
  getAiCourseLimitOptions,
  getAiCourseProgressOptions,
} from '../../queries/ai-course';
import { AICourseFollowUp } from './AICourseFollowUp';

type AICourseModuleViewProps = {
  courseSlug: string;

  activeModuleIndex: number;
  totalModules: number;
  currentModuleTitle: string;
  activeLessonIndex: number;
  totalLessons: number;
  currentLessonTitle: string;

  onGoToPrevLesson: () => void;
  onGoToNextLesson: () => void;
};

export function AICourseModuleView(props: AICourseModuleViewProps) {
  const {
    courseSlug,

    activeModuleIndex,
    totalModules,
    currentModuleTitle,
    activeLessonIndex,
    totalLessons,
    currentLessonTitle,

    onGoToPrevLesson,
    onGoToNextLesson,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const [lessonHtml, setLessonHtml] = useState('');
  const { data: aiCourseProgress } = useQuery(
    getAiCourseProgressOptions({ aiCourseSlug: courseSlug || '' }),
    queryClient,
  );

  const lessonId = `${slugify(currentModuleTitle)}__${slugify(currentLessonTitle)}`;
  const isLessonDone = aiCourseProgress?.done.includes(lessonId);

  const abortController = useMemo(
    () => new AbortController(),
    [activeModuleIndex, activeLessonIndex],
  );

  const generateAiCourseContent = async () => {
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
          moduleTitle: currentModuleTitle,
          lessonTitle: currentLessonTitle,
          modulePosition: activeModuleIndex,
          lessonPosition: activeLessonIndex,
          totalLessonsInModule: totalLessons,
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
    }

    const reader = response.body?.getReader();

    if (!reader) {
      setIsLoading(false);
      setError('Something went wrong');
      return;
    }

    setIsLoading(false);
    setIsGenerating(true);
    await readAICourseLessonStream(reader, {
      onStream: async (result) => {
        if (abortController.signal.aborted) {
          return;
        }

        setLessonHtml(markdownToHtml(result, false));
      },
      onStreamEnd: async (result) => {
        if (abortController.signal.aborted) {
          return;
        }

        setLessonHtml(await markdownToHtmlWithHighlighting(result));
        queryClient.invalidateQueries(getAiCourseLimitOptions());
        setIsGenerating(false);
      },
    });
  };

  const { mutate: markAsDone, isPending: isMarkingAsDone } = useMutation(
    {
      mutationFn: () => {
        return httpPost(`/v1-mark-as-done-ai-lesson/${courseSlug}`, {
          lessonId,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(
          getAiCourseProgressOptions({
            aiCourseSlug: courseSlug || '',
          }),
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

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500">
            Module {activeModuleIndex + 1} of {totalModules}
          </div>
          <h2 className="text-2xl font-bold">
            {currentModuleTitle?.replace(/^Module\s*?\d+[\.:]\s*/, '') ||
              'Loading...'}
          </h2>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Lesson {activeLessonIndex + 1} of {totalLessons}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-2">
          <h3 className="text-xl font-semibold">
            {currentLessonTitle?.replace(/^Lesson\s*?\d+[\.:]\s*/, '')}
          </h3>

          {(isGenerating || isLoading) && (
            <div className="flex items-center justify-center">
              <Loader2Icon size={24} className="animate-spin text-gray-400" />
            </div>
          )}

          {!isGenerating && !isLoading && !isLessonDone && (
            <button
              className="rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={isMarkingAsDone}
              onClick={() => markAsDone()}
            >
              {isMarkingAsDone ? 'Marking as Done...' : 'Mark as Done'}
            </button>
          )}
        </div>

        {!error && isLoggedIn() && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: lessonHtml }}
          />
        )}

        {error && isLoggedIn() && (
          <div className="mt-8 flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!isLoggedIn() && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 p-8">
            <LockIcon className="size-10 stroke-[2.5] text-gray-400" />
            <p className="text-sm text-gray-500">
              Please login to generate course content
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={onGoToPrevLesson}
            disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
            className={cn(
              'flex items-center rounded-md px-4 py-2',
              activeModuleIndex === 0 && activeLessonIndex === 0
                ? 'cursor-not-allowed text-gray-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            <ChevronLeft size={16} className="mr-2" />
            Previous Lesson
          </button>

          <button
            onClick={onGoToNextLesson}
            disabled={
              activeModuleIndex === totalModules - 1 &&
              activeLessonIndex === totalLessons - 1
            }
            className={cn(
              'flex items-center rounded-md px-4 py-2',
              activeModuleIndex === totalModules - 1 &&
                activeLessonIndex === totalLessons - 1
                ? 'cursor-not-allowed text-gray-400'
                : 'bg-gray-800 text-white hover:bg-gray-700',
            )}
          >
            Next Lesson
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </div>

      {!isGenerating && (
        <AICourseFollowUp
          courseSlug={courseSlug}
          moduleTitle={currentModuleTitle}
          lessonTitle={currentLessonTitle}
        />
      )}
    </div>
  );
}
