import { ArrowUpRight, Ban, Telescope, Wand } from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';
import { cn } from '../../lib/classname.ts';
import { AITermSuggestionInput } from './AITermSuggestionInput.tsx';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal.tsx';
import { useIsPaidUser } from '../../queries/billing.ts';

type RoadmapSearchProps = {
  roadmapTerm: string;
  setRoadmapTerm: (topic: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loadAIRoadmapLimit: () => void;
  onLoadTerm: (topic: string) => void;
  limit: number;
  limitUsed: number;
  isKeyOnly: boolean;
};

export function RoadmapSearch(props: RoadmapSearchProps) {
  const {
    roadmapTerm,
    setRoadmapTerm,
    handleSubmit,
    limit = 0,
    limitUsed = 0,
    onLoadTerm,
    loadAIRoadmapLimit,
    isKeyOnly,
  } = props;

  const { isPaidUser, isLoading } = useIsPaidUser();
  const canGenerateMore = limitUsed < limit;
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  useEffect(() => {
    setIsAuthenticatedUser(isLoggedIn());
  }, []);

  const randomTerms = ['OAuth', 'UI / UX', 'SRE', 'DevRel'];

  return (
    <div className="flex flex-grow flex-col items-center px-4 py-6 sm:px-6 md:my-24 lg:my-32">
      {isConfiguring && (
        <UpgradeAccountModal
          onClose={() => {
            setIsConfiguring(false);
            loadAIRoadmapLimit();
          }}
        />
      )}
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
      <div className="my-3 flex w-full max-w-[600px] flex-col items-center gap-3 sm:my-5">
        <form
          onSubmit={(e) => {
            if (limit > 0 && canGenerateMore) {
              handleSubmit(e);
            } else {
              e.preventDefault();
            }
          }}
          className="flex w-full flex-col gap-2 sm:flex-row"
        >
          <AITermSuggestionInput
            autoFocus={true}
            value={roadmapTerm}
            onValueChange={(value) => setRoadmapTerm(value)}
            placeholder="Enter a topic to generate a roadmap for"
            wrapperClassName="w-full"
            onSelect={(roadmapId, roadmapTitle) => {
              onLoadTerm(roadmapTitle);
            }}
          />
          <button
            className={cn(
              'flex min-w-[154px] flex-shrink-0 items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-white',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
            onClick={(e) => {
              if (!isAuthenticatedUser) {
                e.preventDefault();
                showLoginPopup();
              }
            }}
            disabled={
              isLoadingResults ||
              (isAuthenticatedUser &&
                (!limit || !roadmapTerm || limitUsed >= limit || isKeyOnly))
            }
          >
            {isLoadingResults && (
              <>
                <span>Please wait..</span>
              </>
            )}

            {!isLoadingResults && (
              <>
                {!isAuthenticatedUser && (
                  <>
                    <Wand size={20} />
                    Generate
                  </>
                )}
                {isAuthenticatedUser && (
                  <>
                    {(!limit || canGenerateMore) && (
                      <>
                        <Wand size={20} />
                        Generate
                      </>
                    )}

                    {limit > 0 && !canGenerateMore && (
                      <span className="flex items-center text-base">
                        <Ban size={15} className="mr-2" />
                        Limit reached
                      </span>
                    )}
                  </>
                )}
              </>
            )}
          </button>
        </form>
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          {randomTerms.map((term) => (
            <button
              key={term}
              disabled={isAuthenticatedUser && (!limit || !canGenerateMore)}
              type="button"
              onClick={() => {
                if (!isAuthenticatedUser) {
                  showLoginPopup();
                  return;
                }

                onLoadTerm(term);
              }}
              className="flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-sm transition-colors hover:border-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {term} <ArrowUpRight size={17} />
            </button>
          ))}
          <a
            href="/ai-roadmaps/explore"
            className="flex items-center gap-1.5 rounded-full border border-black bg-gray-700 px-2 py-0.5 text-sm text-white transition-colors hover:border-black hover:bg-black"
          >
            Explore AI Roadmaps <Telescope size={17} />
          </a>
        </div>
      </div>
      {!isAuthenticatedUser && (
        <div className="mt-8 flex max-w-[500px] flex-col items-center gap-3 rounded-xl border border-gray-400 px-4 pb-4 pt-3">
          <p className={'text-center text-gray-500'}>
            <button
              onClick={showLoginPopup}
              className="font-medium text-purple-600 underline underline-offset-2 hover:text-purple-800"
            >
              Sign up (free and takes 2s) or login
            </button>{' '}
            to start generating roadmaps. Or explore the ones made by the
            community.
          </p>
          <p className="flex flex-col gap-2 text-center text-gray-500 sm:flex-row">
            <a
              href="/ai-roadmaps/explore"
              className="flex items-center gap-1.5 rounded-full border border-purple-600 px-2.5 py-0.5 text-sm text-purple-600 transition-colors hover:bg-purple-600 hover:text-white"
            >
              Explore AI Generated Roadmaps <Telescope size={15} />
            </a>
            <a
              href="/roadmaps"
              className="flex items-center gap-1.5 rounded-full border border-purple-600 px-2.5 py-0.5 text-sm text-purple-600 transition-colors hover:bg-purple-600 hover:text-white"
            >
              Visit Official Roadmaps <ArrowUpRight size={15} />
            </a>
          </p>
        </div>
      )}
      {isKeyOnly && isAuthenticatedUser && !isPaidUser && (
        <div className="mx-auto mt-12 flex max-w-[450px] flex-col items-center gap-4">
          <p className={'text-center text-red-500'}>
            We have hit the limit for AI roadmap generation. Please try again
            again later or{' '}
            <button
              onClick={() => setIsConfiguring(true)}
              className="font-semibold text-purple-600 underline underline-offset-2"
            >
              get more credits.
            </button>
          </p>

          <p className="flex flex-col gap-2 text-center text-gray-500 sm:flex-row">
            <a
              href="/ai-roadmaps/explore"
              className="flex items-center gap-1.5 rounded-full border border-purple-600 px-2.5 py-0.5 text-sm text-purple-600 transition-colors hover:bg-purple-600 hover:text-white"
            >
              Explore AI Roadmaps <Telescope size={15} />
            </a>
            <a
              href="/roadmaps"
              className="flex items-center gap-1.5 rounded-full border border-purple-600 px-2.5 py-0.5 text-sm text-purple-600 transition-colors hover:bg-purple-600 hover:text-white"
            >
              Visit Official Roadmaps <ArrowUpRight size={15} />
            </a>
          </p>
        </div>
      )}
      {!isKeyOnly && limit > 0 && isAuthenticatedUser && !isPaidUser && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-center text-gray-500">
            You have generated{' '}
            <span
              className={
                'inline-block min-w-[50px] rounded-xl border px-1.5 text-center text-sm tabular-nums text-gray-800'
              }
            >
              {limitUsed} of {limit}
            </span>{' '}
            roadmaps today.
          </p>
          <p className="flex items-center text-sm">
            <button
              onClick={() => setIsConfiguring(true)}
              className="rounded-xl border border-current px-2 py-0.5 text-sm text-blue-500 transition-colors hover:bg-blue-400 hover:text-white"
            >
              Need to generate more?{' '}
              <span className="font-semibold">Click here.</span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
