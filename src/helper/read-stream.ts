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

export async function readAICourseStream(
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

export async function readAICourseLessonStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  {
    onStream,
    onStreamEnd,
  }: {
    onStream?: (lesson: string) => void;
    onStreamEnd?: (lesson: string) => void;
  },
) {
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    result += decoder.decode(value);
    onStream?.(result);
  }

  onStream?.(result);
  onStreamEnd?.(result);
  reader.releaseLock();
}
