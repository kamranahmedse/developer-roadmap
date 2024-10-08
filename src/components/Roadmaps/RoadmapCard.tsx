import { useIsMounted } from '../../hooks/use-is-mounted';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';
import type { GroupType } from './RoadmapsPage';

type RoadmapCardProps = {
  roadmap: GroupType['roadmaps'][number];
};

export function RoadmapCard(props: RoadmapCardProps) {
  const { roadmap } = props;

  const isMounted = useIsMounted();

  return (
    <div>
    <a
      key={roadmap.link}
      className="relative rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
      href={roadmap.link}
    >
      {roadmap.title}

      {isMounted && (
        <MarkFavorite
          resourceId={roadmap.link.split('/').pop()!}
          resourceType="roadmap"
          className="data-[is-favorite=true]:opacity-35"
        />
      )}
    </a>
    <ScrollToTopButton />
    </div>
  );
}
