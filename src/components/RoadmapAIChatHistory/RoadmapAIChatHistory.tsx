import { HistoryIcon, Loader2Icon, PlusIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { listChatHistoryOptions } from '../../queries/chat-history';
import { isLoggedIn } from '../../lib/jwt';
import { groupChatHistory } from '../../helper/grouping';
import { ChatHistoryGroup } from '../AIChatHistory/ChatHistoryGroup';
import { queryClient } from '../../stores/query-client';
import { SearchAIChatHistory } from '../AIChatHistory/SearchAIChatHistory';

type RoadmapAIChatHistoryProps = {
  roadmapId: string;
  activeChatHistoryId?: string;
  onChatHistoryClick: (id: string) => void;
  onDelete?: (id: string) => void;
  onNewChat?: () => void;
};

export function RoadmapAIChatHistory(props: RoadmapAIChatHistoryProps) {
  const {
    roadmapId,
    activeChatHistoryId,
    onChatHistoryClick,
    onDelete,
    onNewChat,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  const {
    data: chatHistory,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfiniteQuery,
  } = useInfiniteQuery(
    {
      ...listChatHistoryOptions({
        roadmapId,
        query,
      }),
      enabled: !!roadmapId && isLoggedIn() && isOpen,
    },
    queryClient,
  );

  useEffect(() => {
    if (!chatHistory) {
      return;
    }

    setIsLoading(false);
  }, [chatHistory]);

  const groupedChatHistory = useMemo(() => {
    const allHistories = chatHistory?.pages?.flatMap((page) => page.data);
    return groupChatHistory(allHistories ?? []);
  }, [chatHistory?.pages]);
  const isEmptyHistory = Object.values(groupedChatHistory ?? {}).every(
    (group) => group.histories.length === 0,
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex size-8 items-center justify-center rounded-lg hover:bg-gray-200">
        <HistoryIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        className="flex max-h-[400px] w-80 flex-col overflow-hidden p-0"
        align="end"
        sideOffset={4}
      >
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2Icon className="size-6 animate-spin stroke-[2.5]" />
          </div>
        )}
        {!isLoading && (
          <>
            <SearchAIChatHistory
              onSearch={setQuery}
              isLoading={isLoadingInfiniteQuery}
              className="mt-0"
              inputClassName="border-x-0 border-t-0 border-b border-b-gray-200 rounded-none focus:border-b-gray-200"
            />

            <div className="scrollbar-track-transparent scrollbar-thin scrollbar-thumb-gray-300 grow space-y-4 overflow-y-auto p-2 pt-4">
              {isEmptyHistory && (
                <div className="flex items-center justify-center py-10">
                  <p className="text-sm text-gray-500">No chat history</p>
                </div>
              )}

              {Object.entries(groupedChatHistory ?? {}).map(([key, value]) => {
                if (value.histories.length === 0) {
                  return null;
                }

                return (
                  <ChatHistoryGroup
                    key={key}
                    title={value.title}
                    histories={value.histories}
                    activeChatHistoryId={activeChatHistoryId}
                    onChatHistoryClick={(id) => {
                      setIsOpen(false);
                      onChatHistoryClick(id);
                    }}
                    onDelete={(id) => {
                      setIsOpen(false);
                      onDelete?.(id);
                    }}
                  />
                );
              })}

              {hasNextPage && (
                <div className="mt-4">
                  <button
                    className="flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-black"
                    onClick={() => {
                      fetchNextPage();
                    }}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage && (
                      <>
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                        Loading more...
                      </>
                    )}
                    {!isFetchingNextPage && 'Load More'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center border-t border-gray-200">
              <button
                className="flex w-full items-center justify-center gap-2 p-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-black"
                onClick={() => {
                  setIsOpen(false);
                  onNewChat?.();
                }}
              >
                <PlusIcon className="size-4" />
                New Chat
              </button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
