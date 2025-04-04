import { PenSquare, RefreshCcw } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { ModifyCoursePrompt } from './ModifyCoursePrompt';

type RegenerateOutlineProps = {
  onRegenerateOutline: (prompt?: string) => void;
};

export function RegenerateOutline(props: RegenerateOutlineProps) {
  const { onRegenerateOutline } = props;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsDropdownVisible(false));

  return (
    <>
      {showUpgradeModal && (
        <UpgradeAccountModal
          onClose={() => {
            setShowUpgradeModal(false);
          }}
        />
      )}

      {showPromptModal && (
        <ModifyCoursePrompt
          onClose={() => setShowPromptModal(false)}
          onSubmit={(prompt) => {
            setShowPromptModal(false);
            onRegenerateOutline(prompt);
          }}
        />
      )}

      <div ref={ref} className="flex relative items-stretch">
        <button
          className={cn(
            'rounded-md px-2.5 text-gray-400 hover:text-black',
            {
              'text-black': isDropdownVisible,
            },
          )}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <PenSquare className="text-current" size={16} strokeWidth={2.5} />
        </button>
        {isDropdownVisible && (
          <div className="absolute right-0 top-full translate-y-1 min-w-[170px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
            <button
              onClick={() => {
                onRegenerateOutline();
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
            >
              <RefreshCcw
                size={16}
                className="text-gray-400"
                strokeWidth={2.5}
              />
              Regenerate
            </button>
            <button
              onClick={() => {
                setIsDropdownVisible(false);
                setShowPromptModal(true);
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
            >
              <PenSquare
                size={16}
                className="text-gray-400"
                strokeWidth={2.5}
              />
              Modify Prompt
            </button>
          </div>
        )}
      </div>
    </>
  );
}
