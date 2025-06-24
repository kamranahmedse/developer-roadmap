import {
  Loader2Icon,
  PenSquare,
  RefreshCcw,
  SaveIcon,
  SettingsIcon,
  type LucideIcon,
} from 'lucide-react';
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
import { generateAIRoadmapFromText } from '@roadmapsh/editor';
import { useToast } from '../../hooks/use-toast';

type AIRoadmapRegenerateProps = {
  onRegenerate: (prompt?: string) => void;
  roadmapSlug: string;
};

export function AIRoadmapRegenerate(props: AIRoadmapRegenerateProps) {
  const { onRegenerate, roadmapSlug } = props;

  const toast = useToast();
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

  const handleSaveAIRoadmap = async () => {
    const { nodes, edges } = generateAIRoadmapFromText(aiRoadmap?.data || '');
    return httpPost<{
      roadmapId: string;
      roadmapSlug: string;
    }>(`/v1-save-ai-roadmap/${aiRoadmap?._id}`, {
      title: aiRoadmap?.term,
      nodes: nodes.map((node) => ({
        ...node,

        // To reset the width and height of the node
        // so that it can be calculated based on the content in the editor
        width: undefined,
        height: undefined,
        style: {
          ...node.style,
          width: undefined,
          height: undefined,
        },
        measured: {
          width: undefined,
          height: undefined,
        },
      })),
      edges,
    });
  };

  const { mutate: saveAIRoadmap, isPending: isSavingAIRoadmap } = useMutation(
    {
      mutationFn: handleSaveAIRoadmap,
      onSuccess: (data) => {
        if (!data?.roadmapId) {
          toast.error('Something went wrong');
          return;
        }
        window.location.href = `/r/${data?.roadmapSlug}`;
      },
    },
    queryClient,
  );

  const { mutate: editAIRoadmap, isPending: isEditingAIRoadmap } = useMutation(
    {
      mutationFn: handleSaveAIRoadmap,
      onSuccess: (data) => {
        if (!data?.roadmapId) {
          toast.error('Something went wrong');
          return;
        }
        window.open(
          `${import.meta.env.PUBLIC_EDITOR_APP_URL}/${data?.roadmapId}`,
          '_blank',
        );
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
            <ActionButton
              onClick={() => {
                setIsDropdownVisible(false);
                setShowUpdatePreferencesModal(true);
              }}
              icon={SettingsIcon}
              label="Update Preferences"
            />
            <ActionButton
              onClick={() => {
                setIsDropdownVisible(false);
                onRegenerate();
              }}
              icon={RefreshCcw}
              label="Regenerate"
            />
            <ActionButton
              onClick={() => {
                setIsDropdownVisible(false);
                setShowPromptModal(true);
              }}
              icon={PenSquare}
              label="Modify Prompt"
            />

            <ActionButton
              onClick={saveAIRoadmap}
              icon={SaveIcon}
              label="Start Learning"
              isLoading={isSavingAIRoadmap}
            />

            <ActionButton
              onClick={editAIRoadmap}
              icon={PenSquare}
              label="Edit in Editor"
              isLoading={isEditingAIRoadmap}
            />
          </div>
        )}
      </div>
    </>
  );
}

type ActionButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
  icon: LucideIcon;
  label: string;
};

function ActionButton(props: ActionButtonProps) {
  const { onClick, isLoading, icon: Icon, label } = props;

  return (
    <button
      className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2Icon className="animate-spin" size={16} strokeWidth={2.5} />
      ) : (
        <Icon size={16} className="text-gray-400" strokeWidth={2.5} />
      )}

      {label}
    </button>
  );
}
