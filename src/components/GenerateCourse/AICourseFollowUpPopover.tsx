import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  Bot,
  Code,
  GitCompare,
  HelpCircle,
  LockIcon,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { flushSync } from 'react-dom';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { readAICourseLessonStream } from '../../helper/read-stream';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import { useToast } from '../../hooks/use-toast';
import { markdownToHtml } from '../../lib/markdown';
import { cn } from '../../lib/classname';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';

export type AllowedAIChatRole = 'user' | 'assistant';
export type AIChatHistoryType = {
  role: AllowedAIChatRole;
  content: string;
  isDefault?: boolean;
};

type AICourseFollowUpPopoverProps = {
  courseSlug: string;
  moduleTitle: string;
  lessonTitle: string;

  courseAIChatHistory: AIChatHistoryType[];
  setCourseAIChatHistory: (value: AIChatHistoryType[]) => void;

  onOutsideClick?: () => void;
};

export function AICourseFollowUpPopover(props: AICourseFollowUpPopoverProps) {
  const {
    courseSlug,
    moduleTitle,
    lessonTitle,
    onOutsideClick,

    courseAIChatHistory,
    setCourseAIChatHistory,
  } = props;

  const toast = useToast();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollareaRef = useRef<HTMLDivElement | null>(null);

  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [streamedMessage, setStreamedMessage] = useState('');

  useOutsideClick(containerRef, onOutsideClick);

  const { data: tokenUsage, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const isLimitExceeded =
    (tokenUsage?.followUpLimit || 0) <= (tokenUsage?.followUpUsed || 0);

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (
      !trimmedMessage ||
      isStreamingMessage ||
      !isLoggedIn() ||
      isLimitExceeded ||
      isLoading
    ) {
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
    setIsStreamingMessage(true);

    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-follow-up-ai-course/${courseSlug}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          moduleTitle,
          lessonTitle,
          messages: messages.slice(-10),
        }),
      },
    );

    if (!response.ok) {
      const data = await response.json();

      toast.error(data?.message || 'Something went wrong');
      setCourseAIChatHistory([...messages].slice(0, messages.length - 1));
      setIsStreamingMessage(false);

      if (data.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
    }

    const reader = response.body?.getReader();

    if (!reader) {
      setIsStreamingMessage(false);
      toast.error('Something went wrong');
      return;
    }

    await readAICourseLessonStream(reader, {
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
          setIsStreamingMessage(false);
          setCourseAIChatHistory(newMessages);
        });

        queryClient.invalidateQueries(getAiCourseLimitOptions());
        scrollToBottom();
      },
    });

    setIsStreamingMessage(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 z-10 flex h-[400px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow"
      ref={containerRef}
    >
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-4 py-2 text-sm">
        <h4 className="text-base font-medium">Course AI</h4>
      </div>

      <div
        className="scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin relative grow overflow-y-auto"
        ref={scrollareaRef}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="flex grow flex-col justify-end">
            <div className="flex flex-col justify-end gap-2 px-3 py-2">
              {courseAIChatHistory.map((chat, index) => {
                return (
                  <AIChatCard
                    key={index}
                    role={chat.role}
                    content={chat.content}
                  />
                );
              })}

              {isStreamingMessage && !streamedMessage && (
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
        className="relative flex h-[41px] items-center border-t border-gray-200 text-sm"
        onSubmit={handleChatSubmit}
      >
        {isLimitExceeded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
            <LockIcon className="size-4" strokeWidth={2.5} />
            <p>You have reached the AI usage limit for today.</p>
          </div>
        )}
        <input
          className="h-full grow bg-transparent px-4 py-2 focus:outline-none"
          placeholder="Ask AI anything about the lesson..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus={true}
        />
        <button
          type="submit"
          disabled={isStreamingMessage || isLimitExceeded}
          className="flex aspect-square h-full items-center justify-center text-zinc-500 hover:text-black"
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
    return markdownToHtml(content);
  }, [content]);

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg',
        role === 'user' ? 'bg-gray-300/30' : 'bg-yellow-500/30',
      )}
    >
      <div className="flex items-start gap-2.5 p-3">
        <div
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full',
            role === 'user'
              ? 'bg-gray-200 text-black'
              : 'bg-yellow-400 text-black',
          )}
        >
          <Bot className="size-4 stroke-[2.5]" />
        </div>
        <div
          className="course-content course-ai-content prose prose-sm mt-0.5 max-w-full grow overflow-hidden text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
