import type { VideoFileType } from '../../lib/video';

export interface VideoListItemProps {
  video: VideoFileType;
}

export function VideoListItem(props: VideoListItemProps) {
  const { video } = props;
  const { frontmatter, id } = video;

  return (
    <a
      className="block no-underline py-2 group text-md items-center text-gray-600 hover:text-blue-600 flex justify-between border-b"
      href={`/videos/${id}`}
    >
      <span className="group-hover:translate-x-2 transition-transform">
        {frontmatter.title}

        {frontmatter.isNew && (
          <span className="bg-green-300 text-green-900 text-xs font-medium px-1.5 py-0.5 rounded-sm uppercase ml-1.5">
            New
            <span className="hidden sm:inline">
              &middot;
              {new Date(frontmatter.date).toLocaleString('default', {
                month: 'long',
              })}
            </span>
          </span>
        )}
      </span>
      <span className="capitalize text-gray-500 text-xs hidden sm:block">
        {frontmatter.duration}
      </span>

      <span className="text-gray-400 text-xs block sm:hidden"> &raquo;</span>
    </a>
  );
} 