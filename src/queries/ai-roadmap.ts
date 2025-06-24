import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { generateAICourseRoadmapStructure } from '../lib/ai';
import { generateAIRoadmapFromText, renderFlowJSON } from '@roadmapsh/editor';

export interface AIRoadmapDocument {
  _id: string;
  userId?: string;
  userIp?: string;
  title: string;
  slug?: string;
  term: string;
  data: string;
  viewCount: number;
  lastVisitedAt: Date;
  keyType?: 'system' | 'user';

  questionAndAnswers?: QuestionAnswerChatMessage[];

  createdAt: Date;
  updatedAt: Date;
}

export type AIRoadmapResponse = AIRoadmapDocument & {
  svgHtml?: string;
};

export function aiRoadmapOptions(roadmapSlug?: string) {
  return queryOptions<AIRoadmapResponse>({
    queryKey: ['ai-roadmap', roadmapSlug],
    queryFn: async () => {
      const res = await httpGet<AIRoadmapResponse>(
        `/v1-get-ai-roadmap/${roadmapSlug}`,
      );

      const result = generateAICourseRoadmapStructure(res.data);
      const { nodes, edges } = generateAIRoadmapFromText(result);
      const svg = await renderFlowJSON({ nodes, edges });
      const svgHtml = svg.outerHTML;

      return {
        ...res,
        svgHtml,
      };
    },
    enabled: !!roadmapSlug,
  });
}

import { queryClient } from '../stores/query-client';
import { getAiCourseLimitOptions } from '../queries/ai-course';
import { readChatStream } from '../lib/chat';
import type { QuestionAnswerChatMessage } from '../components/ContentGenerator/QuestionAnswerChat';
import type { AIGuideDocument } from './ai-guide';
import { isLoggedIn } from '../lib/jwt';

type RoadmapDetails = {
  roadmapId: string;
  roadmapSlug: string;
  userId: string;
  title: string;
};

type GenerateAIRoadmapOptions = {
  term: string;
  isForce?: boolean;
  prompt?: string;
  questionAndAnswers?: QuestionAnswerChatMessage[];

  roadmapSlug?: string;

  onRoadmapSvgChange?: (svg: SVGElement) => void;
  onDetailsChange?: (details: RoadmapDetails) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onStreamingChange?: (isStreaming: boolean) => void;
  onError?: (error: string) => void;
  onFinish?: () => void;
};

export async function generateAIRoadmap(options: GenerateAIRoadmapOptions) {
  const {
    term,
    roadmapSlug,
    onLoadingChange,
    onError,
    isForce = false,
    prompt,
    onDetailsChange,
    onFinish,
    questionAndAnswers,
    onRoadmapSvgChange,
    onStreamingChange,
  } = options;

  onLoadingChange?.(true);
  onStreamingChange?.(false);
  try {
    let response = null;

    if (roadmapSlug && isForce) {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-regenerate-ai-roadmap/${roadmapSlug}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            prompt,
          }),
        },
      );
    } else {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-roadmap`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            term,
            isForce,
            customPrompt: prompt,
            questionAndAnswers,
          }),
          credentials: 'include',
        },
      );
    }

    if (!response.ok) {
      const data = await response.json();
      console.error(
        'Error generating course:',
        data?.message || 'Something went wrong',
      );
      onLoadingChange?.(false);
      onError?.(data?.message || 'Something went wrong');
      return;
    }

    const stream = response.body;
    if (!stream) {
      console.error('Failed to get stream from response');
      onError?.('Something went wrong');
      onLoadingChange?.(false);
      return;
    }

    onLoadingChange?.(false);
    onStreamingChange?.(true);
    await readChatStream(stream, {
      onMessage: async (message) => {
        const result = generateAICourseRoadmapStructure(message);
        const { nodes, edges } = generateAIRoadmapFromText(result);
        const svg = await renderFlowJSON({ nodes, edges });
        onRoadmapSvgChange?.(svg);
      },
      onMessageEnd: async () => {
        queryClient.invalidateQueries(getAiCourseLimitOptions());
        onStreamingChange?.(false);
      },
      onDetails: async (details) => {
        if (!details?.roadmapId || !details?.roadmapSlug) {
          throw new Error('Invalid details');
        }

        onDetailsChange?.(details);
      },
    });
    onFinish?.();
  } catch (error: any) {
    onError?.(error?.message || 'Something went wrong');
    console.error('Error in course generation:', error);
    onLoadingChange?.(false);
    onStreamingChange?.(false);
  }
}

export type ListUserAiRoadmapsQuery = {
  perPage?: string;
  currPage?: string;
  query?: string;
};

export type ListUserAiRoadmapsResponse = {
  data: Omit<AIRoadmapDocument, 'data' | 'questionAndAnswers'>[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function listUserAiRoadmapsOptions(
  params: ListUserAiRoadmapsQuery = {
    perPage: '21',
    currPage: '1',
    query: '',
  },
) {
  return queryOptions({
    queryKey: ['user-ai-roadmaps', params],
    queryFn: () => {
      return httpGet<ListUserAiRoadmapsResponse>(
        `/v1-list-user-ai-roadmaps`,
        params,
      );
    },
    enabled: !!isLoggedIn(),
  });
}
