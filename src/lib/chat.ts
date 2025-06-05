export const CHAT_RESPONSE_PREFIX = {
  message: '0:',
  details: 'd:',
} as const;

export async function readChatStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  {
    onMessage,
    onMessageEnd,
    onDetails,
  }: {
    onMessage?: (message: string) => Promise<void>;
    onMessageEnd?: (message: string) => Promise<void>;
    onDetails?: (details: string) => Promise<void> | void;
  },
) {
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    const text = decoder.decode(value);

    if (text.startsWith(CHAT_RESPONSE_PREFIX.message)) {
      const textWithoutPrefix = text.replace(CHAT_RESPONSE_PREFIX.message, '');

      // basically we need to split the text by new line
      // and send it to the onMessage callback
      // so that we don't have broken tags for our rendering
      let start = 0;
      for (let i = 0; i < textWithoutPrefix.length; i++) {
        if (textWithoutPrefix[i] === '\n') {
          result += textWithoutPrefix.slice(start, i + 1);
          await onMessage?.(result);
          start = i + 1;
        }
      }

      if (start < textWithoutPrefix.length) {
        result += textWithoutPrefix.slice(start);
      }
    } else if (text.startsWith(CHAT_RESPONSE_PREFIX.details)) {
      const textWithoutPrefix = text.replace(CHAT_RESPONSE_PREFIX.details, '');
      await onDetails?.(textWithoutPrefix);
    }
  }

  await onMessageEnd?.(result);
  reader.releaseLock();
}
