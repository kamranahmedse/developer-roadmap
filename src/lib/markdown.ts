// @ts-ignore
import MarkdownIt from 'markdown-it';

export function markdownToHtml(markdown: string, inline: boolean = true): string {
  const md = new MarkdownIt();
  if (!inline) {
    return md.render(markdown);
  }
  return md.renderInline(markdown);
}
