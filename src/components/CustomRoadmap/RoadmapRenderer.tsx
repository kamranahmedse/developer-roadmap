import { useCallback, useEffect, useRef } from 'react';
import { Renderer } from '../../../renderer';
import './RoadmapRenderer.css';
import { renderResourceProgress, updateResourceProgress, type ResourceProgressType, renderTopicProgress, refreshProgressCounters } from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';

type RoadmapRendererProps = {
  roadmap: RoadmapDocument;
};

type RoadmapNodeDetails = {
  nodeId: string;
  nodeType: string;
  targetGroup: SVGElement;
};

function getNodeDetails(svgElement: SVGElement): RoadmapNodeDetails | null {
  const targetGroup = (svgElement?.closest('g') as SVGElement) || {};

  const nodeId = targetGroup?.dataset?.nodeId;
  const nodeType = targetGroup?.dataset?.type;
  if (!nodeId || !nodeType) return null;

  return { nodeId, nodeType, targetGroup };
}

const allowedNodeTypes = ['topic', 'subtopic', 'button'];

export function RoadmapRenderer(props: RoadmapRendererProps) {
  const { roadmap } = props;
  const roadmapRef = useRef<HTMLDivElement>(null);

  const toast = useToast()

  async function updateTopicStatus(topicId: string, newStatus: ResourceProgressType) {
    pageProgressMessage.set('Updating progress');
    updateResourceProgress(
      {
        resourceId: roadmap._id!,
        resourceType: 'roadmap',
        topicId,
      },
      newStatus
    )
      .then(() => {
        renderTopicProgress(topicId, newStatus);
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again.');
        console.error(err);
      })
      .finally(() => {
        pageProgressMessage.set('');
        refreshProgressCounters();
      });

    return;
  }

  const handleSvgClick = useCallback((e: MouseEvent) => {
    const target = e.target as SVGElement;
    const { nodeId, nodeType, targetGroup } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType || !allowedNodeTypes.includes(nodeType)) return;

    if (nodeType === 'button') {
      const link = targetGroup?.dataset?.link || '';
      const isExternalLink = link.startsWith('http');
      if (isExternalLink) {
        window.open(link, '_blank');
      } else {
        window.location.href = link;
      }
      return;
    }

    const isCurrentStatusLearning = targetGroup?.classList.contains('learning');
    const isCurrentStatusSkipped = targetGroup?.classList.contains('skipped');

    if (e.shiftKey) {
      e.preventDefault();
      updateTopicStatus(nodeId, isCurrentStatusLearning ? 'pending' : 'learning')
      return;
    } else if (e.altKey) {
      e.preventDefault();
      updateTopicStatus(nodeId, isCurrentStatusSkipped ? 'pending' : 'skipped')
      return;
    }

    window.dispatchEvent(
      new CustomEvent('roadmap.node.click', {
        detail: {
          topicId: nodeId,
          resourceId: roadmap?._id,
          resourceType: 'roadmap',
          isCustomRoadmap: true,
        },
      })
    );
  }, []);

  const handleSvgRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const target = e.target as SVGElement;
    const { nodeId, nodeType, targetGroup } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType || !allowedNodeTypes.includes(nodeType)) return;

    if (nodeType === 'button') {
      return;
    }

    const isCurrentStatusDone = targetGroup?.classList.contains('done');
    updateTopicStatus(nodeId, isCurrentStatusDone ? 'pending' : 'done')
  }, []);

  useEffect(() => {
    if (!roadmapRef?.current) return;
    roadmapRef?.current?.addEventListener('click', handleSvgClick);
    roadmapRef?.current?.addEventListener('contextmenu', handleSvgRightClick);

    return () => {
      roadmapRef?.current?.removeEventListener('click', handleSvgClick);
      roadmapRef?.current?.removeEventListener('contextmenu', handleSvgRightClick);
    };
  }, []);

  return (
    <div className="bg-gray-50 pb-8 pt-4 sm:pt-12">
      <div className="container !max-w-[1000px]">
        <Renderer
          ref={roadmapRef}
          roadmap={{ nodes: roadmap?.nodes!, edges: roadmap?.edges! }}
          onRendered={() =>
            renderResourceProgress('roadmap', roadmap._id!).then()
          }
        />
      </div>
    </div>
  );
}
