import { useState } from 'react';
import { AITutorLayout } from '../AITutor/AITutorLayout';
import { AIGuideContent } from './AIGuideContent';
import { useQuery } from '@tanstack/react-query';
import { getAiGuideOptions } from '../../queries/ai-guide';
import { queryClient } from '../../stores/query-client';
import { GenerateAIGuide } from './GenerateAIGuide';
import { AIGuideChat } from './AIGuideChat';

type AIGuideProps = {
  guideSlug?: string;
};

export function AIGuide(props: AIGuideProps) {
  const { guideSlug: defaultGuideSlug } = props;
  const [guideSlug, setGuideSlug] = useState(defaultGuideSlug);

  // only fetch the guide if the guideSlug is provided
  // otherwise we are still generating the guide
  const { data: aiGuide } = useQuery(getAiGuideOptions(guideSlug), queryClient);

  return (
    <AITutorLayout
      wrapperClassName="flex-row p-0 lg:p-0 overflow-hidden"
      containerClassName="h-[calc(100vh-49px)] overflow-hidden"
    >
      <div className="grow overflow-y-auto p-4 pt-0">
        {guideSlug && <AIGuideContent html={aiGuide?.html || ''} />}
        {!guideSlug && <GenerateAIGuide onGuideSlugChange={setGuideSlug} />}
      </div>
      <AIGuideChat guideSlug={guideSlug} isGuideLoading={!aiGuide} />
    </AITutorLayout>
  );
}
