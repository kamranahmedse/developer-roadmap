import { useQuery } from '@tanstack/react-query';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { billingDetailsOptions } from '../../queries/billing';
import { isLoggedIn } from '../../lib/jwt';
import { BookIcon, BotIcon, GiftIcon, PlusIcon, XIcon } from 'lucide-react';
import type { RoadmapAIChatTab } from './RoadmapAIChat';
import { useState } from 'react';
import { getPercentage } from '../../lib/number';
import { AILimitsPopup } from '../GenerateCourse/AILimitsPopup';
import { cn } from '../../lib/classname';
import { useKeydown } from '../../hooks/use-keydown';
import { RoadmapAIChatHistory } from '../RoadmapAIChatHistory/RoadmapAIChatHistory';

type TabButtonProps = {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  showBorder?: boolean;
  onClose?: () => void;
};

function TabButton(props: TabButtonProps) {
  const { icon, label, isActive, onClick, onClose } = props;

  return (
    <button
      className={cn(
        'flex h-full flex-shrink-0 items-center gap-2 px-4 text-sm',
        isActive && 'bg-gray-100',
        onClose && 'pr-2 pl-4',
      )}
      onClick={onClick}
    >
      {icon}
      <span className="hidden sm:block">{label}</span>

      {onClose && (
        <span
          role="button"
          className="ml-1 rounded-lg p-1 text-gray-500 hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <XIcon className="size-4 shrink-0" strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}

type RoadmapAIChatHeaderProps = {
  isLoading: boolean;

  onLogin: () => void;
  onUpgrade: () => void;

  onCloseChat: () => void;

  activeTab: RoadmapAIChatTab;
  onTabChange: (tab: RoadmapAIChatTab) => void;
  onCloseTopic: () => void;
  selectedTopicId: string | null;

  roadmapId: string;
  activeChatHistoryId?: string;
  onChatHistoryClick: (chatHistoryId: string) => void;
  onNewChat: () => void;
  onDeleteChatHistory: (chatHistoryId: string) => void;
};

export function RoadmapAIChatHeader(props: RoadmapAIChatHeaderProps) {
  const {
    onLogin,
    onUpgrade,
    isLoading: isDataLoading,
    onCloseChat,

    activeTab,
    onTabChange,
    onCloseTopic,
    selectedTopicId,
    roadmapId,
    activeChatHistoryId,
    onChatHistoryClick,
    onNewChat,
    onDeleteChatHistory,
  } = props;

  const [showAILimitsPopup, setShowAILimitsPopup] = useState(false);
  const { data: tokenUsage } = useQuery(getAiCourseLimitOptions(), queryClient);

  const { data: userBillingDetails } = useQuery(
    billingDetailsOptions(),
    queryClient,
  );

  useKeydown('Escape', onCloseChat);

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const usagePercentage = getPercentage(
    tokenUsage?.used || 0,
    tokenUsage?.limit || 0,
  );

  const handleCreditsClick = () => {
    if (!isLoggedIn()) {
      onLogin();
      return;
    }
    setShowAILimitsPopup(true);
  };

  const handleUpgradeClick = () => {
    if (!isLoggedIn()) {
      onLogin();
      return;
    }
    onUpgrade();
  };

  return (
    <>
      {showAILimitsPopup && (
        <AILimitsPopup
          onClose={() => setShowAILimitsPopup(false)}
          onUpgrade={() => {
            setShowAILimitsPopup(false);
            onUpgrade();
          }}
        />
      )}

      <div className="flex h-[46px] flex-shrink-0 items-center justify-between border-b border-gray-200 text-sm">
        <div className="flex h-full items-center">
          <TabButton
            icon={<BotIcon className="size-4 shrink-0 text-black" />}
            label="AI Chat"
            isActive={activeTab === 'chat' && !!selectedTopicId}
            onClick={() => onTabChange('chat')}
          />

          {(activeTab === 'topic' || selectedTopicId) && (
            <TabButton
              icon={<BookIcon className="size-4 shrink-0 text-black" />}
              label="Topic"
              isActive={activeTab === 'topic' && !!selectedTopicId}
              onClick={() => onTabChange('topic')}
              onClose={onCloseTopic}
            />
          )}
        </div>

        {!isDataLoading && isLoggedIn() && (
          <div className="flex gap-1.5 pr-4">
            {isPaidUser && (
              <button
                className="flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-xs text-black hover:bg-gray-300"
                onClick={onNewChat}
              >
                <PlusIcon className="size-4" />
                New Chat
              </button>
            )}

            {!isPaidUser && (
              <>
                <button
                  className="flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-1 text-sm text-black hover:bg-yellow-500"
                  onClick={handleUpgradeClick}
                >
                  <GiftIcon className="size-4" />
                  Upgrade
                </button>
              </>
            )}
            <RoadmapAIChatHistory
              roadmapId={roadmapId}
              onChatHistoryClick={onChatHistoryClick}
              activeChatHistoryId={activeChatHistoryId}
              onDelete={onDeleteChatHistory}
              onUpgrade={onUpgrade}
            />
            <button
              className="hidden items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-sm text-black hover:bg-gray-300 max-xl:flex"
              onClick={onCloseChat}
            >
              <XIcon className="size-3.5" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
