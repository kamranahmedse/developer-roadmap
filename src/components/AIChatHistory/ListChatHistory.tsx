import { useInfiniteQuery } from '@tanstack/react-query';
import { listChatHistoryOptions } from '../../queries/chat-history';
import { queryClient } from '../../stores/query-client';
import { ChatHistoryItem } from './ChatHistoryItem';
import {
  Loader2Icon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDebounceValue } from '../../hooks/use-debounce';
import { ListChatHistorySkeleton } from './ListChatHistorySkeleton';
import { ChatHistoryError } from './ChatHistoryError';
import { cn } from '../../lib/classname';
import { getTailwindScreenDimension } from '../../lib/is-mobile';
import { groupChatHistory } from '../../helper/grouping';
import { SearchAIChatHistory } from './SearchAIChatHistory';
import { ChatHistoryGroup } from './ChatHistoryGroup';

type ListChatHistoryProps = {
  activeChatHistoryId?: string;
  onChatHistoryClick: (chatHistoryId: string | null) => void;
  onDelete?: (chatHistoryId: string) => void;
};

export function ListChatHistory(props: ListChatHistoryProps) {
  const { activeChatHistoryId, onChatHistoryClick, onDelete } = props;

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const deviceType = getTailwindScreenDimension();
    const isMediumSize = ['sm', 'md'].includes(deviceType);
    setIsOpen(!isMediumSize);
    setIsMobile(isMediumSize);
  }, []);

  const [query, setQuery] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading: isLoadingInfiniteQuery,
  } = useInfiniteQuery(listChatHistoryOptions({ query }), queryClient);

  useEffect(() => {
    if (!data) {
      return;
    }

    setIsLoading(false);
  }, [data?.pages]);

  const groupedChatHistory = useMemo(() => {
    const allHistories = data?.pages?.flatMap((page) => page.data);
    return groupChatHistory(allHistories ?? []);
  }, [data?.pages]);

  if (!isOpen) {
    return (
      <div className="absolute top-2 left-2 z-20">
        <button
          className="flex size-8 items-center justify-center rounded-lg p-1 hover:bg-gray-200"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <PanelLeftIcon className="h-4.5 w-4.5" />
        </button>
      </div>
    );
  }

  const isEmptyHistory = Object.values(groupedChatHistory ?? {}).every(
    (group) => group.histories.length === 0,
  );

  return (
    <div
      className={cn(
        'flex w-[255px] shrink-0 flex-col justify-start border-r border-gray-200 bg-white p-2',
        'max-md:absolute max-md:inset-0 max-md:z-20 max-md:w-full',
        !isOpen && 'hidden',
      )}
    >
      {isLoading && <ListChatHistorySkeleton />}
      {!isLoading && isError && <ChatHistoryError error={error} />}

      {!isLoading && !isError && (
        <>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="font-medium text-gray-900">Chat History</h1>
              <button
                className="flex size-8 items-center justify-center rounded-lg p-1 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <PanelLeftCloseIcon className="h-4.5 w-4.5" />
              </button>
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black p-2 text-sm text-white"
              onClick={() => {
                if (isMobile) {
                  setIsOpen(false);
                }
                onChatHistoryClick(null);
              }}
            >
              <PlusIcon className="h-4 w-4" />
              <span className="text-sm">New Chat</span>
            </button>

            <SearchAIChatHistory
              onSearch={setQuery}
              isLoading={isLoadingInfiniteQuery}
            />
          </div>

          <div className="scrollbar-track-transparent scrollbar-thin scrollbar-thumb-gray-300 -mx-2 mt-6 grow space-y-4 overflow-y-scroll px-2">
            {isEmptyHistory && (
              <div className="flex items-center justify-center">
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
                    if (isMobile) {
                      setIsOpen(false);
                    }

                    onChatHistoryClick(id);
                  }}
                  onDelete={(id) => {
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
        </>
      )}
    </div>
  );
}
