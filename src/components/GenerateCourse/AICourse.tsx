import { WandIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { FineTuneCourse } from './FineTuneCourse';
import { DifficultyDropdown } from '../AITutor/DifficultyDropdown';
import {
  clearFineTuneData,
  getCourseFineTuneData,
  getLastSessionId,
  storeFineTuneData,
} from '../../lib/ai';
import { cn } from '../../lib/classname';

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

  const [hasFineTuneData, setHasFineTuneData] = useState(false);
  const [about, setAbout] = useState('');
  const [goal, setGoal] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

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

    window.location.href = `/ai/search?term=${encodeURIComponent(keyword)}&difficulty=${difficulty}&id=${sessionId}`;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col justify-center">
      <h1 className="mb-2.5 text-center text-4xl font-semibold max-sm:mb-2 max-sm:text-left max-sm:text-xl">
        What can I help you learn?
      </h1>
      <p className="mb-6 text-center text-lg text-gray-600 max-sm:hidden max-sm:text-left max-sm:text-sm">
        Enter a topic below to generate a personalized course for it
      </p>

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
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. JavaScript Promises, React Hooks, Go Routines etc"
            className="w-full rounded-md border-none bg-transparent px-4 pt-4 pb-8 text-gray-900 focus:outline-hidden max-sm:placeholder:text-base"
            maxLength={50}
          />

          <div className="flex flex-row items-center justify-between gap-2 px-4 pb-4">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row gap-2">
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
                Explain more for better course
              </label>
            </div>

            <button
              type="submit"
              disabled={!keyword.trim()}
              className={cn(
                'flex items-center justify-center rounded-full px-4 py-1 text-white transition-colors text-sm',
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
        </form>
      </div>
    </div>
  );
}
