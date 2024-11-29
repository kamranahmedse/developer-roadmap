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

export function markdownToHtml(markdown: string, isInline = true): string {
  try {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
    });

    // Solution to open links in new tab in markdown
    // otherwise default behaviour is to open in same tab
    //
    // SOURCE: https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
    //
    const defaultRender =
      md.renderer.rules.link_open ||
      // @ts-ignore
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    // @ts-ignore
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      // Add a new `target` attribute, or replace the value of the existing one.
      tokens[idx].attrSet('target', '_blank');

      // Pass the token to the default renderer.
      return defaultRender(tokens, idx, options, env, self);
    };

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
