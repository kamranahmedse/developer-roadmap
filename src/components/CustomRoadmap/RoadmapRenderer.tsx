import { useCallback, useEffect, useRef, useState } from 'react';
import { Renderer } from '../../../renderer';
import './RoadmapRenderer.css';
import {
  renderResourceProgress,
  updateResourceProgress,
  type ResourceProgressType,
  renderTopicProgress,
  refreshProgressCounters,
} from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import { EmptyRoadmap } from './EmptyRoadmap';

type RoadmapRendererProps = {
  roadmap: RoadmapDocument;
};

type RoadmapNodeDetails = {
  nodeId: string;
  nodeType: string;
  targetGroup: SVGElement;
};

export function getNodeDetails(
  svgElement: SVGElement
): RoadmapNodeDetails | null {
  const targetGroup = (svgElement?.closest('g') as SVGElement) || {};

  const nodeId = targetGroup?.dataset?.nodeId;
  const nodeType = targetGroup?.dataset?.type;
  if (!nodeId || !nodeType) return null;

  return { nodeId, nodeType, targetGroup };
}

export const allowedClickableNodeTypes = [
  'topic',
  'subtopic',
  'button',
  'link-item',
];

export function RoadmapRenderer(props: RoadmapRendererProps) {
  const { roadmap } = props;
  const roadmapRef = useRef<HTMLDivElement>(null);
  const roadmapId = roadmap._id!;

  const toast = useToast();
  const [hideRenderer, setHideRenderer] = useState(false);

  async function updateTopicStatus(
    topicId: string,
    newStatus: ResourceProgressType
  ) {
    pageProgressMessage.set('Updating progress');
    updateResourceProgress(
      {
        resourceId: roadmapId,
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
    if (!nodeId || !nodeType || !allowedClickableNodeTypes.includes(nodeType))
      return;

    if (nodeType === 'button' || nodeType === 'link-item') {
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
      updateTopicStatus(
        nodeId,
        isCurrentStatusLearning ? 'pending' : 'learning'
      );
      return;
    } else if (e.altKey) {
      e.preventDefault();
      updateTopicStatus(nodeId, isCurrentStatusSkipped ? 'pending' : 'skipped');
      return;
    }

    window.dispatchEvent(
      new CustomEvent('roadmap.node.click', {
        detail: {
          topicId: nodeId,
          resourceId: roadmap?._id,
          resourceType: 'roadmap',
          isCustomResource: true,
        },
      })
    );
  }, []);

  const handleSvgRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const target = e.target as SVGElement;
    const { nodeId, nodeType, targetGroup } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType || !allowedClickableNodeTypes.includes(nodeType))
      return;

    if (nodeType === 'button' || nodeType === 'link-item') {
      return;
    }

    const isCurrentStatusDone = targetGroup?.classList.contains('done');
    updateTopicStatus(nodeId, isCurrentStatusDone ? 'pending' : 'done');
  }, []);

  useEffect(() => {
    if (!roadmapRef?.current) return;
    roadmapRef?.current?.addEventListener('click', handleSvgClick);
    roadmapRef?.current?.addEventListener('contextmenu', handleSvgRightClick);

    return () => {
      roadmapRef?.current?.removeEventListener('click', handleSvgClick);
      roadmapRef?.current?.removeEventListener(
        'contextmenu',
        handleSvgRightClick
      );
    };
  }, []);

  return (
    <div className="flex grow bg-gray-50 pb-8 pt-4 sm:pt-12">
      <div className="container !max-w-[1000px]">
        <Renderer
          ref={roadmapRef}
          roadmap={{ nodes: roadmap?.nodes!, edges: roadmap?.edges! }}
          onRendered={() => {
            renderResourceProgress('roadmap', roadmapId).then(() => {
              if (roadmap?.nodes?.length === 0) {
                setHideRenderer(true);
                roadmapRef?.current?.classList.add('hidden');
              }
            });
          }}
        />
        {hideRenderer && (
          <EmptyRoadmap roadmapId={roadmapId} canManage={roadmap.canManage} />
        )}
      </div>
    </div>
  );
}
