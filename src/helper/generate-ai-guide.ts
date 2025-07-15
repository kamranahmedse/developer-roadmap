import { queryClient } from '../stores/query-client';
import { getAiCourseLimitOptions } from '../queries/ai-course';
import { readChatStream } from '../lib/chat';
import { markdownToHtmlWithHighlighting } from '../lib/markdown';
import type { QuestionAnswerChatMessage } from '../components/ContentGenerator/QuestionAnswerChat';

type GuideDetails = {
  guideId: string;
  guideSlug: string;
  creatorId: string;
  title: string;
};

type GenerateGuideOptions = {
  term: string;
  slug?: string;
  isForce?: boolean;
  prompt?: string;
  onGuideSlugChange?: (guideSlug: string) => void;
  onGuideChange?: (guide: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (error: string) => void;
  src?: string;
  onHtmlChange?: (html: string) => void;
  onStreamingChange?: (isStreaming: boolean) => void;
  onDetailsChange?: (details: GuideDetails) => void;
  onFinish?: () => void;
  questionAndAnswers?: QuestionAnswerChatMessage[];
};

export async function generateGuide(options: GenerateGuideOptions) {
  const {
    term,
    slug,
    onGuideChange,
    onLoadingChange,
    onError,
    isForce = false,
    prompt,
    src = 'search',
    onHtmlChange,
    onStreamingChange,
    onDetailsChange,
    onFinish,
    questionAndAnswers,
  } = options;

  onLoadingChange?.(true);
  onGuideChange?.('');

  try {
    let response = null;

    if (slug && isForce) {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-regenerate-ai-guide/${slug}`,
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
        `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-guide`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: term,
            isForce,
            customPrompt: prompt,
            questionAndAnswers,
            src,
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
        onGuideChange?.(message);
        onHtmlChange?.(await markdownToHtmlWithHighlighting(message));
      },
      onMessageEnd: async (message) => {
        onGuideChange?.(message);
        onHtmlChange?.(await markdownToHtmlWithHighlighting(message));
        queryClient.invalidateQueries(getAiCourseLimitOptions());
        onStreamingChange?.(false);
      },
      onDetails: async (details) => {
        if (!details?.guideId || !details?.guideSlug) {
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
  }
}
