import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/classname';

type HeadingGroupType = {
  text: string;
  slug: string;
  children: Array<{ text: string; slug: string }>;
};

type TableOfContentProps = {
  toc: HeadingGroupType[];
};

export function TableOfContent({ toc }: TableOfContentProps) {
  const [activeId, setActiveId] = useState(() => toc[0]?.slug || '');
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver>();
  const clickTimeoutRef = useRef<NodeJS.Timeout>();

  const flattenedHeadings = useMemo(() => {
    return toc.flatMap((heading) => [
      { slug: heading.slug, level: 0 },
      ...heading.children.map((child) => ({ slug: child.slug, level: 1 })),
    ]);
  }, [toc]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id);

      if (visibleHeadings.length > 0) {
        const activeHeading = flattenedHeadings.find((h) =>
          visibleHeadings.includes(h.slug),
        );
        if (activeHeading) {
          setActiveId(activeHeading.slug);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0.5,
    });

    return () => observerRef.current?.disconnect();
  }, [flattenedHeadings]);

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    observer.disconnect();

    flattenedHeadings.forEach(({ slug }) => {
      const element = document.getElementById(slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [flattenedHeadings]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();
      const element = document.getElementById(slug);

      if (element) {
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }

        window.history.pushState({}, '', `#${slug}`);
        setActiveId(slug);

        observerRef.current?.disconnect();

        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        clickTimeoutRef.current = setTimeout(() => {
          flattenedHeadings.forEach(({ slug }) => {
            const element = document.getElementById(slug);
            if (element) observerRef.current?.observe(element);
          });
        }, 1000);

        setIsOpen(false);
      }
    },
    [flattenedHeadings],
  );

  if (toc.length === 0) return null;

  return (
    <nav
      className={cn(
        'relative min-w-[250px] px-5 pt-0 max-lg:min-w-full max-lg:max-w-full max-lg:border-none max-lg:px-0 lg:pt-10',
        'top-0 lg:sticky',
      )}
    >
      <h4 className="text-lg font-medium max-lg:hidden">In this article</h4>
      <button
        className="flex w-full items-center justify-between gap-2 bg-gray-300 px-3 py-2 text-sm font-medium lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        Table of Contents
        <ChevronDown
          size={16}
          className={cn(
            'transform transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'relative mt-0.5 max-lg:absolute max-lg:top-full max-lg:mt-0 max-lg:w-full max-lg:bg-white max-lg:shadow',
          !isOpen && 'hidden lg:block',
          isOpen && 'block',
        )}
      >
        {/* Continuous vertical line */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-200" />

        <ol className="relative space-y-0">
          {toc.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                className={cn(
                  'relative block py-1 text-sm text-gray-500 no-underline hover:text-black',
                  'pl-4 transition-all duration-200 ease-in-out',
                  // Highlight overlay for active state
                  'before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-transparent before:transition-colors',
                  activeId === heading.slug &&
                    'font-medium text-black before:bg-black',
                )}
                onClick={(e) => handleClick(e, heading.slug)}
              >
                {heading.text}
              </a>

              {heading.children.length > 0 && (
                <ol className="space-y-0">
                  {heading.children.map((child) => (
                    <li key={child.slug}>
                      <a
                        href={`#${child.slug}`}
                        className={cn(
                          'relative block py-1 text-sm text-gray-500 no-underline hover:text-black',
                          'pl-8 transition-all duration-200 ease-in-out',
                          // Highlight overlay for active state
                          'before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-transparent before:transition-colors',
                          activeId === child.slug &&
                            'font-medium text-black before:bg-black',
                        )}
                        onClick={(e) => handleClick(e, child.slug)}
                      >
                        {child.text}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
