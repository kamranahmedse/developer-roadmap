import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  useMemo,
  useRef,
} from 'react';
import { Spinner } from '../ReactIcons/Spinner';
import '../FrameRenderer/FrameRenderer.css';
import type { TeamMember } from './TeamProgressPage';
import { httpGet } from '../../lib/http';
import {
  renderTopicProgress,
  type ResourceProgressType,
  type ResourceType,
  updateResourceProgress,
} from '../../lib/resource-progress';
import CloseIcon from '../../icons/close.svg';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../hooks/use-auth';
import { pageProgressMessage } from '../../stores/page';
import type { GetRoadmapResponse } from '../CustomRoadmap/CustomRoadmap';
import { ReadonlyEditor } from '../../../editor/readonly-editor';
import type { Node } from 'reactflow';
import { calculateDimensions } from '../../../editor/utils/roadmap';
import { isMobile } from '../../../editor/utils/is-mobile';
import { useKeydown } from '../../hooks/use-keydown';
import { useOutsideClick } from '../../hooks/use-outside-click';

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

  const initialZoom = useMemo(() => (isMobile() ? 0.35 : 0.7), []);

  const { measuredHeight } = useMemo(
    () =>
      calculateDimensions({
        nodes: roadmap?.nodes || [],
        padding: 100,
      }),
    [roadmap?.nodes]
  );

  useKeydown('Escape', () => onClose());
  useOutsideClick(popupBodyEl, () => onClose());

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

  async function getRoadmap() {
    const { response, error } = await httpGet<GetRoadmapResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-roadmap/${resourceId}`
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

  const handleTopicRightClick = useCallback((e: MouseEvent, node: Node) => {
    if (!isCurrentUser) {
      return;
    }

    const target = e?.currentTarget as HTMLDivElement;
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
      isCurrentStatusLearning ? 'pending' : 'learning'
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
    <div className="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div
        id="original-roadmap"
        className="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto"
      >
        <div
          className="relative rounded-lg bg-white pt-[1px] shadow"
          ref={popupBodyEl}
        >
          {isCurrentUser && (
            <div className="sticky top-1 z-50 mx-1 mb-0 mt-1 rounded-xl bg-gray-900 p-4 text-gray-300">
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
              className={`-mx-4 mb-3 flex items-center justify-start border-b border-t px-4 py-2 text-sm sm:hidden ${
                isLoading ? 'striped-loader' : ''
              }`}
            >
              <span className="mr-2.5 block rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{memberDone}</span> of <span>{memberTotal}</span> done
              </span>
            </p>
            <p
              className={`-mx-4 mb-3 hidden items-center justify-center border-b border-t py-2 text-sm sm:flex ${
                isLoading ? 'striped-loader' : ''
              }`}
            >
              <span className="mr-2.5 block rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{memberDone}</span> completed
              </span>
              <span className="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-learning="">{memberLearning}</span> in
                progress
              </span>

              {memberSkipped > 0 && (
                <>
                  <span className="mx-1.5 text-gray-400">·</span>
                  <span>
                    <span data-progress-skipped="">{memberSkipped}</span>{' '}
                    skipped
                  </span>
                </>
              )}

              <span className="mx-1.5 text-gray-400">·</span>
              <span>
                <span data-progress-total="">{memberTotal}</span> Total
              </span>
            </p>
          </div>

          {!isLoading && roadmap && (
            <div className="px-4 pb-2">
              <ReadonlyEditor
                roadmap={roadmap!}
                style={{
                  height: measuredHeight * initialZoom,
                }}
                zoom={{
                  initial: initialZoom,
                }}
                className="min-h-[400px]"
                onRendered={(wrapperRef) => {
                  const {
                    removed = [],
                    done = [],
                    learning = [],
                    skipped = [],
                  } = memberProgress || {};

                  done.forEach((id: string) => renderTopicProgress(id, 'done'));
                  learning.forEach((id: string) =>
                    renderTopicProgress(id, 'learning')
                  );
                  skipped.forEach((id: string) =>
                    renderTopicProgress(id, 'skipped')
                  );
                  removed.forEach((id: string) =>
                    renderTopicProgress(id, 'removed')
                  );
                }}
                onTopicClick={(e) => {
                  e.preventDefault();
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
            <img alt={'close'} src={CloseIcon.src} className="h-4 w-4" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
