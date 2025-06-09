import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { chatHistoryOptions } from '../../queries/chat-history';
import { AIChat } from '../AIChat/AIChat';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AIChatLayout } from './AIChatLayout';
import { ListChatHistory } from './ListChatHistory';

type AIChatHistoryProps = {
  chatHistoryId?: string;
};

export function AIChatHistory(props: AIChatHistoryProps) {
  const { chatHistoryId: defaultChatHistoryId } = props;

  const [keyTrigger, setKeyTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(!!defaultChatHistoryId);
  const [chatHistoryId, setChatHistoryId] = useState<string | undefined>(
    defaultChatHistoryId || undefined,
  );

  const { data } = useQuery(chatHistoryOptions(chatHistoryId), queryClient);

  useEffect(() => {
    if (!data) {
      return;
    }

    setIsLoading(false);
  }, [data]);

  return (
    <AIChatLayout>
      <div className="flex grow">
        <ListChatHistory
          activeChatHistoryId={chatHistoryId}
          onChatHistoryClick={(chatHistoryId) => {
            setKeyTrigger((keyTrigger) => keyTrigger + 1);

            if (chatHistoryId === null) {
              setChatHistoryId(undefined);
              window.history.replaceState(null, '', '/ai/chat');
              return;
            }

            setIsLoading(true);
            setChatHistoryId(chatHistoryId);
            window.history.replaceState(null, '', `/ai/chat/${chatHistoryId}`);
          }}
          onDelete={(deletedChatHistoryId) => {
            const isCurrentChatHistory = deletedChatHistoryId === chatHistoryId;
            if (!isCurrentChatHistory) {
              return;
            }

            setChatHistoryId(undefined);
            window.history.replaceState(null, '', '/ai/chat');
          }}
        />

        <div className="flex grow">
          {isLoading && (
            <div className="flex flex-1 items-center justify-center">
              <Loader2Icon className="h-4 w-4 animate-spin" />
            </div>
          )}
          {!isLoading && (
            <AIChat
              key={keyTrigger}
              messages={data?.messages}
              chatHistoryId={chatHistoryId}
              setChatHistoryId={(id) => {
                setChatHistoryId(id);
                window.history.replaceState(null, '', `/ai/chat/${id}`);
                queryClient.invalidateQueries({
                  predicate: (query) => {
                    return query.queryKey[0] === 'list-chat-history';
                  },
                });
              }}
            />
          )}
        </div>
      </div>
    </AIChatLayout>
  );
}
