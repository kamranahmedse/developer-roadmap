import { useCallback, useEffect, useRef, useState } from 'react';
import { useChat, type ChatMessage } from '../../hooks/use-chat';
import { RoadmapAIChatCard } from '../RoadmapAIChat/RoadmapAIChatCard';
import {
  ArrowDownIcon,
  BotIcon,
  PauseCircleIcon,
  SendIcon,
  Trash2Icon,
} from 'lucide-react';
import { ChatHeaderButton } from '../FrameRenderer/RoadmapFloatingChat';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { flushSync } from 'react-dom';
import { markdownToHtml } from '../../lib/markdown';

type AIGuideChatProps = {
  guideSlug?: string;
};

export function AIGuideChat(props: AIGuideChatProps) {
  const { guideSlug } = props;

  const scrollareaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const {
    messages,
    status,
    streamedMessageHtml,
    sendMessages,
    setMessages,
    stop,
  } = useChat({
    endpoint: `${import.meta.env.PUBLIC_API_URL}/v1-ai-guide-chat`,
    onError: (error) => {
      console.error(error);
    },
    data: {
      guideSlug,
    },
  });

  const scrollToBottom = useCallback(
    (behavior: 'smooth' | 'instant' = 'smooth') => {
      scrollareaRef.current?.scrollTo({
        top: scrollareaRef.current.scrollHeight,
        behavior,
      });
    },
    [scrollareaRef],
  );

  const isStreamingMessage = status === 'streaming';
  const hasMessages = messages.length > 0;

  const handleSubmitInput = useCallback(() => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    if (isStreamingMessage) {
      return;
    }

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        role: 'user',
        content: inputValue,
        html: markdownToHtml(inputValue),
      },
    ];
    flushSync(() => {
      setMessages(newMessages);
    });
    sendMessages(newMessages);
    setInputValue('');
  }, [inputValue, isStreamingMessage, messages, sendMessages, setMessages]);

  const checkScrollPosition = useCallback(() => {
    const scrollArea = scrollareaRef.current;
    if (!scrollArea) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollArea;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50; // 50px threshold
    setShowScrollToBottom(!isAtBottom && messages.length > 0);
  }, [messages.length]);

  useEffect(() => {
    const scrollArea = scrollareaRef.current;
    if (!scrollArea) {
      return;
    }

    scrollArea.addEventListener('scroll', checkScrollPosition);
    return () => scrollArea.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  return (
    <div className="flex h-full w-full max-w-[40%] flex-col overflow-hidden">
      <div className="border-b border-gray-200 bg-white p-2">
        <h2 className="flex items-center gap-2 text-sm font-medium">
          <BotIcon className="h-4 w-4" />
          AI Guide
        </h2>
      </div>

      <div className="relative grow overflow-y-auto" ref={scrollareaRef}>
        <div className="absolute inset-0 flex flex-col">
          <div className="relative flex grow flex-col justify-end">
            <div className="flex flex-col justify-end gap-2 px-3 py-2">
              <RoadmapAIChatCard
                role="assistant"
                html="Hello, how can I help you today?"
                isIntro
              />

              {messages.map((chat, index) => {
                return <RoadmapAIChatCard key={`chat-${index}`} {...chat} />;
              })}

              {status === 'streaming' && !streamedMessageHtml && (
                <RoadmapAIChatCard role="assistant" html="Thinking..." />
              )}

              {status === 'streaming' && streamedMessageHtml && (
                <RoadmapAIChatCard
                  role="assistant"
                  html={streamedMessageHtml}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {(hasMessages || showScrollToBottom) && (
        <div className="flex flex-row justify-end gap-2 border-t border-gray-200 px-3 py-2">
          {showScrollToBottom && (
            <ChatHeaderButton
              icon={<ArrowDownIcon className="h-3.5 w-3.5" />}
              className="rounded-md bg-gray-200 py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300"
              onClick={() => {
                scrollToBottom('smooth');
              }}
            >
              Scroll to bottom
            </ChatHeaderButton>
          )}

          <ChatHeaderButton
            icon={<Trash2Icon className="h-3.5 w-3.5" />}
            className="rounded-md bg-gray-200 py-1 pr-2 pl-1.5 text-gray-500 hover:bg-gray-300"
            onClick={() => {
              setMessages([]);
            }}
          >
            Clear
          </ChatHeaderButton>
        </div>
      )}

      <div className="relative flex items-center border-t border-gray-200 text-sm">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (isStreamingMessage) {
                return;
              }
              handleSubmitInput();
            }
          }}
          placeholder="Ask me anything about this guide..."
          className="w-full resize-none px-3 py-4 outline-none"
        />

        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-zinc-500 hover:text-black disabled:opacity-50"
          disabled={isStreamingMessage}
          onClick={() => {
            if (isStreamingMessage) {
              stop();
              return;
            }

            handleSubmitInput();
          }}
        >
          {isStreamingMessage ? (
            <PauseCircleIcon className="h-4 w-4" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
