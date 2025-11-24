export const CHAT_RESPONSE_PREFIX = {
  message: '0',
  details: 'd',
} as const;

const NEWLINE = '\n'.charCodeAt(0);

function concatChunks(chunks: Uint8Array[], totalLength: number) {
  const concatenatedChunks = new Uint8Array(totalLength);

  let offset = 0;
  for (const chunk of chunks) {
    concatenatedChunks.set(chunk, offset);
    offset += chunk.length;
  }
  chunks.length = 0;

  return concatenatedChunks;
}

type CompletionTextPart = {
  type: 'text';
  content: string;
};

type CompletionDetailsPart<D extends Record<string, unknown>> = {
  type: 'details';
  data: D;
};

export type CompletionPart<
  D extends Record<string, unknown> = Record<string, unknown>,
> = CompletionTextPart | CompletionDetailsPart<D>;

export async function readDataStream<D extends Record<string, unknown>>(
  stream: ReadableStream<Uint8Array>,
  {
    onData,
    onFinish,
  }: {
    onData?: (part: CompletionPart<D>) => Promise<void> | void;
    onFinish?: () => Promise<void> | void;
  },
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  const chunks: Uint8Array[] = [];

  let totalLength = 0;

  while (true) {
    const { value } = await reader.read();
    if (value) {
      chunks.push(value);
      totalLength += value.length;
      if (value[value.length - 1] !== NEWLINE) {
        // if the last character is not a new line, we need to wait for the next chunk
        continue;
      }
    }

    if (chunks.length === 0) {
      // end of stream
      break;
    }

    const concatenatedChunks = concatChunks(chunks, totalLength);
    totalLength = 0;

    const streamParts: CompletionPart<D>[] = decoder
      .decode(concatenatedChunks, { stream: true })
      .split('\n')
      .filter((line) => line !== '')
      .map((line) => {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex === -1) {
          throw new Error('Invalid line: ' + line + '. No separator found.');
        }

        const prefix = line.slice(0, separatorIndex);
        const content = line.slice(separatorIndex + 1);

        switch (prefix) {
          case CHAT_RESPONSE_PREFIX.message:
            return { type: 'text', content: JSON.parse(content) };
          case CHAT_RESPONSE_PREFIX.details:
            return { type: 'details', data: JSON.parse(content) };
          default:
            throw new Error('Invalid prefix: ' + prefix);
        }
      });

    for (const part of streamParts) {
      await onData?.(part);
    }
  }

  await onFinish?.();
  reader.releaseLock();
}
