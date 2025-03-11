import './EditorRoadmapRenderer.css';

import { useCallback, useEffect, useRef } from 'react';
import {
  renderResourceProgress,
  updateResourceProgress,
  type ResourceProgressType,
  renderTopicProgress,
  refreshProgressCounters,
} from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import type { Edge, Node } from '@roadmapsh/editor';
import { Renderer } from '@roadmapsh/editor';
import { slugify } from '../../lib/slugger';
import { isLoggedIn } from '../../lib/jwt';
import { showLoginPopup } from '../../lib/popup';

export type RoadmapRendererProps = {
  resourceId: string;
  nodes: Node[];
  edges: Edge[];
  dimensions: {
    width: number;
    height: number;
  };
};

type RoadmapNodeDetails = {
  nodeId: string;
  nodeType: string;
  targetGroup: SVGElement;
  title?: string;
};

function getNodeDetails(svgElement: SVGElement): RoadmapNodeDetails | null {
  const targetGroup = (svgElement?.closest('g') as SVGElement) || {};

  const nodeId = targetGroup?.dataset?.nodeId;
  const nodeType = targetGroup?.dataset?.type;
  const title = targetGroup?.dataset?.title;

  if (!nodeId || !nodeType) {
    return null;
  }

  return { nodeId, nodeType, targetGroup, title };
}

const allowedNodeTypes = [
  'topic',
  'subtopic',
  'button',
  'link-item',
  'resourceButton',
  'todo',
  'todo-checkbox',
  'checklist-item',
];

export function EditorRoadmapRenderer(props: RoadmapRendererProps) {
  const { resourceId, nodes = [], edges = [] } = props;
  const roadmapRef = useRef<HTMLDivElement>(null);

  const toast = useToast();

  async function updateTopicStatus(
    topicId: string,
    newStatus: ResourceProgressType,
  ) {
    pageProgressMessage.set('Updating progress');
    updateResourceProgress(
      {
        resourceId,
        resourceType: 'roadmap',
        topicId,
      },
      newStatus,
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
    const { nodeId, nodeType, targetGroup, title } =
      getNodeDetails(target) || {};

    if (!nodeId || !nodeType || !allowedNodeTypes.includes(nodeType)) {
      return;
    }

    if (
      nodeType === 'button' ||
      nodeType === 'link-item' ||
      nodeType === 'resourceButton'
    ) {
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

    if (nodeType === 'todo-checkbox') {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }

      const newStatus = targetGroup?.classList.contains('done')
        ? 'pending'
        : 'done';
      updateTopicStatus(nodeId, newStatus);
      return;
    }

    if (e.shiftKey) {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }

      updateTopicStatus(
        nodeId,
        isCurrentStatusLearning ? 'pending' : 'learning',
      );
      return;
    } else if (e.altKey) {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }

      updateTopicStatus(nodeId, isCurrentStatusSkipped ? 'pending' : 'skipped');
      return;
    }

    // for the click on rect of checklist-item
    if (nodeType === 'checklist-item' && target.tagName === 'rect') {
      e.preventDefault();
      if (!isLoggedIn()) {
        showLoginPopup();
        return;
      }

      const newStatus = targetGroup?.classList.contains('done')
        ? 'pending'
        : 'done';
      updateTopicStatus(nodeId, newStatus);
      return;
    }

    // we don't have the topic popup for checklist-item
    if (nodeType === 'checklist-item') {
      return;
    }

    if (!title) {
      return;
    }

    const detailsPattern = `${slugify(title)}@${nodeId}`;
    window.dispatchEvent(
      new CustomEvent('roadmap.node.click', {
        detail: {
          topicId: detailsPattern,
          resourceId,
          resourceType: 'roadmap',
        },
      }),
    );
  }, []);

  const handleSvgRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const target = e.target as SVGElement;
    const { nodeId, nodeType, targetGroup } = getNodeDetails(target) || {};
    if (!nodeId || !nodeType || !allowedNodeTypes.includes(nodeType)) {
      return;
    }

    if (nodeType === 'button') {
      return;
    }

    if (!isLoggedIn()) {
      showLoginPopup();
      return;
    }
    const isCurrentStatusDone = targetGroup?.classList.contains('done');
    updateTopicStatus(nodeId, isCurrentStatusDone ? 'pending' : 'done');
  }, []);

  useEffect(() => {
    if (!roadmapRef?.current) {
      return;
    }
    roadmapRef?.current?.addEventListener('click', handleSvgClick);
    roadmapRef?.current?.addEventListener('contextmenu', handleSvgRightClick);

    return () => {
      roadmapRef?.current?.removeEventListener('click', handleSvgClick);
      roadmapRef?.current?.removeEventListener(
        'contextmenu',
        handleSvgRightClick,
      );
    };
  }, []);

  return (
    <Renderer
      ref={roadmapRef}
      roadmap={{ nodes, edges }}
      onRendered={() => {
        roadmapRef.current?.setAttribute('data-renderer', 'editor');
        renderResourceProgress('roadmap', resourceId).finally();
      }}
    />
  );
}
