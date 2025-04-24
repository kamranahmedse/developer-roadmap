import { BookIcon, SparklesIcon, type LucideIcon } from 'lucide-react';

export type AllowedTopicDetailsTabs = 'content' | 'ai';

type TopicDetailsTabsProps = {
  activeTab: AllowedTopicDetailsTabs;
  setActiveTab: (tab: AllowedTopicDetailsTabs) => void;
};

export function TopicDetailsTabs(props: TopicDetailsTabsProps) {
  const { activeTab, setActiveTab } = props;

  return (
    <div className="flex w-max items-center gap-1 rounded-lg border border-gray-200 p-0.5">
      <TopicDetailsTab
        isActive={activeTab === 'content'}
        icon={BookIcon}
        label="Content"
        onClick={() => setActiveTab('content')}
      />
      <TopicDetailsTab
        isActive={activeTab === 'ai'}
        icon={SparklesIcon}
        label="Learn with AI"
        onClick={() => setActiveTab('ai')}
      />
    </div>
  );
}

type TopicDetailsTabProps = {
  isActive: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

function TopicDetailsTab(props: TopicDetailsTabProps) {
  const { isActive, icon: Icon, label, onClick } = props;

  return (
    <button
      className="flex h-7 items-center gap-2 rounded-md px-2 py-0.5 text-sm text-gray-500 data-[state=active]:bg-black data-[state=active]:text-white"
      data-state={isActive ? 'active' : 'inactive'}
      onClick={onClick}
      disabled={isActive}
      type="button"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
