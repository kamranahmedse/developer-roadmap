import {
  BabyIcon,
  BookOpenTextIcon,
  BrainIcon,
  ChevronDownIcon,
  ListIcon,
  NotebookPenIcon,
  PencilLine,
  Star,
  type LucideIcon
} from 'lucide-react';
import { cn } from '../../lib/classname';
import { PredefinedActionGroup } from './PredefinedActionGroup';

export type PredefinedActionType = {
  icon: LucideIcon;
  label: string;
  prompt?: string;
  children?: PredefinedActionType[];
};

export const actions: PredefinedActionType[] = [
  {
    icon: BookOpenTextIcon,
    label: 'Explain',
    children: [
      {
        icon: NotebookPenIcon,
        label: 'Explain the topic',
        prompt: 'Explain this topic in detail and include examples',
      },
      {
        icon: ListIcon,
        label: 'List the key points',
        prompt: 'List the key points to remember from this topic',
      },
      {
        icon: PencilLine,
        label: 'Summarize the topic',
        prompt:
          'Briefly explain the topic in a few sentences. Treat it as a brief answer to an interview question. Your response should just be the answer to the question, nothing else.',
      },
      {
        icon: BabyIcon,
        label: 'Explain like I am five',
        prompt: 'Explain this topic like I am a 5 years old',
      },
      {
        icon: Star,
        label: 'Why is it important?',
        prompt:
          'Why is this topic important? What are the real world applications (only add if appropriate)?',
      },
    ],
  },
  {
    icon: BrainIcon,
    label: 'Test my Knowledge',
    prompt:
      "Act as an interviewer and test my understanding of this topic. Ask me a single question at a time and evaluate my answer. Question number should be bold. After evaluating my answer, immediately proceed to the next question without asking if I'm ready or want another question. Continue asking questions until I explicitly tell you to stop.",
  },
];

export const promptLabelMapping = actions.reduce(
  (acc, action) => {
    if (action.prompt) {
      acc[action.prompt] = action.label;
    }

    if (action.children) {
      action.children.forEach((child) => {
        if (child.prompt) {
          acc[child.prompt] = child.label;
        }
      });
    }

    return acc;
  },
  {} as Record<string, string>,
);

type PredefinedActionsProps = {
  onSelect: (action: PredefinedActionType) => void;
};

export function PredefinedActions(props: PredefinedActionsProps) {
  const { onSelect } = props;

  return (
    <div className="flex items-center gap-2 border-gray-200 px-3 py-1 text-sm">
      {actions.map((action) => {
        if (!action.children) {
          return (
            <PredefinedActionButton
              key={action.label}
              icon={action.icon}
              label={action.label}
              onClick={() => {
                onSelect(action);
              }}
            />
          );
        }

        return (
          <PredefinedActionGroup
            key={action.label}
            label={action.label}
            icon={action.icon}
            actions={action.children}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}

type PredefinedActionButtonProps = {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  isGroup?: boolean;
  className?: string;
};

export function PredefinedActionButton(props: PredefinedActionButtonProps) {
  const { label, icon: Icon, onClick, isGroup = false, className } = props;

  return (
    <button
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-md bg-gray-200 px-2 py-1 text-sm whitespace-nowrap hover:bg-gray-300',
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="mr-1 size-3.5" />}
      {label}
      {isGroup && <ChevronDownIcon className="size-3.5" />}
    </button>
  );
}
