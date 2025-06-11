import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { chatHistoryOptions } from '../../queries/chat-history';
import { AIChat } from '../AIChat/AIChat';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AIChatLayout } from './AIChatLayout';
import { ListChatHistory } from './ListChatHistory';
import { billingDetailsOptions } from '../../queries/billing';
import { ChatHistoryError } from './ChatHistoryError';
import { useClientMount } from '../../hooks/use-client-mount';

type AIChatHistoryProps = {
  chatHistoryId?: string;
};

export function AIChatHistory(props: AIChatHistoryProps) {
  const { chatHistoryId: defaultChatHistoryId } = props;

  const isClientMounted = useClientMount();
  const [keyTrigger, setKeyTrigger] = useState(0);
  const [isChatHistoryLoading, setIsChatHistoryLoading] = useState(true);
  const [chatHistoryId, setChatHistoryId] = useState<string | undefined>(
    defaultChatHistoryId || undefined,
  );

  const { data, error: chatHistoryError } = useQuery(
    chatHistoryOptions(chatHistoryId),
    queryClient,
  );

  const {
    data: userBillingDetails,
    isLoading: isBillingDetailsLoading,
    error: billingDetailsError,
  } = useQuery(billingDetailsOptions(), queryClient);
  const isPaidUser = userBillingDetails?.status === 'active';

  useEffect(() => {
    if (!chatHistoryId) {
      setIsChatHistoryLoading(false);
      return;
    }

    if (!data) {
      return;
    }

    setIsChatHistoryLoading(false);
  }, [data, chatHistoryId]);

  const hasError = chatHistoryError || billingDetailsError;

  useEffect(() => {
    if (!hasError) {
      return;
    }

    setIsChatHistoryLoading(false);
  }, [hasError]);

  if (!isClientMounted || isBillingDetailsLoading) {
    return (
      <AIChatLayout>
        <div className="relative flex grow">
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <Loader2Icon className="h-8 w-8 animate-spin stroke-[2.5] text-gray-400/80" />
          </div>
        </div>
      </AIChatLayout>
    );
  }

  return (
    <AIChatLayout>
      <div className="relative flex grow">
        {isPaidUser && (
          <ListChatHistory
            activeChatHistoryId={chatHistoryId}
            onChatHistoryClick={(chatHistoryId) => {
              setKeyTrigger((keyTrigger) => keyTrigger + 1);

              if (chatHistoryId === null) {
                setChatHistoryId(undefined);
                window.history.replaceState(null, '', '/ai/chat');
                return;
              }

              // so that we can show the loading state when the chat history is not fetched yet
              // it will help us to avoid the flash of content
              const hasAlreadyFetched = queryClient.getQueryData(
                chatHistoryOptions(chatHistoryId).queryKey,
              );

              if (!hasAlreadyFetched) {
                setIsChatHistoryLoading(true);
              }

              setChatHistoryId(chatHistoryId);
              window.history.replaceState(
                null,
                '',
                `/ai/chat/${chatHistoryId}`,
              );
            }}
            onDelete={(deletedChatHistoryId) => {
              const isCurrentChatHistory =
                deletedChatHistoryId === chatHistoryId;
              if (!isCurrentChatHistory) {
                return;
              }

              setChatHistoryId(undefined);
              window.history.replaceState(null, '', '/ai/chat');
            }}
          />
        )}

        <div className="relative flex grow">
          {isChatHistoryLoading && !hasError && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <Loader2Icon className="h-8 w-8 animate-spin stroke-[2.5]" />
            </div>
          )}

          {!isChatHistoryLoading && hasError && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <ChatHistoryError error={hasError} className="mt-0" />
            </div>
          )}

          {!isChatHistoryLoading && !hasError && (
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
