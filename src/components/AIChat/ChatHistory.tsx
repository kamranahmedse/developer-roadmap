import { Fragment, memo } from 'react';
import { cn } from '../../lib/classname';
import {
  CopyIcon,
  CheckIcon,
  TrashIcon,
  type LucideIcon,
  RotateCwIcon,
} from 'lucide-react';
import { useCopyText } from '../../hooks/use-copy-text';
import { Tooltip } from '../Tooltip';
import type { RoadmapAIChatHistoryType } from '../../hooks/use-roadmap-ai-chat';

type ChatHistoryProps = {
  chatHistory: RoadmapAIChatHistoryType[];
  onDelete?: (index: number) => void;
  onRegenerate?: (index: number) => void;
  isStreamingMessage: boolean;
  streamedMessage: React.ReactNode;
};

export const ChatHistory = memo((props: ChatHistoryProps) => {
  const {
    chatHistory,
    onDelete,
    isStreamingMessage,
    streamedMessage,
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
                  {...chat}
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

          {isStreamingMessage && !streamedMessage && (
            <AIChatCard
              role="assistant"
              content=""
              html="<p>Thinking...</p>"
              showActions={false}
            />
          )}

          {streamedMessage && (
            <AIChatCard
              role="assistant"
              content=""
              jsx={streamedMessage}
              showActions={false}
            />
          )}
        </div>
      </div>
    </div>
  );
});

type AIChatCardProps = RoadmapAIChatHistoryType & {
  onDelete?: () => void;
  onRegenerate?: () => void;
  showActions?: boolean;
};

export const AIChatCard = memo((props: AIChatCardProps) => {
  const {
    role,
    content,
    jsx,
    html,
    showActions = true,
    onDelete,
    onRegenerate,
  } = props;
  const { copyText, isCopied } = useCopyText();

  return (
    <div
      className={cn(
        'group/content relative flex w-full flex-col',
        role === 'user' ? 'items-end' : 'items-start',
      )}
    >
      <div
        className={cn(
          'flex max-w-full items-start gap-2.5 rounded-lg',
          role === 'user' ? 'max-w-[70%] bg-gray-200 p-3' : 'w-full',
        )}
      >
        {!!jsx && jsx}

        {!!html && (
          <div
            className="course-content course-ai-content prose prose-sm overflow-hidden text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
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
            onClick={() => copyText(content ?? '')}
            tooltip={isCopied ? 'Copied' : 'Copy'}
          />

          {role === 'assistant' && onRegenerate && (
            <ActionButton
              icon={RotateCwIcon}
              onClick={onRegenerate}
              tooltip="Regenerate"
            />
          )}

          {onDelete && (
            <ActionButton
              icon={TrashIcon}
              onClick={onDelete}
              tooltip="Delete"
            />
          )}
        </div>
      )}
    </div>
  );
});

type ActionButtonProps = {
  icon: LucideIcon;
  tooltip?: string;
  onClick: () => void;
};

function ActionButton(props: ActionButtonProps) {
  const { icon: Icon, onClick, tooltip } = props;

  return (
    <div className="group relative">
      <button
        className="flex size-8 items-center justify-center rounded-lg opacity-0 transition-opacity group-hover/content:opacity-100 hover:bg-gray-200"
        onClick={onClick}
      >
        <Icon className="size-4 stroke-[2.5]" />
      </button>

      {tooltip && (
        <Tooltip position="top-center" additionalClass="-translate-y-1">
          {tooltip}
        </Tooltip>
      )}
    </div>
  );
}
