import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { generateGuide } from '../../helper/generate-ai-guide';
import { shuffle } from '../../helper/shuffle';
import { useToast } from '../../hooks/use-toast';
import { isLoggedIn } from '../../lib/jwt';
import {
  aiGuideSuggestionsOptions,
  getAiGuideOptions,
} from '../../queries/ai-guide';
import { queryClient } from '../../stores/query-client';
import { AITutorLayout } from '../AITutor/AITutorLayout';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { AIGuideChat } from './AIGuideChat';
import { AIGuideContent } from './AIGuideContent';
import { GenerateAIGuide } from './GenerateAIGuide';

type AIGuideProps = {
  guideSlug?: string;
};

export function AIGuide(props: AIGuideProps) {
  const { guideSlug: defaultGuideSlug } = props;
  const [guideSlug, setGuideSlug] = useState(defaultGuideSlug);

  const toast = useToast();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regeneratedHtml, setRegeneratedHtml] = useState<string | null>(null);

  // only fetch the guide if the guideSlug is provided
  // otherwise we are still generating the guide
  const { data: aiGuide, isLoading: isLoadingBySlug } = useQuery(
    getAiGuideOptions(guideSlug),
    queryClient,
  );

  const { data: aiGuideSuggestions, isLoading: isAiGuideSuggestionsLoading } =
    useQuery(
      {
        ...aiGuideSuggestionsOptions(guideSlug),
        enabled: !!guideSlug && !!isLoggedIn(),
      },
      queryClient,
    );

  const randomQuestions = useMemo(() => {
    return shuffle(aiGuideSuggestions?.questions || []).slice(0, 4);
  }, [aiGuideSuggestions]);
  const relatedTopics = useMemo(() => {
    return shuffle(aiGuideSuggestions?.relatedTopics || []).slice(0, 2);
  }, [aiGuideSuggestions]);
  const deepDiveTopics = useMemo(() => {
    return shuffle(aiGuideSuggestions?.deepDiveTopics || []).slice(0, 2);
  }, [aiGuideSuggestions]);

  const handleRegenerate = async (prompt?: string) => {
    flushSync(() => {
      setIsRegenerating(true);
      setRegeneratedHtml(null);
    });

    queryClient.cancelQueries(getAiGuideOptions(guideSlug));
    queryClient.setQueryData(getAiGuideOptions(guideSlug).queryKey, (old) => {
      if (!old) {
        return old;
      }

      return {
        ...old,
        content: '',
        html: '',
      };
    });

    await generateGuide({
      slug: aiGuide?.slug || '',
      term: aiGuide?.keyword || '',
      prompt,
      onStreamingChange: setIsRegenerating,
      onHtmlChange: setRegeneratedHtml,
      onFinish: () => {
        setIsRegenerating(false);
        queryClient.invalidateQueries(getAiGuideOptions(guideSlug));
      },
      isForce: true,
      onError: (error) => {
        toast.error(error);
      },
    });
  };

  return (
    <AITutorLayout
      wrapperClassName="flex-row p-0 lg:p-0 overflow-hidden bg-white"
      containerClassName="h-[calc(100vh-49px)] overflow-hidden relative"
    >
      {showUpgradeModal && (
        <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
      )}

      <div className="grow overflow-y-auto p-4 pt-0">
        {guideSlug && (
          <AIGuideContent
            html={regeneratedHtml || aiGuide?.html || ''}
            onRegenerate={handleRegenerate}
            isLoading={isLoadingBySlug || isRegenerating}
            guideSlug={guideSlug}
          />
        )}
        {!guideSlug && <GenerateAIGuide onGuideSlugChange={setGuideSlug} />}

        {aiGuide && !isRegenerating && (
          <div className="mx-auto mt-12 mb-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ListSuggestions
                title="Related Topics"
                suggestions={relatedTopics}
                depth="essentials"
                isLoading={isAiGuideSuggestionsLoading}
                currentGuideTitle={aiGuide.title}
              />

              <ListSuggestions
                title="Dive Deeper"
                suggestions={deepDiveTopics}
                depth="detailed"
                isLoading={isAiGuideSuggestionsLoading}
                currentGuideTitle={aiGuide.title}
              />
            </div>
          </div>
        )}
      </div>
      <AIGuideChat
        guideSlug={guideSlug}
        isGuideLoading={!aiGuide}
        onUpgrade={() => setShowUpgradeModal(true)}
        randomQuestions={randomQuestions}
        isQuestionsLoading={isAiGuideSuggestionsLoading}
      />
    </AITutorLayout>
  );
}

type ListSuggestionsProps = {
  currentGuideTitle?: string;
  title: string;
  suggestions: string[];
  depth: string;
  isLoading: boolean;
};

export function ListSuggestions(props: ListSuggestionsProps) {
  const { title, suggestions, depth, isLoading, currentGuideTitle } = props;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-300 bg-linear-to-br from-gray-100 to-gray-50 shadow-xs transition-all duration-200">
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          {depth === 'essentials'
            ? 'Explore related concepts to expand your knowledge'
            : 'Take a deeper dive into specific areas'}
        </p>
      </div>

      <div className="p-5">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-10 w-full animate-pulse rounded-lg bg-white"
              ></div>
            ))}
          </div>
        )}

        {!isLoading && suggestions?.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((topic) => {
              const topicTerm =
                depth === 'essentials'
                  ? `I have covered the basics of ${currentGuideTitle} and want to learn more about ${topic}`
                  : `I have covered the basics of ${currentGuideTitle} and want to dive deeper into ${topic}`;
              const url = `/ai/guide?term=${encodeURIComponent(topicTerm)}&depth=${depth}&id=&format=guide`;

              return (
                <a
                  key={topic}
                  href={url}
                  target="_blank"
                  className="group/item flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  <span className="flex-1 truncate group-hover/item:text-gray-900">
                    {topic}
                  </span>
                  <ExternalLink className="ml-2 size-4 text-gray-400 group-hover/item:text-gray-600" />
                </a>
              );
            })}
          </div>
        )}

        {!isLoading && suggestions?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 rounded-full bg-gray-100 p-3">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No suggestions available</p>
          </div>
        )}
      </div>
    </div>
  );
}
