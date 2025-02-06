import { SectionHeader } from './SectionHeader';
import { useEffect, useState } from 'react';

export function PlatformDemo() {
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
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-[999] flex cursor-zoom-out items-center justify-center bg-black bg-opacity-75"
        >
          <img
            src="https://assets.roadmap.sh/guest/course-environment-87jg8.png"
            alt="Course Environment"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
          />
        </div>
      )}
      <img
        src="https://assets.roadmap.sh/guest/course-environment-87jg8.png"
        alt="Course Environment"
        onClick={() => setIsZoomed(true)}
        className="mt-12 sm:mt-20 w-full max-w-5xl rounded-xl cursor-zoom-in"
      />
    </>
  );
}
