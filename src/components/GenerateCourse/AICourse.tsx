import { Loader2Icon, SearchIcon, WandIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { useQuery } from '@tanstack/react-query';
import { listUserAiCoursesOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';

export const difficultyLevels = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type DifficultyLevel = (typeof difficultyLevels)[number];

type AICourseProps = {};

export function AICourse(props: AICourseProps) {
  const [keyword, setKeyword] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');

  const { data: userAiCourses, isLoading: isUserAiCoursesLoading } = useQuery(
    listUserAiCoursesOptions(),
    queryClient,
  );

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
      <div className="container mx-auto flex max-w-3xl flex-col py-12">
        <h1 className="mb-2 text-3xl font-bold">AI Course Generator</h1>
        <p className="mb-6 text-gray-600">
          Create personalized learning paths with AI
        </p>

        <div className="rounded-md border border-gray-200 bg-white p-6">
          <p className="mb-6 text-gray-600">
            Enter a keyword or topic, and our AI will create a personalized
            learning course for you.
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="flex flex-col">
              <label
                htmlFor="keyword"
                className="mb-2 text-sm font-medium text-gray-700"
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
                  placeholder="e.g., Machine Learning, JavaScript, Photography"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  maxLength={50}
                />
                <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {keyword.length}/50
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <div className="flex gap-2">
                {difficultyLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={cn(
                      'rounded-md border px-4 py-2 capitalize',
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
                'mt-2 flex items-center justify-center rounded-md px-4 py-2 font-medium text-white transition-colors',
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

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-medium">Your Courses</h2>

          {isUserAiCoursesLoading && (
            <div className="h-[92px] animate-pulse rounded-lg border border-gray-200 bg-gray-200"></div>
          )}

          {!isUserAiCoursesLoading && userAiCourses?.length === 0 && (
            <p className="text-gray-600">
              You haven't generated any courses yet.
            </p>
          )}

          {!isUserAiCoursesLoading &&
            userAiCourses &&
            userAiCourses.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {userAiCourses.map((course) => (
                  <a
                    key={course._id}
                    href={`/ai-tutor/${course.slug}`}
                    className="group relative flex w-full items-center justify-between overflow-hidden rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm transition-all hover:border-gray-400"
                  >
                    <span className="flex-grow truncate">{course.title}</span>
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs capitalize text-gray-400">
                      {course.difficulty}
                    </span>
                  </a>
                ))}
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
