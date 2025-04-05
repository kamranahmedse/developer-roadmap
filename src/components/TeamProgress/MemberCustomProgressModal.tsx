import '../FrameRenderer/FrameRenderer.css';
import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  useRef,
} from 'react';
import { Spinner } from '../ReactIcons/Spinner';
import type { TeamMember } from './TeamProgressPage';
import { httpGet } from '../../lib/http';
import {
  renderTopicProgress,
  type ResourceProgressType,
  type ResourceType,
  updateResourceProgress,
} from '../../lib/resource-progress';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../hooks/use-auth';
import { pageProgressMessage } from '../../stores/page';
import type { GetRoadmapResponse } from '../CustomRoadmap/CustomRoadmap';
import { ReadonlyEditor } from '@roadmapsh/editor';
import type { Node } from '@roadmapsh/editor';
import { useKeydown } from '../../hooks/use-keydown';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { MemberProgressModalHeader } from './MemberProgressModalHeader';
import { X } from 'lucide-react';

export type ProgressMapProps = {
  member: TeamMember;
  teamId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  onClose: () => void;
  onShowMyProgress: () => void;
  isCustomResource?: boolean;
};

export type MemberProgressResponse = {
  removed: string[];
  done: string[];
  learning: string[];
  skipped: string[];
};

export function MemberCustomProgressModal(props: ProgressMapProps) {
  const {
    resourceId,
    member,
    resourceType,
    onShowMyProgress,
    teamId,
    onClose,
  } = props;

  const user = useAuth();
  const isCurrentUser = user?.email === member.email;

  const popupBodyEl = useRef<HTMLDivElement>(null);
  const [roadmap, setRoadmap] = useState<GetRoadmapResponse | null>(null);
  const [memberProgress, setMemberProgress] =
    useState<MemberProgressResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useKeydown('Escape', () => onClose());
  useOutsideClick(popupBodyEl, () => onClose());

  async function getMemberProgress(
    teamId: string,
    memberId: string,
    resourceType: string,
    resourceId: string,
  ) {
    const { error, response } = await httpGet<MemberProgressResponse>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-member-resource-progress/${teamId}/${memberId}?resourceType=${resourceType}&resourceId=${resourceId}`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to get member progress');
      return;
    }

    setMemberProgress(response);

    return response;
  }

  async function getRoadmap() {
    const { response, error } = await httpGet<GetRoadmapResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-roadmap/${resourceId}`,
    );

    if (error || !response) {
      toast.error(error?.message || 'Failed to load roadmap');
      return;
    }

    setRoadmap(response);

    return response;
  }

  useEffect(() => {
    if (!resourceId || !resourceType || !teamId) {
      return;
    }

    setIsLoading(true);
    Promise.all([
      getRoadmap(),
      getMemberProgress(teamId, member._id, resourceType, resourceId),
    ])
      .then(() => {})
      .catch((err) => {
        console.error(err);
        toast.error(err?.message || 'Something went wrong. Please try again!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [member]);

  function updateTopicStatus(topicId: string, newStatus: ResourceProgressType) {
    if (!resourceId || !resourceType || !isCurrentUser) {
      return;
    }

    pageProgressMessage.set('Updating progress');
    updateResourceProgress(
      {
        resourceId: resourceId,
        resourceType: resourceType as ResourceType,
        topicId,
      },
      newStatus,
    )
      .then(() => {
        renderTopicProgress(topicId, newStatus);
        getMemberProgress(teamId, member._id, resourceType, resourceId).then(
          (data) => {
            setMemberProgress(data);
          },
        );
      })
      .catch((err) => {
        alert('Something went wrong, please try again.');
        console.error(err);
      })
      .finally(() => {
        pageProgressMessage.set('');
      });

    return;
  }

  const handleTopicRightClick = useCallback((e: MouseEvent, node: Node) => {
    if (!isCurrentUser) {
      return;
    }

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
    if (!isCurrentUser) {
      return;
    }

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
    if (!isCurrentUser) {
      return;
    }

    const target = e?.currentTarget as HTMLDivElement;
    if (!target) {
      return;
    }

    const isCurrentStatusSkipped = target?.classList.contains('skipped');
    updateTopicStatus(node.id, isCurrentStatusSkipped ? 'pending' : 'skipped');
  }, []);

  const handleLinkClick = useCallback((linkId: string, href: string) => {
    if (!href || !isCurrentUser) {
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
    <div className="fixed left-0 right-0 top-0 z-100 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div
        id="original-roadmap"
        className="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto"
      >
        <div
          className="relative rounded-lg bg-white pt-[1px] shadow-sm"
          ref={popupBodyEl}
        >
          <MemberProgressModalHeader
            resourceId={resourceId}
            member={member}
            progress={memberProgress}
            isCurrentUser={isCurrentUser}
            onShowMyProgress={onShowMyProgress}
            isLoading={isLoading}
          />

          {!isLoading && roadmap && (
            <div className="px-4 pb-2">
              <ReadonlyEditor
                variant="modal"
                roadmap={roadmap!}
                className="min-h-[400px]"
                onRendered={() => {
                  const {
                    removed = [],
                    done = [],
                    learning = [],
                    skipped = [],
                  } = memberProgress || {};

                  done.forEach((id: string) => renderTopicProgress(id, 'done'));
                  learning.forEach((id: string) =>
                    renderTopicProgress(id, 'learning'),
                  );
                  skipped.forEach((id: string) =>
                    renderTopicProgress(id, 'skipped'),
                  );
                  removed.forEach((id: string) =>
                    renderTopicProgress(id, 'removed'),
                  );
                }}
                onTopicRightClick={handleTopicRightClick}
                onTopicShiftClick={handleTopicShiftClick}
                onTopicAltClick={handleTopicAltClick}
                onButtonNodeClick={handleLinkClick}
                onLinkClick={handleLinkClick}
                fontFamily="Balsamiq Sans"
                fontURL="/fonts/balsamiq.woff2"
              />
            </div>
          )}

          {isLoading && (
            <div className="flex w-full justify-center">
              <Spinner
                isDualRing={false}
                className="mb-4 mt-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 sm:h-8 sm:w-8"
              />
            </div>
          )}

          <button
            type="button"
            className={`absolute right-2.5 top-3 z-50 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 lg:hidden ${
              isCurrentUser ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
