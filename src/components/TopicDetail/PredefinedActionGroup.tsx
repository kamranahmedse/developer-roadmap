import type { LucideIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import {
  type PredefinedActionType,
  PredefinedActionButton,
} from './PredefinedActions';

type PredefinedActionGroupProps = {
  label: string;
  icon: LucideIcon;
  actions: PredefinedActionType[];
  onSelect: (action: PredefinedActionType) => void;
};

export function PredefinedActionGroup(props: PredefinedActionGroupProps) {
  const { label, icon: Icon, actions, onSelect } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={containerRef}>
      <PredefinedActionButton
        label={label}
        icon={Icon}
        onClick={() => setIsOpen(!isOpen)}
        isGroup={true}
      />

      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-1 divide-y overflow-hidden rounded-md border border-gray-200 bg-white p-0">
          {actions.map((action) => {
            return (
              <PredefinedActionButton
                key={action.label}
                {...action}
                className="h-7 w-full rounded-none bg-transparent hover:bg-gray-200"
                onClick={() => {
                  onSelect(action);
                  setIsOpen(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
