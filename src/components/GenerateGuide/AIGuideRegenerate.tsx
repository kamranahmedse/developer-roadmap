import { PenSquare, RefreshCcw, SettingsIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { ModifyCoursePrompt } from '../GenerateCourse/ModifyCoursePrompt';
import { UpdatePreferences } from './UpdatePreferences';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAiGuideOptions } from '../../queries/ai-guide';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { useAuth } from '../../hooks/use-auth';
import { showLoginPopup } from '../../lib/popup';
import { isLoggedIn } from '../../lib/jwt';

type AIGuideRegenerateProps = {
  onRegenerate: (prompt?: string) => void;
  guideSlug: string;
};

export function AIGuideRegenerate(props: AIGuideRegenerateProps) {
  const { onRegenerate, guideSlug } = props;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showUpdatePreferencesModal, setShowUpdatePreferencesModal] =
    useState(false);
  const currentUser = useAuth();

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsDropdownVisible(false));

  const { data: aiGuide } = useQuery(getAiGuideOptions(guideSlug), queryClient);
  const { mutate: updatePreferences, isPending: isUpdating } = useMutation(
    {
      mutationFn: (questionAndAnswers: QuestionAnswerChatMessage[]) => {
        return httpPost(`/v1-update-guide-preferences/${guideSlug}`, {
          questionAndAnswers,
        });
      },
      onSuccess: (_, vars) => {
        queryClient.setQueryData(
          getAiGuideOptions(guideSlug).queryKey,
          (old) => {
            if (!old) {
              return old;
            }

            return {
              ...old,
              questionAndAnswers: vars,
            };
          },
        );

        setShowUpdatePreferencesModal(false);
        setIsDropdownVisible(false);
        onRegenerate();
      },
    },
    queryClient,
  );

  const showUpdatePreferences =
    aiGuide?.questionAndAnswers &&
    aiGuide.questionAndAnswers.length > 0 &&
    currentUser?.id === aiGuide.userId;

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
          description="Pass additional information to the AI to generate a guide."
          onClose={() => setShowPromptModal(false)}
          onSubmit={(prompt) => {
            setShowPromptModal(false);
            onRegenerate(prompt);
          }}
        />
      )}

      {showUpdatePreferencesModal && (
        <UpdatePreferences
          onClose={() => setShowUpdatePreferencesModal(false)}
          questionAndAnswers={aiGuide?.questionAndAnswers}
          term={aiGuide?.keyword || ''}
          format="guide"
          onUpdatePreferences={(questionAndAnswers) => {
            updatePreferences(questionAndAnswers);
          }}
          isUpdating={isUpdating}
        />
      )}

      <div ref={ref} className="relative flex items-stretch">
        <button
          className={cn('rounded-md px-2.5 text-gray-400 hover:text-black', {
            'text-black': isDropdownVisible,
          })}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <PenSquare className="text-current" size={16} strokeWidth={2.5} />
        </button>
        {isDropdownVisible && (
          <div className="absolute top-full right-0 min-w-[190px] translate-y-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
            {showUpdatePreferences && (
              <button
                onClick={() => {
                  setIsDropdownVisible(false);
                  setShowUpdatePreferencesModal(true);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
              >
                <SettingsIcon
                  size={16}
                  className="text-gray-400"
                  strokeWidth={2.5}
                />
                Update Preferences
              </button>
            )}

            <button
              onClick={() => {
                if (!isLoggedIn()) {
                  showLoginPopup();
                  return;
                }

                setIsDropdownVisible(false);
                onRegenerate();
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
                if (!isLoggedIn()) {
                  showLoginPopup();
                  return;
                }

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
