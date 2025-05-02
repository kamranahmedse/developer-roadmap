import {
  BabyIcon,
  BookOpenTextIcon,
  BrainIcon,
  ChevronDownIcon,
  NotebookPenIcon,
  type LucideIcon,
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
        label: 'Explain Topic',
        prompt: 'Explain this topic in detail and include examples',
      },
      {
        icon: BabyIcon,
        label: 'Explain like I am five',
        prompt: 'Explain this topic like I am a 5 years old',
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
            messages={action.children}
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
      {Icon && <Icon className="size-3.5" />}
      {label}
      {isGroup && <ChevronDownIcon className="size-3.5" />}
    </button>
  );
}
