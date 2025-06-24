import { cn } from '../../lib/classname';
import { LoadingChip } from '../LoadingChip';

type AIRoadmapContentProps = {
  isLoading?: boolean;
  svgHtml: string;
};

export function AIRoadmapContent(props: AIRoadmapContentProps) {
  const { isLoading, svgHtml } = props;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-4xl',
        isLoading && 'min-h-full',
      )}
    >
      <div
        id="roadmap-container"
        className="relative min-h-[400px] [&>svg]:mx-auto"
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingChip message="Please wait..." />
        </div>
      )}
    </div>
  );
}
