import { SearchIcon, WandIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { UserCoursesList } from './UserCoursesList';
import { FineTuneCourse } from './FineTuneCourse';
import {
  clearFineTuneData,
  getCourseFineTuneData,
  getLastSessionId,
  storeFineTuneData,
} from '../../lib/ai';

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
    <section className="flex grow flex-col bg-gray-100">
      <div className="container mx-auto flex max-w-3xl flex-col py-24 max-sm:py-4">
        <h1 className="mb-2.5 text-center text-4xl font-bold max-sm:mb-2 max-sm:text-left max-sm:text-xl">
          Learn anything with AI
        </h1>
        <p className="mb-6 text-center text-lg text-gray-600 max-sm:hidden max-sm:text-left max-sm:text-sm">
          Enter a topic below to generate a personalized course for it
        </p>

        <div className="rounded-lg border border-gray-200 bg-white p-6 max-sm:p-4">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="flex flex-col">
              <label
                htmlFor="keyword"
                className="mb-2.5 text-sm font-medium text-gray-700"
              >
                Course Topic
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon size={18} />
                </div>
                <input
                  id="keyword"
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., Algebra, JavaScript, Photography"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-gray-500 max-sm:placeholder:text-base"
                  maxLength={50}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2.5 text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <div className="flex gap-2 max-sm:flex-col max-sm:gap-1">
                {difficultyLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={cn(
                      'rounded-md border px-4 py-2 capitalize max-sm:text-sm',
                      difficulty === level
                        ? 'border-gray-800 bg-gray-800 text-white'
                        : 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200',
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
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
                'mt-2 flex items-center justify-center rounded-md px-4 py-2 font-medium text-white transition-colors max-sm:text-sm',
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

        <div className="mt-8 min-h-[200px]">
          <UserCoursesList />
        </div>
      </div>
    </section>
  );
}
