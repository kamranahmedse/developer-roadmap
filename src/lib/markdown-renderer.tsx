import type { JSONContent } from '@tiptap/core';

export type MarkdownRendererOptions = {
  join?: string;
};

export class MarkdownRenderer {
  private marksOrder = ['underline', 'bold', 'italic', 'textStyle', 'link'];

  render(content: JSONContent, options: MarkdownRendererOptions = {}): string {
    const nodes = content.content || [];
    return nodes
      .map((node) => this.renderNode(node))
      .join(options?.join || '\n\n');
  }

  private renderNode(node: JSONContent): string {
    const type = node.type || '';

    if (type in this) {
      // @ts-expect-error dynamic lookup
      return this[type]?.(node);
    }

    console.warn(`Node type "${type}" is not supported.`);
    return '';
  }

  private getText(node: JSONContent): string {
    if (node.type === 'text') return node.text || '';
    if (node.content)
      return node.content.map((child) => this.getText(child)).join('');
    return '';
  }

  private content(node: JSONContent): string {
    return (node.content || []).map((child) => this.renderNode(child)).join('');
  }

  private renderMark(node: JSONContent): string {
    let text = node.text || '';
    let marks = node.marks || [];
    marks.sort(
      (a, b) =>
        this.marksOrder.indexOf(a.type) - this.marksOrder.indexOf(b.type),
    );

    return marks.reduce((acc, mark) => {
      if (mark.type === 'bold') return `**${acc}**`;
      if (mark.type === 'italic') return `*${acc}*`;
      if (mark.type === 'underline') return `_${acc}_`; // fallback since markdown has no underline
      if (mark.type === 'code') return `\`${acc}\``;
      if (mark.type === 'link') return `[${acc}](${mark.attrs?.href})`;
      return acc;
    }, text);
  }

  // ---- Nodes ----
  private paragraph(node: JSONContent): string {
    return this.content(node);
  }

  private text(node: JSONContent): string {
    return node.marks ? this.renderMark(node) : node.text || '';
  }

  private heading(node: JSONContent): string {
    const level = node.attrs?.level || 1;
    const prefix = '#'.repeat(level);
    return `${prefix} ${this.content(node)}`;
  }

  private bulletList(node: JSONContent): string {
    return (node.content || [])
      .map((child) => `- ${this.renderNode(child)}`)
      .join('\n');
  }

  private orderedList(node: JSONContent): string {
    return (node.content || [])
      .map((child, i) => `${i + 1}. ${this.renderNode(child)}`)
      .join('\n');
  }

  private listItem(node: JSONContent): string {
    return this.content(node);
  }

  private blockquote(node: JSONContent): string {
    return this.content(node)
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n');
  }

  private codeBlock(node: JSONContent): string {
    const code = this.getText(node);
    const language = node.attrs?.language || '';
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }

  private horizontalRule(): string {
    return `---`;
  }

  private image(node: JSONContent): string {
    const { src, alt } = node.attrs || {};
    return `![${alt || ''}](${src})`;
  }

  private table(node: JSONContent): string {
    const rows = (node.content || []).filter((n) => n.type === 'tableRow');
    return rows.map((row) => this.renderNode(row)).join('\n');
  }

  private tableRow(node: JSONContent): string {
    return `| ${this.content(node)} |`;
  }

  private tableHeader(node: JSONContent): string {
    return this.content(node);
  }

  private tableCell(node: JSONContent): string {
    return this.content(node);
  }
}

export function renderMarkdownFromJson(
  json: JSONContent,
  options: MarkdownRendererOptions = {},
) {
  return new MarkdownRenderer().render(json, options);
}
