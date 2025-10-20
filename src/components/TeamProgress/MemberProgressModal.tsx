import '../FrameRenderer/FrameRenderer.css';
import '../EditorRoadmap/EditorRoadmapRenderer.css';
import { useEffect, useRef, useState } from 'react';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Spinner } from '../ReactIcons/Spinner';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
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
import { MemberProgressModalHeader } from './MemberProgressModalHeader';
import { replaceChildren } from '../../lib/dom.ts';
import { XIcon } from 'lucide-react';
import type { PageType } from '../CommandMenu/CommandMenu.tsx';
import { renderFlowJSON } from '@roadmapsh/editor';
import { getResourceMeta } from '../../lib/roadmap.ts';

export type ProgressMapProps = {
  member: TeamMember;
  teamId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  onClose: () => void;
  onShowMyProgress: () => void;
  isCustomResource?: boolean;
};

type MemberProgressResponse = {
  removed: string[];
  done: string[];
  learning: string[];
  skipped: string[];
};

export function MemberProgressModal(props: ProgressMapProps) {
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

  const containerEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);

  const [showProgressHint, setShowProgressHint] = useState(false);
  const [memberProgress, setMemberProgress] =
    useState<MemberProgressResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [renderer, setRenderer] = useState<PageType['renderer']>('balsamiq');

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

  async function renderResource() {
    const page = await getResourceMeta(resourceType, resourceId);
    if (!page) {
      toast.error('Resource not found');
      return;
    }

    const renderer = page.renderer || 'balsamiq';
    setRenderer(renderer);

    let resourceJsonUrl = import.meta.env.DEV
      ? 'http://localhost:3000'
      : 'https://roadmap.sh';
    if (resourceType === 'roadmap' && renderer === 'balsamiq') {
      resourceJsonUrl += `/${resourceId}.json`;
    } else if (resourceType === 'roadmap' && renderer === 'editor') {
      resourceJsonUrl = `${import.meta.env.PUBLIC_API_URL}/v1-official-roadmap/${resourceId}`;
    } else {
      resourceJsonUrl += `/best-practices/${resourceId}.json`;
    }

    const res = await fetch(resourceJsonUrl, {});
    const json = await res.json();
    const svg =
      renderer === 'editor'
        ? renderFlowJSON(json)
        : await wireframeJSONToSVG(json, {
            fontURL: '/fonts/balsamiq.woff2',
          });

    const container = containerEl.current;
    if (!svg || !container) {
      return;
    }

    replaceChildren(container, svg);
  }

  useKeydown('Escape', () => {
    if (showProgressHint) {
      return;
    }
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    if (showProgressHint) {
      return;
    }
    onClose();
  });

  useEffect(() => {
    if (!containerEl.current || !resourceId || !resourceType || !teamId) {
      return;
    }

    setIsLoading(true);
    Promise.all([
      renderResource(),
      getMemberProgress(teamId, member._id, resourceType, resourceId),
    ])
      .then(([_, memberProgress = {}]) => {
        const {
          removed = [],
          done = [],
          learning = [],
          skipped = [],
        } = memberProgress;

        done.forEach((id) => renderTopicProgress(id, 'done'));
        learning.forEach((id) => renderTopicProgress(id, 'learning'));
        skipped.forEach((id) => renderTopicProgress(id, 'skipped'));
        removed.forEach((id) => renderTopicProgress(id, 'removed'));
      })
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

  async function handleRightClick(e: MouseEvent) {
    const targetGroup = (e.target as HTMLElement)?.closest('g');
    if (!targetGroup) {
      return;
    }

    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }
    const topicId = groupId.replace(/^\d+-/, '');

    if (targetGroup.classList.contains('removed')) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const isCurrentStatusDone = targetGroup?.classList.contains('done');

    updateTopicStatus(topicId, !isCurrentStatusDone ? 'done' : 'pending');
  }

  async function handleClick(e: MouseEvent) {
    const targetGroup = (e.target as HTMLElement)?.closest('g');
    if (!targetGroup) {
      return;
    }
    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }
    const topicId = groupId.replace(/^\d+-/, '');

    if (targetGroup.classList.contains('removed')) {
      return;
    }

    e.preventDefault();
    const isCurrentStatusLearning = targetGroup.classList.contains('learning');
    const isCurrentStatusSkipped = targetGroup.classList.contains('skipped');

    if (e.shiftKey) {
      e.preventDefault();
      updateTopicStatus(
        topicId,
        !isCurrentStatusLearning ? 'learning' : 'pending',
      );
      return;
    }

    if (e.altKey) {
      e.preventDefault();
      updateTopicStatus(
        topicId,
        !isCurrentStatusSkipped ? 'skipped' : 'pending',
      );

      return;
    }
  }

  useEffect(() => {
    if (!member || !containerEl.current) {
      return;
    }

    containerEl.current?.addEventListener('contextmenu', handleRightClick);
    containerEl.current?.addEventListener('click', handleClick);

    return () => {
      containerEl.current?.removeEventListener('contextmenu', handleRightClick);
      containerEl.current?.removeEventListener('click', handleClick);
    };
  }, [member]);

  return (
    <div className="fixed top-0 right-0 left-0 z-100 h-full items-center justify-center overflow-x-hidden overflow-y-auto overscroll-contain bg-black/50">
      <div
        id={renderer === 'editor' ? undefined : 'customized-roadmap'}
        className="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto"
      >
        <div
          ref={popupBodyEl}
          className="popup-body relative rounded-lg bg-white pt-[1px] shadow-sm"
        >
          <MemberProgressModalHeader
            resourceId={resourceId}
            member={member}
            progress={memberProgress}
            isCurrentUser={isCurrentUser}
            onShowMyProgress={onShowMyProgress}
            isLoading={isLoading}
          />

          <div
            id={'resource-svg-wrap'}
            ref={containerEl}
            className="px-4 pb-2"
          ></div>

          {isLoading && (
            <div className="flex w-full justify-center">
              <Spinner
                isDualRing={false}
                className="mt-2 mb-4 h-4 w-4 animate-spin fill-blue-600 text-gray-200 sm:h-8 sm:w-8"
              />
            </div>
          )}

          <button
            type="button"
            className={`absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 lg:hidden ${
              isCurrentUser ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
            onClick={onClose}
          >
            <XIcon className="h-4 w-4" />

            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
