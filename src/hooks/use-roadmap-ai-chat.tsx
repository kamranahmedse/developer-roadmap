import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import type { JSONContent } from '@tiptap/core';
import { flushSync } from 'react-dom';
import { removeAuthToken } from '../lib/jwt';
import { readStream } from '../lib/ai';
import { useToast } from './use-toast';
import { getAiCourseLimitOptions } from '../queries/ai-course';
import { queryClient } from '../stores/query-client';
import {
  renderMessage,
  type MessagePartRenderer,
} from '../lib/render-chat-message';
import { UserProgressList } from '../components/RoadmapAIChat/UserProgressList';
import { UserProgressActionList } from '../components/RoadmapAIChat/UserProgressActionList';
import { RoadmapTopicList } from '../components/RoadmapAIChat/RoadmapTopicList';
import { ShareResourceLink } from '../components/RoadmapAIChat/ShareResourceLink';
import { RoadmapRecommendations } from '../components/RoadmapAIChat/RoadmapRecommendations';
import type { AllowedAIChatRole } from '../components/GenerateCourse/AICourseLessonChat';

type RoadmapAIChatRendererOptions = {
  totalTopicCount: number;
  roadmapId: string;
  onSelectTopic: (topicId: string, topicTitle: string) => void;
};

export function roadmapAIChatRenderer(
  options: RoadmapAIChatRendererOptions,
): Record<string, MessagePartRenderer> {
  const { totalTopicCount, roadmapId, onSelectTopic } = options;

  return {
    'user-progress': () => (
      <UserProgressList
        totalTopicCount={totalTopicCount}
        roadmapId={roadmapId}
      />
    ),
    'update-progress': (opts) => (
      <UserProgressActionList roadmapId={roadmapId} {...opts} />
    ),
    'roadmap-topics': (opts) => (
      <RoadmapTopicList
        roadmapId={roadmapId}
        onTopicClick={(topicId, text) => {
          const title = text.split(' > ').pop();
          if (!title) {
            return;
          }

          onSelectTopic(topicId, title);
        }}
        {...opts}
      />
    ),
    'resource-progress-link': () => <ShareResourceLink roadmapId={roadmapId} />,
    'roadmap-recommendations': (opts) => <RoadmapRecommendations {...opts} />,
  };
}

export type RoadmapAIChatHistoryType = {
  role: AllowedAIChatRole;
  isDefault?: boolean;
  content?: string;
  json?: JSONContent;
  html?: string;
  jsx?: React.ReactNode;
};

type Options = {
  roadmapId: string;
  totalTopicCount: number;
  scrollareaRef: React.RefObject<HTMLDivElement | null>;
  onSelectTopic: (topicId: string, topicTitle: string) => void;
  defaultMessages?: RoadmapAIChatHistoryType[];
};

export function useRoadmapAIChat(options: Options) {
  const {
    roadmapId,
    totalTopicCount,
    scrollareaRef,
    onSelectTopic,
    defaultMessages,
  } = options;
  const toast = useToast();

  const [aiChatHistory, setAiChatHistory] = useState<
    RoadmapAIChatHistoryType[]
  >(defaultMessages ?? []);
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessage, setStreamedMessage] =
    useState<React.ReactNode | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(
    (behavior: 'smooth' | 'instant' = 'smooth') => {
      scrollareaRef.current?.scrollTo({
        top: scrollareaRef.current.scrollHeight,
        behavior,
      });
    },
    [scrollareaRef],
  );

  // Check if user has scrolled away from bottom
  const checkScrollPosition = useCallback(() => {
    const scrollArea = scrollareaRef.current;
    if (!scrollArea) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollArea;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50; // 50px threshold
    setShowScrollToBottom(!isAtBottom && aiChatHistory.length > 0);
  }, [aiChatHistory.length]);

  useEffect(() => {
    const scrollArea = scrollareaRef.current;
    if (!scrollArea) {
      return;
    }

    scrollArea.addEventListener('scroll', checkScrollPosition);
    return () => scrollArea.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  // When user is already at the bottom and there is new message
  // being streamed, we keep scrolling to bottom to show the new message
  // unless user has scrolled up at which point we stop scrolling to bottom
  useEffect(() => {
    if (isStreamingMessage || streamedMessage) {
      const scrollArea = scrollareaRef.current;
      if (!scrollArea) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom) {
        scrollToBottom('instant');
        setShowScrollToBottom(false);
      }
    }
  }, [isStreamingMessage, streamedMessage, scrollToBottom]);

  const renderer: Record<string, MessagePartRenderer> = useMemo(
    () => ({
      'user-progress': () => (
        <UserProgressList
          totalTopicCount={totalTopicCount}
          roadmapId={roadmapId}
        />
      ),
      'update-progress': (opts) => (
        <UserProgressActionList roadmapId={roadmapId} {...opts} />
      ),
      'roadmap-topics': (opts) => (
        <RoadmapTopicList
          roadmapId={roadmapId}
          onTopicClick={(topicId, text) => {
            const title = text.split(' > ').pop();
            if (title) {
              onSelectTopic(topicId, title);
            }
          }}
          {...opts}
        />
      ),
      'resource-progress-link': () => (
        <ShareResourceLink roadmapId={roadmapId} />
      ),
      'roadmap-recommendations': (opts) => <RoadmapRecommendations {...opts} />,
    }),
    [roadmapId, onSelectTopic, totalTopicCount],
  );

  const completeAITutorChat = async (
    messages: RoadmapAIChatHistoryType[],
    abortController?: AbortController,
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-chat-roadmap`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          signal: abortController?.signal,
          body: JSON.stringify({ roadmapId, messages: messages.slice(-10) }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data?.message || 'Something went wrong');
        setAiChatHistory(messages.slice(0, -1));
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
          if (abortController?.signal.aborted) return;
          const jsx = await renderMessage(content, renderer, {
            isLoading: true,
          });
          flushSync(() => setStreamedMessage(jsx));
        },
        onStreamEnd: async (content) => {
          if (abortController?.signal.aborted) return;
          const jsx = await renderMessage(content, renderer, {
            isLoading: false,
          });
          const newMessages = [
            ...messages,
            { role: 'assistant' as AllowedAIChatRole, content, jsx },
          ];
          flushSync(() => {
            setStreamedMessage(null);
            setIsStreamingMessage(false);
            setAiChatHistory(newMessages);
          });
          queryClient.invalidateQueries(getAiCourseLimitOptions());
        },
      });

      setIsStreamingMessage(false);
      abortControllerRef.current = null;
    } catch (error) {
      setIsStreamingMessage(false);
      setStreamedMessage(null);
      abortControllerRef.current = null;
      if (!abortController?.signal.aborted) {
        toast.error('Something went wrong');
      }
    }
  };

  const handleChatSubmit = useCallback(
    (json: JSONContent, isLoading: boolean) => {
      if (
        !json ||
        isStreamingMessage ||
        isLoading ||
        abortControllerRef.current
      ) {
        return;
      }

      abortControllerRef.current = new AbortController();
      const html = htmlFromTiptapJSON(json);
      const newMessages = [
        ...aiChatHistory,
        { role: 'user' as AllowedAIChatRole, json, html },
      ];

      setIsStreamingMessage(true);
      flushSync(() => setAiChatHistory(newMessages));
      scrollToBottom('instant');
      completeAITutorChat(newMessages, abortControllerRef.current);
    },
    [aiChatHistory, isStreamingMessage, scrollToBottom],
  );

  const handleAbort = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreamingMessage(false);
    setStreamedMessage(null);
    setAiChatHistory(aiChatHistory.slice(0, -1));
  }, [aiChatHistory]);

  const clearChat = useCallback(() => {
    setAiChatHistory([]);
    setStreamedMessage(null);
    setIsStreamingMessage(false);
    scrollToBottom('instant');
    setShowScrollToBottom(false);
  }, []);

  return {
    aiChatHistory,
    isStreamingMessage,
    streamedMessage,
    showScrollToBottom,
    setShowScrollToBottom,
    abortControllerRef,
    handleChatSubmit,
    handleAbort,
    clearChat,
    scrollToBottom,
  };
}

function htmlFromTiptapJSON(json: JSONContent): string {
  const content = json.content;
  let text = '';
  for (const child of content || []) {
    switch (child.type) {
      case 'text':
        text += child.text;
        break;
      case 'paragraph':
        text += `<p>${htmlFromTiptapJSON(child)}</p>`;
        break;
      case 'variable':
        const label = child?.attrs?.label || '';
        text += `<span class="chat-variable">${label}</span>`;
        break;
    }
  }
  return text;
}
