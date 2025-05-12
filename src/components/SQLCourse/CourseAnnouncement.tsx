import { Database, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/classname';

const COURSE_ANNOUNCEMENT_STORAGE_KEY = '__course_announcement_closed_at__';

export function CourseAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const closedAt = Number(
      localStorage.getItem(COURSE_ANNOUNCEMENT_STORAGE_KEY) || '0',
    );

    // only show if the closed at passed 3 days ago
    const shouldShow = closedAt < Date.now();
    if (!shouldShow) {
      return;
    }

    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-91 h-0 overflow-hidden transition-[height] duration-300',
        isVisible ? 'h-[30px] sm:h-[36px]' : 'h-0',
      )}
    >
      <a href="/courses/sql" className="flex items-center bg-yellow-400 py-1.5">
        <span className="container mx-auto flex items-center justify-start gap-2 text-center sm:justify-center sm:gap-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-black md:text-base">
            <Database className="hidden h-4 w-4 shrink-0 text-black sm:block" />
            <span className="hidden sm:block">
              Master SQL with our new premium course
            </span>
            <span className="block sm:hidden">Announcing our SQL course</span>
          </span>
          <span
            className={cn(
              'items-center gap-1.5 rounded-full bg-black px-2 py-0.5 text-xs font-medium tracking-wide text-white uppercase hover:bg-zinc-800 sm:px-3 sm:py-1',
              isVisible && 'animate-wiggle [animation-delay:0.25s]',
            )}
          >
            <span className="mr-1.5 hidden sm:inline">Start Learning</span>
            <span className="mr-1.5 inline sm:hidden">Visit</span>
            <span className="">→</span>
          </span>
        </span>
      </a>
      <button
        type="button"
        className="absolute top-1/2 right-3.5 -translate-y-1/2 rounded-lg px-1.5 py-1.5 text-gray-500 hover:bg-yellow-500 hover:text-gray-700"
        onClick={(e) => {
          setIsVisible(false);

          const threeDaysFromNow = Date.now() + 1000 * 60 * 60 * 24 * 3;
          localStorage.setItem(
            COURSE_ANNOUNCEMENT_STORAGE_KEY,
            String(threeDaysFromNow),
          );
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
