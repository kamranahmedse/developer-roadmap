import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type { ChapterFileType } from '../../lib/course';
import { Bot, Send } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { markdownToHtml } from '../../lib/markdown';
import { sanitizeHtml } from '../../lib/sanitize-html';
import {
  roadmapAIChatHistory,
  type AllowedAIChatType,
} from '../../stores/course';
import { useStore } from '@nanostores/react';
import { flushSync } from 'react-dom';

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
  const scrollareaRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('');

  const $roadmapAIChatHistory = useStore(roadmapAIChatHistory);

  useOutsideClick(containerRef, onOutsideClick);

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    flushSync(() => {
      roadmapAIChatHistory.set([
        ...$roadmapAIChatHistory,
        {
          type: 'user',
          message,
        },
      ]);
      setMessage('');
    });

    scrollToBottom();
  };

  const scrollToBottom = () => {
    scrollareaRef.current?.scrollTo({
      top: scrollareaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div
      className="absolute bottom-full left-0 z-10 flex h-[65dvh] w-[420px] -translate-y-2 flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 text-white"
      ref={containerRef}
    >
      <div className="flex items-center justify-between gap-2 border-b border-zinc-700 px-4 py-2 text-sm">
        <h4 className="text-base font-medium">Roadmap AI</h4>
      </div>

      <div
        className="relative grow overflow-y-auto [scrollbar-color:#3f3f46_#27272a;]"
        ref={scrollareaRef}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="flex grow flex-col justify-end">
            <div className="flex flex-col justify-end gap-2 p-2">
              {$roadmapAIChatHistory.map((chat, index) => {
                return (
                  <AIChatCard
                    key={index}
                    type={chat.type}
                    message={chat.message}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <form
        className="flex h-[41px] items-center border-t border-zinc-700 bg-zinc-800 text-sm text-white"
        onSubmit={handleChatSubmit}
      >
        <input
          className="h-full grow bg-transparent px-4 py-2 focus:outline-none"
          placeholder="Ask AI anything about the course..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="flex aspect-square h-full items-center justify-center text-zinc-500 hover:text-zinc-50"
        >
          <Send className="size-4 stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}

type AIChatCardProps = {
  type: AllowedAIChatType;
  message: string;
};

function AIChatCard(props: AIChatCardProps) {
  const { type, message } = props;

  const html = useMemo(() => {
    return sanitizeHtml(markdownToHtml(message, false));
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
        className="course-content prose prose-sm prose-invert mt-0.5 w-full text-sm text-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
