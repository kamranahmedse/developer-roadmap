import { Earth, WandSparkles, type LucideIcon } from 'lucide-react';

export type AllowedTopicDetailsTabs = 'content' | 'ai';

type TopicDetailsTabsProps = {
  activeTab: AllowedTopicDetailsTabs;
  setActiveTab: (tab: AllowedTopicDetailsTabs) => void;
};

export function TopicDetailsTabs(props: TopicDetailsTabsProps) {
  const { activeTab, setActiveTab } = props;

  return (
    <div className="flex w-max gap-1.5">
      <TopicDetailsTab
        isActive={activeTab === 'content'}
        icon={Earth}
        label="Resources"
        onClick={() => setActiveTab('content')}
      />
      <TopicDetailsTab
        isActive={activeTab === 'ai'}
        icon={WandSparkles}
        label="AI Tutor"
        isNew={true}
        onClick={() => setActiveTab('ai')}
      />
    </div>
  );
}

type TopicDetailsTabProps = {
  isActive: boolean;
  icon: LucideIcon;
  label: string;
  isNew?: boolean;
  onClick: () => void;
};

function TopicDetailsTab(props: TopicDetailsTabProps) {
  const { isActive, icon: Icon, label, isNew, onClick } = props;

  return (
    <button
      className="flex border data-[state=active]:border-black border-gray-300 hover:bg-gray-100 items-center gap-2 px-2 py-1 rounded-md text-sm text-gray-500 data-[state=active]:bg-black data-[state=active]:text-white"
      data-state={isActive ? 'active' : 'inactive'}
      onClick={onClick}
      disabled={isActive}
      type="button"
    >
      <Icon className="h-4 w-4" />
      {label}
      {isNew && (
        <span className="text-xs bg-yellow-400 text-black rounded-sm px-1">
          New
        </span>
      )}
    </button>
  );
}
