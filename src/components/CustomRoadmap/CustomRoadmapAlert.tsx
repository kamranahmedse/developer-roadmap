import {
  BadgeCheck,
  Heart,
  HeartHandshake,
  MessageCircleHeart,
  PencilRuler,
  Search,
} from 'lucide-react';
import { showLoginPopup } from '../../lib/popup.ts';
import { isLoggedIn } from '../../lib/jwt.ts';
import { useState } from 'react';
import { CreateRoadmapModal } from './CreateRoadmap/CreateRoadmapModal.tsx';
import { RoadmapAlert } from '../RoadmapAlert.tsx';

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

      <RoadmapAlert
        title="Community Roadmaps"
        description={
          <>
            This is a custom roadmap made by a community member and is not
            verified by <span className="font-semibold">roadmap.sh</span>
          </>
        }
        floatingIcon={MessageCircleHeart}
        className="mb-5 mt-0 sm:-mt-6 sm:mb-7"
      />

      {/* <div className="relative mb-5 mt-0 rounded-md border border-yellow-500 bg-yellow-100 p-2 sm:-mt-6 sm:mb-7 sm:p-2.5">
        <p className="mb-2.5 mt-2 text-sm text-yellow-800 sm:mb-1.5 sm:mt-1 sm:text-base">
          This is a custom roadmap made by a community member and is not
          verified by <span className="font-semibold">roadmap.sh</span>
        </p>
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <a
            href="/roadmaps"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-700 underline-offset-2 hover:underline"
          >
            <BadgeCheck className="h-4 w-4 stroke-[2.5]" />
            Visit Official Roadmaps
          </a>
          <span className="hidden font-black text-yellow-700 sm:block">
            &middot;
          </span>
          <a
            href="/community"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-700 underline-offset-2 hover:underline"
          >
            <HeartHandshake className="h-4 w-4 stroke-[2.5]" />
            More Community Roadmaps
          </a>
        </div>

        <MessageCircleHeart className="absolute bottom-2 right-2 hidden h-12 w-12 text-yellow-500 opacity-50 sm:block" />
      </div> */}
    </>
  );
}
