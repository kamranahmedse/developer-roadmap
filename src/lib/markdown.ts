// @ts-ignore
import MarkdownIt from 'markdown-it';

export function markdownToHtml(markdown: string, isInline = true): string {
  try {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
    });

    if (isInline) {
      return md.renderInline(markdown);
    } else {
      return md.render(markdown);
    }
  } catch (e) {
    return markdown;
  }
}

// This is a workaround for the issue with tiptap-markdown extension
// It doesn't support links with escaped brackets like this:
// \\[link\\](https://example.com) -> [link](https://example.com)
export function sanitizeMarkdown(markdown: string) {
  return markdown.replace(/\\\[([^\\]+)\\\]\(([^\\]+)\)/g, '[$1]($2)');
}
