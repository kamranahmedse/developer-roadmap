import type { ChatStatus, UIMessage } from 'ai';
import { TopicChatMessage } from './TopicChatMessage';
import { useIsThinking } from '../../hooks/use-is-thinking';

type TopicChatMessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
};

export function TopicChatMessages(props: TopicChatMessagesProps) {
  const { messages, status } = props;

  const isThinking = useIsThinking(messages, status);

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative flex grow flex-col justify-end">
        <div className="flex flex-col justify-end gap-2 px-3 py-2">
          <TopicChatMessage
            message={{
              id: '__welcome_message__',
              role: 'assistant',
              parts: [
                {
                  type: 'text',
                  text: 'Hey, I am your AI instructor. How can I help you today? 🤖',
                },
              ],
            }}
          />

          {messages.map((message, index) => {
            const isLastMessage = index === messages.length - 1;

            // otherwise it will add an extra space at the end of the message
            // because the last message is not rendered
            if (isThinking && isLastMessage && message.role === 'assistant') {
              return null;
            }

            return <TopicChatMessage key={message.id} message={message} />;
          })}

          {isThinking && (
            <TopicChatMessage
              message={{
                id: '__thinking_message__',
                role: 'assistant',
                parts: [{ type: 'text', text: 'Thinking...' }],
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
