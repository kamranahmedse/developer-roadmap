import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  Bot,
  Hammer,
  HelpCircle,
  LockIcon,
  Send,
  User2,
  X,
  XIcon,
} from 'lucide-react';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { flushSync } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
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
import { ResizablePanel } from './Resizeable';
import { Spinner } from '../ReactIcons/Spinner';

export type AllowedAIChatRole = 'user' | 'assistant';
export type AIChatHistoryType = {
  role: AllowedAIChatRole;
  content: string;
  isDefault?: boolean;
  html?: string;
};

type AICourseLessonChatProps = {
  courseSlug: string;
  moduleTitle: string;
  lessonTitle: string;
  onUpgradeClick: () => void;
  isDisabled?: boolean;
  isGeneratingLesson?: boolean;

  defaultQuestions?: string[];

  courseAIChatHistory: AIChatHistoryType[];
  setCourseAIChatHistory: (history: AIChatHistoryType[]) => void;

  onClose: () => void;

  isAIChatsOpen: boolean;
  setIsAIChatsOpen: (isOpen: boolean) => void;
};

export function AICourseLessonChat(props: AICourseLessonChatProps) {
  const {
    courseSlug,
    moduleTitle,
    lessonTitle,
    onUpgradeClick,
    isDisabled,
    defaultQuestions = [],

    courseAIChatHistory,
    setCourseAIChatHistory,

    onClose,

    isAIChatsOpen,
    setIsAIChatsOpen,

    isGeneratingLesson,
  } = props;

  const toast = useToast();
  const scrollareaRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [streamedMessage, setStreamedMessage] = useState('');

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

  const scrollToBottom = useCallback(() => {
    scrollareaRef.current?.scrollTo({
      top: scrollareaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [scrollareaRef]);

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
    <ResizablePanel
      defaultSize={isAIChatsOpen ? 30 : 0}
      minSize={20}
      id="course-chat-content"
      order={2}
      className="relative h-full max-lg:fixed! max-lg:inset-0! max-lg:data-[chat-state=closed]:hidden max-lg:data-[chat-state=open]:flex"
      data-chat-state={isAIChatsOpen ? 'open' : 'closed'}
    >
      <div
        className="absolute inset-y-0 right-0 z-20 flex w-full flex-col overflow-hidden bg-white data-[state=closed]:hidden data-[state=open]:flex"
        data-state={isAIChatsOpen ? 'open' : 'closed'}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 hidden rounded-full p-1 text-gray-400 hover:text-black max-lg:block"
        >
          <XIcon className="size-4 stroke-[2.5]" />
        </button>

        <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-4 py-2 text-sm">
          <h4 className="flex items-center gap-2 text-base font-medium">
            <Bot
              className="relative -top-[1px] size-5 shrink-0 text-black"
              strokeWidth={2.5}
            />
            AI Instructor
          </h4>
          <button
            onClick={onClose}
            className="hidden rounded-md px-2 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-black lg:block"
          >
            <X className="size-4 stroke-[2.5]" />
          </button>
        </div>

        <div
          className="scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin relative grow overflow-y-auto"
          ref={scrollareaRef}
        >
          <div className="absolute inset-0 flex flex-col">
            <div className="relative flex grow flex-col justify-end">
              {isGeneratingLesson && (
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-gray-100">
                  <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5">
                    <Spinner
                      className="size-4 text-gray-400"
                      outerFill="transparent"
                    />
                    <p className="text-sm text-gray-500">
                      Generating lesson...
                    </p>
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-end gap-2 px-3 py-2">
                {courseAIChatHistory.map((chat, index) => {
                  return (
                    <Fragment key={`chat-${index}`}>
                      <AIChatCard
                        role={chat.role}
                        content={chat.content}
                        html={chat.html}
                      />

                      {chat.isDefault && defaultQuestions?.length > 1 && (
                        <div className="mt-0.5 mb-1">
                          <p className="mb-2 text-xs font-normal text-gray-500">
                            Some questions you might have about this lesson.
                          </p>
                          <div className="flex flex-col justify-end gap-1">
                            {defaultQuestions.map((question, index) => (
                              <button
                                key={`default-question-${index}`}
                                className="flex h-full self-start rounded-md bg-yellow-500/10 px-3 py-2 text-left text-sm text-black hover:bg-yellow-500/20"
                                onClick={() => {
                                  flushSync(() => {
                                    setMessage(question);
                                  });

                                  textareaRef.current?.focus();
                                }}
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </Fragment>
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
              <LockIcon
                className="size-4 cursor-not-allowed"
                strokeWidth={2.5}
              />
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
            className={cn(
              'h-full min-h-[41px] grow resize-none bg-transparent px-4 py-2 focus:outline-hidden',
              isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-auto',
            )}
            placeholder="Ask AI anything about the lesson..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleChatSubmit(e as unknown as FormEvent<HTMLFormElement>);
              }
            }}
            ref={textareaRef}
          />
          <button
            type="submit"
            disabled={isDisabled || isStreamingMessage || isLimitExceeded}
            className="flex aspect-square size-[41px] items-center justify-center text-zinc-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="size-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </ResizablePanel>
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
          {role === 'user' ? (
            <User2 className="size-4 stroke-[2.5]" />
          ) : (
            <Bot className="size-4 stroke-[2.5]" />
          )}
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
        <span className="text-[13px] leading-none font-medium text-black">
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
