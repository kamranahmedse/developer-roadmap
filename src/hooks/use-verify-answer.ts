import { useCallback, useRef, useState } from 'react';
import { removeAuthToken } from '../lib/jwt';
import { readChatStream } from '../lib/chat';
import { flushSync } from 'react-dom';
import type { VerifyQuizAnswerResponse } from '../components/AIQuiz/AIOpenEndedQuestion';

type VerifyAnswerResponse = {
  status?: VerifyQuizAnswerResponse['status'];
  feedback?: string;
};

type UseVerifyAnswerOptions = {
  quizSlug: string;
  question: string;
  userAnswer: string;

  onError?: (error: Error) => void;
  onFinish?: (data: VerifyAnswerResponse) => void;
};

export function useVerifyAnswer(options: UseVerifyAnswerOptions) {
  const { quizSlug, question, userAnswer, onError, onFinish } = options;

  const abortControllerRef = useRef<AbortController | null>(null);

  const contentRef = useRef<VerifyAnswerResponse | null>(null);
  const [data, setData] = useState<VerifyAnswerResponse | null>(null);

  const [status, setStatus] = useState<
    'idle' | 'streaming' | 'loading' | 'ready' | 'error'
  >('idle');

  const verifyAnswer = useCallback(async () => {
    try {
      setStatus('loading');
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-verify-quiz-answer/${quizSlug}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question, userAnswer }),
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
            contentRef.current = parseVerifyAIQuizAnswerResponse(content);
            setData(contentRef.current);
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
  }, [quizSlug, question, userAnswer, onError]);

  const stop = useCallback(() => {
    if (!abortControllerRef.current) {
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  }, []);

  return {
    data,
    status,
    stop,
    verifyAnswer,
  };
}

export function parseVerifyAIQuizAnswerResponse(
  response: string,
): VerifyQuizAnswerResponse {
  const statusRegex = /<status>(.*?)<\/status>/;
  const status = response.match(statusRegex)?.[1]?.trim();
  const responseWithoutStatus = response.replace(statusRegex, '').trim();

  return {
    status: status as VerifyQuizAnswerResponse['status'],
    feedback: responseWithoutStatus,
  };
}
