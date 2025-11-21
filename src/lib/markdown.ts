import MarkdownIt from 'markdown-it-async';

const markdown = MarkdownIt();

export function markdownToHtml(string: string): string {
  return markdown.render(string);
}
