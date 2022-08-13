import videos from '../content/videos.json';
import formatDate from 'date-fns/format';
import { AuthorType, findAuthorByUsername } from './author';

export type VideoType = {
  id: string;
  title: string;
  description: string;
  youtubeLink?: string;
  isNew: boolean;
  duration: string;
  createdAt: string;
  updatedAt: string;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  authorUsername: string;
  author?: AuthorType;
};

export function getAllVideos(limit: number = 0): VideoType[] {
  return (videos as VideoType[])
    .sort((a, b) => (new Date(b.updatedAt) as any) - (new Date(a.updatedAt) as any))
    .map(video => ({
      ...video,
      formattedCreatedAt: formatDate(new Date(video.createdAt), 'MMMM d, yyyy'),
      formattedUpdatedAt: formatDate(new Date(video.updatedAt), 'MMMM d, yyyy'),
      author: findAuthorByUsername(video.authorUsername)
    }))
    .slice(0, limit ? limit : videos.length);
}

export function getVideoById(id: string): VideoType | undefined {
  const allVideos = getAllVideos();

  return allVideos.find(guide => guide.id === id);
}
