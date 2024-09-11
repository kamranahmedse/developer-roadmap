import { Bookmark } from 'lucide-react';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';

type DashboardBookmarkCardProps = {
  bookmark: UserProgress;
};

export function DashboardBookmarkCard(props: DashboardBookmarkCardProps) {
  const {
    resourceType,
    resourceId,
    resourceTitle,
    roadmapSlug,
    isCustomResource,
  } = props.bookmark;

  let url =
    resourceType === 'roadmap'
      ? `/${resourceId}`
      : `/best-practices/${resourceId}`;

  if (isCustomResource) {
    url = `/r/${roadmapSlug}`;
  }

  return (
    <a
      href={url}
      key={resourceId}
      className="group relative flex w-full items-center gap-2 text-left text-sm hover:text-black hover:underline"
    >
      <Bookmark className="size-4 fill-current text-gray-400" />
      <h4 className="truncate font-medium text-gray-900">{resourceTitle}</h4>
    </a>
  );
}
