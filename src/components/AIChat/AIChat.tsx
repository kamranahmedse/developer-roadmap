import './AIChat.css';
import {
  ArrowDownIcon,
  FileUpIcon,
  PersonStandingIcon,
  SendIcon,
  TrashIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import AutogrowTextarea from 'react-textarea-autosize';
import { QuickHelpPrompts } from './QuickHelpPrompts';
import { QuickActionButton } from './QuickActionButton';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import type { AIChatHistoryType } from '../GenerateCourse/AICourseLessonChat';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { billingDetailsOptions } from '../../queries/billing';
import { useToast } from '../../hooks/use-toast';
import { readStream } from '../../lib/ai';
import { markdownToHtmlWithHighlighting } from '../../lib/markdown';
import { ChatHistory } from './ChatHistory';
import { PersonalizedResponseForm } from './PersonalizedResponseForm';
import { userPersonaOptions } from '../../queries/user-persona';
import { UploadResumeModal } from './UploadResumeModal';
import { userResumeOptions } from '../../queries/user-resume';
import { httpPost } from '../../lib/query-http';

export function AIChat() {
  const toast = useToast();

  const [message, setMessage] = useState('');
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessageHtml, setStreamedMessageHtml] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<AIChatHistoryType[]>([]);

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
    const trimmedMessage = message.trim();
    if (
      !trimmedMessage ||
      isStreamingMessage ||
      !isLoggedIn() ||
      isLimitExceeded
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
  }, []);

  const completeAIChat = async (messages: AIChatHistoryType[]) => {
    setIsStreamingMessage(true);

    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/v1-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        messages: messages.slice(-10),
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
        const html = await markdownToHtmlWithHighlighting(content);

        flushSync(() => {
          setStreamedMessageHtml(html);
        });

        scrollToBottom();
      },
      onStreamEnd: async (content) => {
        const html = await markdownToHtmlWithHighlighting(content);

        const newMessages: AIChatHistoryType[] = [
          ...messages,
          {
            role: 'assistant',
            content,
            html,
          },
        ];

        flushSync(() => {
          setStreamedMessageHtml('');
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
    const chatContainer = chatContainerRef.current;

    if (!scrollableContainer || !chatContainer) {
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

        setShowScrollToBottomButton(distanceFromBottom > 130);
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

  const shouldShowQuickHelpPrompts =
    message.length === 0 && aiChatHistory.length === 0;

  return (
    <div
      className="ai-chat relative flex min-h-screen w-full flex-col gap-2 overflow-y-auto bg-gray-100 pb-55"
      ref={scrollableContainerRef}
    >
      <div className="relative mx-auto w-full max-w-2xl grow px-4">
        {shouldShowQuickHelpPrompts && (
          <QuickHelpPrompts
            onQuickActionClick={(action) => {
              textareaMessageRef.current?.focus();
              setMessage(action);
            }}
            onPredefinedQuestionClick={(question) => {
              textareaMessageRef.current?.focus();
              setMessage(question);
            }}
          />
        )}
        {!shouldShowQuickHelpPrompts && (
          <ChatHistory
            chatHistory={aiChatHistory}
            setChatHistory={setAiChatHistory}
            isStreamingMessage={isStreamingMessage}
            streamedMessageHtml={streamedMessageHtml}
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

      <div
        className="pointer-events-none fixed right-0 bottom-0 left-0 mx-auto w-full max-w-3xl px-4 lg:left-[var(--ai-sidebar-width)]"
        ref={chatContainerRef}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <QuickActionButton
              icon={PersonStandingIcon}
              label="Personalized Response"
              onClick={() => setIsPersonalizedResponseFormOpen(true)}
            />
            <QuickActionButton
              icon={FileUpIcon}
              label={
                isUploading
                  ? 'Processing...'
                  : userResume?.fileName
                    ? 'Upload New Resume'
                    : 'Upload Resume'
              }
              onClick={() => setIsUploadResumeModalOpen(true)}
              isLoading={isUploading}
            />
          </div>

          <div className="flex items-center gap-2">
            {aiChatHistory.length > 0 && (
              <QuickActionButton
                icon={TrashIcon}
                label="Clear Chat"
                onClick={() => {
                  setAiChatHistory([]);
                }}
              />
            )}
            {showScrollToBottomButton && (
              <QuickActionButton
                icon={ArrowDownIcon}
                label="Scroll to Bottom"
                onClick={scrollToBottom}
              />
            )}
          </div>
        </div>

        <form
          className="pointer-events-auto flex flex-col gap-2 rounded-lg rounded-b-none border border-b-0 border-gray-200 bg-white p-2.5"
          onSubmit={(e) => {
            e.preventDefault();
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
                e.preventDefault();
                handleChatSubmit();
              }
            }}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex size-8 shrink-0 items-center justify-center rounded-md border border-gray-200"
            >
              <SendIcon className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
