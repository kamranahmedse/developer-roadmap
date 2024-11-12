import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  readCourseAIContentStream,
  type ChapterFileType,
} from '../../lib/course';
import { Bot, Send } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { markdownToHtml } from '../../lib/markdown';
import { sanitizeHtml } from '../../lib/sanitize-html';
import { flushSync } from 'react-dom';
import type { AIChatHistoryType, AllowedAIChatRole } from './CourseAI';
import { useToast } from '../../hooks/use-toast';
import { removeAuthToken } from '../../lib/jwt';

type CourseAIPopoverProps = {
  courseId: string;
  currentChapterId: string;
  currentLessonId: string;

  chapters: ChapterFileType[];

  courseAIChatHistory: AIChatHistoryType[];
  setCourseAIChatHistory: (value: AIChatHistoryType[]) => void;

  onOutsideClick?: () => void;
};

export function CourseAIPopover(props: CourseAIPopoverProps) {
  const {
    courseId,
    chapters,
    currentChapterId,
    currentLessonId,
    onOutsideClick,

    courseAIChatHistory,
    setCourseAIChatHistory,
  } = props;

  const toast = useToast();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollareaRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [streamedMessage, setStreamedMessage] = useState('');

  useOutsideClick(containerRef, onOutsideClick);

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    const newMessages: AIChatHistoryType[] = [
      ...courseAIChatHistory,
      {
        role: 'user',
        content: trimmedMessage,
      },
    ];

    flushSync(() => {
      setCourseAIChatHistory(newMessages);
      setMessage('');
    });

    scrollToBottom();
    completeCourseAIChat(newMessages);
  };

  const scrollToBottom = () => {
    scrollareaRef.current?.scrollTo({
      top: scrollareaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const completeCourseAIChat = async (messages: AIChatHistoryType[]) => {
    setIsLoading(true);

    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-course-ai/${courseId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          chapterId: currentChapterId,
          lessonId: currentLessonId,

          messages,
        }),
      },
    );

    if (!response.ok) {
      const data = await response.json();

      toast.error(data?.message || 'Something went wrong');
      setCourseAIChatHistory([...messages].slice(0, messages.length - 1));
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
      toast.error('Something went wrong');
      return;
    }

    await readCourseAIContentStream(reader, {
      onStream: async (content) => {
        flushSync(() => {
          setStreamedMessage(content);
        });

        scrollToBottom();
      },
      onStreamEnd: async (content) => {
        const newMessages: AIChatHistoryType[] = [
          ...messages,
          {
            role: 'assistant',
            content,
          },
        ];

        flushSync(() => {
          setStreamedMessage('');
          setIsLoading(false);
          setCourseAIChatHistory(newMessages);
        });

        scrollToBottom();
      },
    });

    setIsLoading(false);
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
              {courseAIChatHistory.map((chat, index) => {
                return (
                  <AIChatCard
                    key={index}
                    role={chat.role}
                    content={chat.content}
                  />
                );
              })}

              {isLoading && !streamedMessage && (
                <AIChatCard role="assistant" content="Thinking..." />
              )}

              {streamedMessage && (
                <AIChatCard role="assistant" content={streamedMessage} />
              )}
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
          autoFocus={true}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex aspect-square h-full items-center justify-center text-zinc-500 hover:text-zinc-50"
        >
          <Send className="size-4 stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}

type AIChatCardProps = {
  role: AllowedAIChatRole;
  content: string;
};

function AIChatCard(props: AIChatCardProps) {
  const { role, content } = props;

  const html = useMemo(() => {
    return sanitizeHtml(markdownToHtml(content, false));
  }, [content]);

  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-xl p-3',
        role === 'user' ? 'bg-zinc-500/30' : 'bg-yellow-500/30',
      )}
    >
      <div
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-full',
          role === 'user'
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
