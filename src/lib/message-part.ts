import { nanoid } from 'nanoid';

type MessagePart = {
  id: string;
  type: string;
  text?: string;
  data?: any;
};

type MessagePartRendererProps = {
  content: string;
};

export type MessagePartRenderer = (props: MessagePartRendererProps) => any;

export function parseMessageParts(
  content: string,
  renderer: Record<string, MessagePartRenderer>,
) {
  const parts: MessagePart[] = [];
  const tagNames = Object.keys(renderer);

  // Remove codeblocks around custom tags
  if (tagNames.length > 0) {
    const tagPattern = tagNames.join('|');

    // Remove opening codeblock before tags: ```lang\n<tag> -> <tag>
    // It sometimes puts codeblocks around our tags (despite us asking it not to)
    // so we manually remove them here
    content = content.replace(
      new RegExp(`\`\`\`\\w*?\\n+?<(${tagPattern})>`, 'g'),
      '<$1>',
    );

    // Remove closing codeblock after tags: </tag>\n```  -> </tag>
    content = content.replace(
      new RegExp(`<\\/(${tagPattern})>\\n+?\`\`\``, 'g'),
      '</$1>',
    );
  }

  // If no renderers, just return the content as markdown
  if (tagNames.length === 0) {
    parts.push({
      id: nanoid(),
      type: 'text',
      text: content,
    });
    return parts;
  }

  const tagPattern = tagNames.join('|');
  const regex = new RegExp(`<(${tagPattern})>(.*?)<\/\\1>`, 'gs');

  let lastIndex = 0;
  let match;

  // we will match only tags that have renderers
  // and then we will render each tag with the corresponding renderer
  // and then we will push the rendered content to the parts array
  while ((match = regex.exec(content)) !== null) {
    const [_, tag, innerContent] = match;

    // push the text before the tag
    // so that we can render it later
    if (match.index > lastIndex) {
      const rawBefore = content.slice(lastIndex, match.index);
      parts.push({
        id: nanoid(),
        type: 'text',
        text: rawBefore,
      });
    }

    const data = renderer[tag]({
      content: innerContent,
    });
    parts.push({
      id: nanoid(),
      type: tag,
      data,
    });

    // update the last index
    // so that we can render the next tag
    lastIndex = regex.lastIndex;
  }

  // if there was an opening tag that never closed, check manually
  // search for any known tag that starts but wasn't matched
  for (const tag of tagNames) {
    const openingTag = `<${tag}>`;
    const openingIndex = content.indexOf(openingTag, lastIndex);
    const closingTag = `</${tag}>`;
    const closingIndex = content.indexOf(closingTag, lastIndex);

    if (openingIndex !== -1 && closingIndex === -1) {
      if (openingIndex > lastIndex) {
        const rawBefore = content.slice(lastIndex, openingIndex);
        parts.push({
          id: nanoid(),
          type: 'text',
          text: rawBefore,
        });
      }

      const innerContent = content.slice(openingIndex + openingTag.length);
      const data = renderer[tag]({
        content: innerContent,
      });
      parts.push({
        id: nanoid(),
        type: tag,
        data,
      });

      return parts;
    }
  }

  // add the remaining content
  if (lastIndex < content.length) {
    const rawRemaining = content.slice(lastIndex);

    parts.push({
      id: nanoid(),
      type: 'text',
      text: rawRemaining,
    });
  }

  return parts;
}
