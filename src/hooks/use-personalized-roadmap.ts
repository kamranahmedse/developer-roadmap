import { useCallback, useRef, useState } from 'react';
import { removeAuthToken } from '../lib/jwt';
import { readChatStream } from '../lib/chat';
import { flushSync } from 'react-dom';

type PersonalizedRoadmapResponse = {
  topicIds: string[];
  information: string;
};

type UsePersonalizedRoadmapOptions = {
  roadmapId: string;
  onError?: (error: Error) => void;
  onStart?: () => void;
  onData?: (data: PersonalizedRoadmapResponse) => void;
  onFinish?: (data: PersonalizedRoadmapResponse) => void;
};

export function usePersonalizedRoadmap(options: UsePersonalizedRoadmapOptions) {
  const { roadmapId, onError, onStart, onData, onFinish } = options;

  const abortControllerRef = useRef<AbortController | null>(null);

  const contentRef = useRef<PersonalizedRoadmapResponse | null>(null);

  const [status, setStatus] = useState<
    'idle' | 'streaming' | 'loading' | 'ready' | 'error'
  >('idle');

  const informationRef = useRef<string>('');

  const generatePersonalizedRoadmap = async (information: string) => {
    try {
      informationRef.current = information;
      onStart?.();
      setStatus('loading');
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-personalized-roadmap`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roadmapId,
            information,
          }),
          signal: abortControllerRef.current?.signal,
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const data = await response.json();
        setStatus('error');
        if (data.status === 401) {
          removeAuthToken();
          window.location.reload();
        }

        throw new Error(data?.message || 'Something went wrong');
      }

      const stream = response.body;
      if (!stream) {
        setStatus('error');
        throw new Error('Something went wrong');
      }

      await readChatStream(stream, {
        onMessage: async (content) => {
          flushSync(() => {
            setStatus('streaming');
            const parsed = parsePersonalizedRoadmapResponse(content);
            contentRef.current = {
              ...parsed,
              information: informationRef.current
            };
            onData?.(contentRef.current);
          });
        },
        onMessageEnd: async () => {
          flushSync(() => {
            setStatus('ready');
          });
        },
      });

      setStatus('idle');
      abortControllerRef.current = null;

      if (!contentRef.current) {
        setStatus('error');
        throw new Error('Something went wrong');
      }

      onFinish?.(contentRef.current);
    } catch (error) {
      if (abortControllerRef.current?.signal.aborted) {
        // we don't want to show error if the user stops the chat
        // so we just return
        return;
      }

      onError?.(error as Error);
      setStatus('error');
    }
  };

  const stop = useCallback(() => {
    if (!abortControllerRef.current) {
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  }, []);

  return {
    status,
    stop,
    generatePersonalizedRoadmap,
  };
}

export function parsePersonalizedRoadmapResponse(
  response: string,
): Omit<PersonalizedRoadmapResponse, 'information'> {
  const topicIds: Set<string> = new Set();
  const lines = response.split('\n');
  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    if (line.startsWith('-')) {
      const topicId = line.slice(1).trim();
      if (!topicId) {
        continue;
      }

      topicIds.add(topicId);
    }
  }

  return {
    topicIds: Array.from(topicIds),
  };
}
