import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { CourseSidebar, type CourseSidebarProps } from './CourseSidebar';
import { useMemo, useState } from 'react';
import {
  useCompleteLessonMutation,
  useCourseProgress,
} from '../../hooks/use-course';
import { NextLessonAlertModal } from './NextLessonAlertModal';
import { useStore } from '@nanostores/react';
import { lessonSubmitStatus } from '../../stores/course';
import { getPercentage } from '../../helper/number';

type CourseLayoutProps = {
  children: React.ReactNode;
} & CourseSidebarProps;

export function CourseLayout(props: CourseLayoutProps) {
  const { children, ...sidebarProps } = props;
  const { chapters, courseId, chapterId, lessonId, lesson } = sidebarProps;

  const $lessonSubmitStatus = useStore(lessonSubmitStatus);
  const [showNextWarning, setShowNextWarning] = useState(false);

  const { data: courseProgress } = useCourseProgress(courseId);
  const completeLesson = useCompleteLessonMutation(courseId);

  const completeLessonSet = useMemo(
    () =>
      new Set(
        (courseProgress?.completed || []).map(
          (l) => `/learn/${courseId}/${l.chapterId}/${l.lessonId}`,
        ),
      ),
    [courseProgress],
  );

  const allLessonLinks = useMemo(() => {
    const lessons: string[] = [];
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        lessons.push(`/learn/${courseId}/${chapter.id}/${lesson.id}`);
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

  const currentLessonUrl = `/learn/${courseId}/${chapterId}/${lessonId}`;
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

    completeLesson.mutate(
      {
        chapterId,
        lessonId,
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

      <section className="grid h-screen grid-rows-[1fr_60px] overflow-hidden bg-zinc-900 text-zinc-50">
        <div className="grid grid-cols-[240px_1fr] overflow-hidden">
          <CourseSidebar
            {...sidebarProps}
            completedPercentage={Number(courseProgressPercentage)}
          />

          {children}
        </div>

        <footer className="flex items-center justify-end border-t border-zinc-800 px-4">
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
                if (
                  $lessonSubmitStatus === 'idle' &&
                  lesson?.frontmatter?.type !== 'lesson' &&
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
      </section>
    </>
  );
}
