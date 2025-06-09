import { useQuery } from '@tanstack/react-query';
import {
  listChatHistoryOptions,
  type ChatHistoryDocument,
  type ChatHistoryWithoutMessages,
} from '../../queries/chat-history';
import { queryClient } from '../../stores/query-client';
import { cn } from '../../lib/classname';
import { ChatHistoryItem } from './ChatHistoryItem';
import { PlusIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

type ListChatHistoryProps = {
  activeChatHistoryId?: string;
  onChatHistoryClick: (chatHistoryId: string | null) => void;
  onDelete?: (chatHistoryId: string) => void;
};

export function ListChatHistory(props: ListChatHistoryProps) {
  const { activeChatHistoryId, onChatHistoryClick, onDelete } = props;

  const { data } = useQuery(listChatHistoryOptions(), queryClient);

  const groupedChatHistory = useMemo(() => {
    const today = DateTime.now().startOf('day');

    return data?.data?.reduce(
      (acc, chatHistory) => {
        const updatedAt = DateTime.fromJSDate(
          new Date(chatHistory.updatedAt),
        ).startOf('day');
        const diffInDays = Math.abs(updatedAt.diff(today, 'days').days);

        if (diffInDays === 0) {
          acc.today.histories.push(chatHistory);
        } else if (diffInDays <= 7) {
          acc.last7Days.histories.push(chatHistory);
        } else {
          acc.older.histories.push(chatHistory);
        }

        return acc;
      },
      {
        today: {
          title: 'Today',
          histories: [],
        },
        last7Days: {
          title: 'Last 7 Days',
          histories: [],
        },
        older: {
          title: 'Older',
          histories: [],
        },
      } as Record<
        string,
        { title: string; histories: ChatHistoryWithoutMessages[] }
      >,
    );
  }, [data?.data]);

  return (
    <div className="w-[255px] shrink-0 border-r border-gray-200 bg-white p-2">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-black p-2 text-sm text-white"
        onClick={() => {
          onChatHistoryClick(null);
        }}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="text-sm">New Chat</span>
      </button>

      <div className="mt-4 space-y-4">
        {Object.entries(groupedChatHistory ?? {}).map(([key, value]) => {
          if (value.histories.length === 0) {
            return null;
          }

          return (
            <div key={key}>
              <h2 className="ml-2 text-xs text-gray-500">{value.title}</h2>

              <ul className="mt-1 space-y-0.5">
                {value.histories.map((chatHistory) => {
                  return (
                    <ChatHistoryItem
                      key={chatHistory._id}
                      chatHistory={chatHistory}
                      isActive={activeChatHistoryId === chatHistory._id}
                      onChatHistoryClick={onChatHistoryClick}
                      onDelete={() => {
                        onDelete?.(chatHistory._id);
                      }}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
