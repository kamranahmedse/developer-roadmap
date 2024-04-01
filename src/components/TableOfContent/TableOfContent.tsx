import { useState, type CSSProperties } from 'react';
import type { HeadingGroupType } from '../../lib/guide';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/classname';

type TableOfContentProps = {
  toc: HeadingGroupType[];
};

export function TableOfContent(props: TableOfContentProps) {
  const { toc } = props;

  const [isOpen, setIsOpen] = useState(false);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-5 min-w-[250px] max-w-full px-5 max-lg:min-w-full max-lg:max-w-full max-lg:px-0 sm:top-10">
      <h4 className="text-lg font-medium max-lg:hidden">Table of Content</h4>
      <button
        className="flex w-full items-center justify-between gap-2 bg-gray-300 px-3 py-2 text-sm font-medium lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        Table of Content
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
          'mt-2 space-y-1 max-lg:absolute max-lg:top-full max-lg:mt-0 max-lg:w-full max-lg:space-y-0 max-lg:bg-white max-lg:shadow',
          !isOpen && 'hidden lg:block',
          isOpen && 'block',
        )}
      >
        {toc.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className="text-gray-500 no-underline hover:text-black max-lg:block max-lg:border-b max-lg:px-3 max-lg:py-1 max-lg:text-sm"
              onClick={() => {
                if (!isOpen) {
                  return;
                }

                setIsOpen(false);
              }}
            >
              {heading.text}
            </a>

            {heading.children.length > 0 && (
              <ol className="my-0 ml-8 mt-1 list-disc space-y-1 marker:text-gray-400 max-lg:ml-0 max-lg:mt-0 max-lg:list-none max-lg:space-y-0">
                {heading.children.map((children) => {
                  return (
                    <li key={children.slug}>
                      <a
                        href={`#${children.slug}`}
                        className="text-gray-500 no-underline hover:text-black max-lg:block max-lg:border-b max-lg:px-3 max-lg:py-1 max-lg:pl-8 max-lg:text-sm"
                        onClick={() => {
                          if (!isOpen) {
                            return;
                          }

                          setIsOpen(false);
                        }}
                      >
                        {children.text}
                      </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
