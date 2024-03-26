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
        <h2 className="text-xl font-semibold text-gray-800">Generate more Roadmaps</h2>
        <p className="mt-2 text-sm text-gray-700">
          Pick one of the options below to increase your roadmap limit.
        </p>
      </div>

      <ul className="w-full">
        {increaseLimitTabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <li key={tab.key}>
              <button
                onClick={() => {
                  setActiveTab(isActive ? null : tab.key);
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-2 border-t px-4 py-2 font-medium',
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-100',
                )}
              >
                {tab.title}
                <ChevronRight size={16} />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
