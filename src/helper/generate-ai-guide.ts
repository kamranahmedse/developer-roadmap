import { readStream } from '../lib/ai';
import { queryClient } from '../stores/query-client';
import { getAiCourseLimitOptions } from '../queries/ai-course';

type GenerateGuideOptions = {
  term: string;
  difficulty: string;
  slug?: string;
  isForce?: boolean;
  prompt?: string;
  instructions?: string;
  goal?: string;
  about?: string;
  onDocumentIdChange?: (documentId: string) => void;
  onDocumentSlugChange?: (documentSlug: string) => void;
  onDocumentChange?: (document: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onCreatorIdChange?: (creatorId: string) => void;
  onError?: (error: string) => void;
  src?: string;
};

export async function generateGuide(options: GenerateGuideOptions) {
  const {
    term,
    slug,
    difficulty,
    onDocumentIdChange,
    onDocumentSlugChange,
    onDocumentChange,
    onLoadingChange,
    onError,
    onCreatorIdChange,
    isForce = false,
    prompt,
    instructions,
    goal,
    about,
    src = 'search',
  } = options;

  onLoadingChange?.(true);
  onDocumentChange?.('');
  onError?.('');

  try {
    let response = null;

    if (slug && isForce) {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-regenerate-ai-document/${slug}`,
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
        `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-document`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: term,
            difficulty,
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

    // const reader = response.body?.getReader();

    // if (!reader) {
    //   console.error('Failed to get reader from response');
    //   onError?.('Something went wrong');
    //   onLoadingChange?.(false);
    //   return;
    // }

    // const DOCUMENT_ID_REGEX = new RegExp('@DOCID:(\\w+)@');
    // const DOCUMENT_SLUG_REGEX = new RegExp(/@DOCSLUG:([\w-]+)@/);
    // const CREATOR_ID_REGEX = new RegExp('@CREATORID:(\\w+)@');

    const stream = response.body;
    if (!stream) {
      console.error('Failed to get stream from response');
      onError?.('Something went wrong');
      onLoadingChange?.(false);
      return;
    }

    // await readStream(reader, {
    //   onStream: async (result) => {
    //     if (result.includes('@DOCID') || result.includes('@DOCSLUG')) {
    //       const documentIdMatch = result.match(DOCUMENT_ID_REGEX);
    //       const documentSlugMatch = result.match(DOCUMENT_SLUG_REGEX);
    //       const creatorIdMatch = result.match(CREATOR_ID_REGEX);
    //       const extractedDocumentId = documentIdMatch?.[1] || '';
    //       const extractedDocumentSlug = documentSlugMatch?.[1] || '';
    //       const extractedCreatorId = creatorIdMatch?.[1] || '';

    //       if (extractedDocumentSlug) {
    //         window.history.replaceState(
    //           {
    //             documentId: extractedDocumentId,
    //             documentSlug: extractedDocumentSlug,
    //             term,
    //             difficulty,
    //           },
    //           '',
    //           `${origin}/ai/document/${extractedDocumentSlug}`,
    //         );
    //       }

    //       result = result
    //         .replace(DOCUMENT_ID_REGEX, '')
    //         .replace(DOCUMENT_SLUG_REGEX, '')
    //         .replace(CREATOR_ID_REGEX, '');

    //       onDocumentIdChange?.(extractedDocumentId);
    //       onDocumentSlugChange?.(extractedDocumentSlug);
    //       onCreatorIdChange?.(extractedCreatorId);
    //     }

    //     try {
    //       onDocumentChange?.(result);
    //     } catch (e) {
    //       console.error('Error parsing streamed course content:', e);
    //     }
    //   },
    //   onStreamEnd: async (result) => {
    //     result = result
    //       .replace(DOCUMENT_ID_REGEX, '')
    //       .replace(DOCUMENT_SLUG_REGEX, '')
    //       .replace(CREATOR_ID_REGEX, '');

    //     onLoadingChange?.(false);
    //     queryClient.invalidateQueries(getAiCourseLimitOptions());
    //   },
    // });
  } catch (error: any) {
    onError?.(error?.message || 'Something went wrong');
    console.error('Error in course generation:', error);
    onLoadingChange?.(false);
  }
}
