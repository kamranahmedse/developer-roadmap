import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { chatHistoryOptions } from '../../queries/chat-history';
import { AIChat } from '../AIChat/AIChat';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
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

  const handleChatHistoryClick = useCallback(
    (nextChatHistoryId: string | null) => {
      setKeyTrigger((key) => key + 1);

      if (nextChatHistoryId === null) {
        setChatHistoryId(undefined);
        window.history.replaceState(null, '', '/ai/chat');
        return;
      }

      // show loader only if the chat history hasn't been fetched before (avoids UI flash)
      const hasAlreadyFetched = queryClient.getQueryData(
        chatHistoryOptions(nextChatHistoryId).queryKey,
      );

      if (!hasAlreadyFetched) {
        setIsChatHistoryLoading(true);
      }

      setChatHistoryId(nextChatHistoryId);
      window.history.replaceState(null, '', `/ai/chat/${nextChatHistoryId}`);
    },
    [],
  );

  const handleDelete = useCallback(
    (deletedChatHistoryId: string) => {
      if (deletedChatHistoryId !== chatHistoryId) {
        return;
      }

      setChatHistoryId(undefined);
      window.history.replaceState(null, '', '/ai/chat');
      setKeyTrigger((key) => key + 1);
    },
    [chatHistoryId],
  );

  const isPaidUser = userBillingDetails?.status === 'active';

  const hasError = chatHistoryError || billingDetailsError;

  const showLoader = isChatHistoryLoading && !hasError;
  const showError = !isChatHistoryLoading && Boolean(hasError);

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
            onChatHistoryClick={handleChatHistoryClick}
            onDelete={handleDelete}
          />
        )}

        <div className="relative flex grow">
          {showLoader && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <Loader2Icon className="h-8 w-8 animate-spin stroke-[2.5] text-gray-400/80" />
            </div>
          )}

          {showError && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <ChatHistoryError error={hasError} className="mt-0" />
            </div>
          )}

          {!showLoader && !showError && (
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
