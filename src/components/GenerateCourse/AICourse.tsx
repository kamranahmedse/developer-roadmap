import { SearchIcon, WandIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { UserCoursesList } from './UserCoursesList';

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

    window.location.href = `/ai-tutor/search?term=${encodeURIComponent(keyword)}&difficulty=${difficulty}`;
  }

  return (
    <section className="flex flex-grow flex-col bg-gray-100">
      <div className="container mx-auto flex max-w-3xl flex-col max-sm:py-4 py-24">
        <h1 className="mb-2 max-sm:mb-2 max-sm:text-left text-center max-sm:text-xl text-3xl font-bold">
          AI Course Generator
        </h1>
        <p className="mb-6 max-sm:hidden max-sm:text-sm max-sm:text-left text-center text-gray-600">
          Enter a topic below to generate a course for it
        </p>

        <div className="rounded-lg border border-gray-200 bg-white max-sm:p-4 p-6">
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
                  className="w-full max-sm:placeholder:text-base rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  maxLength={50}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2.5 text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <div className="flex max-sm:flex-col max-sm:gap-1 gap-2">
                {difficultyLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={cn(
                      'rounded-md max-sm:text-sm border px-4 py-2 capitalize',
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

            <button
              type="submit"
              disabled={!keyword.trim()}
              className={cn(
                'mt-2 max-sm:text-sm flex items-center justify-center rounded-md px-4 py-2 font-medium text-white transition-colors',
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
