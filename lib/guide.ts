import guides from '../content/guides.json';
import formatDate from 'date-fns/format';
import { AuthorType, findAuthorByUsername } from './author';

export type GuideType = {
  id: string;
  title: string;
  description: string;
  isNew: boolean;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  authorUsername: string;
  author?: AuthorType;
};

export function getGuideById(id: string): GuideType | undefined {
  const allGuides = getAllGuides();

  return allGuides.find(guide => guide.id === id);
}

export function getAllGuides(limit: number = 0): GuideType[] {
  return (guides as GuideType[])
    .filter(guide => !guide.isDraft)
    .sort((a, b) => (new Date(b.updatedAt) as any) - (new Date(a.updatedAt) as any))
    .map(guide => ({
      ...guide,
      formattedCreatedAt: formatDate(new Date(guide.createdAt), 'MMMM d, yyyy'),
      formattedUpdatedAt: formatDate(new Date(guide.updatedAt), 'MMMM d, yyyy'),
      author: findAuthorByUsername(guide.authorUsername)
    }))
    .slice(0, limit ? limit : guides.length);
}
