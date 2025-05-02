import {
  BabyIcon,
  BookOpenTextIcon,
  BrainIcon,
  ChevronDownIcon,
  NotebookPenIcon,
  type LucideIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '../../lib/classname';
import { PredefinedMessageGroup } from './PredefinedMessageGroup';

export const testMyKnowledgePrompt =
  'Act as an interviewer and test my understanding of this topic';
export const explainTopicPrompt = 'Explain this topic in detail';

export type PredefinedMessage = {
  icon: LucideIcon;
  label: string;
} & (
  | {
      message?: never;
      messages: PredefinedMessage[];
    }
  | {
      message: string;
      messages?: never;
    }
);

type PredefinedMessagesProps = {
  onSelect: (message: Omit<PredefinedMessage, 'messages'>) => void;
};

export function PredefinedMessages(props: PredefinedMessagesProps) {
  const { onSelect } = props;

  const predefinedMessages: PredefinedMessage[] = useMemo(
    () => [
      {
        icon: BookOpenTextIcon,
        label: 'Explain',
        messages: [
          {
            icon: NotebookPenIcon,
            label: 'Explain Topic',
            message: 'Explain this topic in detail and include examples',
          },
          {
            icon: BabyIcon,
            label: 'Explain like I am five',
            message: 'Explain this topic like I am a 5 years old',
          },
        ],
      },
      {
        icon: BrainIcon,
        label: 'Test my Knowledge',
        message: testMyKnowledgePrompt,
      },
    ],
    [],
  );

  return (
    <div className="flex items-center gap-2 border-gray-200 px-3 py-1 text-sm">
      {predefinedMessages.map((m) => {
        const isGroup = 'messages' in m && Array.isArray(m?.messages);
        if (!isGroup) {
          return (
            <PredefinedMessageButton
              key={m.message}
              icon={m.icon}
              label={m.label}
              onClick={() => {
                onSelect(m);
              }}
            />
          );
        }

        return (
          <PredefinedMessageGroup
            key={m.label}
            label={m.label}
            icon={m.icon}
            messages={m.messages}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}

type PredefinedMessageButtonProps = {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  isGroup?: boolean;
  className?: string;
};

export function PredefinedMessageButton(props: PredefinedMessageButtonProps) {
  const { label, icon: Icon, onClick, isGroup = false, className } = props;

  return (
    <button
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-md bg-gray-200 px-2 py-1 text-sm whitespace-nowrap hover:bg-gray-300',
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="size-3.5" />}
      {label}
      {isGroup && <ChevronDownIcon className="size-3.5" />}
    </button>
  );
}
