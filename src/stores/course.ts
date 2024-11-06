import { atom } from 'nanostores';
import type { AllowedLessonType } from '../lib/course';

export type CurrentLessonType = {
  courseId: string;
  chapterId?: string;
  lessonId?: string;
  lessonType?: AllowedLessonType;
  challengeStatus?: 'pending' | 'wrong' | 'correct';
  quizStatus?: 'pending' | 'wrong' | 'correct';
};

export const currentLesson = atom<CurrentLessonType | null>(null);

export type AllowedAIChatType = 'user' | 'system';
export type AIChatHistoryType = {
  type: AllowedAIChatType;
  message: string;
};

export const roadmapAIChatHistory = atom<AIChatHistoryType[]>([
  {
    type: 'system',
    message: 'Hey, how can I help you today? 🤖',
  },
]);
