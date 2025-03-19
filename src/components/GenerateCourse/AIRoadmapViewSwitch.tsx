import { cn } from '../../lib/classname';
import type { AICourseViewMode } from './AICourseContent';

type AIRoadmapViewSwitchProps = {
  viewMode: AICourseViewMode;
  setViewMode: (mode: AICourseViewMode) => void;
  isLoading: boolean;
};

export function AIRoadmapViewSwitch(props: AIRoadmapViewSwitchProps) {
  const { viewMode, setViewMode, isLoading } = props;

  return (
    <div className="sticky top-0 z-10 mx-auto mb-5 flex justify-center">
      <div className="grid min-w-[200px] grid-cols-2 gap-0.5 rounded-xl border border-gray-200 bg-white p-0.5 shadow-sm">
        <button
          className={cn(
            'rounded-lg px-2 py-1 text-sm font-medium disabled:cursor-not-allowed',
            viewMode === 'outline' && 'bg-gray-100 text-gray-800',
          )}
          onClick={() => setViewMode('outline')}
          disabled={isLoading}
        >
          Outline
        </button>
        <button
          className={cn(
            'rounded-lg px-2 py-1 text-sm font-medium disabled:cursor-not-allowed',
            viewMode === 'roadmap' && 'bg-gray-100 text-gray-800',
          )}
          onClick={() => setViewMode('roadmap')}
          disabled={isLoading}
        >
          Roadmap
        </button>
      </div>
    </div>
  );
}
