import { ArrowRightIcon, BotIcon } from 'lucide-react';
import { useState } from 'react';
import {
  AICourseFollowUpPopover,
  type AIChatHistoryType,
} from './AICourseFollowUpPopover';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';

type AICourseFollowUpProps = {
  courseSlug: string;
  moduleTitle: string;
  lessonTitle: string;
};

export function AICourseFollowUp(props: AICourseFollowUpProps) {
  const { courseSlug, moduleTitle, lessonTitle } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [courseAIChatHistory, setCourseAIChatHistory] = useState<
    AIChatHistoryType[]
  >([
    {
      role: 'assistant',
      content:
        'Hey, I am your AI instructor. Here are some examples of what you can ask me about 🤖',
      isDefault: true,
    },
  ]);

  return (
    <div className="relative">
      <button
        className="mt-4 flex w-full items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-100 p-4 hover:bg-yellow-200 max-lg:mt-3 max-lg:text-sm"
        onClick={() => setIsOpen(true)}
      >
        <BotIcon className="h-4 w-4" />
        <span>
          <span className="max-sm:hidden">Still confused?&nbsp;</span>
          Ask AI some follow up questions
        </span>

        <ArrowRightIcon className="ml-auto h-4 w-4 max-sm:hidden" />
      </button>

      {showUpgradeModal && (
        <UpgradeAccountModal onClose={() => setShowUpgradeModal(false)} />
      )}

      {isOpen && (
        <AICourseFollowUpPopover
          courseSlug={courseSlug}
          moduleTitle={moduleTitle}
          lessonTitle={lessonTitle}
          courseAIChatHistory={courseAIChatHistory}
          setCourseAIChatHistory={setCourseAIChatHistory}
          onUpgradeClick={() => {
            setIsOpen(false);
            setShowUpgradeModal(true);
          }}
          onOutsideClick={() => {
            if (!isOpen) {
              return;
            }

            setIsOpen(false);
          }}
        />
      )}

      {isOpen && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-black/50" />
      )}
    </div>
  );
}
