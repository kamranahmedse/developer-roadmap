import { useEffect, useRef, useState } from 'react';
import { wireframeJSONToSVG } from 'roadmap-renderer';
import '../FrameRenderer/FrameRenderer.css';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { useKeydown } from '../../hooks/use-keydown';
import { httpGet } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import { topicSelectorAll } from '../../lib/resource-progress';
import { deleteUrlParam, getUrlParams } from '../../lib/browser';
import { useAuth } from '../../hooks/use-auth';
import { ModalLoader } from './ModalLoader.tsx';
import { UserProgressModalHeader } from './UserProgressModalHeader';
import { X } from 'lucide-react';
import type { AllowedRoadmapRenderer } from '../../lib/roadmap.ts';
import { renderFlowJSON } from '@roadmapsh/editor';

export type ProgressMapProps = {
  userId?: string;
  resourceId: string;
  resourceType: ResourceType;
  onClose?: () => void;
  isCustomResource?: boolean;
  renderer?: AllowedRoadmapRenderer;
};

export type UserProgressResponse = {
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
  const {
    resourceId,
    resourceType,
    userId: propUserId,
    onClose: onModalClose,
    renderer = 'balsamiq',
  } = props;

  const { s: userId = propUserId } = getUrlParams();
  if (!userId) {
    return null;
  }

  const resourceSvgEl = useRef<HTMLDivElement>(null);
  const popupBodyEl = useRef<HTMLDivElement>(null);
  const currentUser = useAuth();

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
    resourceId: string,
  ): Promise<UserProgressResponse | undefined> {
    const { error, response } = await httpGet<UserProgressResponse>(
      `${
        import.meta.env.PUBLIC_API_URL
      }/v1-get-user-progress/${userId}?resourceType=${resourceType}&resourceId=${resourceId}`,
    );

    if (error || !response) {
      throw error || new Error('Something went wrong. Please try again!');
    }

    return response;
  }

  async function getRoadmapSVG(
    jsonUrl: string,
    renderer: AllowedRoadmapRenderer = 'balsamiq',
  ): Promise<SVGElement | undefined> {
    const { error, response: roadmapJson } = await httpGet(jsonUrl);
    if (error || !roadmapJson) {
      throw error || new Error('Something went wrong. Please try again!');
    }

    return renderer === 'editor'
      ? await renderFlowJSON(roadmapJson as any)
      : await wireframeJSONToSVG(roadmapJson, {
          fontURL: '/fonts/balsamiq.woff2',
        });
  }

  function onClose() {
    deleteUrlParam('s');
    setError('');
    setShowModal(false);

    if (onModalClose) {
      onModalClose();
    } else {
      window.location.reload();
    }
  }

  useKeydown('Escape', () => {
    onClose();
  });

  useOutsideClick(popupBodyEl, () => {
    onClose();
  });

  useEffect(() => {
    if (!resourceJsonUrl || !resourceId || !resourceType || !userId) {
      return;
    }

    setIsLoading(true);
    setError('');

    Promise.all([
      getRoadmapSVG(resourceJsonUrl, renderer),
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

  if (currentUser?.id === userId) {
    deleteUrlParam('s');
    return null;
  }

  if (!showModal) {
    return null;
  }

  if (isLoading || error) {
    return (
      <ModalLoader
        text={'Loading user progress..'}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <div
      id={'user-progress-modal'}
      className="fixed left-0 right-0 top-0 z-[100] h-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain bg-black/50"
    >
      <div className="relative mx-auto h-full w-full max-w-4xl p-4 md:h-auto">
        <div
          ref={popupBodyEl}
          className={`popup-body relative rounded-lg bg-white pt-[1px] shadow`}
        >
          <UserProgressModalHeader
            isLoading={isLoading}
            progressResponse={progressResponse}
          />

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
            <X className="h-4 w-4" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
