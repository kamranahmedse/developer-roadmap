import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CourseSidebar, type CourseSidebarProps } from './CourseSidebar';
import { useMemo } from 'react';

type CourseLayoutProps = {
  isSubmitted?: boolean;
  children: React.ReactNode;
} & CourseSidebarProps;

export function CourseLayout(props: CourseLayoutProps) {
  const { children, isSubmitted, ...sidebarProps } = props;
  const { chapters, courseId, chapterId, lessonId, lesson } = sidebarProps;

  const allLessonLinks = useMemo(() => {
    const lessons: string[] = [];
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        lessons.push(`/learn/${courseId}/${chapter.id}/${lesson.id}`);
      }
    }

    return lessons;
  }, [chapters]);

  const currentLessonIndex = allLessonLinks.indexOf(
    `/learn/${courseId}/${chapterId}/${lessonId}`,
  );
  const prevLessonLink = allLessonLinks[currentLessonIndex - 1] || '';
  const nextLessonLink = allLessonLinks[currentLessonIndex + 1] || '';

  return (
    <section className="grid h-screen grid-rows-[1fr_60px] overflow-hidden bg-zinc-900 text-zinc-50">
      <div className="grid grid-cols-[240px_1fr] overflow-hidden">
        <CourseSidebar {...sidebarProps} />

        {children}
      </div>

      <footer className="flex items-center justify-end border-t border-zinc-800 px-4">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 rounded-lg border border-zinc-800 px-2 py-1.5 text-sm leading-none disabled:opacity-60"
            onClick={() => {
              window.location.href = prevLessonLink;
            }}
            disabled={!prevLessonLink}
          >
            <ChevronLeft className="size-4 stroke-[3]" />
            Prev
          </button>

          <button
            className="flex items-center gap-1 rounded-lg border border-zinc-800 px-2 py-1.5 text-sm leading-none disabled:opacity-60"
            onClick={() => {
              if (!isSubmitted && lesson?.frontmatter?.type !== 'lesson') {
                // show a warning modal
                window.alert(
                  'Please submit your answer before moving to the next lesson.',
                );
                return;
              }

              window.location.href = nextLessonLink;
            }}
            disabled={!nextLessonLink}
          >
            Next
            <ChevronRight className="size-4 stroke-[3]" />
          </button>
        </div>
      </footer>
    </section>
  );
}
