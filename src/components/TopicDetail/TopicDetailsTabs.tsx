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
      className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 hover:border-gray-400 data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white"
      data-state={isActive ? 'active' : 'inactive'}
      onClick={onClick}
      disabled={isActive}
      type="button"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:block">{label}</span>
      {isNew && (
        <span className="hidden rounded-sm bg-yellow-400 px-1 text-xs text-black sm:block">
          New
        </span>
      )}
    </button>
  );
}
