import { PenSquare, RefreshCcw, SettingsIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import { ModifyCoursePrompt } from '../GenerateCourse/ModifyCoursePrompt';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { httpPost } from '../../lib/query-http';
import { aiRoadmapOptions } from '../../queries/ai-roadmap';
import { UpdatePreferences } from '../GenerateGuide/UpdatePreferences';

type AIRoadmapRegenerateProps = {
  onRegenerate: (prompt?: string) => void;
  roadmapSlug: string;
};

export function AIRoadmapRegenerate(props: AIRoadmapRegenerateProps) {
  const { onRegenerate, roadmapSlug } = props;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showUpdatePreferencesModal, setShowUpdatePreferencesModal] =
    useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsDropdownVisible(false));

  const { data: aiRoadmap } = useQuery(
    aiRoadmapOptions(roadmapSlug),
    queryClient,
  );
  const { mutate: updatePreferences, isPending: isUpdating } = useMutation(
    {
      mutationFn: (questionAndAnswers: QuestionAnswerChatMessage[]) => {
        return httpPost(`/v1-update-ai-roadmap-preferences/${roadmapSlug}`, {
          questionAndAnswers,
        });
      },
      onSuccess: (_, vars) => {
        queryClient.setQueryData(
          aiRoadmapOptions(roadmapSlug).queryKey,
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
          description="Pass additional information to the AI to generate a roadmap."
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
          questionAndAnswers={aiRoadmap?.questionAndAnswers}
          term={aiRoadmap?.term || ''}
          format="roadmap"
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
            <button
              onClick={() => {
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
