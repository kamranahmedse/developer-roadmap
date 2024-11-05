import { useState } from 'react';
import { cn } from '../../lib/classname';
import { ChevronDown } from 'lucide-react';

type RelatedGuidesProps = {
  relatedTitle?: string;
  relatedGuides: Record<string, string>;
};

export function RelatedGuides(props: RelatedGuidesProps) {
  const { relatedTitle = 'Other Guides', relatedGuides } = props;

  const [isOpen, setIsOpen] = useState(false);

  const relatedGuidesArray = Object.entries(relatedGuides).map(
    ([title, url]) => ({
      title,
      url,
    }),
  );

  return (
    <div
      className={cn(
        'relative min-w-[250px] px-5 pt-0 max-lg:mb-0.5 max-lg:min-w-full max-lg:max-w-full max-lg:border-none max-lg:px-0 lg:pt-10',
      )}
    >
      <h4 className="text-lg font-medium max-lg:hidden">{relatedTitle}</h4>
      <button
        className="flex w-full items-center justify-between gap-2 bg-gray-300 px-3 py-2 text-sm font-medium lg:hidden"
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
          'mt-0.5 space-y-0 max-lg:absolute max-lg:top-full max-lg:z-10 max-lg:mt-0 max-lg:w-full max-lg:bg-white max-lg:shadow',
          !isOpen && 'hidden lg:block',
          isOpen && 'block',
        )}
      >
        {relatedGuidesArray.map((relatedGuide) => (
          <li key={relatedGuide.url}>
            <a
              href={relatedGuide.url}
              className="text-sm text-gray-500 no-underline hover:text-black max-lg:block max-lg:border-b max-lg:px-3 max-lg:py-1"
              onClick={() => {
                if (!isOpen) {
                  return;
                }

                setIsOpen(false);
              }}
            >
              {relatedGuide.title}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
