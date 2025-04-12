import '../GenerateRoadmap/GenerateRoadmap.css';
import { renderFlowJSON } from '@roadmapsh/editor';
import { generateAIRoadmapFromText } from '@roadmapsh/editor';
import {
  generateAICourseRoadmapStructure,
  readAIRoadmapStream,
  type ResultItem,
} from '../../lib/ai';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
} from 'react';
import type { AICourseViewMode } from './AICourseContent';
import { replaceChildren } from '../../lib/dom';
import { Frown, Loader2Icon } from 'lucide-react';
import { renderTopicProgress } from '../../lib/resource-progress';
import { queryClient } from '../../stores/query-client';
import { useQuery } from '@tanstack/react-query';
import { billingDetailsOptions } from '../../queries/billing';
import { AICourseOutlineHeader } from './AICourseOutlineHeader';
import type { AiCourse } from '../../lib/ai';

export type AICourseRoadmapViewProps = {
  done: string[];
  courseSlug: string;
  course: AiCourse;
  isLoading: boolean;
  onRegenerateOutline: (prompt?: string) => void;
  setActiveModuleIndex: (index: number) => void;
  setActiveLessonIndex: (index: number) => void;
  setViewMode: (mode: AICourseViewMode) => void;
  onUpgradeClick: () => void;
  setExpandedModules: Dispatch<SetStateAction<Record<number, boolean>>>;
  viewMode: AICourseViewMode;
};

export function AICourseRoadmapView(props: AICourseRoadmapViewProps) {
  const {
    done = [],
    courseSlug,
    course,
    isLoading,
    onRegenerateOutline,
    setActiveModuleIndex,
    setActiveLessonIndex,
    setViewMode,
    setExpandedModules,
    onUpgradeClick,
    viewMode,
  } = props;

  const containerEl = useRef<HTMLDivElement>(null);
  const [roadmapStructure, setRoadmapStructure] = useState<ResultItem[]>([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);

  const isPaidUser = userBillingDetails?.status === 'active';

  const generateAICourseRoadmap = async (courseSlug: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-course-roadmap/${courseSlug}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const data = await response.json();
        console.error(
          'Error generating course roadmap:',
          data?.message || 'Something went wrong',
        );
        setError(data?.message || 'Something went wrong');
        setIsGenerating(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error('Failed to get reader from response');
        setError('Something went wrong');
        setIsGenerating(false);
        return;
      }

      setIsGenerating(true);
      await readAIRoadmapStream(reader, {
        onStream: async (result) => {
          const roadmap = generateAICourseRoadmapStructure(result, true);
          const { nodes, edges } = generateAIRoadmapFromText(roadmap);
          const svg = await renderFlowJSON({ nodes, edges });
          replaceChildren(containerEl.current!, svg);
        },
        onStreamEnd: async (result) => {
          const roadmap = generateAICourseRoadmapStructure(result, true);
          const { nodes, edges } = generateAIRoadmapFromText(roadmap);
          const svg = await renderFlowJSON({ nodes, edges });
          replaceChildren(containerEl.current!, svg);
          setRoadmapStructure(roadmap);
          setIsGenerating(false);

          done.forEach((id) => {
            renderTopicProgress(id, 'done');
          });

          const modules = roadmap.filter((item) => item.type === 'topic');
          for (const module of modules) {
            const moduleId = module.id;
            const isAllLessonsDone =
              module?.children?.every((child) => done.includes(child.id)) ??
              false;
            if (isAllLessonsDone) {
              renderTopicProgress(moduleId, 'done');
            }
          }
        },
      });
    } catch (error) {
      console.error('Error generating course roadmap:', error);
      setError('Something went wrong');
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!courseSlug) {
      return;
    }

    generateAICourseRoadmap(courseSlug);
  }, []);

  const handleNodeClick = useCallback(
    (e: MouseEvent<HTMLDivElement, unknown>) => {
      if (isGenerating) {
        return;
      }

      const target = e.target as SVGElement;
      const targetGroup = (target?.closest('g') as SVGElement) || {};

      const nodeId = targetGroup?.dataset?.nodeId;
      const nodeType = targetGroup?.dataset?.type;
      if (!nodeId || !nodeType) {
        return null;
      }

      if (nodeType === 'topic') {
        const topicIndex = roadmapStructure
          .filter((item) => item.type === 'topic')
          .findIndex((item) => item.id === nodeId);

        setExpandedModules((prev) => {
          const newState: Record<number, boolean> = {};
          roadmapStructure.forEach((_, idx) => {
            newState[idx] = false;
          });
          newState[topicIndex] = true;
          return newState;
        });

        setActiveModuleIndex(topicIndex);
        setActiveLessonIndex(0);
        setViewMode('module');
        return;
      }

      if (nodeType !== 'subtopic') {
        return null;
      }

      const [moduleIndex, topicIndex] = nodeId.split('-').map(Number);
      setExpandedModules((prev) => {
        const newState: Record<number, boolean> = {};
        roadmapStructure.forEach((_, idx) => {
          newState[idx] = false;
        });
        newState[moduleIndex] = true;
        return newState;
      });
      setActiveModuleIndex(moduleIndex);
      setActiveLessonIndex(topicIndex);
      setViewMode('module');
    },
    [
      roadmapStructure,
      setExpandedModules,
      setActiveModuleIndex,
      setActiveLessonIndex,
      setViewMode,
    ],
  );

  return (
    <div className="relative mx-auto min-h-[500px] rounded-xl border border-gray-200 bg-white shadow-xs lg:max-w-5xl">
      <AICourseOutlineHeader
        course={course}
        isLoading={isLoading}
        onRegenerateOutline={(prompt) => {
          setViewMode('outline');
          onRegenerateOutline(prompt);
        }}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {isLoading && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <Loader2Icon className="h-10 w-10 animate-spin stroke-[3px]" />
        </div>
      )}

      {error && !isGenerating && (
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
          <Frown className="size-20 text-red-500" />
          <p className="mx-auto mt-5 max-w-[250px] text-balance text-center text-base text-red-500">
            {error || 'Something went wrong'}
          </p>

          {!isPaidUser && (error || '')?.includes('limit') && (
            <button
              onClick={onUpgradeClick}
              className="mt-5 rounded-full bg-red-600 px-4 py-1 text-white hover:bg-red-700"
            >
              Upgrade Account
            </button>
          )}
        </div>
      )}

      <div
        id={'resource-svg-wrap'}
        ref={containerEl}
        onClick={handleNodeClick}
        className="px-4 pb-2"
      ></div>
    </div>
  );
}
