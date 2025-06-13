import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
import { queryOptions } from '@tanstack/react-query';
import { markdownToHtmlWithHighlighting } from '../lib/markdown';

export interface AIGuideDocument {
  _id: string;
  userId: string;
  title: string;
  slug?: string;
  keyword: string;
  difficulty: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

type GetAIGuideResponse = AIGuideDocument;

export function getAiGuideOptions(guideSlug: string) {
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

export type ListUserAiDocumentsQuery = {
  perPage?: string;
  currPage?: string;
  query?: string;
};

type ListUserAiDocumentsResponse = {
  data: AIGuideDocument[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function listUserAiDocumentsOptions(
  params: ListUserAiDocumentsQuery = {
    perPage: '21',
    currPage: '1',
    query: '',
  },
) {
  return {
    queryKey: ['user-ai-documents', params],
    queryFn: () => {
      return httpGet<ListUserAiDocumentsResponse>(
        `/v1-list-user-ai-documents`,
        params,
      );
    },
    enabled: !!isLoggedIn(),
  };
}
