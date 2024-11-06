import { useMemo, useRef, useState } from 'react';
import { useListCourseNote } from '../../hooks/use-course-note';
import type { ChapterFileType } from '../../lib/course';
import { Bot, Loader2 } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { markdownToHtml } from '../../lib/markdown';

type CourseAIPopoverProps = {
  courseId: string;
  currentChapterId: string;
  currentLessonId: string;

  chapters: ChapterFileType[];

  onOutsideClick?: () => void;
};

export function CourseAIPopover(props: CourseAIPopoverProps) {
  const {
    courseId,
    chapters,
    currentChapterId,
    currentLessonId,
    onOutsideClick,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(containerRef, onOutsideClick);

  return (
    <div
      className="absolute bottom-full left-0 z-10 flex h-[65dvh] w-[420px] -translate-y-2 flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 text-white"
      ref={containerRef}
    >
      <div className="flex items-center justify-between gap-2 border-b border-zinc-700 px-4 py-2 text-sm">
        <h4 className="text-base font-medium">Roadmap AI</h4>
      </div>

      <div className="relative grow overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex flex-col justify-end gap-2 p-2">
            <AIChatCard
              type="system"
              message="Hey, how can I help you today? 🤖"
            />
            <AIChatCard
              type="user"
              message={`What's wrong with this query?

\`\`\`sql
SELECT *
FROM users
WHERE id = 1
\`\`\``}
            />
            <AIChatCard
              type="system"
              message={`Looks like you're missing a semicolon at the end of the query. Try this:

\`\`\`sql
SELECT *
FROM users
WHERE id = 1;
\`\`\``}
            />
            <AIChatCard type="user" message={`Got it! Thanks! 🙏`} />
            <AIChatCard
              type="system"
              message={`You're welcome! If you have any other questions, feel free to ask. 🤖`}
            />
            <AIChatCard
              type="system"
              message={`Looks like you're missing a semicolon at the end of the query. Try this:

\`\`\`sql
SELECT *
FROM users
WHERE id = 1;
\`\`\``}
            />
            <AIChatCard type="user" message={`Got it! Thanks! 🙏`} />
            <AIChatCard
              type="system"
              message={`You're welcome! If you have any other questions, feel free to ask. 🤖`}
            />
          </div>
        </div>
      </div>

      <input
        className="h-[41px] w-full border-t border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white focus:outline-none"
        placeholder="Ask AI anything about the course..."
      />
    </div>
  );
}

type AIChatCardProps = {
  type: 'user' | 'system';
  message: string;
};

function AIChatCard(props: AIChatCardProps) {
  const { type, message } = props;

  const html = useMemo(() => {
    const html = markdownToHtml(message, false);
    // FIXME: Sanitize HTML
    return html;
  }, [message]);

  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-xl p-3',
        type === 'user' ? 'bg-zinc-500/30' : 'bg-yellow-500/30',
      )}
    >
      <div
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-full',
          type === 'user'
            ? 'bg-zinc-500 text-zinc-50'
            : 'bg-yellow-500 text-zinc-950',
        )}
      >
        <Bot className="size-4 stroke-[2.5]" />
      </div>
      <div
        className="course-content prose prose-sm prose-invert w-full text-sm text-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
