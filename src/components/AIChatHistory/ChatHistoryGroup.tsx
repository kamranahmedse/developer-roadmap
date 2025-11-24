import type { ChatHistoryWithoutMessages } from '../../queries/chat-history';
import { ChatHistoryItem } from './ChatHistoryItem';

type ChatHistoryGroupProps = {
  title: string;
  histories: ChatHistoryWithoutMessages[];
  activeChatHistoryId?: string;
  onChatHistoryClick: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ChatHistoryGroup(props: ChatHistoryGroupProps) {
  const {
    title,
    histories,
    activeChatHistoryId,
    onChatHistoryClick,
    onDelete,
  } = props;

  return (
    <div>
      <h2 className="ml-2 text-xs text-gray-500">{title}</h2>

      <ul className="mt-1 space-y-0.5">
        {histories.map((chatHistory) => {
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
}
