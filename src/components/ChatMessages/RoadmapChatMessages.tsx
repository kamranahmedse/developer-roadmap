import type { ChatStatus, UIMessage } from 'ai';
import { memo } from 'react';
import { RoadmapChatMessage } from './RoadmapChatMessage';
import { useIsThinking } from '../../hooks/use-is-thinking';

type MessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
  roadmapId: string;
  onTopicClick?: (topicId: string, topicTitle: string) => void;
  defaultQuestions?: string[];
  onDefaultQuestionClick?: (question: string) => void;
};

function _RoadmapChatMessages(props: MessagesProps) {
  const {
    messages,
    status,
    roadmapId,
    defaultQuestions,
    onTopicClick,
    onDefaultQuestionClick,
  } = props;

  const isStreaming = status === 'streaming';
  const isThinking = useIsThinking(messages, status);

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative flex grow flex-col justify-end">
        <div className="flex flex-col justify-end gap-2 px-3 py-2">
          <RoadmapChatMessage
            roadmapId={roadmapId}
            message={{
              id: '__welcome_message__',
              role: 'assistant',
              parts: [
                {
                  type: 'text',
                  text: 'Hello, how can I help you today?',
                },
              ],
            }}
            isStreaming={isStreaming}
          />

          {messages.length === 0 &&
            defaultQuestions &&
            defaultQuestions.length > 0 && (
              <div className="mt-0.5 mb-1">
                <p className="mb-2 text-xs font-normal text-gray-500">
                  Some questions you might have about this roadmap:
                </p>
                <div className="flex flex-col justify-end gap-1">
                  {defaultQuestions.map((question, index) => (
                    <button
                      key={`default-question-${index}`}
                      className="flex h-full self-start rounded-md bg-yellow-500/10 px-3 py-2 text-left text-sm text-black hover:bg-yellow-500/20"
                      onClick={() => onDefaultQuestionClick?.(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {messages.map((message, index) => {
            const isLastMessage = index === messages.length - 1;

            // otherwise it will add an extra space at the end of the message
            // because the last message is not rendered
            if (isThinking && isLastMessage && message.role === 'assistant') {
              return null;
            }

            return (
              <RoadmapChatMessage
                key={message.id}
                roadmapId={roadmapId}
                message={message}
                isStreaming={isStreaming}
                onTopicClick={onTopicClick}
              />
            );
          })}

          {isThinking && (
            <RoadmapChatMessage
              roadmapId={roadmapId}
              message={{
                id: '__thinking_message__',
                role: 'assistant',
                parts: [
                  {
                    type: 'text',
                    text: 'Thinking...',
                  },
                ],
              }}
              isStreaming={isStreaming}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const RoadmapChatMessages = memo(_RoadmapChatMessages);
