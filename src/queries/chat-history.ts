import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
import { markdownToHtml } from '../lib/markdown';
import { aiChatRenderer } from '../components/AIChat/AIChat';
import {
  type MessagePartRenderer,
  renderMessage,
} from '../lib/render-chat-message';
import type { RoadmapAIChatHistoryType } from '../hooks/use-roadmap-ai-chat';

export type ChatHistoryMessage = {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
};

export interface ChatHistoryDocument {
  _id: string;

  userId: string;
  roadmapId?: string;
  title: string;
  messages: ChatHistoryMessage[];

  createdAt: Date;
  updatedAt: Date;
}

export function chatHistoryOptions(
  chatHistoryId?: string,
  renderer?: Record<string, MessagePartRenderer>,
) {
  return queryOptions({
    queryKey: ['chat-history-details', chatHistoryId],
    queryFn: async () => {
      const data = await httpGet<ChatHistoryDocument>(
        `/v1-chat-history/${chatHistoryId}`,
      );

      if (data.title) {
        document.title = data.title;
      }

      const messages: RoadmapAIChatHistoryType[] = [];
      for (const message of data.messages) {
        messages.push({
          role: message.role,
          content: message.content,
          ...(message.role === 'user' && {
            html: markdownToHtml(message.content),
          }),
          ...(message.role === 'assistant' && {
            jsx: await renderMessage(message.content, renderer ?? {}, {
              isLoading: false,
            }),
          }),
        });
      }

      return {
        ...data,
        messages,
      };
    },
    enabled: !!isLoggedIn() && !!chatHistoryId,
  });
}

type ListChatHistoryQuery = {
  perPage?: string;
  currPage?: string;
  query?: string;
  roadmapId?: string;
};

export type ChatHistoryWithoutMessages = Omit<ChatHistoryDocument, 'messages'>;

type ListChatHistoryResponse = {
  data: ChatHistoryWithoutMessages[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function listChatHistoryOptions(
  query: ListChatHistoryQuery = {
    query: '',
    roadmapId: '',
  },
) {
  return infiniteQueryOptions({
    queryKey: ['list-chat-history', query],
    queryFn: ({ pageParam }) => {
      return httpGet<ListChatHistoryResponse>('/v1-list-chat-history', {
        ...(query?.query ? { query: query.query } : {}),
        ...(query?.roadmapId ? { roadmapId: query.roadmapId } : {}),
        ...(pageParam ? { currPage: pageParam } : {}),
        perPage: '21',
      });
    },
    enabled: !!isLoggedIn(),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.currPage < lastPage.totalPages
        ? lastPage.currPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}
