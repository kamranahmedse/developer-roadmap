import { useQuery } from '@tanstack/react-query';
import {
  listChatHistoryOptions,
  type ChatHistoryDocument,
} from '../../queries/chat-history';
import { queryClient } from '../../stores/query-client';
import { cn } from '../../lib/classname';
import { ChatHistoryItem } from './ChatHistoryItem';

type ListChatHistoryProps = {
  activeChatHistoryId?: string;
  onChatHistoryClick: (chatHistoryId: string) => void;
  onDelete?: (chatHistoryId: string) => void;
};

export function ListChatHistory(props: ListChatHistoryProps) {
  const { activeChatHistoryId, onChatHistoryClick, onDelete } = props;

  const { data } = useQuery(listChatHistoryOptions(), queryClient);

  return (
    <div className="w-[255px] shrink-0 border-r border-slate-200 bg-white p-2">
      <ul className="space-y-0.5">
        {data?.data?.map((chatHistory) => {
          const isActive = activeChatHistoryId === chatHistory._id;

          return (
            <ChatHistoryItem
              key={chatHistory._id}
              chatHistory={chatHistory}
              isActive={isActive}
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
}
