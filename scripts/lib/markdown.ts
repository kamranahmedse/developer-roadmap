// @ts-ignore
import MarkdownIt from 'markdown-it';

// replaces @variableName@ with the value of the variable
export function replaceVariables(
  markdown: string,
  variables: Record<string, string> = {},
): string {
  const allVariables: Record<string, string> = {
    ...variables,
    currentYear: new Date().getFullYear().toString(),
  };

  return markdown?.replace(/@([^@]+)@/g, (match, p1) => {
    return allVariables[p1] || match;
  });
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
});

export function markdownToHtml(markdown: string, isInline = true): string {
  try {
    const replacedMarkdown = replaceVariables(markdown);
    if (isInline) {
      return md.renderInline(replacedMarkdown);
    } else {
      return md.render(replacedMarkdown);
    }
  } catch (e) {
    return markdown;
  }
}
