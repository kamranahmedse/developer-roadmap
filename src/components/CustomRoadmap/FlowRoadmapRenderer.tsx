import { ReadonlyEditor } from '../../../editor/readonly-editor';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import {
  renderResourceProgress,
  updateResourceProgress,
  type ResourceProgressType,
  renderTopicProgress,
  refreshProgressCounters,
} from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import type { Node } from 'reactflow';
import { useCallback, type MouseEvent, useMemo } from 'react';
import {
  INITIAL_DESKTOP_ZOOM,
  INITIAL_MOBILE_ZOOM,
  calculateDimensions,
} from '../../../editor/utils/roadmap';
import { isMobile } from '../../../editor/utils/is-mobile';

type FlowRoadmapRendererProps = {
  roadmap: RoadmapDocument;
};

export function FlowRoadmapRenderer(props: FlowRoadmapRendererProps) {
  const { roadmap } = props;
  const roadmapId = String(roadmap._id!);

  const initialZoom = useMemo(
    () => (isMobile() ? INITIAL_MOBILE_ZOOM : INITIAL_DESKTOP_ZOOM),
    []
  );

  const toast = useToast();
  const { measuredHeight } = useMemo(
    () =>
      calculateDimensions({
        nodes: roadmap?.nodes,
        padding: 100,
      }),
    [roadmap?.nodes]
  );

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

  const handleTopicRightClick = useCallback((e: MouseEvent, node: Node) => {
    const target = e?.currentTarget as HTMLDivElement;
    if (!target) {
      return;
    }

    const isCurrentStatusDone = target?.classList.contains('done');
    updateTopicStatus(node.id, isCurrentStatusDone ? 'pending' : 'done');
  }, []);

  const handleTopicShiftClick = useCallback((e: MouseEvent, node: Node) => {
    const target = e?.currentTarget as HTMLDivElement;
    if (!target) {
      return;
    }

    const isCurrentStatusLearning = target?.classList.contains('learning');
    updateTopicStatus(
      node.id,
      isCurrentStatusLearning ? 'pending' : 'learning'
    );
  }, []);

  const handleTopicAltClick = useCallback((e: MouseEvent, node: Node) => {
    const target = e?.currentTarget as HTMLDivElement;
    if (!target) {
      return;
    }

    const isCurrentStatusSkipped = target?.classList.contains('skipped');
    updateTopicStatus(node.id, isCurrentStatusSkipped ? 'pending' : 'skipped');
  }, []);

  const handleTopicClick = useCallback((e: MouseEvent, node: Node) => {
    const target = e?.currentTarget as HTMLDivElement;
    if (!target) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent('roadmap.node.click', {
        detail: {
          topicId: node.id,
          resourceId: roadmapId,
          resourceType: 'roadmap',
          isCustomResource: true,
        },
      })
    );
  }, []);

  const handleLinkClick = useCallback((linkId: string, href: string) => {
    if (!href) {
      return;
    }

    const isExternalLink = href.startsWith('http');
    if (isExternalLink) {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  }, []);

  return (
    <ReadonlyEditor
      roadmap={roadmap}
      style={{
        height: measuredHeight * initialZoom,
      }}
      className="min-h-[400px]"
      onRendered={() => {
        renderResourceProgress('roadmap', roadmapId).then(() => {});
      }}
      onTopicClick={handleTopicClick}
      onTopicRightClick={handleTopicRightClick}
      onTopicShiftClick={handleTopicShiftClick}
      onTopicAltClick={handleTopicAltClick}
      onButtonNodeClick={handleLinkClick}
      onLinkClick={handleLinkClick}
      fontFamily="Balsamiq Sans"
      fontURL="/fonts/balsamiq.woff2"
    />
  );
}
