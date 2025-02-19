import { SectionHeader } from './SectionHeader';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoModal } from '../VideoModal';

export function PlatformDemo() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      {isVideoModalOpen && (
        <VideoModal
          videoId="6S1CcF-ngeQ"
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
      <div className="relative mt-12 w-full max-w-5xl sm:mt-20">
        <img
          src="https://assets.roadmap.sh/guest/course-environment-87jg8.png"
          alt="Course Environment"
          className="w-full rounded-xl"
        />
        <div
          onClick={() => setIsVideoModalOpen(true)}
          className="group absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-black/40 transition-all hover:bg-black/50"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-105 lg:size-16">
            <Play className="ml-1 fill-current text-black lg:size-8" />
          </div>
        </div>
      </div>
    </>
  );
}
