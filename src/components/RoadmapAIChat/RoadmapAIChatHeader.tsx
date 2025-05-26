import { useQuery } from '@tanstack/react-query';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { billingDetailsOptions } from '../../queries/billing';
import { isLoggedIn } from '../../lib/jwt';
import { BookIcon, BotIcon, GiftIcon, Trash2Icon, XIcon } from 'lucide-react';
import type {
  RoadmapAIChatTab,
  RoamdapAIChatHistoryType,
} from './RoadmapAIChat';
import { useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { getPercentage } from '../../lib/number';
import { AILimitsPopup } from '../GenerateCourse/AILimitsPopup';
import { cn } from '../../lib/classname';

type RoadmapAIChatHeaderProps = {
  isLoading: boolean;

  hasChatHistory: boolean;
  setAiChatHistory: (history: RoamdapAIChatHistoryType[]) => void;

  onLogin: () => void;
  onUpgrade: () => void;

  activeTab: RoadmapAIChatTab;
  onTabChange: (tab: RoadmapAIChatTab) => void;
  onCloseTopic: () => void;
  selectedTopicId: string | null;
};

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
        'flex h-full items-center gap-2 px-4 text-sm',
        isActive && 'bg-gray-100',
        onClose && 'pr-2 pl-4',
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>

      {onClose && (
        <button
          className="ml-1.5 rounded-lg p-1 text-gray-500 hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <XIcon className="size-4 shrink-0" strokeWidth={2.5} />
        </button>
      )}
    </button>
  );
}

export function RoadmapAIChatHeader(props: RoadmapAIChatHeaderProps) {
  const {
    hasChatHistory,
    setAiChatHistory,
    onLogin,
    onUpgrade,
    isLoading: isDataLoading,

    activeTab,
    onTabChange,
    onCloseTopic,
    selectedTopicId,
  } = props;

  const toast = useToast();
  const [showAILimitsPopup, setShowAILimitsPopup] = useState(false);
  const { data: tokenUsage } = useQuery(getAiCourseLimitOptions(), queryClient);

  const { data: userBillingDetails } = useQuery(
    billingDetailsOptions(),
    queryClient,
  );

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
              label="Topic Details"
              isActive={activeTab === 'topic' && !!selectedTopicId}
              onClick={() => onTabChange('topic')}
              onClose={onCloseTopic}
            />
          )}
        </div>

        {!isDataLoading && (
          <div className="flex gap-1.5 pr-4">
            {hasChatHistory && (
              <button
                className="rounded-md bg-white px-2 py-2 text-xs font-medium text-black hover:bg-gray-200"
                onClick={() => setAiChatHistory([])}
              >
                <Trash2Icon className="size-3.5" />
              </button>
            )}

            {!isPaidUser && (
              <>
                {/* <button
                  className="hidden rounded-md bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 sm:block"
                  onClick={handleCreditsClick}
                >
                  <span className="font-medium">{usagePercentage}%</span>{' '}
                  credits used
                </button> */}
                <button
                  className="flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-1 text-sm text-black hover:bg-yellow-500"
                  onClick={handleUpgradeClick}
                >
                  <GiftIcon className="size-4" />
                  Upgrade
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
