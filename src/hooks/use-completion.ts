import { useCallback, useRef, useState } from 'react';
import { fetchWithAuthHandling } from '../lib/ai';
import type { CompletionPart } from '../lib/stream';
import { readDataStream } from '../lib/stream';

type CompleteOptions = {
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

type CompletionStatus = 'idle' | 'loading' | 'streaming' | 'success' | 'error';

export type CompletionContext = {
  content: string;
};

type CompletionParams<D extends Record<string, unknown>> = {
  endpoint: string;
  onStart?: (options?: CompleteOptions) => Promise<void> | void;
  onData?: (
    part: CompletionPart<D>,
    context: CompletionContext
  ) => Promise<void> | void;
  onFinish?: (
    result: string,
    context: CompletionContext
  ) => Promise<void> | void;
  onError?: (error: Error) => void;
};

export function useCompletion<
  D extends Record<string, unknown> = Record<string, unknown>,
>(params: CompletionParams<D>) {
  const { endpoint, onData, onFinish, onError, onStart } = params;

  const [status, setStatus] = useState<CompletionStatus>('idle');

  const [error, setError] = useState<Error | null>(null);
  const [completion, setCompletion] = useState<string>('');

  const abortControllerRef = useRef<AbortController | null>(null);

  const complete = useCallback(
    async (options?: CompleteOptions) => {
      setStatus('loading');
      setError(null);
      setCompletion('');

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        await onStart?.(options);

        const url = endpoint.startsWith('http')
          ? endpoint
          : `${import.meta.env.VITE_API_URL}${endpoint}`;
        const response = await fetchWithAuthHandling(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          credentials: 'include',
          ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
          signal: controller.signal,
        });

        const stream = response.body;
        if (!stream) {
          throw new Error('No stream found');
        }

        setStatus('streaming');
        let result = '';
        await readDataStream<D>(stream, {
          onData: async (part) => {
            if (part.type === 'text') {
              result += part.content;
              setCompletion(result);
            }
            await onData?.(part, { content: result });
          },
        });

        await onFinish?.(result, { content: result });

        abortControllerRef.current = null;
        setStatus('success');
        setCompletion(result);

        return result;
      } catch (error) {
        // we can ignore abort errors
        // as they are expected when the user cancels the request
        if (error instanceof Error && error.name === 'AbortError') {
          return null;
        }

        setError(error as Error);
        onError?.(error as Error);
        setStatus('error');
        return null;
      }
    },
    [endpoint, onData, onFinish, onError, onStart]
  );

  const stop = useCallback(() => {
    if (!abortControllerRef.current) {
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  }, [abortControllerRef]);

  return { status, error, stop, complete, completion, setCompletion };
}
