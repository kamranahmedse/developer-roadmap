import { cn } from '../../lib/classname';
import type { ChatHistoryDocument } from '../../queries/chat-history';
import { ChatHistoryAction } from './ChatHistoryAction';

type ChatHistoryItemProps = {
  chatHistory: Omit<ChatHistoryDocument, 'messages'>;
  isActive: boolean;
  onChatHistoryClick: (chatHistoryId: string) => void;
  onDelete?: () => void;
};

export function ChatHistoryItem(props: ChatHistoryItemProps) {
  const { chatHistory, isActive, onChatHistoryClick, onDelete } = props;

  return (
    <li key={chatHistory._id} className="group/item relative text-sm">
      <button
        className="block w-full truncate rounded-lg p-2 pr-10 text-left hover:bg-gray-100 data-[active=true]:bg-gray-100"
        data-active={isActive}
        onClick={() => onChatHistoryClick(chatHistory._id)}
      >
        {chatHistory.title}
      </button>

      <div className="absolute inset-y-0 right-2 flex items-center">
        <ChatHistoryAction
          chatHistoryId={chatHistory._id}
          onDelete={onDelete}
        />
      </div>
    </li>
  );
}
