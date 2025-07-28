import {
  FileTextIcon,
  ListIcon,
  ListTodoIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { billingDetailsOptions } from '../../queries/billing';
import {
  clearQuestionAnswerChatMessages,
  storeQuestionAnswerChatMessages,
} from '../../lib/ai-questions';
import {
  QuestionAnswerChat,
  type QuestionAnswerChatMessage,
} from '../ContentGenerator/QuestionAnswerChat';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/classname';
import { getUrlParams } from '../../lib/browser';
import { FormatItem } from '../ContentGenerator/FormatItem';
import { queryClient } from '../../stores/query-client';
import { useQuery } from '@tanstack/react-query';
import { aiLimitOptions } from '../../queries/ai-course';
import { showUpgradeModal } from '../../stores/subscription';

const allowedFormats = ['mcq', 'open-ended', 'mixed'] as const;
export type AllowedFormat = (typeof allowedFormats)[number];

export function AIQuizGenerator() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const toast = useToast();
  const [title, setTitle] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<AllowedFormat>('mcq');

  const [showFineTuneOptions, setShowFineTuneOptions] = useState(false);
  const [questionAnswerChatMessages, setQuestionAnswerChatMessages] = useState<
    QuestionAnswerChatMessage[]
  >([]);

  const {
    data: tokenUsage,
    isLoading: isTokenUsageLoading,
    refetch: refetchTokenUsage,
  } = useQuery(aiLimitOptions(), queryClient);

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const selectedLimit = tokenUsage?.quiz;
  const showLimitWarning =
    !isPaidUser &&
    !isBillingDetailsLoading &&
    !isTokenUsageLoading &&
    isLoggedIn();

  const titleFieldId = useId();
  const fineTuneOptionsId = useId();

  useEffect(() => {
    const params = getUrlParams();
    const format = params.format as AllowedFormat;
    if (format && allowedFormats.find((f) => f.value === format)) {
      setSelectedFormat(format);
    }
  }, []);

  const allowedFormats: {
    label: string;
    formatTitle: string;
    icon: LucideIcon;
    value: AllowedFormat;
  }[] = [
    {
      label: 'Multi-Choice',
      formatTitle: 'Multiple Choice Question',
      icon: ListTodoIcon,
      value: 'mcq',
    },
    {
      label: 'Open-Ended',
      formatTitle: 'Open-Ended Question',
      icon: FileTextIcon,
      value: 'open-ended',
    },
    {
      label: 'Mixed',
      formatTitle: 'Mixed Question (MCQ + Open-Ended)',
      icon: ListIcon,
      value: 'mixed',
    },
  ];

  const handleSubmit = () => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    if (!isPaidUser && isLimitExceeded) {
      setIsUpgradeModalOpen(true);
      return;
    }

    if (
      !isPaidUser &&
      selectedLimit &&
      selectedLimit?.used >= selectedLimit?.limit
    ) {
      showUpgradeModal();
      return;
    }

    let sessionId = '';
    if (showFineTuneOptions) {
      clearQuestionAnswerChatMessages();
      sessionId = storeQuestionAnswerChatMessages(questionAnswerChatMessages);
    }

    window.location.href = `/ai/quiz/search?term=${title}&format=${selectedFormat}&id=${sessionId}`;
  };

  useEffect(() => {
    window?.fireEvent({
      action: 'tutor_user',
      category: 'ai_tutor',
      label: 'Visited AI Quiz Generator Page',
    });
  }, []);

  const trimmedTitle = title.trim();
  const canGenerate = trimmedTitle && trimmedTitle.length >= 3;
  const selectedFormatTitle = allowedFormats.find(
    (f) => f.value === selectedFormat,
  )?.formatTitle;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-grow flex-col pt-4 md:justify-center md:pt-10 lg:pt-28 lg:pb-24">
      <div className="relative">
        {isUpgradeModalOpen && (
          <UpgradeAccountModal onClose={() => setIsUpgradeModalOpen(false)} />
        )}

        {showLimitWarning && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-8 text-gray-500 max-md:hidden">
            {selectedLimit?.used} of {selectedLimit?.limit} quizzes
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="ml-2 rounded-xl bg-yellow-600 px-2 py-1 text-sm text-white hover:opacity-80"
            >
              Need more? Upgrade
            </button>
          </div>
        )}
        <h1 className="mb-0.5 text-center text-4xl font-semibold max-md:text-left max-md:text-xl lg:mb-3">
          Test your Knowledge
        </h1>
        <p className="text-center text-lg text-balance text-gray-600 max-md:text-left max-md:text-sm">
          Create a personalized quiz to test your understanding of any topic
        </p>
      </div>

      <form
        className="mt-10 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor={titleFieldId} className="inline-block text-gray-500">
            What topic would you like to quiz yourself on?
          </label>
          <input
            type="text"
            id={titleFieldId}
            placeholder="e.g., JavaScript Variables, Go Routines, System Design"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setShowFineTuneOptions(false);
            }}
            className="block w-full rounded-xl border border-gray-200 bg-white p-4 outline-none placeholder:text-gray-500 focus:border-gray-500"
            required
            minLength={3}
            data-clarity-unmask="true"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="inline-block text-gray-500">
            Choose the format
          </label>
          <div className="grid grid-cols-3 gap-3">
            {allowedFormats.map((format) => {
              const isSelected = format.value === selectedFormat;

              return (
                <FormatItem
                  key={format.value}
                  label={format.label}
                  onClick={() => setSelectedFormat(format.value)}
                  icon={format.icon}
                  isSelected={isSelected}
                />
              );
            })}
          </div>
        </div>

        <label
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all',
          )}
          htmlFor={fineTuneOptionsId}
        >
          <input
            type="checkbox"
            id={fineTuneOptionsId}
            checked={showFineTuneOptions}
            onChange={(e) => {
              if (!isLoggedIn()) {
                showLoginPopup();
                return;
              }

              if (!isPaidUser && isLimitExceeded) {
                setIsUpgradeModalOpen(true);
                return;
              }

              if (!trimmedTitle) {
                toast.error('Please enter a topic first');
                return;
              }

              if (trimmedTitle.length < 3) {
                toast.error('Topic must be at least 3 characters long');
                return;
              }

              setShowFineTuneOptions(e.target.checked);
            }}
          />
          <span className="max-sm:hidden">
            Answer the following questions for a better result
          </span>
          <span className="sm:hidden">Customize your quiz</span>
        </label>

        {showFineTuneOptions && (
          <QuestionAnswerChat
            term={title}
            format={selectedFormatTitle || selectedFormat}
            questionAnswerChatMessages={questionAnswerChatMessages}
            setQuestionAnswerChatMessages={setQuestionAnswerChatMessages}
            from="quiz"
          />
        )}

        <button
          type="submit"
          className="flex h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-black p-4 text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-80"
          disabled={
            !canGenerate || isTokenUsageLoading || isBillingDetailsLoading
          }
        >
          <SparklesIcon className="size-4" />
          Generate Quiz
        </button>
      </form>
    </div>
  );
}
