import { Ban, Wand } from 'lucide-react';
import type { FormEvent } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname.ts';

type RoadmapSearchProps = {
  roadmapTopic: string;
  setRoadmapTopic: (topic: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  limit: number;
  limitUsed: number;
};

export function RoadmapSearch(props: RoadmapSearchProps) {
  const {
    roadmapTopic,
    setRoadmapTopic,
    handleSubmit,
    limit = 0,
    limitUsed = 0,
  } = props;

  const canGenerateMore = limitUsed < limit;

  return (
    <div className="flex flex-grow flex-col items-center justify-center px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-0 text-center sm:gap-2">
        <h1 className="relative text-2xl font-medium sm:text-3xl">
          <span className="hidden sm:inline">Generate roadmaps with AI</span>
          <span className="inline sm:hidden">AI Roadmap Generator</span>
        </h1>
        <p className="text-base text-gray-500 sm:text-lg">
          <span className="hidden sm:inline">
            Enter a topic and let the AI generate a roadmap for you
          </span>
          <span className="inline sm:hidden">
            Enter a topic to generate a roadmap
          </span>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          if (limit > 0 && canGenerateMore) {
            handleSubmit(e);
          } else {
            e.preventDefault();
          }
        }}
        className="my-3 flex w-full max-w-[600px] flex-col gap-2 sm:my-5 sm:flex-row"
      >
        <input
          autoFocus
          type="text"
          placeholder="e.g. Ansible"
          className="w-full rounded-md border border-gray-400 px-3 py-2.5 transition-colors focus:border-black focus:outline-none"
          value={roadmapTopic}
          onInput={(e) => setRoadmapTopic((e.target as HTMLInputElement).value)}
        />
        <button
          className={cn(
            'flex min-w-[143px] flex-shrink-0 items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-white',
            {
              'cursor-not-allowed opacity-50':
                !limit || !roadmapTopic || limitUsed >= limit,
            },
          )}
        >
          {limit > 0 && canGenerateMore && (
            <>
              <Wand size={20} />
              Generate
            </>
          )}

          {limit === 0 && (
            <>
              <span>Please wait..</span>
            </>
          )}

          {limit > 0 && !canGenerateMore && (
            <span className="flex items-center text-base sm:text-sm">
              <Ban size={15} className="mr-2" />
              Limit reached
            </span>
          )}
        </button>
      </form>
      <div className="mb-36">
        <p className="text-gray-500">
          <span className="inline sm:hidden">Generated </span>
          <span className="hidden sm:inline">You have generated </span>
          <span
            className={cn(
              'inline-block w-[65px] rounded-md border px-0.5 text-center text-sm tabular-nums text-gray-800',
              {
                'animate-pulse border-zinc-300 bg-zinc-300 text-zinc-300':
                  !limit,
              },
            )}
          >
            {limitUsed} of {limit}
          </span>{' '}
          roadmaps.
          {!isLoggedIn && (
            <>
              {' '}
              <button
                className="font-semibold text-black underline underline-offset-2"
                onClick={showLoginPopup}
              >
                Log in to increase your limit
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
