import {
  BookOpenIcon,
  FileTextIcon,
  MapIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { FormatItem } from './FormatItem';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { useIsPaidUser } from '../../queries/billing';
import {
  clearQuestionAnswerChatMessages,
  storeQuestionAnswerChatMessages,
} from '../../lib/ai-questions';
import {
  QuestionAnswerChat,
  type QuestionAnswerChatMessage,
} from './QuestionAnswerChat';
import { useToast } from '../../hooks/use-toast';

const allowedFormats = ['course', 'guide', 'roadmap'] as const;
export type AllowedFormat = (typeof allowedFormats)[number];

export function ContentGenerator() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

  const toast = useToast();
  const [title, setTitle] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<AllowedFormat>('course');

  // question answer chat options
  const [showFineTuneOptions, setShowFineTuneOptions] = useState(false);
  const [questionAnswerChatMessages, setQuestionAnswerChatMessages] = useState<
    QuestionAnswerChatMessage[]
  >([]);

  const titleFieldId = useId();
  const fineTuneOptionsId = useId();

  const allowedFormats: {
    label: string;
    icon: LucideIcon;
    value: AllowedFormat;
  }[] = [
    {
      label: 'Course',
      icon: BookOpenIcon,
      value: 'course',
    },
    {
      label: 'Guide',
      icon: FileTextIcon,
      value: 'guide',
    },
    {
      label: 'Roadmap',
      icon: MapIcon,
      value: 'roadmap',
    },
  ];

  const handleSubmit = () => {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    let sessionId = '';
    if (showFineTuneOptions) {
      clearQuestionAnswerChatMessages();
      sessionId = storeQuestionAnswerChatMessages(questionAnswerChatMessages);
    }

    const trimmedTitle = title.trim();
    if (selectedFormat === 'course') {
      window.location.href = `/ai/course?term=${encodeURIComponent(trimmedTitle)}&id=${sessionId}&format=${selectedFormat}`;
    } else if (selectedFormat === 'guide') {
      window.location.href = `/ai/guide?term=${encodeURIComponent(trimmedTitle)}&id=${sessionId}&format=${selectedFormat}`;
    } else if (selectedFormat === 'roadmap') {
      window.location.href = `/ai/roadmap?term=${encodeURIComponent(trimmedTitle)}&id=${sessionId}&format=${selectedFormat}`;
    }
  };

  useEffect(() => {
    window?.fireEvent({
      action: 'tutor_user',
      category: 'ai_tutor',
      label: 'Visited AI Course Page',
    });
  }, []);

  const trimmedTitle = title.trim();
  const canGenerate = trimmedTitle && trimmedTitle.length >= 3;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-grow flex-col pt-4 md:justify-center md:pt-10 lg:pt-4">
      <div className="relative">
        {isUpgradeModalOpen && (
          <UpgradeAccountModal onClose={() => setIsUpgradeModalOpen(false)} />
        )}
        {!isPaidUser && !isPaidUserLoading && isLoggedIn() && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-8 text-gray-500 max-md:hidden">
            You are on the free plan
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="ml-2 rounded-xl bg-yellow-600 px-2 py-1 text-sm text-white hover:opacity-80"
            >
              Upgrade to Pro
            </button>
          </div>
        )}
        <h1 className="mb-0.5 text-center text-4xl font-semibold max-md:text-left max-md:text-xl lg:mb-3">
          What can I help you learn?
        </h1>
        <p className="text-center text-lg text-balance text-gray-600 max-md:text-left max-md:text-sm">
          Enter a topic below to generate a personalized course for it
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
            What can I help you learn?
          </label>
          <input
            type="text"
            id={titleFieldId}
            placeholder="Enter a topic"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setShowFineTuneOptions(false);
            }}
            className="block w-full rounded-xl border border-gray-200 bg-white p-4 outline-none placeholder:text-gray-500 focus:border-gray-500"
            required
            minLength={3}
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
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-4"
          htmlFor={fineTuneOptionsId}
        >
          <input
            type="checkbox"
            id={fineTuneOptionsId}
            checked={showFineTuneOptions}
            onChange={(e) => {
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
          Answer the following questions for a better {selectedFormat}
        </label>

        {showFineTuneOptions && (
          <QuestionAnswerChat
            term={title}
            format={selectedFormat}
            questionAnswerChatMessages={questionAnswerChatMessages}
            setQuestionAnswerChatMessages={setQuestionAnswerChatMessages}
            onGenerateNow={() => {
              handleSubmit();
            }}
          />
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black p-4 text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-80"
          disabled={!canGenerate}
        >
          <SparklesIcon className="size-4" />
          Generate
        </button>
      </form>
    </div>
  );
}
