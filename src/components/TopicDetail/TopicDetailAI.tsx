import '../GenerateCourse/AICourseLessonChat.css';
import { useQuery } from '@tanstack/react-query';
import {
  useState,
  type FormEvent,
  useRef,
  Fragment,
  useCallback,
  useEffect,
} from 'react';
import { billingDetailsOptions } from '../../queries/billing';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import {
  BotIcon,
  Loader2Icon,
  LockIcon,
  RotateCcwIcon,
  SendIcon,
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

  const sanitizedTopicId = topicId?.includes('@')
    ? topicId?.split('@')?.[1]
    : topicId;

  const toast = useToast();
  const [message, setMessage] = useState('');
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessage, setStreamedMessage] = useState('');

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

  return (
    <div className="relative mt-4 flex grow flex-col overflow-hidden rounded-lg border border-gray-200">
      {isDataLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-white text-black">
          <Loader2Icon className="size-8 animate-spin stroke-3 text-gray-500" />
        </div>
      )}

      {hasSubjects && (
        <div className="border-b border-gray-200 px-4 py-2">
          <h4 className="flex items-center gap-2 text-base">
            Complete the following courses on AI Tutor
          </h4>

          <div className="mt-2.5 flex flex-wrap gap-1 text-sm">
            {roadmapTreeMapping?.subjects?.map((subject) => {
              return (
                <a
                  key={subject}
                  target="_blank"
                  href={`/ai/search?term=${subject}&difficulty=beginner&src=topic`}
                  className="rounded-md border px-1.5"
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
          'flex items-center justify-between gap-2 border-gray-200 px-4 py-2 text-sm',
          !hasSubjects && 'border-b',
        )}
      >
        {hasSubjects && (
          <span className="flex items-center gap-2 text-base">
            or start chatting with AI
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
          <div className="flex items-center gap-2.5">
            {hasChatHistory && (
              <button
                className="rounded-md bg-white p-1 text-xs font-medium text-black hover:bg-gray-200"
                onClick={() => {
                  setAiChatHistory(defaultChatHistory);
                }}
              >
                <RotateCcwIcon className="size-3.5" />
              </button>
            )}

            {!isPaidUser && (
              <>
                <button
                  className="underline underline-offset-2 hover:no-underline"
                  onClick={onUpgrade}
                >
                  Upgrade
                </button>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">{usagePercentage}%</span> used
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <div
        className="scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thin relative grow overflow-y-auto"
        ref={scrollareaRef}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="relative flex grow flex-col justify-end">
            <div className="flex flex-col justify-end gap-2 px-3 py-2">
              {aiChatHistory.map((chat, index) => {
                return (
                  <Fragment key={`chat-${index}`}>
                    <AIChatCard
                      role={chat.role}
                      content={chat.content}
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
        className="relative flex items-start border-t border-gray-200 text-sm"
        onSubmit={handleChatSubmit}
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
              handleChatSubmit(e as unknown as FormEvent<HTMLFormElement>);
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
