import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from 'react';
import { isTouchInteractionDevice } from '../../lib/touch-interaction.ts';

type TouchPoint = {
  clientX: number;
  clientY: number;
};

type TransformState = {
  scale: number;
  x: number;
  y: number;
};

type TouchSnapshot = {
  touches: TouchPoint[];
  scale: number;
  x: number;
  y: number;
};

type UseTouchPanZoomOptions = {
  viewportRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
  minScale?: number;
  maxScale?: number;
};

const CLICK_SUPPRESS_MS = 350;
const GESTURE_THRESHOLD = 6;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTouchPoints(touches: TouchList): TouchPoint[] {
  return Array.from(touches).map((touch) => ({
    clientX: touch.clientX,
    clientY: touch.clientY,
  }));
}

function getDistance(first: TouchPoint, second: TouchPoint) {
  const deltaX = second.clientX - first.clientX;
  const deltaY = second.clientY - first.clientY;
  return Math.hypot(deltaX, deltaY);
}

function getMidpoint(first: TouchPoint, second: TouchPoint) {
  return {
    x: (first.clientX + second.clientX) / 2,
    y: (first.clientY + second.clientY) / 2,
  };
}

export function useTouchPanZoom(options: UseTouchPanZoomOptions) {
  const {
    viewportRef,
    contentRef,
    enabled = true,
    minScale = 1,
    maxScale = 6,
  } = options;
  const transformRef = useRef<TransformState>({ scale: 1, x: 0, y: 0 });
  const touchSnapshotRef = useRef<TouchSnapshot | null>(null);
  const hasPinchedRef = useRef(false);
  const suppressClickUntilRef = useRef(0);
  const [hasEnteredZoomMode, setHasEnteredZoomMode] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const clampTransform = useCallback(
    (nextTransform: TransformState) => {
      const viewport = viewportRef.current;
      const content = contentRef.current;

      if (!viewport || !content) {
        return nextTransform;
      }

      const viewportWidth = viewport.clientWidth;
      const viewportHeight = viewport.clientHeight;
      const contentWidth = content.offsetWidth;
      const contentHeight = content.offsetHeight;

      if (!viewportWidth || !viewportHeight || !contentWidth || !contentHeight) {
        return nextTransform;
      }

      const scaledWidth = contentWidth * nextTransform.scale;
      const scaledHeight = contentHeight * nextTransform.scale;
      const minX = scaledWidth > viewportWidth ? viewportWidth - scaledWidth : 0;
      const minY =
        scaledHeight > viewportHeight ? viewportHeight - scaledHeight : 0;

      return {
        scale: nextTransform.scale,
        x: clamp(nextTransform.x, minX, 0),
        y: clamp(nextTransform.y, minY, 0),
      };
    },
    [contentRef, viewportRef],
  );

  const applyTransform = useCallback(
    (nextTransform: TransformState) => {
      const content = contentRef.current;
      const viewport = viewportRef.current;
      if (!content) {
        transformRef.current = nextTransform;
        return;
      }

      const clampedTransform = clampTransform(nextTransform);
      transformRef.current = clampedTransform;
      content.style.transformOrigin = '0 0';
      const nextIsZoomed =
        clampedTransform.scale > 1 ||
        clampedTransform.x !== 0 ||
        clampedTransform.y !== 0;
      content.style.willChange = nextIsZoomed ? 'transform' : '';
      content.style.transform = `translate3d(${clampedTransform.x}px, ${clampedTransform.y}px, 0) scale(${clampedTransform.scale})`;
      if (viewport) {
        viewport.style.touchAction = nextIsZoomed ? 'none' : 'auto';
      }
      setIsZoomed((currentIsZoomed) =>
        currentIsZoomed === nextIsZoomed ? currentIsZoomed : nextIsZoomed,
      );
    },
    [clampTransform, contentRef, viewportRef],
  );

  const reset = useCallback(() => {
    touchSnapshotRef.current = null;
    hasPinchedRef.current = false;
    suppressClickUntilRef.current = 0;
    setHasEnteredZoomMode(false);
    applyTransform({ scale: 1, x: 0, y: 0 });
  }, [applyTransform]);

  const handleClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (
        event.target instanceof Element &&
        event.target.closest('[data-reset-zoom-button="true"]')
      ) {
        return;
      }

      if (performance.now() >= suppressClickUntilRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!enabled || !viewport || !content || !isTouchInteractionDevice()) {
      reset();
      return;
    }

    function updateTouchSnapshot(touches: TouchList) {
      touchSnapshotRef.current = {
        touches: getTouchPoints(touches),
        scale: transformRef.current.scale,
        x: transformRef.current.x,
        y: transformRef.current.y,
      };
    }

    function handleTouchStart(event: TouchEvent) {
      if (event.touches.length < 1 || event.touches.length > 2) {
        touchSnapshotRef.current = null;
        return;
      }

      if (event.touches.length === 2) {
        event.preventDefault();
      }

      updateTouchSnapshot(event.touches);
    }

    function handleTouchMove(event: TouchEvent) {
      const touchSnapshot = touchSnapshotRef.current;
      if (!touchSnapshot) {
        return;
      }

      if (event.touches.length === 2 && touchSnapshot.touches.length === 2) {
        event.preventDefault();

        const currentTouches = getTouchPoints(event.touches);
        const initialDistance = Math.max(
          getDistance(touchSnapshot.touches[0], touchSnapshot.touches[1]),
          1,
        );
        const currentDistance = getDistance(currentTouches[0], currentTouches[1]);
        const nextScale = clamp(
          touchSnapshot.scale * (currentDistance / initialDistance),
          minScale,
          maxScale,
        );

        const viewportRect = viewport.getBoundingClientRect();
        const midpoint = getMidpoint(currentTouches[0], currentTouches[1]);
        const focalX = midpoint.x - viewportRect.left;
        const focalY = midpoint.y - viewportRect.top;
        const localX = (focalX - touchSnapshot.x) / touchSnapshot.scale;
        const localY = (focalY - touchSnapshot.y) / touchSnapshot.scale;
        const nextTransform = {
          scale: nextScale,
          x: focalX - localX * nextScale,
          y: focalY - localY * nextScale,
        };

        if (
          Math.abs(currentDistance - initialDistance) > GESTURE_THRESHOLD ||
          Math.abs(nextScale - touchSnapshot.scale) > 0.02
        ) {
          hasPinchedRef.current = true;
          setHasEnteredZoomMode(true);
        }

        applyTransform(nextTransform);
        if (
          Math.abs(currentDistance - initialDistance) > GESTURE_THRESHOLD ||
          Math.abs(nextTransform.x - touchSnapshot.x) > GESTURE_THRESHOLD ||
          Math.abs(nextTransform.y - touchSnapshot.y) > GESTURE_THRESHOLD
        ) {
          suppressClickUntilRef.current = performance.now() + CLICK_SUPPRESS_MS;
        }
        return;
      }

      if (
        event.touches.length === 1 &&
        touchSnapshot.touches.length === 1 &&
        hasPinchedRef.current &&
        (transformRef.current.scale > 1 ||
          content.offsetHeight > viewport.clientHeight)
      ) {
        event.preventDefault();

        const deltaX = event.touches[0].clientX - touchSnapshot.touches[0].clientX;
        const deltaY = event.touches[0].clientY - touchSnapshot.touches[0].clientY;

        if (Math.hypot(deltaX, deltaY) > GESTURE_THRESHOLD) {
          event.preventDefault();
          suppressClickUntilRef.current = performance.now() + CLICK_SUPPRESS_MS;
        } else {
          return;
        }

        applyTransform({
          scale: touchSnapshot.scale,
          x: touchSnapshot.x + deltaX,
          y: touchSnapshot.y + deltaY,
        });
      }
    }

    function handleTouchEnd(event: TouchEvent) {
      if (event.touches.length === 0) {
        touchSnapshotRef.current = null;
        return;
      }

      updateTouchSnapshot(event.touches);
    }

    function handleResize() {
      applyTransform(transformRef.current);
    }

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            handleResize();
          });

    resizeObserver?.observe(viewport);
    resizeObserver?.observe(content);
    viewport.addEventListener('touchstart', handleTouchStart, { passive: false });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: false });
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true });
    viewport.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);
    applyTransform(transformRef.current);

    return () => {
      resizeObserver?.disconnect();
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', handleTouchEnd);
      viewport.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      viewport.style.touchAction = '';
      content.style.willChange = '';
    };
  }, [
    applyTransform,
    contentRef,
    enabled,
    maxScale,
    minScale,
    reset,
    viewportRef,
  ]);

  return {
    hasEnteredZoomMode,
    isZoomed,
    reset,
    handleClickCapture,
  };
}
