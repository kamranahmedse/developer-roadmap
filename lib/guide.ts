import guides from '../content/guides.json';
import authors from '../content/authors.json';
import formatDate from 'date-fns/format';

export type GuideType = {
  title: string;
  description: string;
  url: string;
  fileName: string;
  isPro: boolean;
  author: string;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};

export function getAllGuides(limit: number = undefined): GuideType[] {
  return (guides as GuideType[])
    .filter(guide => !guide.isDraft)
    .sort((a, b) => (new Date(b.updatedAt) as any) - (new Date(a.updatedAt) as any))
    .map(guide => ({
      ...guide,
      formattedCreatedAt: formatDate(new Date(guide.createdAt), 'MMMM d, yyyy'),
      formattedUpdatedAt: formatDate(new Date(guide.updatedAt), 'MMMM d, yyyy')
    }))
    .slice(0, limit ? limit : guides.length);
}
