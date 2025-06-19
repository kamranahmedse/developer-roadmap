import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';

type AIQuestionSuggestionsQuery = {
  term: string;
  format: string;
};

export type AIQuestionSuggestionsResponse = {
  questions: {
    question: string;
    possibleAnswers: string[];
  }[];
};

export function aiQuestionSuggestionsOptions(
  query: AIQuestionSuggestionsQuery,
) {
  return queryOptions({
    queryKey: ['ai-question-suggestions', query],
    queryFn: () => {
      return httpGet<AIQuestionSuggestionsResponse>(
        `/v1-ai-question-suggestions`,
        query,
      );
    },
    enabled: !!query.term && !!query.format,
    refetchOnMount: false,
  });
}
