import { useEffect, useRef, useState } from 'preact/hooks';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Spinner } from '../ReactIcons/Spinner';
import '../FrameRenderer/FrameRenderer.css';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import type { TeamMember } from './TeamProgressPage';
import { httpGet } from '../../lib/http';
import {
  renderTopicProgress,
  ResourceProgressType,
  ResourceType,
  updateResourceProgress,
} from '../../lib/resource-progress';
import CloseIcon from '../../icons/close.svg';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../hooks/use-auth';
import { pageProgressMessage } from '../../stores/page';
import { useStore } from '@nanostores/preact';
import { $currentTeam } from '../../stores/team';

export type ProgressMapProps = {
  member: TeamMember;
  teamId: string;
  resourceId: string;
  resourceType: 'roadmap' | 'best-practice';
  onClose: () => void;
  onShowMyProgress: () => void;
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
  const currentTeam = useStore($currentTeam);

  const containerEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);

  const [showProgressHint, setShowProgressHint] = useState(false);
  const [memberProgress, setMemberProgress] =
    useState<MemberProgressResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  let resourceJsonUrl = 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

  async function getMemberProgress(
    teamId: string,
    memberId: string,
    resourceType: string,
    resourceId: string
  ) {
    const { error, response } = await httpGet<MemberProgressResponse>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-member-resource-progress/${teamId}/${memberId}?resourceType=${resourceType}&resourceId=${resourceId}`
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to get member progress');
      return;
    }

    setMemberProgress(response);

    return response;
  }

  async function renderResource(jsonUrl: string) {
    const res = await fetch(jsonUrl);
    const json = await res.json();
    const svg = await wireframeJSONToSVG(json, {
      fontURL: '/fonts/balsamiq.woff2',
    });

    containerEl.current?.replaceChildren(svg);
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

        done.forEach((id: string) => renderTopicProgress(id, 'done'));
        learning.forEach((id: string) => renderTopicProgress(id, 'learning'));
        skipped.forEach((id: string) => renderTopicProgress(id, 'skipped'));
        removed.forEach((id: string) => renderTopicProgress(id, 'removed'));
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
      newStatus
    )
      .then(() => {
        renderTopicProgress(topicId, newStatus);
        getMemberProgress(teamId, member._id, resourceType, resourceId).then(
          (data) => {
            setMemberProgress(data);
          }
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

    if (targetGroup.classList.contains('removed')) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const isCurrentStatusDone = targetGroup.classList.contains('done');
    const normalizedGroupId = groupId.replace(/^\d+-/, '');

    updateTopicStatus(
      normalizedGroupId,
      !isCurrentStatusDone ? 'done' : 'pending'
    );
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

    if (targetGroup.classList.contains('removed')) {
      return;
    }

    e.preventDefault();
    const normalizedGroupId = groupId.replace(/^\d+-/, '');

    const isCurrentStatusLearning = targetGroup.classList.contains('learning');
    const isCurrentStatusSkipped = targetGroup.classList.contains('skipped');

    if (e.shiftKey) {
      e.preventDefault();
      updateTopicStatus(
        normalizedGroupId,
        !isCurrentStatusLearning ? 'learning' : 'pending'
      );
      return;
    }

    if (e.altKey) {
      e.preventDefault();
      updateTopicStatus(
        normalizedGroupId,
        !isCurrentStatusSkipped ? 'skipped' : 'pending'
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

  const removedTopics = memberProgress?.removed || [];
  const memberDone =
    memberProgress?.done.filter((id) => !removedTopics.includes(id)).length ||
    0;
  const memberLearning =
    memberProgress?.learning.filter((id) => !removedTopics.includes(id))
      .length || 0;
  const memberSkipped =
    memberProgress?.skipped.filter((id) => !removedTopics.includes(id))
      .length || 0;

  const currProgress = member.progress.find((p) => p.resourceId === resourceId);
  const memberTotal = currProgress?.total || 0;

  const progressPercentage = Math.round((memberDone / memberTotal) * 100);

  return (
    <div class="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div
        id={currentTeam?.type === 'company' ? 'customized-roadmap' : 'original-roadmap'}
        class="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto"
      >
        <div
          ref={popupBodyEl}
          class="popup-body relative rounded-lg bg-white pt-[1px] shadow"
        >
          {isCurrentUser && (
            <div className="sticky top-1 mx-1 mb-0 mt-1 rounded-xl bg-gray-900 p-4 text-gray-300">
              <h2 className={'mb-1.5 text-base'}>
                Follow the Instructions below to update your progress
              </h2>
              <ul className="flex flex-col gap-1">
                <li className="leading-loose">
                  <kbd className="rounded-md bg-yellow-200 px-2 py-1.5 text-xs text-gray-900">
                    Right Mouse Click
                  </kbd>{' '}
                  on a topic to mark as{' '}
                  <span className={'font-medium text-white'}>Done</span>.
                </li>
                <li className="leading-loose">
                  <kbd className="rounded-md bg-yellow-200 px-2 py-1.5 text-xs text-gray-900">
                    Shift
                  </kbd>{' '}
                  +{' '}
                  <kbd className="rounded-md bg-yellow-200 px-2 py-1.5 text-xs text-gray-900">
                    Click
                  </kbd>{' '}
                  on a topic to mark as{' '}
                  <span className="font-medium text-white">In progress</span>.
                </li>
              </ul>
            </div>
          )}
          <div className="p-4">
            {!isCurrentUser && (
              <div className="mb-5 mt-0 text-left md:mt-4 md:text-center">
                <h2 className={'mb-1 text-lg font-bold md:text-2xl'}>
                  {member.name}'s Progress
                </h2>
                <p
                  className={
                    'hidden text-xs text-gray-500 sm:text-sm md:block md:text-base'
                  }
                >
                  You are looking at {member.name}'s progress.{' '}
                  <button
                    className="text-blue-600 underline"
                    onClick={onShowMyProgress}
                  >
                    View your progress
                  </button>
                  .
                </p>
                <p className={'block text-gray-500 md:hidden'}>
                  <button
                    className="text-blue-600 underline"
                    onClick={onShowMyProgress}
                  >
                    View your progress.
                  </button>
                </p>
              </div>
            )}
            <p
              class={`-mx-4 mb-3 flex items-center justify-start border-b border-t px-4 py-2 text-sm sm:hidden ${
                isLoading ? 'striped-loader' : ''
              }`}
            >
              <span class="mr-2.5 block rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{memberDone}</span> of <span>{memberTotal}</span> done
              </span>
            </p>
            <p
              class={`-mx-4 mb-3 hidden items-center justify-center border-b border-t py-2 text-sm sm:flex ${
                isLoading ? 'striped-loader' : ''
              }`}
            >
              <span class="mr-2.5 block rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{memberDone}</span> completed
              </span>
              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-learning="">{memberLearning}</span> in
                progress
              </span>

              {memberSkipped > 0 && (
                <>
                  <span class="mx-1.5 text-gray-400">·</span>
                  <span>
                    <span data-progress-skipped="">{memberSkipped}</span>{' '}
                    skipped
                  </span>
                </>
              )}

              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-total="">{memberTotal}</span> Total
              </span>
            </p>
          </div>

          <div
            id="resource-svg-wrap"
            ref={containerEl}
            className="px-4 pb-2"
          ></div>

          {isLoading && (
            <div class="flex w-full justify-center">
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
            <img alt={'close'} src={CloseIcon} className="h-4 w-4" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
