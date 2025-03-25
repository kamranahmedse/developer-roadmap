import '../GenerateRoadmap/GenerateRoadmap.css';
import { renderFlowJSON } from '../../../editor/renderer/renderer';
import { generateAIRoadmapFromText } from '../../../editor/utils/roadmap-generator';
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
import { Loader2Icon } from 'lucide-react';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';
import { renderTopicProgress } from '../../lib/resource-progress';

export type AICourseRoadmapViewProps = {
  done: string[];
  courseSlug: string;
  setActiveModuleIndex: (index: number) => void;
  setActiveLessonIndex: (index: number) => void;
  setViewMode: (mode: AICourseViewMode) => void;
  setExpandedModules: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export function AICourseRoadmapView(props: AICourseRoadmapViewProps) {
  const {
    done = [],
    courseSlug,
    setActiveModuleIndex,
    setActiveLessonIndex,
    setViewMode,
    setExpandedModules,
  } = props;

  const containerEl = useRef<HTMLDivElement>(null);
  const [roadmapStructure, setRoadmapStructure] = useState<ResultItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setIsLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error('Failed to get reader from response');
        setError('Something went wrong');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
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
        },
      });
    } catch (error) {
      console.error('Error generating course roadmap:', error);
      setError('Something went wrong');
      setIsLoading(false);
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
      if (isLoading || isGenerating) {
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
      isLoading,
      roadmapStructure,
      setExpandedModules,
      setActiveModuleIndex,
      setActiveLessonIndex,
      setViewMode,
    ],
  );

  return (
    <div className="relative mx-auto min-h-[200px] rounded-xl border border-gray-200 bg-white shadow-sm lg:max-w-7xl">
      {isLoading && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <Loader2Icon className="h-10 w-10 animate-spin stroke-[3px]" />
        </div>
      )}

      {error && !isLoading && !isGenerating && (
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
          <ErrorIcon additionalClasses="h-10 w-10" />
          <p className="mx-auto mt-4 max-w-sm text-balance text-center text-sm text-gray-500">
            {error || 'Something went wrong'}
          </p>
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
