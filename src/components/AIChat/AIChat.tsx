import './AIChat.css';
import {
  ArrowDownIcon,
  FileUpIcon,
  LockIcon,
  PersonStandingIcon,
  SendIcon,
  TrashIcon,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import AutogrowTextarea from 'react-textarea-autosize';
import { QuickHelpPrompts } from './QuickHelpPrompts';
import { QuickActionButton } from './QuickActionButton';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { billingDetailsOptions } from '../../queries/billing';
import { useToast } from '../../hooks/use-toast';
import { readStream } from '../../lib/ai';
import { markdownToHtml } from '../../lib/markdown';
import { ChatHistory } from './ChatHistory';
import { PersonalizedResponseForm } from './PersonalizedResponseForm';
import { userPersonaOptions } from '../../queries/user-persona';
import { UploadResumeModal } from './UploadResumeModal';
import { userResumeOptions } from '../../queries/user-resume';
import { httpPost } from '../../lib/query-http';
import {
  renderMessage,
  type MessagePartRenderer,
} from '../../lib/render-chat-message';
import { RoadmapRecommendations } from '../RoadmapAIChat/RoadmapRecommendations';
import type { RoadmapAIChatHistoryType } from '../RoadmapAIChat/RoadmapAIChat';
import { AIChatCourse } from './AIChatCouse';
import { getTailwindScreenDimension } from '../../lib/is-mobile';
import type { TailwindScreenDimensions } from '../../lib/is-mobile';
import { showLoginPopup } from '../../lib/popup';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

export function AIChat() {
  const toast = useToast();

  const [deviceType, setDeviceType] = useState<TailwindScreenDimensions>();

  useLayoutEffect(() => {
    setDeviceType(getTailwindScreenDimension());
  }, []);

  const [message, setMessage] = useState('');
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessage, setStreamedMessage] =
    useState<React.ReactNode | null>(null);
  const [aiChatHistory, setAiChatHistory] = useState<
    RoadmapAIChatHistoryType[]
  >([]);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isPersonalizedResponseFormOpen, setIsPersonalizedResponseFormOpen] =
    useState(false);
  const [isUploadResumeModalOpen, setIsUploadResumeModalOpen] = useState(false);

  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);

  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaMessageRef = useRef<HTMLTextAreaElement>(null);

  const { data: tokenUsage, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);
  const { data: userPersona, isLoading: isUserPersonaLoading } = useQuery(
    userPersonaOptions(),
    queryClient,
  );
  const { data: userResume, isLoading: isUserResumeLoading } = useQuery(
    userResumeOptions(),
    queryClient,
  );

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const handleChatSubmit = () => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    if (isLimitExceeded) {
      if (!isPaidUser) {
        setShowUpgradeModal(true);
      }

      toast.error('Limit reached for today. Please wait until tomorrow.');
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage || isStreamingMessage) {
      return;
    }

    const newMessages: RoadmapAIChatHistoryType[] = [
      ...aiChatHistory,
      {
        role: 'user',
        content: trimmedMessage,
        // it's just a simple message, so we can use markdownToHtml
        html: markdownToHtml(trimmedMessage),
      },
    ];

    flushSync(() => {
      setAiChatHistory(newMessages);
      setMessage('');
    });

    setTimeout(() => {
      scrollToBottom();
    }, 0);

    textareaMessageRef.current?.focus();
    completeAIChat(newMessages);
  };

  const scrollToBottom = useCallback(() => {
    const scrollableContainer = scrollableContainerRef?.current;
    if (!scrollableContainer) {
      return;
    }

    scrollableContainer.scrollTo({
      top: scrollableContainer.scrollHeight,
      behavior: 'smooth',
    });
  }, [scrollableContainerRef]);

  const renderer: Record<string, MessagePartRenderer> = useMemo(() => {
    return {
      'roadmap-recommendations': (options) => {
        return <RoadmapRecommendations {...options} />;
      },
      'generate-course': (options) => {
        return <AIChatCourse {...options} />;
      },
    };
  }, []);

  const completeAIChat = async (
    messages: RoadmapAIChatHistoryType[],
    force: boolean = false,
  ) => {
    setIsStreamingMessage(true);

    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/v1-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        messages: messages.slice(-10),
        force,
      }),
    });

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
        const jsx = await renderMessage(content, renderer, {
          isLoading: true,
        });

        flushSync(() => {
          setStreamedMessage(jsx);
        });

        scrollToBottom();
      },
      onStreamEnd: async (content) => {
        const jsx = await renderMessage(content, renderer, {
          isLoading: false,
        });

        const newMessages: RoadmapAIChatHistoryType[] = [
          ...messages,
          {
            role: 'assistant',
            content,
            jsx,
          },
        ];

        flushSync(() => {
          setStreamedMessage(null);
          setIsStreamingMessage(false);
          setAiChatHistory(newMessages);
        });

        queryClient.invalidateQueries(getAiCourseLimitOptions());
        scrollToBottom();
      },
    });

    setIsStreamingMessage(false);
  };

  const { mutate: uploadResume, isPending: isUploading } = useMutation(
    {
      mutationFn: (formData: FormData) => {
        return httpPost('/v1-upload-resume', formData);
      },
      onSuccess: () => {
        toast.success('Resume uploaded successfully');
        setIsUploadResumeModalOpen(false);
        queryClient.invalidateQueries(userResumeOptions());
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to upload resume');
      },
      onMutate: () => {
        setIsUploadResumeModalOpen(false);
      },
    },
    queryClient,
  );

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;
    if (!scrollableContainer) {
      return;
    }

    const abortController = new AbortController();
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const paddingBottom = parseInt(
          getComputedStyle(scrollableContainer).paddingBottom,
        );

        const distanceFromBottom =
          scrollableContainer.scrollHeight -
          // scroll from the top + the container height
          (scrollableContainer.scrollTop + scrollableContainer.clientHeight) -
          paddingBottom;

        setShowScrollToBottomButton(distanceFromBottom > -(paddingBottom - 80));
      }, 100);
    };

    debouncedHandleScroll();
    scrollableContainer.addEventListener('scroll', debouncedHandleScroll, {
      signal: abortController.signal,
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      abortController.abort();
    };
  }, [aiChatHistory]);

  const handleRegenerate = useCallback(
    (index: number) => {
      if (isLimitExceeded) {
        if (!isPaidUser) {
          setShowUpgradeModal(true);
        }

        toast.error('Limit reached for today. Please wait until tomorrow.');
        return;
      }

      const filteredChatHistory = aiChatHistory.slice(0, index);

      flushSync(() => {
        setAiChatHistory(filteredChatHistory);
      });
      scrollToBottom();
      completeAIChat(filteredChatHistory, true);
    },
    [aiChatHistory],
  );

  const handleDelete = useCallback(
    (index: number) => {
      const filteredChatHistory = aiChatHistory.filter((_, i) => i !== index);
      setAiChatHistory(filteredChatHistory);
    },
    [aiChatHistory],
  );

  const shouldShowQuickHelpPrompts =
    message.length === 0 && aiChatHistory.length === 0;
  const isDataLoading =
    isLoading ||
    isBillingDetailsLoading ||
    isUserPersonaLoading ||
    isUserResumeLoading;

  return (
    <div
      className="ai-chat relative flex min-h-screen w-full flex-col gap-2 overflow-y-auto bg-gray-100 pb-55"
      ref={scrollableContainerRef}
    >
      <div className="relative mx-auto w-full max-w-2xl grow px-4">
        {shouldShowQuickHelpPrompts && (
          <QuickHelpPrompts
            onQuestionClick={(question) => {
              textareaMessageRef.current?.focus();
              setMessage(question);
            }}
          />
        )}
        {!shouldShowQuickHelpPrompts && (
          <ChatHistory
            chatHistory={aiChatHistory}
            isStreamingMessage={isStreamingMessage}
            streamedMessage={streamedMessage}
            onDelete={handleDelete}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>

      {isPersonalizedResponseFormOpen && (
        <PersonalizedResponseForm
          defaultValues={userPersona?.chatPreferences ?? undefined}
          onClose={() => setIsPersonalizedResponseFormOpen(false)}
        />
      )}

      {isUploadResumeModalOpen && (
        <UploadResumeModal
          onClose={() => setIsUploadResumeModalOpen(false)}
          userResume={userResume}
          isUploading={isUploading}
          uploadResume={uploadResume}
        />
      )}

      {showUpgradeModal && (
        <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
      )}

      <div
        className="pointer-events-none fixed right-0 bottom-0 left-0 mx-auto w-full max-w-3xl px-4 lg:left-[var(--ai-sidebar-width)]"
        ref={chatContainerRef}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <QuickActionButton
              icon={PersonStandingIcon}
              label="Personalize"
              onClick={() => {
                setIsPersonalizedResponseFormOpen(true);
              }}
            />
            <QuickActionButton
              icon={FileUpIcon}
              label={isUploading ? 'Processing...' : 'Upload Resume'}
              onClick={() => {
                setIsUploadResumeModalOpen(true);
              }}
              isLoading={isUploading}
            />
          </div>

          <div className="flex items-center gap-2">
            {showScrollToBottomButton && (
              <QuickActionButton
                icon={ArrowDownIcon}
                label="Scroll to Bottom"
                onClick={scrollToBottom}
              />
            )}
            {aiChatHistory.length > 0 && (
              <QuickActionButton
                icon={TrashIcon}
                label="Clear Chat"
                onClick={() => {
                  setAiChatHistory([]);
                }}
              />
            )}
          </div>
        </div>

        <form
          className="pointer-events-auto relative flex flex-col gap-2 overflow-hidden rounded-lg rounded-b-none border border-b-0 border-gray-200 bg-white p-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (isDataLoading) {
              return;
            }

            handleChatSubmit();
          }}
        >
          <AutogrowTextarea
            ref={textareaMessageRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-10 w-full resize-none bg-transparent text-sm focus:outline-none"
            placeholder="Ask me anything..."
            disabled={isStreamingMessage}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                if (isDataLoading) {
                  return;
                }

                e.preventDefault();
                handleChatSubmit();
              }
            }}
          />

          {isLimitExceeded && isLoggedIn() && !isDataLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black text-white">
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
                  type="button"
                  onClick={() => {
                    setShowUpgradeModal(true);
                  }}
                  className="rounded-md bg-white px-2 py-1 text-xs font-medium text-black hover:bg-gray-300"
                >
                  Upgrade for more
                </button>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex size-8 shrink-0 items-center justify-center rounded-md border border-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLimitExceeded || isStreamingMessage || isDataLoading}
            >
              <SendIcon className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
