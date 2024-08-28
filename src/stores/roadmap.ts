import { atom, computed } from 'nanostores';
import type { GetRoadmapResponse } from '../components/CustomRoadmap/CustomRoadmap';

export const currentRoadmap = atom<GetRoadmapResponse | undefined>(undefined);
export const isCurrentRoadmapPersonal = computed(
  currentRoadmap,
  (roadmap) => !roadmap?.teamId,
);
export const canManageCurrentRoadmap = computed(
  currentRoadmap,
  (roadmap) => roadmap?.canManage,
);

export const roadmapProgress = atom<
  { done: string[]; learning: string[]; skipped: string[] } | undefined
>();
export const totalRoadmapNodes = atom<number | undefined>();

