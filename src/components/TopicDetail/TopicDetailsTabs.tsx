import { Earth, WandSparkles, type LucideIcon } from 'lucide-react';

export type AllowedTopicDetailsTabs = 'content' | 'ai';

type TopicDetailsTabsProps = {
  activeTab: AllowedTopicDetailsTabs;
  setActiveTab: (tab: AllowedTopicDetailsTabs) => void;
  hasAITutor?: boolean;
};

export function TopicDetailsTabs(props: TopicDetailsTabsProps) {
  const { activeTab, setActiveTab, hasAITutor = true } = props;

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
        isDisabled={!hasAITutor}
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
  isDisabled?: boolean;
  onClick: () => void;
};

function TopicDetailsTab(props: TopicDetailsTabProps) {
  const { isActive, icon: Icon, label, isNew, isDisabled, onClick } = props;

  return (
    <button
      className="flex select-none disabled:pointer-events-none items-center gap-2 rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 hover:border-gray-400 data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white"
      data-state={isActive ? 'active' : 'inactive'}
      onClick={onClick}
      disabled={isDisabled}
      type="button"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:block">{label}</span>
      {isNew && !isDisabled && (
        <span className="hidden rounded-sm bg-yellow-400 px-1 text-xs text-black sm:block">
          New
        </span>
      )}
      {isDisabled && (
        <span className="hidden rounded-sm bg-gray-400 px-1 text-xs text-white sm:block">
          Soon
        </span>
      )}
    </button>
  );
}
