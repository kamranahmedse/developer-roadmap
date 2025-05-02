import type { LucideIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import {
  type PredefinedMessageType,
  PredefinedActionButton,
} from './PredefinedActions';

type PredefinedMessageGroupProps = {
  label: string;
  icon: LucideIcon;
  messages: PredefinedMessageType[];
  onSelect: (message: PredefinedMessageType) => void;
};

export function PredefinedActionGroup(props: PredefinedMessageGroupProps) {
  const { label, icon: Icon, messages, onSelect } = props;

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
          {messages.map((m) => {
            return (
              <PredefinedActionButton
                key={m.message}
                {...m}
                className="h-7 w-full rounded-none bg-transparent hover:bg-gray-200"
                onClick={() => {
                  onSelect(m);
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
