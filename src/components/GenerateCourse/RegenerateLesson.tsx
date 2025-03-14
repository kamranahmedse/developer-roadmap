import { PenSquare, RefreshCcw } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { useIsPaidUser } from '../../queries/billing';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { ModifyCoursePrompt } from './ModifyCoursePrompt';

type RegenerateLessonProps = {
  onRegenerateLesson: (prompt?: string) => void;
};

export function RegenerateLesson(props: RegenerateLessonProps) {
  const { onRegenerateLesson } = props;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { isPaidUser } = useIsPaidUser();

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
          title="Give AI more context"
          description="Pass additional information to the AI to generate a lesson."
          onClose={() => setShowPromptModal(false)}
          onSubmit={(prompt) => {
            setShowPromptModal(false);
            onRegenerateLesson(prompt);
          }}
        />
      )}

      <div className="relative mr-2 flex items-center" ref={ref}>
        <button
          className={cn('rounded-full p-1 text-gray-400 hover:text-black', {
            'text-black': isDropdownVisible,
          })}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <PenSquare className="text-current" size={16} strokeWidth={2.5} />
        </button>
        {isDropdownVisible && (
          <div className="absolute right-0 top-full min-w-[170px] overflow-hidden rounded-md border border-gray-200 bg-white">
            <button
              onClick={() => {
                if (!isPaidUser) {
                  setIsDropdownVisible(false);
                  setShowUpgradeModal(true);
                } else {
                  onRegenerateLesson();
                }
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
                if (!isPaidUser) {
                  setShowUpgradeModal(true);
                } else {
                  setShowPromptModal(true);
                }
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
