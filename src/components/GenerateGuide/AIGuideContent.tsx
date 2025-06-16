import { Loader2Icon } from 'lucide-react';
import './AIGuideContent.css';
import { AIGuideRegenerate } from './AIGuideRegenerate';
import { cn } from '../../lib/classname';

type AIGuideContentProps = {
  html: string;
  onRegenerate?: (prompt?: string) => void;
  isRegenerating?: boolean;
};

export function AIGuideContent(props: AIGuideContentProps) {
  const { html, onRegenerate, isRegenerating } = props;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-4xl',
        isRegenerating && 'min-h-full',
      )}
    >
      <div
        className="course-content prose prose-lg prose-headings:mb-3 prose-headings:mt-8 prose-blockquote:font-normal prose-pre:rounded-2xl prose-pre:text-lg prose-li:my-1 prose-thead:border-zinc-800 prose-tr:border-zinc-800 max-lg:prose-h2:mt-3 max-lg:prose-h2:text-lg max-lg:prose-h3:text-base max-lg:prose-pre:px-3 max-lg:prose-pre:text-sm mt-8 max-w-full text-black max-lg:mt-4 max-lg:text-base [&>h1]:text-balance"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {isRegenerating && !html && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-lg border bg-white p-2">
            <Loader2Icon className="size-4 animate-spin" />
            <span>Regenerating...</span>
          </div>
        </div>
      )}

      {onRegenerate && !isRegenerating && (
        <div className="absolute top-4 right-4">
          <AIGuideRegenerate onRegenerate={onRegenerate} />
        </div>
      )}
    </div>
  );
}
