// @ts-ignore
import MarkdownIt from 'markdown-it';

export function markdownToHtml(markdown: string, isInline = true): string {
  const md = new MarkdownIt();

  if (isInline) {
    return md.renderInline(markdown);
  } else {
    return md.render(markdown);
  }
}
