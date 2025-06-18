import { useMemo, useState } from 'react';
import { AITutorLayout } from '../AITutor/AITutorLayout';
import { AIGuideContent } from './AIGuideContent';
import { useQuery } from '@tanstack/react-query';
import {
  aiGuideSuggestionsOptions,
  getAiGuideOptions,
} from '../../queries/ai-guide';
import { queryClient } from '../../stores/query-client';
import { GenerateAIGuide } from './GenerateAIGuide';
import { AIGuideChat } from './AIGuideChat';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { isLoggedIn } from '../../lib/jwt';
import { shuffle } from '../../helper/shuffle';
import { generateGuide } from '../../helper/generate-ai-guide';
import { useToast } from '../../hooks/use-toast';
import { flushSync } from 'react-dom';

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
      depth: aiGuide?.depth || '',
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

  console.log(isLoadingBySlug);
  return (
    <AITutorLayout
      wrapperClassName="flex-row p-0 lg:p-0 overflow-hidden bg-white"
      containerClassName="h-[calc(100vh-49px)] overflow-hidden"
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
          />
        )}
        {!guideSlug && <GenerateAIGuide onGuideSlugChange={setGuideSlug} />}

        {aiGuide && !isRegenerating && (
          <div className="mt-4 grid grid-cols-2 divide-x divide-gray-200 rounded-lg border border-gray-200 bg-white">
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
    <div className="flex flex-col">
      <h2 className="border-b border-gray-200 p-2 text-sm text-gray-500">
        {title}
      </h2>
      <ul className="flex flex-col gap-1 p-1">
        {isLoading && (
          <>
            {[1, 2].map((i) => (
              <div key={i} className="w-full">
                <div className="h-7 w-full animate-pulse rounded-md bg-gray-200"></div>
              </div>
            ))}
          </>
        )}
        {!isLoading &&
          suggestions?.map((topic) => {
            const topicTerm =
              depth === 'essentials'
                ? `I have covered the basics of ${currentGuideTitle} and want to learn more about ${topic}`
                : `I have covered the basics of ${currentGuideTitle} and want to dive deeper into ${topic}`;
            const url = `/ai/guide?term=${encodeURIComponent(topicTerm)}&depth=${depth}&id=&format=guide`;

            return (
              <li key={topic} className="w-full">
                <a
                  href={url}
                  target="_blank"
                  className="block truncate rounded-md px-2 py-1 text-sm hover:bg-gray-100"
                >
                  {topic}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
