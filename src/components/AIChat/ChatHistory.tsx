import { Fragment, memo, useMemo } from 'react';
import type {
  AIChatHistoryType,
  AllowedAIChatRole,
} from '../GenerateCourse/AICourseLessonChat';
import { markdownToHtml } from '../../lib/markdown';
import { cn } from '../../lib/classname';
import {
  CopyIcon,
  CheckIcon,
  TrashIcon,
  type LucideIcon,
  Icon,
  RotateCwIcon,
} from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text';

type ChatHistoryProps = {
  chatHistory: AIChatHistoryType[];
  onDelete?: (index: number) => void;
  onRegenerate?: (index: number) => void;
  isStreamingMessage: boolean;
  streamedMessageHtml: string;
};

export const ChatHistory = memo((props: ChatHistoryProps) => {
  const {
    chatHistory,
    onDelete,
    isStreamingMessage,
    streamedMessageHtml,
    onRegenerate,
  } = props;

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
                  onDelete={() => {
                    onDelete?.(index);
                  }}
                  onRegenerate={() => {
                    onRegenerate?.(index);
                  }}
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
  onDelete?: () => void;
  onRegenerate?: () => void;
};

export const AIChatCard = memo((props: AIChatCardProps) => {
  const {
    role,
    content,
    html: defaultHtml,
    showActions = true,
    onDelete,
    onRegenerate,
  } = props;
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
            'absolute -bottom-2 flex translate-y-full items-center gap-1',
            role === 'user' ? 'right-0' : 'left-0',
          )}
        >
          <ActionButton
            icon={isCopied ? CheckIcon : CopyIcon}
            onClick={() => copyText(content)}
          />

          {role === 'assistant' && onRegenerate && (
            <ActionButton icon={RotateCwIcon} onClick={onRegenerate} />
          )}

          {onDelete && <ActionButton icon={TrashIcon} onClick={onDelete} />}
        </div>
      )}
    </div>
  );
});

type ActionButtonProps = {
  icon: LucideIcon;
  onClick: () => void;
};

function ActionButton(props: ActionButtonProps) {
  const { icon: Icon, onClick } = props;
  return (
    <button
      className="flex size-8 items-center justify-center rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200"
      onClick={onClick}
    >
      <Icon className="size-4 stroke-[2.5]" />
    </button>
  );
}
