import type { UIMessage } from 'ai';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseAIChatScrollProps = {
  messages: UIMessage[];
  threshold?: number;
};

export function useAIChatScroll(props: UseAIChatScrollProps) {
  const { messages, threshold = 80 } = props;

  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);

  const canScrollToBottom = useCallback(() => {
    const scrollableContainer = scrollableContainerRef?.current;
    if (!scrollableContainer) {
      return false;
    }

    const paddingBottom = parseInt(
      getComputedStyle(scrollableContainer).paddingBottom
    );

    const distanceFromBottom =
      scrollableContainer.scrollHeight -
      (scrollableContainer.scrollTop + scrollableContainer.clientHeight) -
      paddingBottom;

    return distanceFromBottom > -(paddingBottom - threshold);
  }, [threshold]);

  const scrollToBottom = useCallback(
    (behavior: 'instant' | 'smooth' = 'smooth') => {
      const scrollableContainer = scrollableContainerRef?.current;
      if (!scrollableContainer) {
        return;
      }

      scrollableContainer.scrollTo({
        top: scrollableContainer.scrollHeight,
        behavior: behavior === 'instant' ? 'instant' : 'smooth',
      });
    },
    [scrollableContainerRef]
  );

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;
    if (!scrollableContainer) {
      return;
    }

    const abortController = new AbortController();
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setShowScrollToBottomButton(canScrollToBottom());
      }, 100);
    };

    debouncedHandleScroll();
    scrollableContainer.addEventListener('scroll', debouncedHandleScroll, {
      signal: abortController.signal,
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      abortController.abort();
    };
  }, [messages]);

  return {
    scrollableContainerRef,
    showScrollToBottomButton,
    scrollToBottom,
  };
}
