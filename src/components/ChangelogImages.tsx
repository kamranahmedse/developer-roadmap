import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

interface ChangelogImagesProps {
  images: { [key: string]: string };
}

const ChangelogImages: React.FC<ChangelogImagesProps> = ({ images }) => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const imageArray = Object.entries(images);

  const handleImageClick = (src: string) => {
    setEnlargedImage(src);
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };

  const handleNavigation = useCallback(
    (direction: 'prev' | 'next') => {
      if (!enlargedImage) return;
      const currentIndex = imageArray.findIndex(
        ([_, src]) => src === enlargedImage,
      );
      let newIndex;
      if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : imageArray.length - 1;
      } else {
        newIndex = currentIndex < imageArray.length - 1 ? currentIndex + 1 : 0;
      }
      setEnlargedImage(imageArray[newIndex][1]);
    },
    [enlargedImage, imageArray],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseEnlarged();
      } else if (event.key === 'ArrowLeft') {
        handleNavigation('prev');
      } else if (event.key === 'ArrowRight') {
        handleNavigation('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigation]);

  return (
    <>
      <div className="flex gap-3 px-6 pb-1">
        {imageArray.map(([title, src]) => (
          <div
            key={title}
            className="group relative cursor-pointer overflow-hidden rounded-lg transition hover:scale-105"
            onClick={() => handleImageClick(src)}
          >
            <img
              src={src}
              alt={title}
              className="h-[120px] w-full object-cover object-left-top"
            />
            <span className="absolute group-hover:opacity-0 inset-0 bg-gradient-to-b from-transparent to-black/40" />

            <div className="absolute font-medium inset-x-0 top-full group-hover:inset-y-0 flex items-center justify-center px-2 text-center text-xs bg-black/50 text-white py-0.5 opacity-0 group-hover:opacity-100">
              <span className='bg-black py-0.5 rounded px-1'>{title}</span>
            </div>
          </div>
        ))}
      </div>
      {enlargedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleCloseEnlarged}
        >
          <img
            src={enlargedImage}
            alt="Enlarged view"
            className="max-h-[90%] max-w-[90%] rounded-xl object-contain"
          />
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white hover:bg-opacity-100 bg-opacity-50 p-2"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation('prev');
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white hover:bg-opacity-100 bg-opacity-50 p-2"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation('next');
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default ChangelogImages;
