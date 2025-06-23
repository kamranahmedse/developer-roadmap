import { useCallback, useRef, useState } from 'react';
import { removeAuthToken } from '../lib/jwt';
import { readChatStream } from '../lib/chat';
import { markdownToHtmlWithHighlighting } from '../lib/markdown';
import { flushSync } from 'react-dom';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  html?: string;
};

type UseChatOptions = {
  endpoint: string;
  initialMessages?: ChatMessage[];
  onError?: (error: Error) => void;
  data?: Record<string, any>;
  onFinish?: () => void;
};

export function useChat(options: UseChatOptions) {
  const { endpoint, initialMessages, onError, data = {}, onFinish } = options;

  const abortControllerRef = useRef<AbortController | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages || [],
  );

  // we use it to show optimistic message
  // and then replace it with the actual message
  const [streamedMessageHtml, setStreamedMessageHtml] = useState<string | null>(
    null,
  );

  const [status, setStatus] = useState<
    'idle' | 'streaming' | 'loading' | 'ready' | 'error'
  >('idle');

  const sendMessages = useCallback(
    async (messages: ChatMessage[]) => {
      try {
        setStatus('loading');
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages, ...data }),
          signal: abortControllerRef.current?.signal,
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json();
          setStatus('error');
          setMessages([...messages].slice(0, messages.length - 1));
          if (data.status === 401) {
            removeAuthToken();
            window.location.reload();
          }

          throw new Error(data?.message || 'Something went wrong');
        }

        const stream = response.body;
        if (!stream) {
          setStatus('error');
          setMessages([...messages].slice(0, messages.length - 1));
          throw new Error('Something went wrong');
        }

        await readChatStream(stream, {
          onMessage: async (content) => {
            const html = await markdownToHtmlWithHighlighting(content);
            flushSync(() => {
              setStatus('streaming');
              setStreamedMessageHtml(html);
            });
          },
          onMessageEnd: async (content) => {
            const html = await markdownToHtmlWithHighlighting(content);

            flushSync(() => {
              setStreamedMessageHtml(null);
              setStatus('ready');
              setMessages((prevMessages) => {
                return [
                  ...prevMessages,
                  {
                    role: 'assistant',
                    content,
                    html,
                  },
                ];
              });
            });
          },
        });

        setStatus('idle');
        abortControllerRef.current = null;
        onFinish?.();
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          // we don't want to show error if the user stops the chat
          // so we just return
          return;
        }

        onError?.(error as Error);
        setStatus('error');
      }
    },
    [endpoint, onError],
  );

  const stop = useCallback(() => {
    if (!abortControllerRef.current) {
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  }, []);

  return {
    messages,
    setMessages,
    sendMessages,
    status,
    streamedMessageHtml,
    stop,
  };
}
