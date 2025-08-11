import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { CheckIcon, CopyIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useLayoutEffect, useState } from 'react';
import { type BundledLanguage, codeToHtml } from 'shiki';
import { cn } from '../../lib/classname';
import { useCopyText } from '../../hooks/use-copy-text';
export type { BundledLanguage } from 'shiki';

const codeBlockClassName = cn(
  'mt-0 text-sm',
  '[&_pre]:py-0',
  '[&_pre]:grid',
  '[&_code]:py-4',
  '[&_code]:w-full',
  '[&_code]:grid',
  '[&_code]:overflow-x-auto',
  '[&_code]:no-scrollbar',
  '[&_code]:bg-transparent',
  '[&_.line]:px-3',
  '[&_.line]:w-full',
  '[&_.line]:relative',
  '[&_.line]:min-h-5',
);

function highlight(html: string, language?: BundledLanguage) {
  return codeToHtml(html, {
    lang: language ?? 'typescript',
    theme: 'github-light',
    transformers: [
      transformerNotationDiff({
        matchAlgorithm: 'v3',
      }),
      transformerNotationHighlight({
        matchAlgorithm: 'v3',
      }),
      transformerNotationWordHighlight({
        matchAlgorithm: 'v3',
      }),
      transformerNotationFocus({
        matchAlgorithm: 'v3',
      }),
      transformerNotationErrorLevel({
        matchAlgorithm: 'v3',
      }),
    ],
  });
}

type CodeBlockFallbackProps = HTMLAttributes<HTMLDivElement>;

const CodeBlockFallback = ({ children, ...props }: CodeBlockFallbackProps) => (
  <div {...props}>
    <pre className="w-full bg-white">
      <code>
        {children
          ?.toString()
          .split('\n')
          .map((line, i) => (
            <span className="line" key={i}>
              {line}
            </span>
          ))}
      </code>
    </pre>
  </div>
);

export type CodeBlockItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  lineNumbers?: boolean;
};

export const CodeBlockItem = ({
  children,
  lineNumbers = true,
  className,
  value,
  ...props
}: CodeBlockItemProps) => {
  return (
    <div className={cn(codeBlockClassName, className)} {...props}>
      {children}
    </div>
  );
};

export type CodeBlockContentProps = HTMLAttributes<HTMLDivElement> & {
  language?: BundledLanguage;
  syntaxHighlighting?: boolean;
  children: string;
};

export const CodeBlockContent = ({
  children,
  language,
  syntaxHighlighting = true,
  ...props
}: CodeBlockContentProps) => {
  const [html, setHtml] = useState<string | null>(null);
  useLayoutEffect(() => {
    if (!syntaxHighlighting) {
      return;
    }

    if (typeof children !== 'string') {
      return;
    }

    highlight(children, language).then(setHtml).catch(console.error);
  }, [children, syntaxHighlighting, language]);

  if (!(syntaxHighlighting && html)) {
    return <CodeBlockFallback>{children}</CodeBlockFallback>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
};

type CodeBlockHeaderProps = HTMLAttributes<HTMLDivElement> & {
  language: string;
  code: string;
};

export function CodeBlockHeader(props: CodeBlockHeaderProps) {
  const { language, code, className, ...rest } = props;

  const { copyText, isCopied } = useCopyText();

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2',
        className,
      )}
      {...rest}
    >
      <span className="text-sm text-gray-600">{language}</span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => copyText(code)}
          className="flex size-6 items-center justify-center gap-2 rounded-md text-gray-400 hover:bg-zinc-200 hover:text-black focus:outline-none"
        >
          {isCopied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
