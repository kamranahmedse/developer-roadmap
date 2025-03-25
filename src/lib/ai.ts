import { nanoid } from 'nanoid';

export const IS_KEY_ONLY_ROADMAP_GENERATION = false;

type Lesson = string;

type Module = {
  title: string;
  lessons: Lesson[];
};

export type AiCourse = {
  title: string;
  modules: Module[];
  difficulty: string;
  done: string[];
};

export function generateAiCourseStructure(
  data: string,
): Omit<AiCourse, 'difficulty'> {
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
    onStream?: (course: string) => void;
    onStreamEnd?: (course: string) => void;
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
          onStream?.(result);
          start = i + 1;
        }
      }
      if (start < value.length) {
        result += decoder.decode(value.slice(start));
      }
    }
  }

  onStream?.(result);
  onStreamEnd?.(result);
  reader.releaseLock();
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
