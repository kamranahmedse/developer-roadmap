import { MinusIcon, PlusIcon, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/classname';

type CourseFeatureProps = {
  title: string;
  icon: LucideIcon;
  description: string;
  imgUrl?: string;
};

export function CourseFeature(props: CourseFeatureProps) {
  const { title, icon: Icon, description, imgUrl } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (isZoomed) {
        setIsZoomed(false);
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isZoomed]);

  return (
    <>
      {isZoomed && (
        <div
          onClick={() => {
            setIsZoomed(false);
            setIsExpanded(false);
          }}
          className="fixed inset-0 z-999 flex cursor-zoom-out items-center justify-center bg-black bg-opacity-75"
        >
          <img
            src={imgUrl}
            alt={title}
            className="max-h-[50%] max-w-[90%] rounded-xl object-contain"
          />
        </div>
      )}
      <div
        className={cn(
          'fixed inset-0 z-10 bg-black/70 opacity-100 transition-opacity duration-200 ease-out',
          {
            'pointer-events-none opacity-0': !isExpanded,
          },
        )}
        onClick={() => setIsExpanded(false)}
      ></div>
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'z-20 flex w-full items-center rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-left transition-colors duration-200 ease-out hover:bg-zinc-800/40',
            {
              'relative bg-zinc-800 hover:bg-zinc-800': isExpanded,
            },
          )}
        >
          <span className="flex grow items-center space-x-3">
            <Icon />
            <span>{title}</span>
          </span>
          {isExpanded ? (
            <MinusIcon className="h-4 w-4" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
        </button>
        {isExpanded && (
          <div className="absolute left-0 top-full z-20 translate-y-2 rounded-lg border border-zinc-800 bg-zinc-800 p-4">
            <p>{description}</p>
            {imgUrl && (
              <img
                onClick={() => {
                  setIsZoomed(true);
                  setIsExpanded(false);
                }}
                src={imgUrl}
                alt={title}
                className="mt-4 h-auto pointer-events-none md:pointer-events-auto w-full cursor-zoom-in rounded-lg object-right-top"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
