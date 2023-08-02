import { useEffect, useRef, useState } from 'preact/hooks';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import '../FrameRenderer/FrameRenderer.css';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { httpGet } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import { topicSelectorAll } from '../../lib/resource-progress';
import CloseIcon from '../../icons/close.svg';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';
import { useAuth } from '../../hooks/use-auth';
import { Spinner } from '../ReactIcons/Spinner';
import { ErrorIcon } from '../ReactIcons/ErrorIcon';

export type ProgressMapProps = {
  resourceId: string;
  resourceType: ResourceType;
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
  const { s: userId } = getUrlParams();
  const { resourceId, resourceType } = props;

  const resourceSvgEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);

  const currentUser = useAuth();
  if (!userId || currentUser?.id === userId) {
    deleteUrlParam('s');
    return null;
  }

  const [showModal, setShowModal] = useState(!!userId);
  const [resourceSvg, setResourceSvg] = useState<SVGElement | null>(null);
  const [progressResponse, setProgressResponse] =
    useState<UserProgressResponse>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  let resourceJsonUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://roadmap.sh';
  if (resourceType === 'roadmap') {
    resourceJsonUrl += `/${resourceId}.json`;
  } else {
    resourceJsonUrl += `/best-practices/${resourceId}.json`;
  }

  async function getUserProgress(
    userId: string,
    resourceType: string,
    resourceId: string
  ): Promise<UserProgressResponse | undefined> {
    const { error, response } = await httpGet<UserProgressResponse>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-user-progress/${userId}?resourceType=${resourceType}&resourceId=${resourceId}`
    );

    if (error || !response) {
      throw error || new Error('Something went wrong. Please try again!');
    }

    return response;
  }

  async function getRoadmapSVG(
    jsonUrl: string
  ): Promise<SVGElement | undefined> {
    const { error, response: roadmapJson } = await httpGet(jsonUrl);
    if (error || !roadmapJson) {
      throw error || new Error('Something went wrong. Please try again!');
    }

    return await wireframeJSONToSVG(roadmapJson, {
      fontURL: '/fonts/balsamiq.woff2',
    });
  }

  function onClose() {
    deleteUrlParam('s');
    setError('');
    setShowModal(false);
  }

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  useEffect(() => {
    if (!resourceJsonUrl || !resourceId || !resourceType) {
      return;
    }

    setIsLoading(true);
    Promise.all([
      getRoadmapSVG(resourceJsonUrl),
      getUserProgress(userId, resourceType, resourceId),
    ])
      .then(([svg, user]) => {
        if (!user || !svg) {
          return;
        }

        const { progress } = user;
        const { done, learning, skipped } = progress || {
          done: [],
          learning: [],
          skipped: [],
        };

        done?.forEach((topicId: string) => {
          topicSelectorAll(topicId, svg).forEach((el) => {
            el.classList.add('done');
          });
        });

        learning?.forEach((topicId: string) => {
          topicSelectorAll(topicId, svg).forEach((el) => {
            el.classList.add('learning');
          });
        });

        skipped?.forEach((topicId: string) => {
          topicSelectorAll(topicId, svg).forEach((el) => {
            el.classList.add('skipped');
          });
        });

        svg.querySelectorAll('.clickable-group').forEach((el) => {
          el.classList.remove('clickable-group');
        });

        svg.querySelectorAll('[data-group-id]').forEach((el) => {
          el.removeAttribute('data-group-id');
        });

        setResourceSvg(svg);
        setProgressResponse(user);
      })
      .catch((err) => {
        setError(err?.message || 'Something went wrong. Please try again!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const user = progressResponse?.user;
  const progress = progressResponse?.progress;

  const userProgressTotal = progress?.total || 0;
  const userDone = progress?.done?.length || 0;
  const progressPercentage =
    Math.round((userDone / userProgressTotal) * 100) || 0;
  const userLearning = progress?.learning?.length || 0;
  const userSkipped = progress?.skipped?.length || 0;

  if (!showModal) {
    return null;
  }

  if (isLoading || error) {
    return (
      <div class="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50">
        <div class="relative mx-auto flex h-full w-full items-center justify-center">
          <div className="popup-body relative rounded-lg bg-white p-5 shadow">
            <div className="flex items-center">
              {isLoading && (
                <>
                  <Spinner className="h-6 w-6" isDualRing={false} />
                  <span className="ml-3 text-lg font-semibold">
                    Loading user progress...
                  </span>
                </>
              )}

              {error && (
                <>
                  <ErrorIcon additionalClasses="h-6 w-6 text-red-500" />
                  <span className="ml-3 text-lg font-semibold">{error}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={'user-progress-modal'}
      class="fixed left-0 right-0 top-0 z-50 h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50"
    >
      <div class="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          class={`popup-body relative rounded-lg bg-white pt-[1px] shadow`}
        >
          <div className="p-4">
            <div className="mb-5 mt-0 min-h-[28px] text-left sm:text-center md:mt-4 md:h-[60px]">
              <h2 className={'mb-1 text-lg font-bold md:text-2xl'}>
                {user?.name}'s Progress
              </h2>
              <p
                className={
                  'hidden text-xs text-gray-500 sm:text-sm md:block md:text-base'
                }
              >
                You can close this popup and start tracking your progress.
              </p>
            </div>
            <p
              class={`-mx-4 mb-3 flex items-center justify-start border-b border-t px-4 py-2 text-sm sm:hidden`}
            >
              <span class="mr-2.5 block rounded-sm bg-yellow-200 px-1 py-0.5 text-xs font-medium uppercase text-yellow-900">
                <span>{progressPercentage}</span>% Done
              </span>

              <span>
                <span>{userDone}</span> of <span>{userProgressTotal}</span> done
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
                <span>{userDone}</span> completed
              </span>
              <span class="mx-1.5 text-gray-400">·</span>
              <span>
                <span>{userLearning}</span> in progress
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
            ref={resourceSvgEl}
            className="px-4 pb-2"
            dangerouslySetInnerHTML={{ __html: resourceSvg?.outerHTML || '' }}
          ></div>

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
