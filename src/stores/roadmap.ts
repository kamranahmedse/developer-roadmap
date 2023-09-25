import { atom, computed } from 'nanostores';
import { type RoadmapDocument } from '../components/CustomRoadmap/CreateRoadmap/CreateRoadmapModal';

export const currentRoadmap = atom<RoadmapDocument | undefined>(undefined);
export const isCurrentRoadmapPersonal = computed(
  currentRoadmap,
  (roadmap) => !roadmap?.teamId
);
export const canManageCurrentRoadmap = computed(
  currentRoadmap,
  (roadmap) => roadmap?.canManage
);
