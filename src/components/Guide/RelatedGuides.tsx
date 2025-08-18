import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { OfficialGuideDocument } from '../../queries/official-guide';
import { cn } from '../../lib/classname';

type RelatedGuidesProps = {
  relatedTitle?: string;
  relatedGuides: Pick<OfficialGuideDocument, 'title' | 'slug' | 'roadmapId'>[];
};

export function RelatedGuides(props: RelatedGuidesProps) {
  const { relatedTitle = 'Other Guides', relatedGuides } = props;

  const [isOpen, setIsOpen] = useState(false);

  if (relatedGuides.length === 0) {
    return null;
  }

  return (
    <div className={cn('relative min-w-[250px] pt-0 lg:px-5 lg:pt-10')}>
      <h4 className="text-lg font-medium max-lg:hidden">{relatedTitle}</h4>
      <button
        className="flex w-full items-center justify-between gap-2 border-b bg-gray-300 px-3 py-2 text-sm font-medium lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {relatedTitle}
        <ChevronDown
          size={16}
          className={cn(
            'transform transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <ol
        className={cn(
          'mt-0.5 space-y-0 max-lg:absolute max-lg:top-full max-lg:z-10 max-lg:mt-0 max-lg:w-full max-lg:bg-white max-lg:shadow-sm',
          !isOpen && 'hidden lg:block',
          isOpen && 'block',
        )}
      >
        {relatedGuides.map((relatedGuide) => {
          const { roadmapId, slug, title } = relatedGuide;
          const href = roadmapId ? `/${roadmapId}/${slug}` : `/guides/${slug}`;

          const className = cn(
            'text-sm text-gray-500 no-underline hover:text-black max-lg:block max-lg:border-b max-lg:px-3 max-lg:py-1',
          );

          return (
            <li key={slug}>
              <a
                href={href}
                className={className}
                onClick={() => {
                  if (!isOpen) {
                    return;
                  }

                  setIsOpen(false);
                }}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
