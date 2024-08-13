import TurndownService from "turndown";
const turndown = new TurndownService();

export function htmlToMarkdown(html: string) {
  return turndown.turndown(html);
}
