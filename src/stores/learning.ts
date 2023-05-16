import { atom } from 'nanostores';
import type { UserResourceProgressDocument } from '../components/Setting/Dashboard';

export const learningAtom = atom<{
  roadmap: UserResourceProgressDocument[];
  bestPractice: UserResourceProgressDocument[];
}>({
  roadmap: [],
  bestPractice: [],
});

export const addProgress = (progress: UserResourceProgressDocument) => {
  const type = progress.resourceType === 'roadmap' ? 'roadmap' : 'bestPractice';
  learningAtom.set({
    ...learningAtom.get(),
    [type]: [...learningAtom.get()[type], progress],
  });
};

export const removeProgress = (progress: UserResourceProgressDocument) => {
  const type = progress.resourceType === 'roadmap' ? 'roadmap' : 'bestPractice';
  learningAtom.set({
    ...learningAtom.get(),
    [type]: learningAtom
      .get()
      [type].filter(
        (item) => item._id?.toString() !== progress._id?.toString()
      ),
  });
};
