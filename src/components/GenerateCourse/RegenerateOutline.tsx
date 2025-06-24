import { useMutation, useQuery } from '@tanstack/react-query';
import { PenSquare, RefreshCcw, Settings2Icon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { cn } from '../../lib/classname';
import { httpPost } from '../../lib/query-http';
import { getAiCourseOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { UpgradeAccountModal } from '../Billing/UpgradeAccountModal';
import type { QuestionAnswerChatMessage } from '../ContentGenerator/QuestionAnswerChat';
import { UpdatePreferences } from '../GenerateGuide/UpdatePreferences';
import { ModifyCoursePrompt } from './ModifyCoursePrompt';

type RegenerateOutlineProps = {
  onRegenerateOutline: (prompt?: string) => void;
  isForkable: boolean;
  onForkCourse: () => void;
  courseSlug: string;
};

export function RegenerateOutline(props: RegenerateOutlineProps) {
  const { onRegenerateOutline, isForkable, onForkCourse, courseSlug } = props;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showUpdatePreferencesModal, setShowUpdatePreferencesModal] =
    useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsDropdownVisible(false));

  const { data: aiCourse } = useQuery(
    getAiCourseOptions({ aiCourseSlug: courseSlug }),
    queryClient,
  );
  const { mutate: updatePreferences, isPending: isUpdating } = useMutation(
    {
      mutationFn: (questionAndAnswers: QuestionAnswerChatMessage[]) => {
        return httpPost(`/v1-update-ai-course-preferences/${courseSlug}`, {
          questionAndAnswers,
        });
      },
      onSuccess: (_, vars) => {
        queryClient.setQueryData(
          getAiCourseOptions({ aiCourseSlug: courseSlug }).queryKey,
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
        onRegenerateOutline();
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
          onClose={() => setShowPromptModal(false)}
          onSubmit={(prompt) => {
            setShowPromptModal(false);
            if (isForkable) {
              onForkCourse();
              return;
            }
            onRegenerateOutline(prompt);
          }}
        />
      )}

      {showUpdatePreferencesModal && (
        <UpdatePreferences
          onClose={() => setShowUpdatePreferencesModal(false)}
          questionAndAnswers={aiCourse?.questionAndAnswers}
          term={aiCourse?.keyword || ''}
          format="course"
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
              <Settings2Icon
                size={16}
                className="text-gray-400"
                strokeWidth={2.5}
              />
              Preferences
            </button>

            <button
              onClick={() => {
                setIsDropdownVisible(false);
                if (isForkable) {
                  onForkCourse();
                  return;
                }
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
