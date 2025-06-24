import './AIRoadmap.css';

import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';
import { AITutorLayout } from '../AITutor/AITutorLayout';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { aiRoadmapOptions, generateAIRoadmap } from '../../queries/ai-roadmap';
import { GenerateAIRoadmap } from './GenerateAIRoadmap';
import { AIRoadmapContent } from './AIRoadmapContent';
import { AIRoadmapChat } from './AIRoadmapChat';

type AIRoadmapProps = {
  roadmapSlug?: string;
};

export function AIRoadmap(props: AIRoadmapProps) {
  const { roadmapSlug: defaultRoadmapSlug } = props;
  const [roadmapSlug, setRoadmapSlug] = useState(defaultRoadmapSlug);

  const toast = useToast();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regeneratedSvgHtml, setRegeneratedSvgHtml] = useState('');

  // only fetch the guide if the guideSlug is provided
  // otherwise we are still generating the guide
  const { data: aiRoadmap, isLoading: isLoadingBySlug } = useQuery(
    aiRoadmapOptions(roadmapSlug),
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
        svgHtml: '',
      };
    });

    await generateAIRoadmap({
      roadmapSlug: aiRoadmap?.slug || '',
      term: aiRoadmap?.term || '',
      prompt,
      isForce: true,
      onStreamingChange: setIsRegenerating,
      onRoadmapSvgChange: (svg) => {
        setRegeneratedSvgHtml(svg.outerHTML);
      },
      onError: (error) => {
        toast.error(error);
      },
      onFinish: () => {
        setIsRegenerating(false);
        queryClient.invalidateQueries(aiRoadmapOptions(roadmapSlug));
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
        {roadmapSlug && (
          <AIRoadmapContent
            svgHtml={regeneratedSvgHtml || aiRoadmap?.svgHtml || ''}
            isLoading={isLoadingBySlug || isRegenerating}
            onRegenerate={handleRegenerate}
            roadmapSlug={roadmapSlug}
          />
        )}
        {!roadmapSlug && (
          <GenerateAIRoadmap onRoadmapSlugChange={setRoadmapSlug} />
        )}
      </div>
      <AIRoadmapChat
        roadmapSlug={roadmapSlug}
        isRoadmapLoading={!aiRoadmap}
        onUpgrade={() => setShowUpgradeModal(true)}
      />
    </AITutorLayout>
  );
}
