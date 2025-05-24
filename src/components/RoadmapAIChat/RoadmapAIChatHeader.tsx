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

      <div className="flex h-[46px] items-center justify-between gap-2 border-b border-gray-200 pr-4 text-sm">
        <div className="flex items-center">
          <button
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm',
              activeTab === 'chat' && selectedTopicId && 'bg-gray-100',
            )}
            onClick={() => onTabChange('chat')}
          >
            <BotIcon className="size-4 shrink-0 text-black" />
            <span>AI Chat</span>
          </button>

          {(activeTab === 'topic' || selectedTopicId) && (
            <div
              className={cn(
                'flex items-center gap-1.5 border-l border-gray-200 px-4 py-3 text-sm',
                activeTab === 'topic' && selectedTopicId && 'bg-gray-100',
              )}
            >
              <button
                className="flex items-center gap-2"
                onClick={() => onTabChange('topic')}
              >
                <BookIcon className="size-4 shrink-0 text-black" />
                <span>Topic Details</span>
              </button>

              <button
                className="ml-auto rounded-lg p-1 text-gray-500 hover:bg-gray-200"
                onClick={onCloseTopic}
              >
                <XIcon className="size-4 shrink-0" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {!isDataLoading && (
          <div className="flex gap-1.5">
            {hasChatHistory && (
              <button
                className="rounded-md bg-white px-2 py-2 text-xs font-medium text-black hover:bg-gray-200"
                onClick={() => {
                  setAiChatHistory([]);
                }}
              >
                <Trash2Icon className="size-3.5" />
              </button>
            )}

            {!isPaidUser && (
              <>
                <button
                  className="hidden rounded-md bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 sm:block"
                  onClick={() => {
                    if (!isLoggedIn()) {
                      onLogin();
                      return;
                    }

                    setShowAILimitsPopup(true);
                  }}
                >
                  <span className="font-medium">{usagePercentage}%</span>{' '}
                  credits used
                </button>
                <button
                  className="flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-1 text-sm text-black hover:bg-yellow-500"
                  onClick={() => {
                    if (!isLoggedIn()) {
                      onLogin();
                      return;
                    }

                    onUpgrade();
                  }}
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
