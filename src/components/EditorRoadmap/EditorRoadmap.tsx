import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { RefreshCcw } from 'lucide-react';
import {
  EditorRoadmapRenderer,
  type RoadmapRendererProps,
} from './EditorRoadmapRenderer';
import { Spinner } from '../ReactIcons/Spinner';
import {
  clearMigratedRoadmapProgress,
  type ResourceType,
} from '../../lib/resource-progress';
import { httpGet } from '../../lib/http';
import { getUrlParams } from '../../lib/browser.ts';
import { RoadmapFloatingChat } from '../FrameRenderer/RoadmapFloatingChat.tsx';
import {
  isTouchInteractionDevice,
  TOUCH_INTERACTION_MEDIA_QUERY,
} from '../../lib/touch-interaction.ts';
import { useTouchPanZoom } from './useTouchPanZoom.ts';

type EditorRoadmapProps = {
  resourceId: string;
  resourceType?: ResourceType;
  hasChat?: boolean;
  dimensions: {
    width: number;
    height: number;
  };
};

export function EditorRoadmap(props: EditorRoadmapProps) {
  const {
    resourceId,
    resourceType = 'roadmap',
    dimensions,
    hasChat = true,
  } = props;

  const [hasSwitchedRoadmap, setHasSwitchedRoadmap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTouchInteractionMode, setIsTouchInteractionMode] = useState(false);
  const [isTouchHintVisible, setIsTouchHintVisible] = useState(false);
  const [isTouchHintFading, setIsTouchHintFading] = useState(false);
  const [roadmapData, setRoadmapData] = useState<
    Omit<RoadmapRendererProps, 'resourceId'> | undefined
  >(undefined);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchHintFadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearTouchHintFadeTimeout = () => {
    if (touchHintFadeTimeoutRef.current === null) {
      return;
    }

    clearTimeout(touchHintFadeTimeoutRef.current);
    touchHintFadeTimeoutRef.current = null;
  };

  const loadRoadmapData = async () => {
    setIsLoading(true);
    const { r: switchRoadmapId } = getUrlParams();

    const { response, error } = await httpGet<
      Omit<RoadmapRendererProps, 'resourceId'>
    >(
      `${import.meta.env.PUBLIC_API_URL}/v1-official-roadmap/${switchRoadmapId || resourceId}`,
    );

    if (error) {
      console.error(error);
      return;
    }

    setRoadmapData(response);
    setIsLoading(false);
    setHasSwitchedRoadmap(!!switchRoadmapId);
  };

  useEffect(() => {
    clearMigratedRoadmapProgress(resourceType, resourceId);
    loadRoadmapData().finally();
  }, [resourceId]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia(TOUCH_INTERACTION_MEDIA_QUERY);
    const syncTouchMode = () => {
      setIsTouchInteractionMode(isTouchInteractionDevice());
    };

    syncTouchMode();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncTouchMode);
      return () => {
        mediaQuery.removeEventListener('change', syncTouchMode);
      };
    }

    mediaQuery.addListener(syncTouchMode);
    return () => {
      mediaQuery.removeListener(syncTouchMode);
    };
  }, []);

  const aspectRatio = dimensions.width / dimensions.height;
  const { hasEnteredZoomMode, reset, handleClickCapture } = useTouchPanZoom({
    viewportRef,
    contentRef,
    enabled: !!roadmapData && !isLoading,
    maxScale: 6,
  });

  useEffect(() => {
    clearTouchHintFadeTimeout();

    if (!isTouchInteractionMode) {
      setIsTouchHintVisible(false);
      setIsTouchHintFading(false);
      return;
    }

    if (!hasEnteredZoomMode) {
      setIsTouchHintVisible(true);
      setIsTouchHintFading(false);
      return;
    }

    if (!isTouchHintVisible) {
      return;
    }

    setIsTouchHintFading(true);
    touchHintFadeTimeoutRef.current = setTimeout(() => {
      setIsTouchHintVisible(false);
      setIsTouchHintFading(false);
      touchHintFadeTimeoutRef.current = null;
    }, 375);

    return () => {
      clearTouchHintFadeTimeout();
    };
  }, [hasEnteredZoomMode, isTouchHintVisible, isTouchInteractionMode]);

  if (!roadmapData || isLoading) {
    return (
      <div
        style={
          !hasSwitchedRoadmap && !isTouchInteractionMode
            ? ({
                '--aspect-ratio': aspectRatio,
              } as CSSProperties)
            : undefined
        }
        className={
          isTouchInteractionMode
            ? 'mt-5 flex min-h-[40svh] w-full flex-col justify-center'
            : 'mt-5 flex aspect-[var(--aspect-ratio)] w-full flex-col justify-center'
        }
      >
        <div className="flex w-full justify-center">
          <Spinner
            className="h-6 w-6 animate-spin sm:h-12 sm:w-12"
            isDualRing={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={
        !hasSwitchedRoadmap && !isTouchInteractionMode
          ? ({
              '--aspect-ratio': aspectRatio,
            } as CSSProperties)
          : undefined
      }
      className={
        isTouchInteractionMode
          ? 'mt-5 flex w-full flex-col'
          : 'mt-5 flex aspect-[var(--aspect-ratio)] w-full flex-col justify-center'
      }
    >
      <div
        ref={viewportRef}
        onClickCapture={handleClickCapture}
        className={
          isTouchInteractionMode
            ? 'relative w-full max-h-[70svh] overflow-hidden overscroll-contain'
            : 'relative h-full w-full overflow-hidden overscroll-contain'
        }
      >
        {isTouchHintVisible && (
          <div
            className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 ${
              isTouchHintFading
                ? 'opacity-0 transition-opacity duration-[375ms]'
                : 'opacity-100'
            }`}
          >
            <div className="relative mx-auto flex w-max max-w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-stone-900/95 py-2.5 pr-6 pl-5 text-center text-white shadow-2xl backdrop-blur-sm">
              <span className="text-sm font-semibold text-yellow-400">
                Pinch to zoom,
              </span>
              <span className="text-sm text-white">drag to pan</span>
            </div>
          </div>
        )}
        {hasEnteredZoomMode && (
          <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-3 sm:justify-end">
            <button
              type="button"
              data-reset-zoom-button="true"
              onClick={reset}
              className="pointer-events-auto relative mx-auto flex w-max flex-shrink-0 items-center justify-center gap-2 rounded-full bg-stone-900/95 py-2.5 pr-6 pl-5 text-center text-white shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-101 hover:bg-stone-800 sm:mx-0"
            >
              <RefreshCcw className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">
                Reset Zoom
              </span>
            </button>
          </div>
        )}
        <div
          ref={contentRef}
          className={isTouchInteractionMode ? 'w-full' : 'h-full w-full'}
          style={{
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          <EditorRoadmapRenderer
            {...roadmapData}
            dimensions={dimensions}
            resourceId={resourceId}
          />
        </div>
      </div>
      {hasChat && <RoadmapFloatingChat roadmapId={resourceId} />}
    </div>
  );
}
