import { useMemo } from 'react';
import type { ChatStatus, UIMessage } from 'ai';

export function useIsThinking(messages: UIMessage[], status: ChatStatus) {
  return useMemo(() => {
    const lastMessage = messages.at(-1);
    if (!lastMessage) {
      return false;
    }

    if (status === 'submitted' && lastMessage.role === 'user') {
      return true;
    }

    const hasText =
      lastMessage.role === 'assistant' &&
      lastMessage.parts.some(
        (part) => part.type === 'text' && part.text?.trim(),
      );

    return (status === 'submitted' || status === 'streaming') && !hasText;
  }, [messages, status]);
}
