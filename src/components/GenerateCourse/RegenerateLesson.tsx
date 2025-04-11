import { PenSquare, RefreshCcw } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { ModifyCoursePrompt } from './ModifyCoursePrompt';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';

type RegenerateLessonProps = {
  onRegenerateLesson: (prompt?: string) => void;
  isForkable: boolean;
  onForkCourse: () => void;
};

export function RegenerateLesson(props: RegenerateLessonProps) {
  const { onRegenerateLesson, isForkable, onForkCourse } = props;

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
          title="Give AI more context"
          description="Pass additional information to the AI to generate a lesson."
          onClose={() => setShowPromptModal(false)}
          onSubmit={(prompt) => {
            setShowPromptModal(false);
            if (!isLoggedIn()) {
              showLoginPopup();
              return;
            }

            if (isForkable) {
              onForkCourse();
              return;
            }

            onRegenerateLesson(prompt);
          }}
        />
      )}

      <div className="relative flex items-center lg:mr-1" ref={ref}>
        <button
          className={cn('rounded-full p-1 text-gray-400 hover:text-black', {
            'text-black': isDropdownVisible,
          })}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <PenSquare className="text-current" size={16} strokeWidth={2.5} />
        </button>
        {isDropdownVisible && (
          <div className="absolute top-full right-0 min-w-[170px] overflow-hidden rounded-md border border-gray-200 bg-white">
            <button
              onClick={() => {
                setIsDropdownVisible(false);
                if (!isLoggedIn()) {
                  showLoginPopup();
                  return;
                }

                if (isForkable) {
                  onForkCourse();
                  return;
                }

                onRegenerateLesson();
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
                if (!isLoggedIn()) {
                  showLoginPopup();
                  return;
                }

                if (isForkable) {
                  onForkCourse();
                  return;
                }

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
