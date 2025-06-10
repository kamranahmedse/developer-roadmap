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

type AIChatHistoryProps = {
  chatHistoryId?: string;
};

export function AIChatHistory(props: AIChatHistoryProps) {
  const { chatHistoryId: defaultChatHistoryId } = props;

  const [keyTrigger, setKeyTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
    if (!defaultChatHistoryId) {
      return setIsLoading(false);
    }

    if (!data) {
      return;
    }

    setIsLoading(false);
  }, [data, defaultChatHistoryId]);

  const isDataLoading = isLoading || isBillingDetailsLoading;
  const hasError = chatHistoryError || billingDetailsError;

  useEffect(() => {
    if (!hasError) {
      return;
    }

    setIsLoading(false);
  }, [hasError]);

  return (
    <AIChatLayout>
      <div className="relative flex grow">
        {isDataLoading && !hasError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <Loader2Icon className="h-8 w-8 animate-spin stroke-[2.5]" />
          </div>
        )}

        {!isDataLoading && hasError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <ChatHistoryError error={hasError} className="mt-0" />
          </div>
        )}

        {!isDataLoading && !hasError && (
          <>
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

                  setIsLoading(true);
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

            <div className="flex grow">
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
            </div>
          </>
        )}
      </div>
    </AIChatLayout>
  );
}
