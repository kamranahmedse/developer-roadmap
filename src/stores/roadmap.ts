import { atom, computed } from 'nanostores';
import { type RoadmapDocument } from '../components/CustomRoadmap/CreateRoadmap/CreateRoadmapModal';
import { getUser } from '../lib/jwt';

export const isCreatingRoadmap = atom<boolean>(false);
export function showCreateRoadmapModal() {
  isCreatingRoadmap.set(true);
}
export function hideCreateRoadmapModal() {
  isCreatingRoadmap.set(false);
}

export const currentRoadmap = atom<RoadmapDocument | undefined>(undefined);
export const isCurrentRoadmapPersonal = computed(
  currentRoadmap,
  (roadmap) => roadmap?.teamId === undefined
);
export const canEditCurrentRoadmap = computed(currentRoadmap, (roadmap) => {
  const user = getUser();
  if (!user) {
    return false;
  }
  return roadmap?.creatorId === user.id;
});
