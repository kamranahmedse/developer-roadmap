import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { queryClient } from '../../stores/query-client';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { AlertCircleIcon } from 'lucide-react';
import { aiLimitOptions } from '../../queries/ai-course';
import { billingDetailsOptions } from '../../queries/billing';
import { AIQuizLayout } from './AIQuizLayout';
import { GenerateAIQuiz } from './GenerateAIQuiz';
import { aiQuizOptions, generateAIQuiz } from '../../queries/ai-quiz';
import { AIQuizContent } from './AIQuizContent';
import { LoadingChip } from '../LoadingChip';

type AIQuizProps = {
  quizSlug?: string;
};

export function AIQuiz(props: AIQuizProps) {
  const { quizSlug: defaultQuizSlug } = props;
  const [quizSlug, setQuizSlug] = useState(defaultQuizSlug);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // only fetch the guide if the guideSlug is provided
  // otherwise we are still generating the guide
  const {
    data: aiQuiz,
    isLoading: isLoadingBySlug,
    error: aiQuizError,
  } = useQuery(aiQuizOptions(quizSlug), queryClient);

  const {
    data: tokenUsage,
    isLoading: isTokenUsageLoading,
    refetch: refetchTokenUsage,
  } = useQuery(aiLimitOptions(), queryClient);

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isLoading =
    isLoadingBySlug ||
    isRegenerating ||
    isTokenUsageLoading ||
    isBillingDetailsLoading;

  return (
    <AIQuizLayout>
      {showUpgradeModal && (
        <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
      )}

      <div className="relative grow">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center bg-white">
            <LoadingChip message="Loading Quiz" />
          </div>
        )}

        {!isLoading && aiQuizError && (
          <div className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center justify-center gap-2">
              <AlertCircleIcon className="size-10 text-gray-500" />
              <p className="text-center">
                {aiQuizError?.message || 'Something went wrong'}
              </p>
            </div>
          </div>
        )}

        {quizSlug && !aiQuizError && (
          <AIQuizContent
            quizSlug={quizSlug}
            questions={aiQuiz?.questions ?? []}
            isLoading={isLoading}
          />
        )}
        {!quizSlug && !aiQuizError && (
          <GenerateAIQuiz onQuizSlugChange={setQuizSlug} />
        )}
      </div>
    </AIQuizLayout>
  );
}
