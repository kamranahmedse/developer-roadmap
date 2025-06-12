import { useInfiniteQuery } from '@tanstack/react-query';
import { listChatHistoryOptions } from '../../queries/chat-history';
import { queryClient } from '../../stores/query-client';
import {
  Loader2Icon,
  LockIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
  PlusIcon,
} from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ListChatHistorySkeleton } from './ListChatHistorySkeleton';
import { ChatHistoryError } from './ChatHistoryError';
import { cn } from '../../lib/classname';
import { getTailwindScreenDimension } from '../../lib/is-mobile';
import { groupChatHistory } from '../../helper/grouping';
import { SearchAIChatHistory } from './SearchAIChatHistory';
import { ChatHistoryGroup } from './ChatHistoryGroup';
import { isLoggedIn } from '../../lib/jwt';
import { CheckIcon } from '../ReactIcons/CheckIcon';

type ListChatHistoryProps = {
  activeChatHistoryId?: string;
  onChatHistoryClick: (chatHistoryId: string | null) => void;
  onDelete?: (chatHistoryId: string) => void;
  isPaidUser?: boolean;
  onUpgrade?: () => void;
};

export function ListChatHistory(props: ListChatHistoryProps) {
  const {
    activeChatHistoryId,
    onChatHistoryClick,
    onDelete,
    isPaidUser,
    onUpgrade,
  } = props;

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

  if (!isLoggedIn()) {
    return null;
  }

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

  const classNames = cn(
    'flex w-[255px] shrink-0 flex-col justify-start border-r border-gray-200 bg-white p-2',
    'max-md:absolute max-md:inset-0 max-md:z-20 max-md:w-full',
    !isOpen && 'hidden',
  );

  const closeButton = (
    <button
      className="flex size-8 items-center justify-center rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-black"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <PanelLeftCloseIcon className="h-4.5 w-4.5" />
    </button>
  );

  if (!isPaidUser) {
    return (
      <UpgradeToProMessage
        className={classNames}
        closeButton={closeButton}
        onUpgrade={onUpgrade}
      />
    );
  }

  return (
    <div className={classNames}>
      {isLoading && <ListChatHistorySkeleton />}
      {!isLoading && isError && <ChatHistoryError error={error} />}

      {!isLoading && !isError && (
        <>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="font-medium text-gray-900">Chat History</h1>
              {closeButton}
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black p-2 text-sm text-white hover:opacity-80"
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
            {isEmptyHistory && !isLoadingInfiniteQuery && (
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

type UpgradeToProMessageProps = {
  className?: string;
  onUpgrade?: () => void;
  closeButton?: React.ReactNode;
};

export function UpgradeToProMessage(props: UpgradeToProMessageProps) {
  const { className, onUpgrade, closeButton } = props;

  return (
    <div className={cn('relative flex flex-col', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-medium text-gray-900">Chat History</h1>
        {closeButton}
      </div>

      <div className="flex grow flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center">
          <div className="mb-3 rounded-full bg-yellow-100 p-3">
            <LockIcon className="size-6 text-yellow-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Unlock History
          </h2>
          <p className="mt-2 text-center text-sm text-balance text-gray-600">
            Save conversations and pick up right where you left off.
          </p>
        </div>

        <div className="my-5 w-full space-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
            <CheckIcon additionalClasses="size-4 text-green-500" />
            <span className="text-sm text-gray-600">Unlimited history</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
            <CheckIcon additionalClasses="size-4 text-green-500" />
            <span className="text-sm text-gray-600">Search old chats</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500"
          onClick={() => {
            onUpgrade?.();
          }}
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}
