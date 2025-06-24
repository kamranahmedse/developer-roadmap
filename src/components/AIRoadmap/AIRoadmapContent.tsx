import { cn } from '../../lib/classname';
import { LoadingChip } from '../LoadingChip';
import { useEffect, type RefObject } from 'react';
import { replaceChildren } from '../../lib/dom';

type AIRoadmapContentProps = {
  svg: SVGElement | null;
  isLoading?: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
};

export function AIRoadmapContent(props: AIRoadmapContentProps) {
  const { svg, isLoading, containerRef } = props;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-4xl',
        isLoading && 'min-h-full',
      )}
    >
      <div
        ref={containerRef}
        id="roadmap-container"
        className="relative min-h-[400px] px-4 py-5 [&>svg]:mx-auto [&>svg]:max-w-[1300px]"
      />

      {isLoading && !svg && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingChip message="Please wait..." />
        </div>
      )}
    </div>
  );
}
