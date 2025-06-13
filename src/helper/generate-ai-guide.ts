import { readStream } from '../lib/ai';
import { queryClient } from '../stores/query-client';
import { getAiCourseLimitOptions } from '../queries/ai-course';
import { readChatStream } from '../lib/chat';
import { markdownToHtmlWithHighlighting } from '../lib/markdown';

type GuideDetails = {
  guideId: string;
  guideSlug: string;
  creatorId: string;
  title: string;
};

type GenerateGuideOptions = {
  term: string;
  depth: string;
  slug?: string;
  isForce?: boolean;
  prompt?: string;
  instructions?: string;
  goal?: string;
  about?: string;
  onGuideSlugChange?: (guideSlug: string) => void;
  onGuideChange?: (guide: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (error: string) => void;
  src?: string;
  onHtmlChange?: (html: string) => void;
  onStreamingChange?: (isStreaming: boolean) => void;
  onDetailsChange?: (details: GuideDetails) => void;
};

export async function generateGuide(options: GenerateGuideOptions) {
  const {
    term,
    slug,
    depth,
    onGuideChange,
    onLoadingChange,
    onError,
    isForce = false,
    prompt,
    instructions,
    goal,
    about,
    src = 'search',
    onHtmlChange,
    onStreamingChange,
    onDetailsChange,
  } = options;

  onLoadingChange?.(true);
  onGuideChange?.('');
  onError?.('');

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
            isForce,
            customPrompt: prompt,
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
            depth,
            isForce,
            customPrompt: prompt,
            instructions,
            goal,
            about,
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
        const detailsJson = JSON.parse(details);
        if (!detailsJson?.guideId || !detailsJson?.guideSlug) {
          throw new Error('Invalid details');
        }

        onDetailsChange?.(detailsJson);
      },
    });
  } catch (error: any) {
    onError?.(error?.message || 'Something went wrong');
    console.error('Error in course generation:', error);
    onLoadingChange?.(false);
  }
}
