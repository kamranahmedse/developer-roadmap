import { ReadonlyEditor } from '../../../editor/readonly-editor';
import type { RoadmapDocument } from './CreateRoadmap/CreateRoadmapModal';
import {
  refreshProgressCounters,
  renderResourceProgress,
  renderTopicProgress,
  type ResourceProgressType,
  updateResourceProgress,
} from '../../lib/resource-progress';
import { pageProgressMessage } from '../../stores/page';
import { useToast } from '../../hooks/use-toast';
import type { Node } from '@xyflow/react';
import { type MouseEvent, useCallback, useRef, useState } from 'react';
import { EmptyRoadmap } from './EmptyRoadmap';
import { cn } from '../../lib/classname';
import { totalRoadmapNodes } from '../../stores/roadmap.ts';

type FlowRoadmapRendererProps = {
  isEmbed?: boolean;
  roadmap: RoadmapDocument;
};

export function FlowRoadmapRenderer(props: FlowRoadmapRendererProps) {
  const { roadmap, isEmbed = false } = props;
  const roadmapId = String(roadmap._id!);

  const [hideRenderer, setHideRenderer] = useState(false);
  const editorWrapperRef = useRef<HTMLDivElement>(null);

  const toast = useToast();

  async function updateTopicStatus(
    topicId: string,
    newStatus: ResourceProgressType,
  ) {
    if (isEmbed) {
      return;
    }

    pageProgressMessage.set('Updating progress');
    updateResourceProgress(
      {
        resourceId: roadmapId,
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

  const handleTopicRightClick = useCallback((e: MouseEvent, node: Node) => {
    const target =
      node?.type === 'todo'
        ? document.querySelector(`[data-id="${node.id}"]`)
        : (e?.currentTarget as HTMLDivElement);
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
      isCurrentStatusLearning ? 'pending' : 'learning',
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
      }),
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

  const handleChecklistCheckboxClick = useCallback(
    (e: MouseEvent, checklistId: string) => {
      const target = e?.currentTarget as HTMLDivElement;
      if (!target) {
        return;
      }

      const isCurrentStatusDone = target?.classList.contains('done');
      updateTopicStatus(checklistId, isCurrentStatusDone ? 'pending' : 'done');
    },
    [],
  );

  const handleChecklistLabelClick = useCallback(
    (e: MouseEvent, checklistId: string) => {
      const target = e?.currentTarget as HTMLDivElement;
      if (!target) {
        return;
      }

      const isCurrentStatusDone = target?.classList.contains('done');
      updateTopicStatus(checklistId, isCurrentStatusDone ? 'pending' : 'done');
    },
    [],
  );

  return (
    <>
      {hideRenderer && (
        <EmptyRoadmap
          roadmapId={roadmapId}
          canManage={roadmap.canManage}
          className="grow"
        />
      )}
      <ReadonlyEditor
        ref={editorWrapperRef}
        roadmap={roadmap}
        className={cn(
          roadmap?.nodes?.length === 0
            ? 'grow'
            : 'min-h-0 max-md:min-h-[1000px]',
        )}
        onRendered={() => {
          renderResourceProgress('roadmap', roadmapId).then(() => {
            totalRoadmapNodes.set(
              roadmap?.nodes?.filter((node) => {
                return ['topic', 'subtopic'].includes(node.type);
              }).length || 0,
            );

            if (roadmap?.nodes?.length === 0) {
              setHideRenderer(true);
              editorWrapperRef?.current?.classList.add('hidden');
            }
          });
        }}
        onTopicClick={handleTopicClick}
        onTopicRightClick={handleTopicRightClick}
        onTopicShiftClick={handleTopicShiftClick}
        onTopicAltClick={handleTopicAltClick}
        onButtonNodeClick={handleLinkClick}
        onLinkClick={handleLinkClick}
        onChecklistCheckboxClick={handleChecklistCheckboxClick}
        onChecklistLableClick={handleChecklistLabelClick}
        fontFamily="Balsamiq Sans"
        fontURL="/fonts/balsamiq.woff2"
      />
    </>
  );
}
