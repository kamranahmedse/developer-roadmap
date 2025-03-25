import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  Bot,
  Hammer,
  HelpCircle,
  LockIcon,
  Send,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { flushSync } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useToast } from '../../hooks/use-toast';
import { readStream } from '../../lib/ai';
import { cn } from '../../lib/classname';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import {
  markdownToHtml,
  markdownToHtmlWithHighlighting,
} from '../../lib/markdown';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { billingDetailsOptions } from '../../queries/billing';

export type AllowedAIChatRole = 'user' | 'assistant';
export type AIChatHistoryType = {
  role: AllowedAIChatRole;
  content: string;
  isDefault?: boolean;
  html?: string;
};

type AICourseFollowUpPopoverProps = {
  courseSlug: string;
  moduleTitle: string;
  lessonTitle: string;

  courseAIChatHistory: AIChatHistoryType[];
  setCourseAIChatHistory: (value: AIChatHistoryType[]) => void;

  onOutsideClick?: () => void;
  onUpgradeClick: () => void;
};

export function AICourseFollowUpPopover(props: AICourseFollowUpPopoverProps) {
  const {
    courseSlug,
    moduleTitle,
    lessonTitle,
    onOutsideClick,
    onUpgradeClick,

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

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

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

    await readStream(reader, {
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
            html: await markdownToHtmlWithHighlighting(content),
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
      className="absolute bottom-0 left-0 z-[99] flex h-[500px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow"
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
                  <>
                    <AIChatCard
                      key={`chat-${index}`}
                      role={chat.role}
                      content={chat.content}
                      html={chat.html}
                    />

                    {chat.isDefault && (
                      <div className="mb-1 mt-0.5">
                        <div className="grid grid-cols-2 gap-2">
                          {capabilities.map((capability, index) => (
                            <CapabilityCard
                              key={`capability-${index}`}
                              {...capability}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
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
        className="relative flex items-start border-t border-gray-200 text-sm"
        onSubmit={handleChatSubmit}
      >
        {isLimitExceeded && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black text-white">
            <LockIcon className="size-4 cursor-not-allowed" strokeWidth={2.5} />
            <p className="cursor-not-allowed">
              Limit reached for today
              {isPaidUser ? '. Please wait until tomorrow.' : ''}
            </p>
            {!isPaidUser && (
              <button
                onClick={() => {
                  onUpgradeClick();
                }}
                className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black hover:bg-gray-300"
              >
                Upgrade for more
              </button>
            )}
          </div>
        )}
        <TextareaAutosize
          className="h-full min-h-[41px] grow resize-none bg-transparent px-4 py-2 focus:outline-none"
          placeholder="Ask AI anything about the lesson..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleChatSubmit(e as unknown as FormEvent<HTMLFormElement>);
            }
          }}
        />
        <button
          type="submit"
          disabled={isStreamingMessage || isLimitExceeded}
          className="flex aspect-square size-[41px] items-center justify-center text-zinc-500 hover:text-black"
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
  html?: string;
};

function AIChatCard(props: AIChatCardProps) {
  const { role, content, html: defaultHtml } = props;

  const html = useMemo(() => {
    if (defaultHtml) {
      return defaultHtml;
    }

    return markdownToHtml(content, false);
  }, [content, defaultHtml]);

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
          className="course-content course-ai-content prose prose-sm mt-0.5 max-w-full overflow-hidden text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

type CapabilityCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

function CapabilityCard({
  icon,
  title,
  description,
  className,
}: CapabilityCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg bg-yellow-500/10 p-3',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[13px] font-medium leading-none text-black">
          {title}
        </span>
      </div>
      <p className="text-[12px] leading-normal text-gray-600">{description}</p>
    </div>
  );
}

const capabilities = [
  {
    icon: (
      <HelpCircle
        className="size-4 shrink-0 text-yellow-600"
        strokeWidth={2.5}
      />
    ),
    title: 'Clarify Concepts',
    description: "If you don't understand a concept, ask me to clarify it",
  },
  {
    icon: (
      <BookOpen className="size-4 shrink-0 text-yellow-600" strokeWidth={2.5} />
    ),
    title: 'More Details',
    description: 'Get deeper insights about topics covered in the lesson',
  },
  {
    icon: (
      <Hammer className="size-4 shrink-0 text-yellow-600" strokeWidth={2.5} />
    ),
    title: 'Real-world Examples',
    description: 'Ask for real-world examples to understand better',
  },
  {
    icon: <Bot className="size-4 shrink-0 text-yellow-600" strokeWidth={2.5} />,
    title: 'Best Practices',
    description: 'Learn about best practices and common pitfalls',
  },
] as const;
