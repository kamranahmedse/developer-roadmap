import { nanoid } from 'nanoid';
import { markdownToHtmlWithHighlighting } from './markdown';
import { Fragment } from 'react';

type MessagePart = {
  id: string;
  type: 'text' | 'html';
  content: string | React.ReactNode;
};

type MessagePartRendererProps = {
  content: string;
  isLoading?: boolean;
};

export type MessagePartRenderer = (
  props: MessagePartRendererProps,
) => React.ReactNode | string;

export type MessagePartRendererOptions = {
  isLoading?: boolean;
};

export async function parseMessageParts(
  content: string,
  renderer: Record<string, MessagePartRenderer>,
  options: MessagePartRendererOptions = {
    isLoading: false,
  },
) {
  const parts: MessagePart[] = [];
  const regex = /<([a-zA-Z0-9\-]+)>(.*?)<\/\1>/gs;

  let lastIndex = 0;
  let match;

  // we will match all tags in the content
  // and then we will render each tag with the corresponding renderer
  // and then we will push the rendered content to the parts array
  while ((match = regex.exec(content)) !== null) {
    const [_, tag, innerContent] = match;

    // check if the tag has a renderer
    if (renderer[tag]) {
      // push the text before the tag
      // so that we can render it later
      if (match.index > lastIndex) {
        const rawBefore = content.slice(lastIndex, match.index);
        const html = await markdownToHtmlWithHighlighting(rawBefore);
        parts.push({
          id: nanoid(),
          type: 'html',
          content: html,
        });
      }

      const output = renderer[tag]({
        content: innerContent,
        isLoading: options.isLoading,
      });
      parts.push({
        id: nanoid(),
        type: 'html',
        content: output,
      });

      // update the last index
      // so that we can render the next tag
      lastIndex = regex.lastIndex;
    }
  }

  // if there was an opening tag that never closed, check manually
  // search for any known tag that starts but wasn't matched
  // we have to do this way otherwise we might process html tags
  // that are not in the renderer
  for (const tag of Object.keys(renderer)) {
    const openingTag = `<${tag}>`;
    const openingIndex = content.indexOf(openingTag, lastIndex);
    const closingTag = `</${tag}>`;
    const closingIndex = content.indexOf(closingTag, lastIndex);

    if (openingIndex !== -1 && closingIndex === -1) {
      if (openingIndex > lastIndex) {
        const rawBefore = content.slice(lastIndex, openingIndex);
        const html = await markdownToHtmlWithHighlighting(rawBefore);
        parts.push({
          id: nanoid(),
          type: 'html',
          content: html,
        });
      }

      const innerContent = content.slice(openingIndex + openingTag.length);
      const output = renderer[tag]({
        content: innerContent,
        isLoading: options.isLoading,
      });
      parts.push({
        id: nanoid(),
        type: 'html',
        content: output,
      });

      return parts;
    }
  }
  // add the remaining content
  if (lastIndex < content.length) {
    const rawRemaining = content.slice(lastIndex);
    const html = await markdownToHtmlWithHighlighting(rawRemaining);

    parts.push({
      id: nanoid(),
      type: 'html',
      content: html,
    });
  }

  return parts;
}

export async function renderMessage(
  content: string,
  renderer: Record<string, MessagePartRenderer>,
  options: MessagePartRendererOptions = {
    isLoading: false,
  },
) {
  const parts = await parseMessageParts(content, renderer, options);

  return (
    <div className="max-w-[calc(100%-38px)]">
      {parts.map((item) => {
        if (
          (item.type === 'html' || item.type === 'text') &&
          typeof item.content === 'string'
        ) {
          const trimmedContent = item.content.trim();
          if (!trimmedContent) {
            return null;
          }

          return (
            <div
              className="course-content course-ai-content prose prose-sm mt-0.5 max-w-full overflow-hidden text-sm"
              key={item.id}
              dangerouslySetInnerHTML={{
                __html: trimmedContent,
              }}
            />
          );
        }

        if (item.type === 'html' && typeof item.content === 'object') {
          return <Fragment key={item.id}>{item.content}</Fragment>;
        }

        return null;
      })}
    </div>
  );
}
