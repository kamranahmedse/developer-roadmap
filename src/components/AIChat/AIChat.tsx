import './AIChat.css';
import { FileUpIcon, PersonStandingIcon, SendIcon } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import AutogrowTextarea from 'react-textarea-autosize';
import { QuickHelpPrompts } from './QuickHelpPrompts';
import { QuickActionButton } from './QuickActionButton';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import type { AIChatHistoryType } from '../GenerateCourse/AICourseLessonChat';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { billingDetailsOptions } from '../../queries/billing';
import { useToast } from '../../hooks/use-toast';
import { readStream } from '../../lib/ai';
import { markdownToHtmlWithHighlighting } from '../../lib/markdown';
import { ChatHistory } from './ChatHistory';
import { PersonalizedResponseForm } from './PersonalizedResponseForm';
import { userPersonaOptions } from '../../queries/user-persona';

export function AIChat() {
  const toast = useToast();

  const [message, setMessage] = useState('');
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessageHtml, setStreamedMessageHtml] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<AIChatHistoryType[]>([]);
  const [isPersonalizedResponseFormOpen, setIsPersonalizedResponseFormOpen] =
    useState(false);

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
    window.scrollTo({
      top: document.body.scrollHeight,
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

  const shouldShowQuickHelpPrompts =
    message.length === 0 && aiChatHistory.length === 0;

  return (
    <div className="ai-chat relative flex min-h-screen flex-col gap-2 bg-gray-100">
      <div className="relative mx-auto w-full max-w-2xl grow pb-55">
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

      <div className="pointer-events-none fixed right-0 bottom-0 left-0 mx-auto w-full max-w-3xl">
        <div className="mb-2 flex items-center gap-2">
          <QuickActionButton
            icon={PersonStandingIcon}
            label="Personalized Response"
            onClick={() => setIsPersonalizedResponseFormOpen(true)}
          />
          <QuickActionButton icon={FileUpIcon} label="Upload Resume" />
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
