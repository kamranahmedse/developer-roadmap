// @ts-ignore
import MarkdownIt from 'markdown-it';
import MarkdownItAsync from 'markdown-it-async';
import { codeToHtml } from 'shiki';

// ---------------------------
// Replace variables in markdown
// ---------------------------
export function replaceVariables(
  markdown: string,
  variables: Record<string, string> = {},
): string {
  const allVariables: Record<string, string> = {
    ...variables,
    currentYear: new Date().getFullYear().toString(),
  };

  // Case-insensitive replacement
  return markdown?.replace(/@([^@]+)@/gi, (match, p1) => {
    return allVariables[p1] ?? match;
  });
}

// ---------------------------
// Standard Markdown rendering
// ---------------------------
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

export function markdownToHtml(markdown: string, isInline = true): string {
  try {
    if (isInline) return md.renderInline(markdown);
    return md.render(markdown);
  } catch (e) {
    console.error('Markdown rendering failed:', e);
    return markdown;
  }
}

// ---------------------------
// Sanitize Markdown escapes
// ---------------------------
export function sanitizeMarkdown(markdown: string): string {
  // Remove backslashes from escaped Markdown characters
  return markdown.replace(/\\([\\`*{}\[\]()#+\-.!_>~])/g, '$1');
}

// ---------------------------
// Async Markdown rendering with syntax highlighting
// ---------------------------
const markdownItAsync = MarkdownItAsync({
  html: true,
  linkify: true,

  async highlight(code: string, lang?: string): Promise<string> {
    try {
      return await codeToHtml(code, {
        lang: lang?.toLowerCase(),
        theme: 'dracula',
      });
    } catch (e) {
      console.warn('Highlighting failed:', e);
      return `<pre><code>${code}</code></pre>`;
    }
  },
});

export async function markdownToHtmlWithHighlighting(markdown: string): Promise<string> {
  try {
    // Open links in new tab with security attributes
    const defaultRender =
      markdownItAsync.renderer.rules.link_open ||
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    markdownItAsync.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      tokens[idx].attrSet('target', '_blank');
      tokens[idx].attrSet('rel', 'noopener noreferrer');
      return defaultRender(tokens, idx, options, env, self);
    };

    return markdownItAsync.renderAsync(markdown);
  } catch (e) {
    console.error('Async markdown rendering failed:', e);
    return markdown;
  }
}
