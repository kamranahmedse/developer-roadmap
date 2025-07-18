import { nanoid } from 'nanoid';
import type { QuestionAnswerChatMessage } from '../components/ContentGenerator/QuestionAnswerChat';
import { readChatStream } from '../lib/chat';
import { queryClient } from '../stores/query-client';
import { aiLimitOptions } from './ai-course';
import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

type QuizDetails = {
  quizId: string;
  quizSlug: string;
  userId: string;
  title: string;
};

type GenerateAIQuizOptions = {
  term: string;
  format: string;
  isForce?: boolean;
  prompt?: string;
  questionAndAnswers?: QuestionAnswerChatMessage[];

  quizSlug?: string;

  onQuestionsChange?: (questions: QuizQuestion[]) => void;
  onDetailsChange?: (details: QuizDetails) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onStreamingChange?: (isStreaming: boolean) => void;
  onError?: (error: string) => void;
  onFinish?: () => void;
};

export async function generateAIQuiz(options: GenerateAIQuizOptions) {
  const {
    term,
    format,
    quizSlug,
    onLoadingChange,
    onError,
    isForce = false,
    prompt,
    onDetailsChange,
    onFinish,
    questionAndAnswers,
    onStreamingChange,
    onQuestionsChange,
  } = options;

  onLoadingChange?.(true);
  onStreamingChange?.(false);
  try {
    let response = null;

    if (quizSlug && isForce) {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-regenerate-ai-quiz/${quizSlug}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            prompt,
          }),
        },
      );
    } else {
      response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/v1-generate-ai-quiz`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: term,
            format,
            isForce,
            customPrompt: prompt,
            questionAndAnswers,
          }),
          credentials: 'include',
        },
      );
    }

    if (!response.ok) {
      const data = await response.json();
      console.error(
        'Error generating quiz:',
        data?.message || 'Something went wrong',
      );
      onLoadingChange?.(false);
      onError?.(data?.message || 'Something went wrong');
      return;
    }

    const stream = response.body;
    if (!stream) {
      console.error('Failed to get stream from response');
      onError?.('Something went wrong');
      onLoadingChange?.(false);
      return;
    }

    onLoadingChange?.(false);
    onStreamingChange?.(true);
    await readChatStream(stream, {
      onMessage: async (message) => {
        const questions = generateAiQuizQuestions(message);
        onQuestionsChange?.(questions);
      },
      onMessageEnd: async (result) => {
        queryClient.invalidateQueries(aiLimitOptions());
        onStreamingChange?.(false);
      },
      onDetails: async (details) => {
        if (!details?.quizId || !details?.quizSlug) {
          throw new Error('Invalid details');
        }

        onDetailsChange?.(details);
      },
    });
    onFinish?.();
  } catch (error: any) {
    onError?.(error?.message || 'Something went wrong');
    console.error('Error in quiz generation:', error);
    onLoadingChange?.(false);
    onStreamingChange?.(false);
  }
}

export type QuizQuestion = {
  id: string;
  title: string;
  type: 'mcq' | 'open-ended';
  options: {
    id: string;
    title: string;
    isCorrect: boolean;
  }[];
  answerExplanation?: string;
};

export function generateAiQuizQuestions(questionData: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const lines = questionData.split('\n');

  let currentQuestion: QuizQuestion | null = null;
  let context: 'question' | 'explanation' | 'option' | null = null;

  const addCurrentQuestion = () => {
    if (!currentQuestion) {
      return;
    }

    if (currentQuestion.type === 'mcq') {
      currentQuestion.options = currentQuestion.options.sort(
        () => Math.random() - 0.5,
      );
    }

    questions.push(currentQuestion);
    currentQuestion = null;
  };

  for (const line of lines) {
    if (!line) {
      continue;
    }

    if (line.startsWith('###')) {
      addCurrentQuestion();

      currentQuestion = {
        id: nanoid(),
        title: line.slice(3).trim(),
        type: 'open-ended',
        options: [],
      };
      context = 'question';
    } else if (line.startsWith('##')) {
      if (!currentQuestion) {
        continue;
      }

      currentQuestion.answerExplanation = line.slice(2).trim();
      context = 'explanation';
    } else if (line.startsWith('#')) {
      addCurrentQuestion();

      const title = line.slice(1).trim();
      currentQuestion = {
        id: nanoid(),
        title,
        type: 'mcq',
        options: [],
      };
      context = 'question';
    } else if (line.startsWith('-')) {
      if (!currentQuestion) {
        continue;
      }

      const rawOption = line.slice(1).trim();
      const isCorrect = rawOption.startsWith('*');
      const title = rawOption.slice(isCorrect ? 1 : 0).trim();
      currentQuestion.options.push({
        id: nanoid(),
        title,
        isCorrect,
      });
      context = 'option';
    } else {
      if (!currentQuestion) {
        continue;
      }

      if (context === 'question') {
        currentQuestion.title += `\n${line}`;
      } else if (context === 'explanation') {
        currentQuestion.answerExplanation =
          (currentQuestion?.answerExplanation || '') + `\n${line}`;
      } else if (context === 'option') {
        const lastOption = currentQuestion.options.at(-1);
        if (lastOption) {
          lastOption.title += `\n${line}`;
        }
      }
    }
  }

  addCurrentQuestion();
  return questions;
}

export interface AIQuizDocument {
  _id: string;
  userId: string;
  title: string;
  slug: string;
  keyword: string;
  format: string;
  content: string;

  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };

  questionAndAnswers: QuestionAnswerChatMessage[];

  viewCount: number;
  lastVisitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

type GetAIQuizResponse = AIQuizDocument & {
  questions: QuizQuestion[];
};

export function aiQuizOptions(quizSlug?: string) {
  return queryOptions({
    queryKey: ['ai-quiz', quizSlug],
    queryFn: async () => {
      const res = await httpGet<GetAIQuizResponse>(
        `/v1-get-ai-quiz/${quizSlug}`,
      );

      return {
        ...res,
        questions: generateAiQuizQuestions(res.content),
      };
    },
    enabled: !!quizSlug,
  });
}

export type ListUserAiQuizzesQuery = {
  perPage?: string;
  currPage?: string;
  query?: string;
};

export type ListUserAiQuizzesResponse = {
  data: Omit<AIQuizDocument, 'content' | 'questionAndAnswers'>[];
  totalCount: number;
  totalPages: number;
  currPage: number;
  perPage: number;
};

export function listUserAiQuizzesOptions(
  params: ListUserAiQuizzesQuery = {
    perPage: '21',
    currPage: '1',
    query: '',
  },
) {
  return queryOptions({
    queryKey: ['user-ai-quizzes', params],
    queryFn: () => {
      return httpGet<ListUserAiQuizzesResponse>(
        `/v1-list-user-ai-quizzes`,
        params,
      );
    },
    enabled: !!isLoggedIn(),
  });
}
