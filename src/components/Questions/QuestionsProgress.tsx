import {
  Check,
  CheckCircle,
  Lightbulb,
  PartyPopper,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export function QuestionsProgress() {
  return (
    <div className="mb-5 rounded-lg border border-gray-300 bg-white p-6 overflow-hidden">
      <div className="mb-3 flex items-center text-gray-600">
        <div className="relative w-full flex-1 rounded-xl bg-gray-200 p-1">
          <div className="absolute bottom-0 left-0 top-0 w-[30%] rounded-xl bg-slate-800"></div>
        </div>
        <span className="ml-3 text-sm">5 / 100</span>
      </div>

      <div className="relative -left-1 flex flex-col gap-2 text-sm text-black sm:flex-row sm:gap-3">
        <span className="flex items-center">
          <CheckCircle className="mr-1 h-4" />
          <span>Already knew</span>
          <span className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">
            44 Questions
          </span>
        </span>

        <span className="flex items-center">
          <Sparkles className="mr-1 h-4" />
          <span>Didn't Know</span>
          <span className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">
            20 Questions
          </span>
        </span>

        <button className="flex items-center text-red-600 hover:text-red-900">
          <RotateCcw className="mr-1 h-4" />
          Reset Progress
        </button>
      </div>

      <p className="-mx-6 mt-6 -mb-6 border-t bg-yellow-100 py-3 text-sm text-yellow-900">
        You progress will not be saved. Please{' '}
        <button className="underline-offset-3 font-medium underline">
          login to save your progress.
        </button>
      </p>
    </div>
  );
}
