import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';
import { TOKEN_COOKIE_NAME } from './jwt';
import { FetchError } from './query-http';
import { DefaultChatTransport, type UIMessage } from 'ai';

export const IS_KEY_ONLY_ROADMAP_GENERATION = false;

type Lesson = string;

type Module = {
  title: string;
  lessons: Lesson[];
};

export type AiCourse = {
  title: string;
  modules: Module[];
  done: string[];
};

export function generateAiCourseStructure(data: string): AiCourse {
  const lines = data.split('\n');
  let title = '';
  const modules: Module[] = [];
  let currentModule: Module | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (i === 0 && line.startsWith('#')) {
      // First line is the title
      title = line.replace('#', '').trim();
    } else if (line.startsWith('## ')) {
      // New module
      if (currentModule) {
        modules.push(currentModule);
      }
      currentModule = {
        title: line.replace('## ', ''),
        lessons: [],
      };
      // Removed auto-expand code to keep modules collapsed by default
    } else if (line.startsWith('- ') && currentModule) {
      // Lesson within current module
      currentModule.lessons.push(line.replace('- ', ''));
    }
  }

  // Add the last module if it exists
  if (currentModule) {
    modules.push(currentModule);
  }

  return {
    title,
    modules,
    done: [],
  };
}

type CourseFineTuneData = {
  about: string;
  goal: string;
  customInstructions: string;
};

export function storeFineTuneData(meta: CourseFineTuneData) {
  const sessionId = Date.now().toString();

  localStorage.setItem(sessionId, JSON.stringify(meta));
  localStorage.setItem('lastSessionId', sessionId);

  return sessionId;
}

export function getCourseFineTuneData(
  sessionId: string,
): CourseFineTuneData | null {
  const meta = localStorage.getItem(sessionId);
  if (!meta) {
    return null;
  }

  return JSON.parse(meta);
}

export function getLastSessionId(): string | null {
  return localStorage.getItem('lastSessionId');
}

export function clearFineTuneData() {
  const sessionId = getLastSessionId();
  if (sessionId) {
    localStorage.removeItem(sessionId);
  }

  localStorage.removeItem('lastSessionId');
}

const NEW_LINE = '\n'.charCodeAt(0);

export async function readAIRoadmapStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  {
    onStream,
    onStreamEnd,
  }: {
    onStream?: (roadmap: string) => void;
    onStreamEnd?: (roadmap: string) => void;
  },
) {
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    // We will call the renderRoadmap callback whenever we encounter
    // a new line with the result until the new line
    // otherwise, we will keep appending the result to the previous result
    if (value) {
      let start = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === NEW_LINE) {
          result += decoder.decode(value.slice(start, i + 1));
          await onStream?.(result);
          start = i + 1;
        }
      }
      if (start < value.length) {
        result += decoder.decode(value.slice(start));
      }
    }
  }

  await onStream?.(result);
  await onStreamEnd?.(result);
  reader.releaseLock();
}

export async function readAIRoadmapContentStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  {
    onStream,
    onStreamEnd,
  }: {
    onStream?: (roadmap: string) => void;
    onStreamEnd?: (roadmap: string) => void;
  },
) {
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    if (value) {
      result += decoder.decode(value);
      onStream?.(result);
    }
  }

  onStream?.(result);
  onStreamEnd?.(result);
  reader.releaseLock();
}

export async function readStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  {
    onStream,
    onStreamEnd,
  }: {
    onStream?: (course: string) => Promise<void>;
    onStreamEnd?: (course: string) => Promise<void>;
  },
) {
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    // Process the stream data as it comes in
    if (value) {
      let start = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === NEW_LINE) {
          result += decoder.decode(value.slice(start, i + 1));
          await onStream?.(result);
          start = i + 1;
        }
      }
      if (start < value.length) {
        result += decoder.decode(value.slice(start));
      }
    }
  }

  await onStream?.(result);
  await onStreamEnd?.(result);
  reader.releaseLock();
}

export type Question = {
  id: string;
  title: string;
  options: {
    id: string;
    title: string;
    isCorrect: boolean;
  }[];
};

export function generateAiCourseLessonQuestions(
  questionData: string,
): Question[] {
  const questions: Question[] = [];

  const lines = questionData.split('\n');
  let currentQuestion: Question | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#')) {
      if (currentQuestion) {
        questions.push(currentQuestion);
        currentQuestion = null;
      }

      const title = line.replace('#', '').trim();
      currentQuestion = {
        id: nanoid(),
        title,
        options: [],
      };
    } else if (line.startsWith('-')) {
      if (!currentQuestion) {
        continue;
      }

      let title = line.replace('-', '').trim();
      const isCorrect = title.startsWith('*');
      title = title.replace('*', '').trim();

      currentQuestion.options.push({
        id: nanoid(),
        title,
        isCorrect,
      });
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
}

export type SubTopic = {
  id: string;
  type: 'subtopic';
  label: string;
};

export type Topic = {
  id: string;
  type: 'topic';
  label: string;
  children?: SubTopic[];
};

export type Label = {
  id: string;
  type: 'label';
  label: string;
};

export type Title = {
  id: string;
  type: 'title';
  label: string;
};

export type ResultItem = Title | Topic | Label;

export function generateAICourseRoadmapStructure(
  data: string,
  isCourseRoadmap: boolean = false,
): ResultItem[] {
  const lines = data.split('\n');

  const result: ResultItem[] = [];
  let currentTopic: Topic | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('###')) {
      if (currentTopic) {
        result.push(currentTopic);
      }

      const label = line.replace('###', '').trim();
      currentTopic = {
        id: nanoid(),
        type: 'topic',
        label,
        children: [],
      };
    } else if (line.startsWith('##')) {
      result.push({
        id: nanoid(),
        type: 'label',
        label: line.replace('##', '').trim(),
      });
    } else if (i === 0 && line.startsWith('#')) {
      const title = line.replace('#', '').trim();
      result.push({
        id: nanoid(),
        type: 'title',
        label: title,
      });
    } else if (line.startsWith('-')) {
      if (currentTopic) {
        const label = line.replace('-', '').trim();

        let id = nanoid();
        if (isCourseRoadmap) {
          const currentTopicIndex = result.length - 1;
          const subTopicIndex = currentTopic.children?.length || 0;
          id = `${currentTopicIndex}-${subTopicIndex}`;
        }

        currentTopic.children?.push({
          id,
          type: 'subtopic',
          label,
        });
      }
    }
  }

  if (currentTopic) {
    result.push(currentTopic);
  }

  return result;
}

export type ChatUIMessage = UIMessage<
  never,
  {
    redirect: {
      title: string;
      chatId: string;
    };
  }
>;

export const chatRoadmapTransport = new DefaultChatTransport({
  api: import.meta.env.PUBLIC_API_URL + '/v1-chat-roadmap',
  credentials: 'include',
  fetch: fetchWithAuthHandling,
});

export const topicDetailAiChatTransport = new DefaultChatTransport({
  api: import.meta.env.PUBLIC_API_URL + '/v1-topic-detail-chat',
  credentials: 'include',
  fetch: fetchWithAuthHandling,
});

export async function fetchWithAuthHandling(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, init);
    if (response.status === 401) {
      Cookies.remove(TOKEN_COOKIE_NAME);
      window?.location?.reload();
      return null as unknown as Response;
    }

    if (!response.ok) {
      const data = await response.json();
      if (data?.errors) {
        if (data?.type && data?.type === 'ai_tutor_limit_exceeded') {
          window?.fireEvent?.({
            action: 'tutor_credit_limit',
            category: 'ai_tutor',
            label: 'Tutor Credit Limit Exceeded',
          });
        }

        throw new FetchError(response.status, data.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }

    return response;
  } catch (error: unknown) {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      throw new FetchError(503, 'Service Unavailable');
    }

    throw error;
  }
}
