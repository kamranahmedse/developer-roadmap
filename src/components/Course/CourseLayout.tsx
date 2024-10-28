import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { CourseSidebar, type CourseSidebarProps } from './CourseSidebar';
import { useEffect, useMemo, useState } from 'react';
import {
  useCompleteLessonMutation,
  useCourseProgress,
} from '../../hooks/use-course';
import { NextLessonAlertModal } from './NextLessonAlertModal';
import { useStore } from '@nanostores/react';
import { currentLesson } from '../../stores/course';
import { getPercentage } from '../../helper/number';
import { cn } from '../../lib/classname';
import { CourseNotes } from '../CourseNotes/CourseNotes';

type CourseLayoutProps = {
  children: React.ReactNode;
} & Omit<CourseSidebarProps, 'completedPercentage'>;

export function CourseLayout(props: CourseLayoutProps) {
  const { children, ...sidebarProps } = props;
  const { chapters, activeCourseId, activeChapterId, activeLessonId, lesson } =
    sidebarProps;

  const $currentLesson = useStore(currentLesson);
  const [showNextWarning, setShowNextWarning] = useState(false);

  const { data: courseProgress } = useCourseProgress(activeCourseId);
  const completeLesson = useCompleteLessonMutation(activeCourseId);

  const completeLessonSet = useMemo(
    () =>
      new Set(
        (courseProgress?.completed || []).map(
          (l) => `/learn/${activeCourseId}/${l.chapterId}/${l.lessonId}`,
        ),
      ),
    [courseProgress],
  );

  const allLessonLinks = useMemo(() => {
    const lessons: string[] = [];
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        lessons.push(`/learn/${activeCourseId}/${chapter.id}/${lesson.id}`);
      }
    }

    return lessons;
  }, [chapters]);

  const courseProgressPercentage = useMemo(() => {
    const completedCount = allLessonLinks.filter((lessonLink) =>
      completeLessonSet.has(lessonLink),
    ).length;

    return getPercentage(completedCount, allLessonLinks.length);
  }, [allLessonLinks, completeLessonSet]);

  const currentLessonUrl = `/learn/${activeCourseId}/${activeChapterId}/${activeLessonId}`;
  const isCurrentLessonCompleted = completeLessonSet.has(currentLessonUrl);

  const currentLessonIndex = allLessonLinks.indexOf(currentLessonUrl);
  const prevLessonLink = allLessonLinks[currentLessonIndex - 1] || '';
  const nextLessonLink = allLessonLinks[currentLessonIndex + 1] || '';

  const isCurrentLessonLast = currentLessonIndex === allLessonLinks.length - 1;

  const handleCompleteLesson = () => {
    if (isCurrentLessonCompleted) {
      window.location.href = nextLessonLink;
      return;
    }

    if (!activeChapterId || !activeLessonId) {
      return;
    }

    completeLesson.mutate(
      {
        chapterId: activeChapterId,
        lessonId: activeLessonId,
      },
      {
        onSuccess: () => {
          if (isCurrentLessonLast) {
            return;
          }

          window.location.href = nextLessonLink;
        },
      },
    );
  };

  useEffect(() => {
    if ($currentLesson) {
      return;
    }

    currentLesson.set({
      courseId: activeCourseId,
      chapterId: activeChapterId,
      lessonId: activeLessonId,
      lessonType: lesson?.frontmatter?.type,
      challengeStatus: 'pending',
      quizStatus: 'pending',
    });
  }, [$currentLesson]);

  return (
    <>
      {showNextWarning && (
        <NextLessonAlertModal
          onContinue={() => {
            setShowNextWarning(false);
            handleCompleteLesson();
          }}
          onClose={() => setShowNextWarning(false)}
        />
      )}

      <section
        className={cn(
          'grid h-screen grid-rows-[1fr_60px] overflow-hidden bg-zinc-900 text-zinc-50',
          activeChapterId && activeLessonId
            ? 'grid-rows-[1fr_60px]'
            : 'grid-rows-1',
        )}
      >
        <div className="grid grid-cols-[240px_1fr] overflow-hidden">
          <CourseSidebar
            {...sidebarProps}
            completedPercentage={Number(courseProgressPercentage)}
          />

          {children}
        </div>

        {activeChapterId && activeLessonId && (
          <footer className="flex items-center justify-between border-t border-zinc-800 px-4">
            <div className="flex items-center gap-2">
              <CourseNotes />
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 rounded-lg border border-zinc-800 px-2 py-1.5 text-sm leading-none disabled:opacity-60"
                onClick={() => {
                  window.location.href = prevLessonLink;
                }}
                disabled={!prevLessonLink || completeLesson.isPending}
              >
                <ChevronLeft className="size-4 stroke-[3]" />
                Prev
              </button>

              <button
                className="flex items-center gap-1 rounded-lg border border-zinc-800 px-2 py-1.5 text-sm leading-none disabled:opacity-60"
                onClick={() => {
                  const isQuizPending =
                    ($currentLesson?.lessonType === 'lesson-quiz' ||
                      $currentLesson?.lessonType === 'quiz') &&
                    $currentLesson?.quizStatus === 'pending';

                  const isChallengePending =
                    ($currentLesson?.lessonType === 'lesson-challenge' ||
                      $currentLesson?.lessonType === 'challenge') &&
                    $currentLesson?.challengeStatus === 'pending';

                  if (
                    (isQuizPending || isChallengePending) &&
                    !isCurrentLessonCompleted
                  ) {
                    setShowNextWarning(true);
                    return;
                  }

                  handleCompleteLesson();
                }}
                disabled={completeLesson.isPending}
              >
                Next
                {completeLesson.isPending ? (
                  <Loader2 className="size-4 animate-spin stroke-[3]" />
                ) : (
                  <ChevronRight className="size-4 stroke-[3]" />
                )}
              </button>
            </div>
          </footer>
        )}
      </section>
    </>
  );
}
