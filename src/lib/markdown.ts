// @ts-ignore
import MarkdownIt from 'markdown-it';

export function markdownToHtml(markdown: string): string {
  const md = new MarkdownIt();

  return md.renderInline(markdown);
}
