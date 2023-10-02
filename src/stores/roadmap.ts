import { atom, computed } from 'nanostores';
import type { GetRoadmapResponse } from '../components/CustomRoadmap/CustomRoadmap';

export const currentRoadmap = atom<GetRoadmapResponse | undefined>(undefined);
export const isCurrentRoadmapPersonal = computed(
  currentRoadmap,
  (roadmap) => !roadmap?.teamId
);
export const canManageCurrentRoadmap = computed(
  currentRoadmap,
  (roadmap) => roadmap?.canManage
);
