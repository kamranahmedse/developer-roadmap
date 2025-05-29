import { AIChatCard } from '../GenerateCourse/AICourseLessonChat';
import { Fragment, type RefObject } from 'react';
import type { AIChatHistoryType } from '../GenerateCourse/AICourseLessonChat';

type ChatHistoryProps = {
  chatHistory: AIChatHistoryType[];
  isStreamingMessage: boolean;
  streamedMessageHtml: string;
};

export function ChatHistory(props: ChatHistoryProps) {
  const { chatHistory, isStreamingMessage, streamedMessageHtml } = props;

  return (
    <div className="flex flex-col">
      <div className="relative flex grow flex-col justify-end">
        <div className="flex flex-col justify-end gap-2 py-5">
          {chatHistory.map((chat, index) => {
            return (
              <Fragment key={`chat-${index}`}>
                <AIChatCard
                  role={chat.role}
                  content={chat.content}
                  html={chat.html}
                />
              </Fragment>
            );
          })}

          {isStreamingMessage && !streamedMessageHtml && (
            <AIChatCard role="assistant" content="Thinking..." />
          )}

          {streamedMessageHtml && (
            <AIChatCard
              role="assistant"
              content=""
              html={streamedMessageHtml}
            />
          )}
        </div>
      </div>
    </div>
  );
}
