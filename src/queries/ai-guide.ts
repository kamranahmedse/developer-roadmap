import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
import { queryOptions } from '@tanstack/react-query';
import {
  markdownToHtml,
  markdownToHtmlWithHighlighting,
} from '../lib/markdown';
import type { QuestionAnswerChatMessage } from '../components/ContentGenerator/QuestionAnswerChat';

export interface AIGuideDocument {
  _id: string;
  userId: string;
  title: string;
  slug?: string;
  keyword: string;
  content: string;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };

  relatedTopics: string[];
  deepDiveTopics: string[];
  questions: string[];

  questionAndAnswers?: QuestionAnswerChatMessage[];

  viewCount: number;
  lastVisitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

type GetAIGuideResponse = AIGuideDocument;

export function getAiGuideOptions(guideSlug?: string) {
  return queryOptions({
    queryKey: ['ai-guide', guideSlug],
    queryFn: async () => {
      const res = await httpGet<GetAIGuideResponse>(
        `/v1-get-ai-guide/${guideSlug}`,
      );

      return {
        ...res,
        html: await markdownToHtmlWithHighlighting(res.content),
      };
    },
    enabled: !!guideSlug,
  });
}

type AIGuideSuggestionsResponse = {
  relatedTopics: string[];
  deepDiveTopics: string[];
  questions: string[];
};

export function aiGuideSuggestionsOptions(guideSlug?: string) {
  return queryOptions({
    queryKey: ['ai-guide-suggestions', guideSlug],
    queryFn: () => {
      return httpGet<AIGuideSuggestionsResponse>(
        `/v1-ai-guide-suggestions/${guideSlug}`,
      );
    },
    enabled: !!guideSlug && !!isLoggedIn(),
    refetchOnMount: false,
  });
}

export type ListUserAIGuidesQuery = {
  perPage?: string;
  currPage?: string;
  query?: string;
};

export type ListUserAIGuidesResponse = {
  data: Omit<
    AIGuideDocument,
    'tokens' | 'relatedTopics' | 'deepDiveTopics' | 'questions'
  >[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function listUserAIGuidesOptions(
  params: ListUserAIGuidesQuery = {
    perPage: '21',
    currPage: '1',
    query: '',
  },
) {
  return queryOptions({
    queryKey: ['ai-guides', params],
    queryFn: async () => {
      const response = await httpGet<ListUserAIGuidesResponse>(
        `/v1-list-user-ai-guides`,
        params,
      );

      return {
        ...response,
        data: response.data.map((guide) => {
          const preview = guide.content.slice(0, 500);

          return {
            ...guide,
            html: markdownToHtml(preview, false),
          };
        }),
      };
    },
    enabled: !!isLoggedIn(),
  });
}
