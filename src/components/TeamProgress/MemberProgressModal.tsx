import { useEffect, useRef, useState } from 'react';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Spinner } from '../ReactIcons/Spinner';
import '../FrameRenderer/FrameRenderer.css';
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
import { renderFlowJSON } from '../../../editor/renderer/renderer.ts';

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

  let resourceJsonUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

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

  async function renderResource(jsonUrl: string) {
    const { error, response } = await httpGet<PageType[]>(`/pages.json`);
    if (error || !response) {
      toast.error(error?.message || 'Resource not found');
      return;
    }

    const page = response.find((page) => {
      if (resourceType === 'roadmap') {
        return page.url === `/${resourceId}`;
      } else if (resourceType === 'best-practice') {
        return page.url === `/best-practices/${resourceId}`;
      } else if (resourceType === 'question') {
        return page.url === `/questions/${resourceId}`;
      }

      return false;
    });

    if (!page) {
      toast.error('Resource not found');
      return;
    }

    const renderer = page.renderer || 'balsamiq';

    const res = await fetch(jsonUrl, {});
    const json = await res.json();
    const svg =
      renderer === 'editor'
        ? await renderFlowJSON(json as any)
        : await wireframeJSONToSVG(json, {
            fontURL: '/fonts/balsamiq.woff2',
          });

    replaceChildren(containerEl.current!, svg);
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
    if (
      !containerEl.current ||
      !resourceJsonUrl ||
      !resourceId ||
      !resourceType ||
      !teamId
    ) {
      return;
    }

    setIsLoading(true);
    Promise.all([
      renderResource(resourceJsonUrl),
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
    <div className="fixed left-0 right-0 top-0 z-[100] h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div
        id={'customized-roadmap'}
        className="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto"
      >
        <div
          ref={popupBodyEl}
          className="popup-body relative rounded-lg bg-white pt-[1px] shadow"
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
                className="mb-4 mt-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 sm:h-8 sm:w-8"
              />
            </div>
          )}

          <button
            type="button"
            className={`absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 lg:hidden ${
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
