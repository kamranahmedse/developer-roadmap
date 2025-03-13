const NEW_LINE = '\n'.charCodeAt(0);

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
