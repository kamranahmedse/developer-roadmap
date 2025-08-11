import { cn } from '../../lib/classname';
import { Markdown } from '../Global/Markdown';
import { BotIcon, User2Icon } from 'lucide-react';
import type { UIMessage } from 'ai';
import { promptLabelMapping } from '../TopicDetail/PredefinedActions';

type TopicChatMessageProps = {
  message: UIMessage;
};

export function TopicChatMessage(props: TopicChatMessageProps) {
  const { message } = props;
  const { role } = message;

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg',
        role === 'user' ? 'bg-gray-300/30' : 'bg-yellow-500/30',
      )}
    >
      <div className="flex items-start gap-2.5 p-3">
        <div
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full',
            role === 'user'
              ? 'bg-gray-200 text-black'
              : 'bg-yellow-400 text-black',
          )}
        >
          {role === 'user' ? (
            <User2Icon className="size-4 stroke-[2.5]" />
          ) : (
            <BotIcon className="size-4 stroke-[2.5]" />
          )}
        </div>

        <div>
          {message.parts.map((part) => {
            const { type } = part;
            const key = `message-${message.id}-part-${type}`;

            if (type === 'text') {
              let content = part.text;
              if (role === 'user' && promptLabelMapping[content]) {
                content = promptLabelMapping[content];
              }

              return (
                <Markdown
                  key={key}
                  className="prose prose-sm message-markdown max-w-full text-sm"
                >
                  {content}
                </Markdown>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
