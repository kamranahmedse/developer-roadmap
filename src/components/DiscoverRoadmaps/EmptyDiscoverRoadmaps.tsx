import { Map, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { CreateRoadmapModal } from '../CustomRoadmap/CreateRoadmap/CreateRoadmapModal';

export function EmptyDiscoverRoadmaps() {
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);

  const creatingRoadmapModal = isCreatingRoadmap && (
    <CreateRoadmapModal
      onClose={() => setIsCreatingRoadmap(false)}
      onCreated={(roadmap) => {
        window.location.href = `${
          import.meta.env.PUBLIC_EDITOR_APP_URL
        }/${roadmap?._id}`;
      }}
    />
  );

  return (
    <>
      {creatingRoadmapModal}

      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border px-5 py-3 sm:px-0 sm:py-20 bg-white">
        <Map className="mb-4 h-8 w-8 opacity-10 sm:h-14 sm:w-14" />
        <h2 className="mb-1 text-lg font-semibold sm:text-xl">
          No Roadmaps Found
        </h2>
        <p className="mb-3 text-balance text-center text-xs text-gray-800 sm:text-sm">
          Try searching for something else or create a new roadmap.
        </p>
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-1.5">
          <button
            className="flex w-full items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white sm:w-auto sm:text-sm"
            type="button"
            onClick={() => {
              setIsCreatingRoadmap(true);
            }}
          >
            <Wand2 className="h-4 w-4" />
            Create your Roadmap
          </button>
          <a
            href="/roadmaps"
            className="flex w-full items-center gap-1.5 rounded-md bg-gray-300 px-3 py-1.5 text-xs text-black hover:bg-gray-400 sm:w-auto sm:text-sm"
          >
            <Map className="h-4 w-4" />
            Visit Official Roadmaps
          </a>
        </div>
      </div>
    </>
  );
}
