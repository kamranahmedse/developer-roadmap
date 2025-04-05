import type { VideoFileType } from '../../lib/video';
import { VideoListItem } from './VideoListItem';

export interface FeaturedVideoListProps {
  heading: string;
  videos: VideoFileType[];
}

export function FeaturedVideoList(props: FeaturedVideoListProps) {
  const { heading, videos } = props;

  return (
    <div className="container">
      <h2 className="block text-2xl font-bold sm:text-3xl">{heading}</h2>

      <div className="mt-3 sm:my-5">
        {videos.map((video) => (
          <VideoListItem key={video.id} video={video} />
        ))}
      </div>

      <a
        href="/videos"
        className="hidden rounded-full bg-linear-to-r from-slate-600 to-black px-3 py-2 text-xs font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-800 sm:inline"
      >
        View All Videos &rarr;
      </a>

      <div className="mt-3 block sm:hidden">
        <a
          href="/videos"
          className="font-regular block rounded-md border border-black p-2 text-center text-sm text-black hover:bg-black hover:text-gray-50"
        >
          View All Videos &nbsp;&rarr;
        </a>
      </div>
    </div>
  );
}
