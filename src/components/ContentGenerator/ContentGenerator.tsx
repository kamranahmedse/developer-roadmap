import {
  BookOpenIcon,
  FileTextIcon,
  MapIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useId, useState, type FormEvent } from 'react';
import { FormatItem } from './FormatItem';
import { GuideOptions } from './GuideOptions';
import { FineTuneCourse } from '../GenerateCourse/FineTuneCourse';
import { CourseOptions } from './CourseOptions';
import {
  clearFineTuneData,
  getCourseFineTuneData,
  getLastSessionId,
  storeFineTuneData,
} from '../../lib/ai';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { useIsPaidUser } from '../../queries/billing';

const allowedFormats = ['course', 'guide', 'roadmap'] as const;
type AllowedFormat = (typeof allowedFormats)[number];

export function ContentGenerator() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

  const [title, setTitle] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<AllowedFormat>('course');

  // guide options
  const [depth, setDepth] = useState('essentials');
  // course options
  const [difficulty, setDifficulty] = useState('beginner');

  // fine-tune options
  const [showFineTuneOptions, setShowFineTuneOptions] = useState(false);
  const [about, setAbout] = useState('');
  const [goal, setGoal] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

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
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    let sessionId = '';
    if (showFineTuneOptions) {
      clearFineTuneData();
      sessionId = storeFineTuneData({
        about,
        goal,
        customInstructions,
      });
    }

    if (selectedFormat === 'course') {
      window.location.href = `/ai/course?term=${encodeURIComponent(title)}&difficulty=${difficulty}&id=${sessionId}&format=${selectedFormat}`;
    } else if (selectedFormat === 'guide') {
      window.location.href = `/ai/guide?term=${encodeURIComponent(title)}&depth=${depth}&id=${sessionId}&format=${selectedFormat}`;
    }
  };

  useEffect(() => {
    window?.fireEvent({
      action: 'tutor_user',
      category: 'ai_tutor',
      label: 'Visited AI Course Page',
    });
  }, []);

  useEffect(() => {
    const lastSessionId = getLastSessionId();
    if (!lastSessionId) {
      return;
    }

    const fineTuneData = getCourseFineTuneData(lastSessionId);
    if (!fineTuneData) {
      return;
    }

    setAbout(fineTuneData.about);
    setGoal(fineTuneData.goal);
    setCustomInstructions(fineTuneData.customInstructions);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-grow flex-col pt-4 md:justify-center md:pt-10 lg:pt-4">
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

      <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor={titleFieldId} className="inline-block text-gray-500">
            What can I help you learn?
          </label>
          <input
            type="text"
            id={titleFieldId}
            placeholder="Enter a topic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-xl border border-gray-200 bg-white p-4 outline-none placeholder:text-gray-500 focus:border-gray-500"
            required
            minLength={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="inline-block text-gray-500">
            Choose the format
          </label>
          <div className="grid grid-cols-2 gap-2">
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

        {selectedFormat === 'guide' && (
          <GuideOptions depth={depth} setDepth={setDepth} />
        )}

        {selectedFormat === 'course' && (
          <CourseOptions
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}

        {selectedFormat !== 'roadmap' && (
          <>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-4">
              <input
                type="checkbox"
                id={fineTuneOptionsId}
                checked={showFineTuneOptions}
                onChange={(e) => setShowFineTuneOptions(e.target.checked)}
              />
              <label htmlFor={fineTuneOptionsId} className="text-base">
                Show fine-tune options
              </label>
            </div>

            {showFineTuneOptions && (
              <FineTuneCourse
                hasFineTuneData={showFineTuneOptions}
                about={about}
                goal={goal}
                customInstructions={customInstructions}
                setAbout={setAbout}
                setGoal={setGoal}
                setCustomInstructions={setCustomInstructions}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white [&_div:first-child_label]:border-t-0"
              />
            )}
          </>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black p-4 text-white focus:outline-none"
        >
          <SparklesIcon className="size-4" />
          Generate
        </button>
      </form>
    </div>
  );
}
