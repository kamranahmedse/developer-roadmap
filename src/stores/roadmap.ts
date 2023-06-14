import { map } from 'nanostores';

export type RoadmapProgress = {
  done: number;
  learning: number;
  skipped: number;
  total: number;
};

type RoadmapProgressMap = {
  [resourceId: string]: RoadmapProgress;
};

export const roadmapProgress = map<RoadmapProgressMap>();
