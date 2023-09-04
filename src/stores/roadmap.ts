import { atom, computed } from 'nanostores';
import { type RoadmapDocument } from '../components/CustomRoadmap/CreateRoadmap/CreateRoadmapModal';

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
