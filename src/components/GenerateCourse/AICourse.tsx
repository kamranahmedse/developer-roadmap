import { WandIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { FineTuneCourse } from './FineTuneCourse';
import { DifficultyDropdown } from '../AITutor/DifficultyDropdown';
import { NatureDropdown, type NatureType } from '../AITutor/NatureDropdown';
import {
  clearFineTuneData,
  getCourseFineTuneData,
  getLastSessionId,
  storeFineTuneData,
} from '../../lib/ai';
import { cn } from '../../lib/classname';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

export const difficultyLevels = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type DifficultyLevel = (typeof difficultyLevels)[number];

type AICourseProps = {};

export function AICourse(props: AICourseProps) {
  const [keyword, setKeyword] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('beginner');
  const [nature, setNature] = useState<NatureType>('course');

  const [hasFineTuneData, setHasFineTuneData] = useState(false);
  const [about, setAbout] = useState('');
  const [goal, setGoal] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

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

  useEffect(() => {
    window?.fireEvent({
      action: 'tutor_user',
      category: 'ai_tutor',
      label: 'Visited AI Course Page',
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keyword.trim()) {
      onSubmit();
    }
  };

  function onSubmit() {
    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }

    let sessionId = '';
    if (hasFineTuneData) {
      clearFineTuneData();
      sessionId = storeFineTuneData({
        about,
        goal,
        customInstructions,
      });
    }

    window.location.href = `/ai/course?term=${encodeURIComponent(keyword)}&difficulty=${difficulty}&id=${sessionId}&nature=${nature}`;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col pt-4 md:justify-center md:pt-10 lg:pt-0">
      <div className="relative">
        {isUpgradeModalOpen && (
          <UpgradeAccountModal onClose={() => setIsUpgradeModalOpen(false)} />
        )}
        {!isPaidUser && !isPaidUserLoading && isLoggedIn() && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-8 text-gray-500 max-md:hidden">
            You are on the free plan
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="ml-2 rounded-lg bg-yellow-600 px-2 py-1 text-sm text-white hover:opacity-80"
            >
              Upgrade to Pro
            </button>
          </div>
        )}
        <h1 className="mb-0.5 text-center text-4xl font-semibold max-md:text-left max-md:text-xl lg:mb-3">
          What can I help you learn?
        </h1>
        <p className="mb-3 text-center text-lg text-balance text-gray-600 max-md:text-left max-md:text-sm md:mb-6">
          Enter a topic below to generate a personalized course for it
        </p>
      </div>
      <div className="rounded-lg border border-gray-300 bg-white">
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <input
            id="keyword"
            type="text"
            value={keyword}
            autoFocus={true}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. JavaScript Promises, React Hooks, Go Routines etc"
            className="w-full rounded-md border-none bg-transparent px-4 pt-4 pb-8 text-gray-900 focus:outline-hidden max-sm:placeholder:text-base"
            maxLength={50}
          />

          <div className="flex flex-col items-start justify-between gap-2 px-4 pb-4 md:flex-row md:items-center">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row gap-2">
                <NatureDropdown value={nature} onChange={setNature} />
                <DifficultyDropdown
                  value={difficulty}
                  onChange={setDifficulty}
                />
              </div>
              <label
                htmlFor="fine-tune-checkbox"
                className="flex cursor-pointer flex-row items-center gap-1 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={hasFineTuneData}
                  onChange={() => setHasFineTuneData(!hasFineTuneData)}
                  className="mr-1"
                  id="fine-tune-checkbox"
                />
                Explain more
              </label>
            </div>

            <button
              type="submit"
              disabled={!keyword.trim()}
              className={cn(
                'hidden items-center justify-center rounded-full px-4 py-1 text-sm text-white transition-colors md:flex',
                !keyword.trim()
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-black hover:bg-gray-800',
              )}
            >
              <WandIcon size={18} className="mr-2" />
              Generate Course
            </button>
          </div>

          <FineTuneCourse
            hasFineTuneData={hasFineTuneData}
            setHasFineTuneData={setHasFineTuneData}
            about={about}
            goal={goal}
            customInstructions={customInstructions}
            setAbout={setAbout}
            setGoal={setGoal}
            setCustomInstructions={setCustomInstructions}
          />

          <button
            type="submit"
            disabled={!keyword.trim()}
            className={cn(
              'mx-4 mb-3 flex items-center justify-center rounded-full px-4 py-1 text-sm text-white transition-colors md:hidden',
              !keyword.trim()
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-black hover:bg-gray-800',
            )}
          >
            <WandIcon size={18} className="mr-2" />
            Generate Course
          </button>
        </form>
      </div>
    </div>
  );
}
