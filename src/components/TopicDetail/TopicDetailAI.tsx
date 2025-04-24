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
import { BotIcon, LockIcon, SendIcon } from 'lucide-react';
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

type TopicDetailAIProps = {
  aiChatHistory: AIChatHistoryType[];
  setAiChatHistory: (history: AIChatHistoryType[]) => void;
};

export function TopicDetailAI(props: TopicDetailAIProps) {
  const { aiChatHistory, setAiChatHistory } = props;

  const scrollareaRef = useRef<HTMLDivElement>(null);

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
    // completeCourseAIChat(newMessages);
  };

  const scrollToBottom = useCallback(() => {
    scrollareaRef.current?.scrollTo({
      top: scrollareaRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [scrollareaRef]);

  const completeCourseAIChat = async (messages: AIChatHistoryType[]) => {
    setIsStreamingMessage(true);

    // const response = await fetch(
    //   `${import.meta.env.PUBLIC_API_URL}/v1-follow-up-ai-course/${courseSlug}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify({
    //       moduleTitle,
    //       lessonTitle,
    //       messages: messages.slice(-10),
    //     }),
    //   },
    // );

    const response = new Response();

    if (!response.ok) {
      const data = await response.json();

      toast.error(data?.message || 'Something went wrong');
      setAiChatHistory([...messages].slice(0, messages.length - 1));
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
          setAiChatHistory(newMessages);
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
    <div className="mt-4 flex grow flex-col rounded-lg border">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-4 py-2 text-sm">
        <h4 className="flex items-center gap-2 text-base font-medium">
          <BotIcon
            className="relative -top-[1px] size-5 shrink-0 text-black"
            strokeWidth={2.5}
          />
          AI Tutor
        </h4>
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

                    {/* {chat.isDefault && defaultQuestions?.length > 1 && (
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
                      )} */}
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
                onClick={() => {
                  // onUpgradeClick();
                }}
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
        <TextareaAutosize
          className={cn(
            'h-full min-h-[41px] grow resize-none bg-transparent px-4 py-2 focus:outline-hidden',
            // isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-auto',
          )}
          placeholder="Ask AI anything about the lesson..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus={true}
          onKeyDown={(e) => {
            // if (e.key === 'Enter' && !e.shiftKey) {
            //   handleChatSubmit(e as unknown as FormEvent<HTMLFormElement>);
            // }
          }}
          // ref={textareaRef}
        />
        <button
          type="submit"
          // disabled={isDisabled || isStreamingMessage || isLimitExceeded}
          className="flex aspect-square size-[41px] items-center justify-center text-zinc-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendIcon className="size-4 stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}
