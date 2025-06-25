import { cn } from '../../lib/classname';
import { AIRoadmapRegenerate } from './AIRoadmapRegenerate';
import { LoadingChip } from '../LoadingChip';
import { type MouseEvent, useCallback } from 'react';

export type RoadmapNodeDetails = {
  nodeId: string;
  nodeType: string;
  targetGroup?: SVGElement;
  nodeTitle?: string;
  parentTitle?: string;
  parentId?: string;
};

export function getNodeDetails(
  svgElement: SVGElement,
): RoadmapNodeDetails | null {
  const targetGroup = (svgElement?.closest('g') as SVGElement) || {};

  const nodeId = targetGroup?.dataset?.nodeId;
  const nodeType = targetGroup?.dataset?.type;
  const nodeTitle = targetGroup?.dataset?.title;
  const parentTitle = targetGroup?.dataset?.parentTitle;
  const parentId = targetGroup?.dataset?.parentId;
  if (!nodeId || !nodeType) return null;

  return { nodeId, nodeType, targetGroup, nodeTitle, parentTitle, parentId };
}

export const allowedClickableNodeTypes = [
  'topic',
  'subtopic',
  'button',
  'link-item',
];

type AIRoadmapContentProps = {
  isLoading?: boolean;
  svgHtml: string;
  onRegenerate?: (prompt?: string) => void;
  roadmapSlug?: string;

  onNodeClick?: (node: RoadmapNodeDetails) => void;
};

export function AIRoadmapContent(props: AIRoadmapContentProps) {
  const { isLoading, svgHtml, onRegenerate, roadmapSlug, onNodeClick } = props;

  const handleNodeClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isLoading) {
        return;
      }

      const target = e.target as SVGElement;
      const { nodeId, nodeType, targetGroup, nodeTitle, parentTitle } =
        getNodeDetails(target) || {};
      if (
        !nodeId ||
        !nodeType ||
        !allowedClickableNodeTypes.includes(nodeType) ||
        !nodeTitle
      )
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

      onNodeClick?.({
        nodeId,
        nodeType,
        nodeTitle,
        ...(nodeType === 'subtopic' && { parentTitle }),
      });
    },
    [isLoading, onNodeClick],
  );

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-4xl',
        isLoading && 'min-h-full',
      )}
    >
      <div
        id="roadmap-container"
        className="relative min-h-[400px] [&>svg]:mx-auto"
        dangerouslySetInnerHTML={{ __html: svgHtml }}
        onClick={handleNodeClick}
      />

      {isLoading && !svgHtml && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingChip message="Please wait..." />
        </div>
      )}

      {onRegenerate && !isLoading && roadmapSlug && (
        <div className="absolute top-4 right-4">
          <AIRoadmapRegenerate
            onRegenerate={onRegenerate}
            roadmapSlug={roadmapSlug}
          />
        </div>
      )}
    </div>
  );
}
