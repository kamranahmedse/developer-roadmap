import { useMemo, useRef, useState } from 'react';
import { useListCourseNote } from '../../hooks/use-course-note';
import type { ChapterFileType } from '../../lib/course';
import { CourseNoteForm } from './CourseNoteForm';
import { CourseNoteCard } from './CourseNoteCard';
import { Loader2 } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';

type CourseNotesPopoverProps = {
  courseId: string;
  currentChapterId: string;
  currentLessonId: string;

  chapters: ChapterFileType[];

  onOutsideClick?: () => void;
};

export function CourseNotesPopover(props: CourseNotesPopoverProps) {
  const {
    courseId,
    chapters,
    currentChapterId,
    currentLessonId,
    onOutsideClick,
  } = props;

  const { data: notes, isLoading } = useListCourseNote(courseId);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [updatingNoteId, setUpdatingNoteId] = useState<string | null>(null);

  const enrichedNotes = useMemo(() => {
    if (!notes) {
      return [];
    }

    return notes.map((note) => {
      const chapter = chapters.find((c) => c.id === note.chapterId);
      const lesson = chapter?.lessons.find((l) => l.id === note.lessonId);

      return {
        ...note,
        chapterTitle: chapter?.frontmatter?.title || '',
        lessonTitle: lesson?.frontmatter?.title || '',
      };
    });
  }, [notes]);

  const updatingCourseNote = notes?.find((note) => note._id === updatingNoteId);

  useOutsideClick(containerRef, () => {
    if (isCreatingNote || updatingCourseNote) {
      setIsCreatingNote(false);
      setUpdatingNoteId(null);
    }

    onOutsideClick?.();
  });

  return (
    <div
      className="absolute bottom-full left-0 z-10 flex h-[60dvh] w-[420px] -translate-y-2 flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 text-white"
      ref={containerRef}
    >
      {(isCreatingNote || updatingCourseNote) && (
        <CourseNoteForm
          courseId={courseId}
          currentChapterId={currentChapterId}
          currentLessonId={currentLessonId}
          note={updatingCourseNote}
          onCancelClick={() => {
            setIsCreatingNote(false);
            setUpdatingNoteId(null);
          }}
        />
      )}

      {!isCreatingNote && !updatingNoteId && (
        <>
          <div className="flex items-center justify-between gap-2 border-b border-zinc-700 px-4 py-2 text-sm">
            <h4 className="text-base font-medium">Course Notes</h4>
            <button
              className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
              onClick={() => setIsCreatingNote(true)}
            >
              + New Note
            </button>
          </div>

          <div className="relative grow overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
            <div className="absolute inset-0 flex flex-col divide-y divide-zinc-700">
              {isLoading && (
                <div className="flex h-full items-center justify-center text-zinc-400">
                  <Loader2 className="size-5 animate-spin stroke-[2.5]" />
                </div>
              )}

              {!isLoading && enrichedNotes.length === 0 && (
                <div className="flex h-full items-center justify-center text-zinc-400">
                  No notes available.
                </div>
              )}

              {!isLoading &&
                enrichedNotes.length > 0 &&
                enrichedNotes.map((note, index) => (
                  <CourseNoteCard
                    key={index}
                    {...note}
                    onLearnMoreClick={() => {
                      setUpdatingNoteId(note._id);
                    }}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
