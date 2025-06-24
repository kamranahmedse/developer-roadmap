import './AIRoadmap.css';

import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';
import { AITutorLayout } from '../AITutor/AITutorLayout';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { aiRoadmapOptions } from '../../queries/ai-roadmap';
import { GenerateAIRoadmap } from './GenerateAIRoadmap';
import { AIRoadmapContent } from './AIRoadmapContent';

type AIRoadmapProps = {
  roadmapSlug?: string;
};

export function AIRoadmap(props: AIRoadmapProps) {
  const { roadmapSlug: defaultRoadmapSlug } = props;
  const [roadmapSlug, setRoadmapSlug] = useState(defaultRoadmapSlug);

  const toast = useToast();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // only fetch the guide if the guideSlug is provided
  // otherwise we are still generating the guide
  const { data: aiRoadmap, isLoading: isLoadingBySlug } = useQuery(
    aiRoadmapOptions(roadmapSlug, containerRef),
    queryClient,
  );

  const handleRegenerate = async (prompt?: string) => {
    flushSync(() => {
      setIsRegenerating(true);
    });

    queryClient.cancelQueries(aiRoadmapOptions(roadmapSlug));
    queryClient.setQueryData(aiRoadmapOptions(roadmapSlug).queryKey, (old) => {
      if (!old) {
        return old;
      }

      return {
        ...old,
        data: '',
        svg: null,
      };
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
        {roadmapSlug && (
          <AIRoadmapContent
            svg={aiRoadmap?.svg || null}
            containerRef={containerRef}
            isLoading={isLoadingBySlug || isRegenerating}
          />
        )}
        {!roadmapSlug && (
          <GenerateAIRoadmap onRoadmapSlugChange={setRoadmapSlug} />
        )}
      </div>
      {/* <AIGuideChat
        guideSlug={guideSlug}
        isGuideLoading={!aiGuide}
        onUpgrade={() => setShowUpgradeModal(true)}
        randomQuestions={randomQuestions}
        isQuestionsLoading={isAiGuideSuggestionsLoading}
      /> */}
    </AITutorLayout>
  );
}
