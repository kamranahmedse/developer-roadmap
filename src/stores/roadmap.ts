import { atom } from 'nanostores';

export const isCreatingRoadmap = atom<boolean>(false);
export function showCreateRoadmapModal() {
  isCreatingRoadmap.set(true);
}
export function hideCreateRoadmapModal() {
  isCreatingRoadmap.set(false);
}
