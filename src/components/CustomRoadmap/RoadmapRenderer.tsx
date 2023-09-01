import { useCallback, useEffect, useRef } from 'react';
import { Renderer } from '../../../renderer';
import type { RoadmapDocument } from './CustomRoadmap';

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

export function RoadmapRenderer(props: RoadmapRendererProps) {
  const { roadmap } = props;
  const roadmapRef = useRef<HTMLDivElement>(null);

  const handleSvgClick = useCallback((e: MouseEvent) => {
    const target = e.target as SVGElement;
    const { nodeId, nodeType, targetGroup } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType) return;

    console.log(`Clicked on node ${nodeId} of type ${nodeType}`);

    if (e.shiftKey) {
      e.preventDefault();
      console.log(`Shift clicked on node ${nodeId} of type ${nodeType}`);
      return;
    }

    if (e.altKey) {
      e.preventDefault();
      console.log(`Alt clicked on node ${nodeId} of type ${nodeType}`);
      return;
    }
  }, []);

  const handleSvgRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const target = e.target as SVGElement;
    const { nodeId, nodeType, targetGroup } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType) return;

    console.log(`Right clicked on node ${nodeId} of type ${nodeType}`);
  }, []);

  useEffect(() => {
    const roadmapEl = roadmapRef.current;
    if (!roadmapEl) return;

    roadmapEl.addEventListener('click', handleSvgClick);
    roadmapEl.addEventListener('contextmenu', handleSvgRightClick);

    return () => {
      roadmapEl.removeEventListener('click', handleSvgClick);
      roadmapEl.removeEventListener('contextmenu', handleSvgRightClick);
    };
  }, [roadmapRef.current]);

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
