import { Flag, Hammer, Play, PlayCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/classname.ts';

export function ProjectStepper() {
  const stickyElRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // on scroll check if the element has sticky class in effect
  useEffect(() => {
    const handleScroll = () => {
      if (stickyElRef.current) {
        setIsSticky(stickyElRef.current.getBoundingClientRect().top <= 8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={stickyElRef}
      className={cn(
        'sticky top-0 -mx-2 -mt-2 mb-5 overflow-hidden rounded-lg border bg-white px-3 py-3 transition-all',
        {
          '-mx-5 rounded-none border-x-0 border-t-0 bg-gray-50 px-4 py-5': isSticky,
        },
      )}
    >
      <div
        className={cn('-mx-4 -mt-3 pt-2 mb-4 border-b px-4 pb-2 text-sm text-gray-500 bg-gray-100 transition-colors', {
          '-mt-5 bg-black text-white': isSticky,
        })}
      >
        Start building, submit solution and get feedback from the community.
      </div>

      <div className="flex items-center justify-between gap-3">
        <button className="flex items-center gap-1.5 rounded-xl bg-green-600 py-1 pl-2 pr-2.5 text-sm text-white hover:bg-green-700">
          <Play size={13} />
          <span>Start Building</span>
        </button>
        <hr className="flex-grow border border-gray-300" />
        <button className="flex items-center gap-1.5 text-sm text-gray-400">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400/70 text-xs text-white">
            2
          </span>
          <span>Submit Solution</span>
        </button>
        <hr className="flex-grow border border-gray-300" />
        <button className="flex items-center gap-1.5 text-sm text-gray-400">
          <Flag size={14} />
          <span>5 Upvotes</span>
        </button>
        <hr className="flex-grow border border-gray-300" />
        <button className="flex items-center gap-1.5 text-sm text-gray-400">
          <Flag size={14} />
          <span>10+ Upvotes</span>
        </button>
      </div>
    </div>
  );
}
