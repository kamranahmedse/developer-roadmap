import { atom } from 'nanostores';

export type LessonSubmitStatus = 'idle' | 'submitting' | 'submitted' | 'wrong';
export const lessonSubmitStatus = atom<LessonSubmitStatus>('idle');
