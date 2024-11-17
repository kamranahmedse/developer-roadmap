import { Loader2, MessageSquareCode } from 'lucide-react';
import { CourseNoteCard } from './CourseNoteCard';
import { CourseNoteForm } from './CourseNoteForm';
import { useMemo, useState } from 'react';
import { useListCourseNote } from '../../hooks/use-course-note';
import type { ChapterFileType } from '../../lib/course';
import { CourseNotesPopover } from './CourseNotesPopover';

type CourseNotesProps = {
  courseId: string;
  currentChapterId: string;
  currentLessonId: string;

  chapters: ChapterFileType[];
};

export function CourseNotes(props: CourseNotesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 rounded-lg border border-black pl-3 pr-4 py-2 text-sm leading-none disabled:opacity-60 hover:bg-black hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquareCode className="size-4 stroke-[2.5]" />
        Take Notes
      </button>

      {isOpen && (
        <CourseNotesPopover
          {...props}
          onOutsideClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
