import { ChevronRight, ChevronUpIcon } from 'lucide-react';
import { cn } from '../../lib/classname';
import { increaseLimitTabs, type IncreaseTab } from './IncreaseRoadmapLimit';

type PickLimitOptionProps = {
  activeTab: IncreaseTab | null;
  setActiveTab: (tab: IncreaseTab | null) => void;
};

export function PickLimitOption(props: PickLimitOptionProps) {
  const { activeTab, setActiveTab } = props;

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Generate more Roadmaps
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Pick one of the options below to increase your roadmap limit.
        </p>
      </div>

      <div className="flex w-full flex-col gap-1 px-3 pb-4">
        {increaseLimitTabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(isActive ? null : tab.key);
              }}
              className={cn(
                'flex w-full items-center justify-between gap-2 rounded-md border-t py-2 text-sm font-medium pl-3 pr-3',
                {
                  'bg-gray-100 text-gray-800': isActive,
                  'bg-gray-200 hover:bg-gray-300 transition-colors text-black': !isActive,
                },
              )}
            >
              {tab.title}
              <ChevronRight size={16} />
            </button>
          );
        })}
      </div>
    </>
  );
}
