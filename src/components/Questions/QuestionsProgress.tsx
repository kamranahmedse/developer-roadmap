import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  SkipForward,
  Sparkles,
} from 'lucide-react';

type QuestionsProgressProps = {
  isLoading?: boolean;
  knowCount?: number;
  didNotKnowCount?: number;
  totalCount?: number;
  skippedCount?: number;
  onResetClick?: () => void;
  onPrevClick?: () => void;
  onNextClick?: () => void;
};

export function QuestionsProgress(props: QuestionsProgressProps) {
  const {
    isLoading = false,
    knowCount = 0,
    didNotKnowCount = 0,
    totalCount = 0,
    skippedCount = 0,
    onResetClick = () => null,
    onPrevClick = () => null,
    onNextClick = () => null,
  } = props;

  const totalSolved = knowCount + didNotKnowCount + skippedCount;
  const donePercentage = (totalSolved / totalCount) * 100;

  return (
    <div className="mb-3 overflow-hidden rounded-lg border border-gray-300 bg-white p-4 sm:mb-5 sm:p-6">
      <div className="mb-3 flex items-center text-gray-600">
        <div className="relative w-full flex-1 rounded-xl bg-gray-200 p-1">
          <div
            className="absolute top-0 bottom-0 left-0 rounded-xl bg-slate-800 transition-[width] duration-400"
            style={{
              width: `${donePercentage}%`,
            }}
          />
        </div>
        <span className="ml-3 flex items-center text-sm">
          <button
            onClick={onPrevClick}
            className="text-zinc-400 hover:text-black"
          >
            <ChevronLeft className="h-4" strokeWidth={3} />
          </button>
          <span className="block min-w-[41px] text-center">
            <span className="tabular-nums">{totalSolved}</span> / {totalCount}
          </span>
          <button
            onClick={onNextClick}
            className="text-zinc-400 hover:text-black"
          >
            <ChevronRight className="h-4" strokeWidth={3} />
          </button>
        </span>
      </div>

      <div className="relative -left-1 flex flex-col gap-2 text-sm text-black sm:flex-row sm:gap-3">
        <span className="flex items-center">
          <CheckCircle className="mr-1 h-4" />
          <span>Knew</span>
          <span className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">
            <span className="tabular-nums">{knowCount}</span> Items
          </span>
        </span>

        <span className="flex items-center">
          <Sparkles className="mr-1 h-4" />
          <span>Learnt</span>
          <span className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">
            <span className="tabular-nums">{didNotKnowCount}</span> Items
          </span>
        </span>

        <span className="flex items-center">
          <SkipForward className="mr-1 h-4" />
          <span>Skipped</span>
          <span className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">
            <span className="tabular-nums">{skippedCount}</span> Items
          </span>
        </span>

        <button
          disabled={isLoading}
          onClick={onResetClick}
          className="flex items-center text-red-600 transition-opacity duration-300 hover:text-red-900 disabled:opacity-50"
        >
          <RotateCcw className="mr-1 h-4" />
          Reset
          <span className="inline lg:hidden">Progress</span>
        </button>
      </div>
    </div>
  );
}
