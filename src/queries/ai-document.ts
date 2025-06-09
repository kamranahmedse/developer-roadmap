import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

type GetAIDocumentParams = {
  documentSlug: string;
};

export interface AIDocumentDocument {
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

type GetAIDocumentResponse = AIDocumentDocument;

export function getAiDocumentOptions(params: GetAIDocumentParams) {
  return {
    queryKey: ['ai-document', params],
    queryFn: () => {
      return httpGet<GetAIDocumentResponse>(
        `/v1-get-ai-document/${params.documentSlug}`,
      );
    },
    enabled: !!params.documentSlug,
  };
}

export type ListUserAiDocumentsQuery = {
  perPage?: string;
  currPage?: string;
  query?: string;
};

type ListUserAiDocumentsResponse = {
  data: AIDocumentDocument[];
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
