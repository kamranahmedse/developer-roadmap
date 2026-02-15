export type EgeMaterial = {
  title: string;
  url: string;
};

export type EgeTopic = {
  title: string;
  slug: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  materials: EgeMaterial[];
};

export type EgeBlock = {
  title: string;
  topics: EgeTopic[];
};

export type EgeSubject = {
  title: string;
  slug: string;
  description: string;
  blocks: EgeBlock[];
};

export type EgePlan = {
  title: string;
  slug: string;
  description: string;
  duration: string;
};

import russianskiy from './ege/subjects/russkiy-yazyk.json';
import matematikaProfil from './ege/subjects/matematika-profil.json';
import obshchestvo from './ege/subjects/obshchestvoznanie.json';
import istoriya from './ege/subjects/istoriya.json';
import fizika from './ege/subjects/fizika.json';

export const egeSubjects: EgeSubject[] = [
  russianskiy as EgeSubject,
  matematikaProfil as EgeSubject,
  obshchestvo as EgeSubject,
  istoriya as EgeSubject,
  fizika as EgeSubject,
];

export const egePlans: EgePlan[] = [
  {
    title: 'Интенсив на 3 месяца',
    slug: 'intensive-3',
    description: 'Подойдет, если базовые знания уже есть.',
    duration: '3 месяца',
  },
  {
    title: 'Стандарт на 6 месяцев',
    slug: 'standard-6',
    description: 'Самый сбалансированный формат подготовки.',
    duration: '6 месяцев',
  },
  {
    title: 'Длинный план на 12 месяцев',
    slug: 'long-12',
    description: 'Подготовка с нуля и без спешки.',
    duration: '12 месяцев',
  },
];

export const egeSubjectsBySlug = new Map(
  egeSubjects.map((subject) => [subject.slug, subject]),
);

export function getEgeSubjectTopics(subject: EgeSubject): EgeTopic[] {
  return subject.blocks.flatMap((block) => block.topics);
}
