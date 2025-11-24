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
    </>
  );
}
