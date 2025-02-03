import { Database, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const HIDE_STORAGE_KEY = 'sql-course-announcement-hidden';

export function CourseAnnouncement() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isHidden = localStorage.getItem(HIDE_STORAGE_KEY) === 'true';
    if (isHidden) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sticky top-0 z-[100]">
      <a
        href="/courses/sql"
        className="flex items-center bg-yellow-400 py-1.5"
      >
        <span className="container mx-auto flex items-center justify-start sm:justify-center gap-2 text-center sm:gap-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-black md:text-base">
            <Database className="hidden h-4 w-4 flex-shrink-0 text-black sm:block" />
            <span className="hidden sm:block">
              Master SQL with our new course
            </span>
            <span className="block sm:hidden">Announcing our SQL course</span>
          </span>
          <span className="items-center gap-1.5 rounded-full bg-black px-2 py-0.5 text-sm text-xs font-medium uppercase tracking-wide text-white hover:bg-zinc-800 sm:px-3 sm:py-1">
            <span className="mr-1.5 hidden sm:inline">Start Learning</span>
            <span className="mr-1.5 inline sm:hidden">Visit</span>
            <span className="">→</span>
          </span>
        </span>
      </a>
      <button
        type="button"
        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg px-1.5 py-1.5 text-gray-500 hover:bg-yellow-500 hover:text-gray-700"
        onClick={(e) => {
          localStorage.setItem(HIDE_STORAGE_KEY, 'true');
          setIsVisible(false);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
