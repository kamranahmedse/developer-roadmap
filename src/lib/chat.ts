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
      result += textWithoutPrefix;
      await onMessage?.(result);
    } else if (text.startsWith(CHAT_RESPONSE_PREFIX.details)) {
      const textWithoutPrefix = text.replace(CHAT_RESPONSE_PREFIX.details, '');
      await onDetails?.(textWithoutPrefix);
    }
  }

  await onMessageEnd?.(result);
  reader.releaseLock();
}
