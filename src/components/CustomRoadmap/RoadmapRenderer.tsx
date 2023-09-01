import { useCallback, useEffect, useRef } from 'react';
import { Renderer } from '../../../renderer';
import type { RoadmapDocument } from './CustomRoadmap';
import './RoadmapRenderer.css';

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

  const nodeId = targetGroup?.dataset?.id;
  const nodeType = targetGroup?.dataset?.type;
  if (!nodeId || !nodeType) return null;

  return { nodeId, nodeType, targetGroup };
}

const allowedNodeTypes = ['topic', 'subtopic', 'button'];

export function RoadmapRenderer(props: RoadmapRendererProps) {
  const { roadmap } = props;
  const roadmapRef = useRef<HTMLDivElement>(null);

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

    if (e.shiftKey) {
      e.preventDefault();
      console.log(`Shift clicked on node ${nodeId} of type ${nodeType}`);
      return;
    } else if (e.altKey) {
      e.preventDefault();
      console.log(`Alt clicked on node ${nodeId} of type ${nodeType}`);
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
    if (!nodeId || !nodeType) return;

    console.log(`Right clicked on node ${nodeId} of type ${nodeType}`);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleSvgClick);
    window.addEventListener('contextmenu', handleSvgRightClick);

    return () => {
      window.removeEventListener('click', handleSvgClick);
      window.removeEventListener('contextmenu', handleSvgRightClick);
    };
  }, []);

  return (
    <div className="bg-gray-50 pb-8 pt-4 sm:pt-12">
      <div className="container !max-w-[1000px]">
        <Renderer
          ref={roadmapRef}
          roadmap={{ nodes: roadmap?.nodes!, edges: roadmap?.edges! }}
        />
      </div>
    </div>
  );
}
