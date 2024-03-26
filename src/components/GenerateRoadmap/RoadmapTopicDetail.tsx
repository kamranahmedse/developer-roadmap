import { useEffect, useMemo, useRef, useState } from 'react';

import { useKeydown } from '../../hooks/use-keydown';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { markdownToHtml } from '../../lib/markdown';
import { Ban, Cog, FileText, X } from 'lucide-react';
import { Spinner } from '../ReactIcons/Spinner';
import type { RoadmapNodeDetails } from './GenerateRoadmap';
import { getOpenAIKey, isLoggedIn, removeAuthToken } from '../../lib/jwt';
import { readAIRoadmapContentStream } from '../../helper/read-stream';
import { cn } from '../../lib/classname';
import { showLoginPopup } from '../../lib/popup';
import { OpenAISettings } from './OpenAISettings.tsx';

type RoadmapTopicDetailProps = RoadmapNodeDetails & {
  onClose?: () => void;
  roadmapId: string;
  topicLimitUsed: number;
  topicLimit: number;
  onTopicContentGenerateComplete?: () => void;
  onConfigureOpenAI?: () => void;
};

export function RoadmapTopicDetail(props: RoadmapTopicDetailProps) {
  const {
    onClose,
    roadmapId,
    nodeTitle,
    parentTitle,
    topicLimit,
    topicLimitUsed,
    onTopicContentGenerateComplete,
    onConfigureOpenAI,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [topicHtml, setTopicHtml] = useState('');

  const topicRef = useRef<HTMLDivElement>(null);

  const abortController = useMemo(() => new AbortController(), []);
  const generateAiRoadmapTopicContent = async () => {
    setIsLoading(true);
    setError('');
    //
    // if (topicLimitUsed >= topicLimit) {
    //   setError('Maximum limit reached');
    //   setIsLoading(false);
    //   return;
    // }

    if (!roadmapId || !nodeTitle) {
      setIsLoading(false);
      setError('Invalid roadmap id or node title');
      return;
    }

    const response = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-roadmap-content/${roadmapId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          nodeTitle,
          parentTitle,
        }),
        signal: abortController.signal,
      },
    );

    if (!response.ok) {
      const data = await response.json();

      setError(data?.message || 'Something went wrong');
      setIsLoading(false);

      // Logout user if token is invalid
      if (data.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
    }
    const reader = response.body?.getReader();

    if (!reader) {
      setIsLoading(false);
      setError('Something went wrong');
      return;
    }

    setIsLoading(false);
    await readAIRoadmapContentStream(reader, {
      onStream: async (result) => {
        setTopicHtml(markdownToHtml(result, false));
      },
    });
    onTopicContentGenerateComplete?.();
  };

  // Close the topic detail when user clicks outside the topic detail
  useOutsideClick(topicRef, () => {
    onClose?.();
  });

  useKeydown('Escape', () => {
    onClose?.();
  });

  useEffect(() => {
    if (!topicRef?.current) {
      return;
    }

    topicRef?.current?.focus();
    generateAiRoadmapTopicContent().finally(() => {});

    return () => {
      abortController.abort();
    };
  }, []);

  const hasContent = topicHtml?.length > 0;
  const openAIKey = getOpenAIKey();

  return (
    <div className={'relative z-50'}>
      <div
        ref={topicRef}
        tabIndex={0}
        className="fixed right-0 top-0 z-40 h-screen w-full overflow-y-auto bg-white p-4 focus:outline-0 sm:max-w-[600px] sm:p-6"
      >
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          <span>
            <span
              className={cn(
                'mr-0.5 inline-block rounded-xl border px-1.5 text-center text-sm tabular-nums text-gray-800',
                {
                  'animate-pulse border-zinc-300 bg-zinc-300 text-zinc-300':
                    !topicLimit,
                },
              )}
            >
              {topicLimitUsed} of {topicLimit}
            </span>{' '}
            topics generated
          </span>
          {!isLoggedIn() && (
            <button
              className="rounded-xl border border-current px-1.5 py-0.5 text-left text-sm font-medium text-blue-500 sm:text-center"
              onClick={showLoginPopup}
            >
              Generate more by <span className="font-semibold">logging in</span>
            </button>
          )}
          {isLoggedIn() && !openAIKey && (
            <button
              className="rounded-xl border border-current px-1.5 py-0.5 text-left text-sm font-medium text-blue-500 sm:text-center"
              onClick={onConfigureOpenAI}
            >
              Need to generate more?{' '}
              <span className="font-semibold">Click here.</span>
            </button>
          )}
          {isLoggedIn() && openAIKey && (
            <button
              className="flex items-center gap-1 rounded-xl border border-current px-1.5 py-0.5 text-left text-sm font-medium text-blue-500 sm:text-center"
              onClick={onConfigureOpenAI}
            >
              <Cog className="-mt-0.5 inline-block h-4 w-4" />
              Configure OpenAI Key
            </button>
          )}
        </div>

        {isLoading && (
          <div className="mt-6 flex w-full justify-center">
            <Spinner
              outerFill="#d1d5db"
              className="h-6 w-6 sm:h-12 sm:w-12"
              innerFill="#2563eb"
            />
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="mb-2">
              <button
                type="button"
                id="close-topic"
                className="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {hasContent ? (
              <div className="prose prose-quoteless prose-h1:mb-2.5 prose-h1:mt-7 prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-li:m-0 prose-li:mb-0.5">
                <div
                  id="topic-content"
                  dangerouslySetInnerHTML={{ __html: topicHtml }}
                />
              </div>
            ) : (
              <div className="flex h-[calc(100%-38px)] flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-gray-300" />
                <p className="mt-2 text-lg font-medium text-gray-500">
                  Empty Content
                </p>
              </div>
            )}
          </>
        )}

        {/* Error */}
        {!isLoading && error && (
          <>
            <button
              type="button"
              id="close-topic"
              className="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-full flex-col items-center justify-center">
              <Ban className="h-16 w-16 text-red-500" />
              <p className="mt-2 text-lg font-medium text-red-500">{error}</p>
            </div>
          </>
        )}
      </div>
      <div className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"></div>
    </div>
  );
}
