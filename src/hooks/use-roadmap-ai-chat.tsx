import { useCallback, useMemo, useRef, useState } from 'react';
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
};

export function useRoadmapAIChat(options: Options) {
  const { roadmapId, totalTopicCount, scrollareaRef, onSelectTopic } = options;
  const toast = useToast();

  const [aiChatHistory, setAiChatHistory] = useState<
    RoadmapAIChatHistoryType[]
  >([]);
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessage, setStreamedMessage] =
    useState<React.ReactNode | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    scrollareaRef.current?.scrollTo({
      top: scrollareaRef.current.scrollHeight,
      behavior: 'instant',
    });
  }, [scrollareaRef]);

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
            if (title) onSelectTopic(topicId, title);
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
      setIsStreamingMessage(true);
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

      flushSync(() => setAiChatHistory(newMessages));
      scrollToBottom();
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

  const clearChat = useCallback(() => setAiChatHistory([]), []);

  return {
    aiChatHistory,
    isStreamingMessage,
    streamedMessage,
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
