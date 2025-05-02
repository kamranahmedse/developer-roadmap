import '../GenerateCourse/AICourseLessonChat.css';
import { useQuery } from '@tanstack/react-query';
import {
  useState,
  type FormEvent,
  useRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { billingDetailsOptions } from '../../queries/billing';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import {
  BotIcon,
  Gift,
  Loader2Icon,
  LockIcon,
  SendIcon,
  Trash2,
} from 'lucide-react';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname';
import TextareaAutosize from 'react-textarea-autosize';
import { flushSync } from 'react-dom';
import {
  AIChatCard,
  type AIChatHistoryType,
} from '../GenerateCourse/AICourseLessonChat';
import { useToast } from '../../hooks/use-toast';
import { readStream } from '../../lib/ai';
import { markdownToHtmlWithHighlighting } from '../../lib/markdown';
import type { ResourceType } from '../../lib/resource-progress';
import { getPercentage } from '../../lib/number';
import { roadmapTreeMappingOptions } from '../../queries/roadmap-tree';
import { defaultChatHistory } from './TopicDetail';
import { AILimitsPopup } from '../GenerateCourse/AILimitsPopup';

type TopicDetailAIProps = {
  resourceId: string;
  resourceType: ResourceType;
  topicId: string;

  aiChatHistory: AIChatHistoryType[];
  setAiChatHistory: (history: AIChatHistoryType[]) => void;

  onUpgrade: () => void;
};

export function TopicDetailAI(props: TopicDetailAIProps) {
  const {
    aiChatHistory,
    setAiChatHistory,
    resourceId,
    resourceType,
    topicId,
    onUpgrade,
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollareaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sanitizedTopicId = topicId?.includes('@')
    ? topicId?.split('@')?.[1]
    : topicId;

  const toast = useToast();
  const [message, setMessage] = useState('');
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessage, setStreamedMessage] = useState('');
  const [showAILimitsPopup, setShowAILimitsPopup] = useState(false);
  const { data: tokenUsage, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const { data: roadmapTreeMapping, isLoading: isRoadmapTreeMappingLoading } =
    useQuery(
      {
        ...roadmapTreeMappingOptions(resourceId),
        select: (data) => {
          const node = data.find(
            (mapping) => mapping.nodeId === sanitizedTopicId,
          );
          return node;
        },
      },
      queryClient,
    );

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const handleChatSubmit = (overrideMessage?: string) => {
    const trimmedMessage = (overrideMessage ?? message).trim();

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
      ...aiChatHistory,
      {
        role: 'user',
        content: trimmedMessage,
      },
    ];

    flushSync(() => {
      setAiChatHistory(newMessages);
      setMessage('');
    });

    scrollToBottom();
    completeAITutorChat(newMessages);
  };

  const scrollToBottom = useCallback(() => {
    scrollareaRef.current?.scrollTo({
      top: scrollareaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [scrollareaRef]);

  const completeAITutorChat = async (messages: AIChatHistoryType[]) => {
    try {
      setIsStreamingMessage(true);

      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-topic-detail-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            resourceId,
            resourceType,
            topicId: sanitizedTopicId,
            messages: messages.slice(-10),
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json();

        toast.error(data?.message || 'Something went wrong');
        setAiChatHistory([...messages].slice(0, messages.length - 1));
        setIsStreamingMessage(false);

        if (data.status === 401) {
          removeAuthToken();
          window.location.reload();
        }

        queryClient.invalidateQueries(getAiCourseLimitOptions());
        return;
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
            setAiChatHistory(newMessages);
          });

          queryClient.invalidateQueries(getAiCourseLimitOptions());
          scrollToBottom();
        },
      });

      setIsStreamingMessage(false);
    } catch (error) {
      toast.error('Something went wrong');
      setIsStreamingMessage(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const isDataLoading =
    isLoading || isBillingDetailsLoading || isRoadmapTreeMappingLoading;
  const usagePercentage = getPercentage(
    tokenUsage?.used || 0,
    tokenUsage?.limit || 0,
  );
  const hasSubjects =
    roadmapTreeMapping?.subjects && roadmapTreeMapping?.subjects?.length > 0;
  const hasChatHistory = aiChatHistory.length > 1;

  const testMyKnowledgePrompt =
    'Act as an interviewer and test my understanding of this topic';
  const summarizePrompt = 'Summarize this topic in no more than two sentences';
  const predefinedMessages = useMemo(
    () => [
      {
        label: 'Explain like I am five',
        message: 'Explain this topic like I am a 5 years old',
      },
      {
        label: 'Test my Knowledge',
        message: testMyKnowledgePrompt,
      },
      {
        label: 'Summarize in 2 sentences',
        message: summarizePrompt,
      },
    ],
    [],
  );

  return (
    <div className="relative mt-4 flex grow flex-col overflow-hidden rounded-lg border border-gray-200">
      {isDataLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-white text-black">
          <Loader2Icon className="size-8 animate-spin stroke-3 text-gray-500" />
        </div>
      )}

      {showAILimitsPopup && (
        <AILimitsPopup
          onClose={() => setShowAILimitsPopup(false)}
          onUpgrade={() => {
            setShowAILimitsPopup(false);
            onUpgrade();
          }}
        />
      )}

      {hasSubjects && (
        <div className="border-b border-gray-200 p-3">
          <h4 className="flex items-center gap-2 text-sm">
            Complete the following AI Tutor courses
          </h4>

          <div className="mt-2.5 flex flex-wrap gap-1 text-sm">
            {roadmapTreeMapping?.subjects?.map((subject) => {
              return (
                <a
                  key={subject}
                  target="_blank"
                  href={`/ai/search?term=${subject}&difficulty=beginner&src=topic`}
                  className="flex items-center gap-1 gap-2 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 hover:bg-gray-200 hover:text-black"
                >
                  {subject}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <div
        className={cn(
          'flex items-center justify-between gap-2 border-gray-200 px-3 py-2 text-sm',
        )}
      >
        {hasSubjects && (
          <span className="flex items-center gap-2 text-sm">
            <BotIcon
              className="relative -top-[1px] size-4 shrink-0 text-black"
              strokeWidth={2.5}
            />
            Chat with AI
          </span>
        )}

        {!hasSubjects && (
          <h4 className="flex items-center gap-2 text-base font-medium">
            <BotIcon
              className="relative -top-[1px] size-5 shrink-0 text-black"
              strokeWidth={2.5}
            />
            AI Tutor
          </h4>
        )}

        {!isDataLoading && (
          <div className="flex gap-1.5">
            {hasChatHistory && (
              <button
                className="rounded-md bg-white px-2 text-xs font-medium text-black hover:bg-gray-200"
                onClick={() => {
                  setAiChatHistory(defaultChatHistory);
                }}
              >
                <Trash2 className="size-3.5" />
              </button>
            )}

            {!isPaidUser && (
              <>
                <button
                  className="rounded-md bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
                  onClick={() => {
                    setShowAILimitsPopup(true);
                  }}
                >
                  <span className="font-medium">{usagePercentage}%</span>{' '}
                  credits used
                </button>
                <button
                  className="flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-1 text-sm text-black hover:bg-yellow-500"
                  onClick={onUpgrade}
                >
                  <Gift className="size-4" />
                  Upgrade
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          'scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin flex items-center gap-2 overflow-x-auto border-gray-200 px-3 py-1 text-sm',
        )}
      >
        {predefinedMessages.map((m) => (
          <PredefinedMessageButton
            key={m.message}
            label={m.label}
            message={m.message}
            onClick={() => {
              setMessage(m.message);
              handleChatSubmit(m.message);
            }}
          />
        ))}
      </div>

      <div
        className="scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin relative grow overflow-y-auto"
        ref={scrollareaRef}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="relative flex grow flex-col justify-end">
            <div className="flex flex-col justify-end gap-2 px-3 py-2">
              {aiChatHistory.map((chat, index) => {
                const isTextMyKnowledgePrompt =
                  chat.role === 'user' &&
                  chat.content === testMyKnowledgePrompt;
                const isTextSummarizePrompt =
                  chat.role === 'user' && chat.content === summarizePrompt;

                let content = chat.content;
                if (isTextMyKnowledgePrompt) {
                  content = 'Starting Interview';
                } else if (isTextSummarizePrompt) {
                  content = 'Summarize in 2 sentences';
                }

                return (
                  <Fragment key={`chat-${index}`}>
                    <AIChatCard
                      role={chat.role}
                      content={content}
                      html={chat.html}
                    />
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
        ref={formRef}
        className="relative flex items-start border-t border-gray-200 text-sm"
        onSubmit={(e) => {
          e.preventDefault();
          handleChatSubmit();
        }}
      >
        {isLimitExceeded && isLoggedIn() && (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white">
            <LockIcon className="size-4 cursor-not-allowed" strokeWidth={2.5} />
            <p className="cursor-not-allowed">
              Limit reached for today
              {isPaidUser ? '. Please wait until tomorrow.' : ''}
            </p>
            {!isPaidUser && (
              <button
                onClick={onUpgrade}
                className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black hover:bg-gray-300"
              >
                Upgrade for more
              </button>
            )}
          </div>
        )}
        {!isLoggedIn() && (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white">
            <LockIcon className="size-4 cursor-not-allowed" strokeWidth={2.5} />
            <p className="cursor-not-allowed">Please login to continue</p>
            <button
              onClick={() => {
                showLoginPopup();
              }}
              className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black hover:bg-gray-300"
            >
              Login / Register
            </button>
          </div>
        )}

        {isDataLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white">
            <Loader2Icon className="size-4 animate-spin" />
            <p>Loading...</p>
          </div>
        )}

        <TextareaAutosize
          className={cn(
            'h-full min-h-[41px] grow resize-none bg-transparent px-4 py-2 focus:outline-hidden',
          )}
          placeholder="Ask AI anything about the lesson..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleChatSubmit();
            }
          }}
          ref={textareaRef}
        />
        <button
          type="submit"
          disabled={isStreamingMessage || isLimitExceeded}
          className="flex aspect-square size-[41px] items-center justify-center text-zinc-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendIcon className="size-4 stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}

type PredefinedMessageButtonProps = {
  label: string;
  message: string;
  onClick: () => void;
};

function PredefinedMessageButton(props: PredefinedMessageButtonProps) {
  const { label, message, onClick } = props;

  return (
    <button
      className="shrink-0 rounded-md bg-gray-200 px-2 py-1 text-sm whitespace-nowrap hover:bg-gray-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
