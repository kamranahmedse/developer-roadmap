import videos from '../content/videos.json';
import formatDate from 'date-fns/format';
import { NextApiRequest } from 'next';

export type VideoType = {
  title: string;
  description: string;
  url: string;
  fileName: string;
  isPro: boolean;
  duration: string;
  createdAt: string;
  updatedAt: string;
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};

export function getAllVideos(limit: number = 0): VideoType[] {
  return (videos as VideoType[])
    .sort((a, b) => (new Date(b.updatedAt) as any) - (new Date(a.updatedAt) as any))
    .map(video => ({
      ...video,
      formattedCreatedAt: formatDate(new Date(video.createdAt), 'MMMM d, yyyy'),
      formattedUpdatedAt: formatDate(new Date(video.updatedAt), 'MMMM d, yyyy')
    }))
    .slice(0, limit ? limit : videos.length);
}


export function getRequestedGuide(req: NextApiRequest): VideoType | undefined {
  const allVideos = getAllVideos();
  const video = allVideos.find(video => video.url === req.url);
  if (!video) {
    return undefined;
  }

  try {
    return video;
  } catch (e) {
    console.log(e);
  }

  return undefined;
}
