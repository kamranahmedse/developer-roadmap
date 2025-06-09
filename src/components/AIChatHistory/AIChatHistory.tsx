import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { chatHistoryOptions } from '../../queries/chat-history';
import { AIChat } from '../AIChat/AIChat';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AIChatLayout } from './AIChatLayout';

type AIChatHistoryProps = {
  chatHistoryId?: string;
};

export function AIChatHistory(props: AIChatHistoryProps) {
  const { chatHistoryId: defaultChatHistoryId } = props;

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
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </div>
      )}
      {!isLoading && (
        <AIChat
          messages={data?.messages}
          chatHistoryId={chatHistoryId}
          setChatHistoryId={setChatHistoryId}
        />
      )}
    </AIChatLayout>
  );
}
