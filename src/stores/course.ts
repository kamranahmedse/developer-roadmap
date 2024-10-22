import { atom } from 'nanostores';
import type { AllowedLessonType } from '../lib/course';

export type CurrentLessonType = {
  courseId: string;
  chapterId: string;
  lessonId: string;
  lessonType: AllowedLessonType;
  challengeStatus?: 'pending' | 'wrong' | 'correct';
  quizStatus?: 'pending' | 'wrong' | 'correct';
};

export const currentLesson = atom<CurrentLessonType | null>(null);
