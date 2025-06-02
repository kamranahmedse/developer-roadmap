import { Fragment, memo, useMemo } from 'react';
import type {
  AIChatHistoryType,
  AllowedAIChatRole,
} from '../GenerateCourse/AICourseLessonChat';
import { markdownToHtml } from '../../lib/markdown';
import { cn } from '../../lib/classname';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text';

type ChatHistoryProps = {
  chatHistory: AIChatHistoryType[];
  isStreamingMessage: boolean;
  streamedMessageHtml: string;
};

export const ChatHistory = memo((props: ChatHistoryProps) => {
  const { chatHistory, isStreamingMessage, streamedMessageHtml } = props;

  return (
    <div className="flex grow flex-col">
      <div className="relative flex grow flex-col justify-end">
        <div className="flex grow flex-col justify-end gap-14 py-5">
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
            <AIChatCard
              role="assistant"
              content="Thinking..."
              showActions={false}
            />
          )}

          {streamedMessageHtml && (
            <AIChatCard
              role="assistant"
              content=""
              html={streamedMessageHtml}
              showActions={false}
            />
          )}
        </div>
      </div>
    </div>
  );
});

type AIChatCardProps = {
  role: AllowedAIChatRole;
  content: string;
  html?: string;
  showActions?: boolean;
};

export const AIChatCard = memo((props: AIChatCardProps) => {
  const { role, content, html: defaultHtml, showActions = true } = props;
  const { copyText, isCopied } = useCopyText();

  const html = useMemo(() => {
    if (defaultHtml) {
      return defaultHtml;
    }

    return markdownToHtml(content, false);
  }, [content, defaultHtml]);

  return (
    <div
      className={cn(
        'group relative flex w-full flex-col',
        role === 'user' ? 'items-end' : 'items-start',
      )}
    >
      <div
        className={cn(
          'flex max-w-full items-start gap-2.5 rounded-lg',
          role === 'user' ? 'max-w-[70%] bg-gray-200 p-3' : '',
        )}
      >
        <div
          className="course-content course-ai-content prose prose-sm mt-0.5 max-w-full overflow-hidden text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {showActions && (
        <div
          className={cn(
            'absolute -bottom-2 translate-y-full',
            role === 'user' ? 'right-0' : 'left-0',
          )}
        >
          <button
            className="flex size-8 items-center justify-center rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200"
            onClick={() => copyText(content)}
          >
            {isCopied ? (
              <CheckIcon className="size-4 stroke-[2.5]" />
            ) : (
              <CopyIcon className="size-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
});
