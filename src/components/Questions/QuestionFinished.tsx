import type { ReactNode } from 'react';
import {
  PartyPopper,
  RefreshCcw,
  SkipForward,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';
import type { QuestionProgressType } from './QuestionsList';

type ProgressStatButtonProps = {
  isDisabled?: boolean;
  icon: ReactNode;
  label: string;
  count: number;
  onClick: () => void;
};

function ProgressStatButton(props: ProgressStatButtonProps) {
  const { icon, label, count, onClick, isDisabled = false } = props;

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="group relative text-sm sm:text-base flex flex-1 items-center overflow-hidden rounded-md sm:rounded-xl border border-gray-300 bg-white py-2 px-2 sm:py-3 sm:px-4 text-black transition-colors hover:border-black disabled:pointer-events-none disabled:opacity-50"
    >
      {icon}
      <span className="flex flex-grow justify-between">
        <span>{label}</span>
        <span>{count}</span>
      </span>

      <span className="absolute top-full left-0 right-0 flex h-full items-center justify-center border border-black bg-black text-white transition-all duration-200 group-hover:top-0">
        Restart Asking
      </span>
    </button>
  );
}

type QuestionFinishedProps = {
  knowCount: number;
  didNotKnowCount: number;
  skippedCount: number;
  totalCount: number;
  onReset: (type: QuestionProgressType | 'reset') => void;
};

export function QuestionFinished(props: QuestionFinishedProps) {
  const { knowCount, didNotKnowCount, skippedCount, totalCount, onReset } =
    props;

  return (
    <div className="relative flex flex-grow flex-col items-center justify-center px-4 sm:px-0">
      <PartyPopper className="mb-4 mt-10 h-14 w-14 text-gray-300 sm:mt-0 sm:h-24 sm:w-24" />
      <h1 className="text-lg font-semibold text-gray-700 sm:text-2xl">
        Questions Finished
      </h1>
      <p className="mt-0 text-sm text-gray-500 sm:mt-2 sm:text-base">
        Click below revisit{' '}
        <span className="hidden sm:inline">specific or all questions</span>{' '}
        <span className="inline sm:hidden">questions</span>
      </p>

      <div className="mt-5 mb-5 flex w-full flex-col gap-1.5 sm:gap-3 px-2 sm:flex-row sm:px-16">
        <ProgressStatButton
          icon={<ThumbsUp className="mr-1 h-4" />}
          label="Knew"
          count={knowCount}
          isDisabled={knowCount === 0}
          onClick={() => onReset('know')}
        />
        <ProgressStatButton
          icon={<Sparkles className="mr-1 h-4" />}
          label="Learned"
          count={didNotKnowCount}
          isDisabled={didNotKnowCount === 0}
          onClick={() => onReset('dontKnow')}
        />
        <ProgressStatButton
          icon={<SkipForward className="mr-1 h-4" />}
          label="Skipped"
          count={skippedCount}
          isDisabled={skippedCount === 0}
          onClick={() => onReset('skip')}
        />
      </div>
      <div className="mt-2 mb-4 sm:mb-0 text-sm">
        <button
          onClick={() => onReset('reset')}
          className="flex items-center gap-0.5 text-red-700 hover:text-black text-sm sm:text-base"
        >
          <RefreshCcw className="mr-1 h-4" />
          Restart Asking
        </button>
      </div>
    </div>
  );
}
