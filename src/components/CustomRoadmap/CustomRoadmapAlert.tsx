import { BadgeCheck, MessageCircleHeart, PencilRuler } from 'lucide-react';
import { showLoginPopup } from '../../lib/popup.ts';
import { isLoggedIn } from '../../lib/jwt.ts';
import { useState } from 'react';
import { CreateRoadmapModal } from './CreateRoadmap/CreateRoadmapModal.tsx';

export function CustomRoadmapAlert() {
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);

  return (
    <>
      {isCreatingRoadmap && (
        <CreateRoadmapModal
          onClose={() => {
            setIsCreatingRoadmap(false);
          }}
        />
      )}
      <div className="relative mb-5 mt-0 rounded-md border border-yellow-500 bg-yellow-100 p-2 sm:-mt-6 sm:mb-7 sm:p-2.5">
        <h2 className="text-base font-semibold text-yellow-800 sm:text-lg">
          Community Roadmap
        </h2>
        <p className="mt-2 mb-2.5 sm:mb-1.5 sm:mt-1 text-sm text-yellow-800 sm:text-base">
          This is a custom roadmap made by community and isn't verified by{' '}
          <span className="font-semibold">roadmap.sh</span>
        </p>
        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-2">
          <a
            href="/roadmaps"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-700 underline-offset-2 hover:underline"
          >
            <BadgeCheck className="h-4 w-4 stroke-[2.5]" />
            Visit Official Roadmaps
          </a>
          <span className="font-black text-yellow-700 hidden sm:block">&middot;</span>
          <button
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-700 underline-offset-2 hover:underline"
            onClick={() => {
              if (!isLoggedIn()) {
                showLoginPopup();
              } else {
                setIsCreatingRoadmap(true);
              }
            }}
          >
            <PencilRuler className="h-4 w-4 stroke-[2.5]" />
            Create Your Own Roadmap
          </button>
        </div>

        <MessageCircleHeart className="absolute bottom-2 right-2 hidden h-12 w-12 text-yellow-500 opacity-50 sm:block" />
      </div>
    </>
  );
}
