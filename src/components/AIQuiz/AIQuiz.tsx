import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { useToast } from '../../hooks/use-toast';
import { queryClient } from '../../stores/query-client';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { AlertCircleIcon } from 'lucide-react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { billingDetailsOptions } from '../../queries/billing';
import { AIQuizLayout } from './AIQuizLayout';
import { GenerateAIQuiz } from './GenerateAIQuiz';
import { aiQuizOptions, generateAIQuiz } from '../../queries/ai-quiz';
import { AIQuizContent } from './AIQuizContent';

type AIQuizProps = {
  quizSlug?: string;
};

export function AIQuiz(props: AIQuizProps) {
  const { quizSlug: defaultQuizSlug } = props;
  const [quizSlug, setQuizSlug] = useState(defaultQuizSlug);

  const toast = useToast();
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
  } = useQuery(getAiCourseLimitOptions(), queryClient);

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const handleRegenerate = async (prompt?: string) => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    if (!isPaidUser && isLimitExceeded) {
      setShowUpgradeModal(true);
      return;
    }

    flushSync(() => {
      setIsRegenerating(true);
    });

    queryClient.cancelQueries(aiQuizOptions(quizSlug));
    queryClient.setQueryData(aiQuizOptions(quizSlug).queryKey, (old) => {
      if (!old) {
        return old;
      }

      return {
        ...old,
        data: '',
        svgHtml: '',
      };
    });

    await generateAIQuiz({
      quizSlug: aiQuiz?.slug || '',
      term: aiQuiz?.keyword || '',
      format: aiQuiz?.format || '',
      prompt,
      isForce: true,
      onStreamingChange: setIsRegenerating,
      onError: (error) => {
        toast.error(error);
      },
      onFinish: () => {
        setIsRegenerating(false);
        refetchTokenUsage();
        queryClient.invalidateQueries(aiQuizOptions(quizSlug));
      },
    });
  };

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

      {!isLoading && aiQuizError && (
        <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center bg-white">
          <div className="flex flex-col items-center justify-center gap-2">
            <AlertCircleIcon className="size-10 text-gray-500" />
            <p className="text-center">
              {aiQuizError?.message || 'Something went wrong'}
            </p>
          </div>
        </div>
      )}

      <div className="grow overflow-y-auto p-4 pt-0">
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
