import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import { Spinner } from '../ReactIcons/Spinner';
import '../FrameRenderer/FrameRenderer.css';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { httpGet } from '../../lib/http';
import { ResourceType, renderTopicProgress } from '../../lib/resource-progress';
import CloseIcon from '../../icons/close.svg';
import { useToast } from '../../hooks/use-toast';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';
import { useAuth } from '../../hooks/use-auth';

export type ProgressMapProps = {
  resourceId: string;
  resourceType: ResourceType
};

type UserProgressResponse = {
  user: {
    _id: string;
    name: string;
  };
  progress: {
    total: number;
    done: string[];
    learning: string[];
    skipped: string[];
  };
};

export function UserProgressModal(props: ProgressMapProps) {
  const { resourceId, resourceType } = props;
  const containerEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);
  const { uid: userId } = getUrlParams();
  const currentUser = useAuth()

  if (!userId || currentUser?.id === userId) {
    deleteUrlParam('uid');
    return null;
  }

  const [showModal, setShowModal] = useState(userId ? true : false);

  const [userResponse, setUserResponse] = useState<UserProgressResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  let resourceJsonUrl = 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

  async function getUserProgress(
    userId: string,
    resourceType: string,
    resourceId: string
  ) {
    const { error, response } = await httpGet<UserProgressResponse>(
      `${import.meta.env.PUBLIC_API_URL
      }/v1-get-user-progress/${userId}?resourceType=${resourceType}&resourceId=${resourceId}`
    );
    if (error || !response) {
      toast.error(error?.message || 'Failed to get member progress');
      return;
    }

    setUserResponse(response);
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

  function onClose() {
    deleteUrlParam('uid');
    setShowModal(false);
  }

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  useEffect(() => {
    if (
      !containerEl.current ||
      !resourceJsonUrl ||
      !resourceId ||
      !resourceType
    ) {
      return;
    }

    setIsLoading(true);
    Promise.all([
      renderResource(resourceJsonUrl),
      getUserProgress(userId, resourceType, resourceId),
    ])
      .then(([_, user = {}]) => {
        const { progress } = user;
        const { done, learning, skipped } = progress || {
          done: [],
          learning: [],
          skipped: [],
        };
        done?.forEach((id: string) => renderTopicProgress(id, 'done'));
        learning?.forEach((id: string) => renderTopicProgress(id, 'learning'));
        skipped?.forEach((id: string) => renderTopicProgress(id, 'skipped'));
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.message || 'Something went wrong. Please try again!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  async function handleClick(e: MouseEvent) {
    const targetGroup = (e.target as HTMLElement)?.closest('g');
    if (!targetGroup) {
      return;
    }
    const groupId = targetGroup.dataset ? targetGroup.dataset.groupId : '';
    if (!groupId) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  useEffect(() => {
    if (!containerEl.current) {
      return;
    }
    containerEl.current.addEventListener('click', handleClick);
    return () => {
      containerEl.current?.removeEventListener('click', handleClick);
    };
  }, [containerEl.current]);

  const user = useMemo(() => userResponse, [userResponse]);
  const userProgressTotal = user?.progress?.total || 0;
  const userDone = user?.progress?.done?.length || 0;
  const progressPercentage =
    Math.round((userDone / userProgressTotal) * 100) || 0;
  const userLearning = user?.progress?.learning?.length || 0;
  const userSkipped = user?.progress?.skipped?.length || 0;

  if (!showModal) {
    return null;
  }

  return (
    <div class="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
      <div class="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          class="popup-body relative rounded-lg bg-white pt-[1px] shadow"
        >
          <div className="p-4">
            <div className="mb-5 mt-0 min-h-[28px] text-left md:h-[60px] md:mt-4 md:text-center">
              {isLoading && (
                <div class="flex w-full justify-center">
                  <Spinner
                    isDualRing={false}
                    className="h-4 w-4 animate-spin fill-blue-600 text-gray-200 sm:h-8 sm:w-8"
                  />
                </div>
              )}
              {!isLoading && (
                <>
                  <h2 className={'mb-1 text-lg font-bold md:text-2xl'}>
                    {user?.user.name}'s Progress
                  </h2>
                  <p
                    className={
                      'hidden text-xs text-gray-500 sm:text-sm md:block md:text-base'
                    }
                  >
                    You are looking at {user?.user.name}'s progress.
                  </p>
                </>
              )}
            </div>
            <p
              class={`-mx-4 mb-3 flex items-center justify-start border-b border-t px-4 py-2 text-sm sm:hidden ${isLoading ? 'striped-loader' : ''
                }`}
            >
              <span class="mr-2.5 block rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{userDone}</span> of <span>{userProgressTotal}</span> done
              </span>
            </p>
            <p
              class={`-mx-4 mb-3 hidden items-center justify-center border-b border-t py-2 text-sm sm:flex ${isLoading ? 'striped-loader' : ''
                }`}
            >
              <span class="mr-2.5 block rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{userDone}</span> completed
              </span>
              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span>{userLearning}</span> in
                progress
              </span>

              {userSkipped > 0 && (
                <>
                  <span class="mx-1.5 text-gray-400">·</span>
                  <span>
                    <span>{userSkipped}</span> skipped
                  </span>
                </>
              )}

              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span>{userProgressTotal}</span> Total
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
            className={`absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-gray-100 bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 lg:hidden`}
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
