import { Loader2, MessageSquareCode, Sparkles } from 'lucide-react';
import type { ChapterFileType } from '../../lib/course';
import { useState } from 'react';
import { CourseAIPopover } from './CourseAIPopover';

type CourseAIProps = {
  courseId: string;
  currentChapterId: string;
  currentLessonId: string;

  chapters: ChapterFileType[];
};

export function CourseAI(props: CourseAIProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 rounded-lg border border-zinc-800 px-2 py-1.5 text-sm leading-none disabled:opacity-60"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sparkles className="size-4 stroke-[2.5]" />
        Ask AI
      </button>

      {isOpen && (
        <CourseAIPopover {...props} onOutsideClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
