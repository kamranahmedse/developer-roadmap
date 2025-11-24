import 'katex/dist/katex.min.css';

import { memo } from 'react';
import ReactMarkdown, { type Options } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { cn } from '../../lib/classname';
import {
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockItem,
  type BundledLanguage,
} from './CodeBlock';

function getLanguage(children: React.ReactNode) {
  if (
    typeof children === 'object' &&
    children !== null &&
    'type' in children &&
    children.type === 'code' &&
    'props' in children &&
    typeof children.props === 'object' &&
    children.props !== null &&
    'className' in children.props &&
    typeof children.props.className === 'string'
  ) {
    return children.props.className.replace('language-', '').trim();
  }

  return 'javascript';
}

const components: Options['components'] = {
  pre: (props) => {
    const { children } = props;

    const language = getLanguage(children);
    const childrenIsCode =
      typeof children === 'object' &&
      children !== null &&
      'type' in children &&
      children.type === 'code';
    if (!childrenIsCode) {
      return <pre>{children}</pre>;
    }

    // it's fine to do it, because we only have one code block in the markdown
    // so no worries, it will be fine
    // we need to remove the last line because it always add a empty line at the end
    // @see https://github.com/shikijs/shiki/pull/585
    const code = (children.props as { children: string })?.children?.slice(
      0,
      -1
    );

    return (
      <div className="not-prose my-6 max-w-full overflow-hidden rounded-lg border border-gray-200">
        <CodeBlockHeader language={language} code={code} />

        <CodeBlockItem key={language} value={language} lineNumbers={false}>
          <CodeBlockContent language={language as BundledLanguage}>
            {code}
          </CodeBlockContent>
        </CodeBlockItem>
      </div>
    );
  },
};

type MarkdownProps = {
  children: string;
  className?: string;
};

function _Markdown(props: MarkdownProps) {
  const { children, className } = props;

  return (
    <div
      className={cn(
        'overflow-hidden [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        className
      )}
    >
      <ReactMarkdown
        components={components}
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export const Markdown = memo(_Markdown, (prevProps, nextProps) => {
  return prevProps.children === nextProps.children;
});
