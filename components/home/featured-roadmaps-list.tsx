import { RoadmapType } from '../../lib/roadmap';
import { SimpleGrid, Tag } from '@chakra-ui/react';
import { HomeRoadmapItem } from '../roadmap/home-roadmap-item';

type FeaturedRoadmapsListProps = {
  roadmaps: RoadmapType[];
  title: string;

};

export function FeaturedRoadmapsList(props: FeaturedRoadmapsListProps) {
  const { roadmaps, title } = props;

  return (
    <>
      <Tag bg='gray.400' mb={4}>{title}</Tag>
      <SimpleGrid columns={[1, 2, 3]} spacing={['10px', '10px', '15px']} mb='40px'>
        {roadmaps.map((roadmap: RoadmapType, counter: number) => (
          <HomeRoadmapItem
            isUpcoming={roadmap.isUpcoming}
            url={`/${roadmap.id}`}
            key={roadmap.id}
            colorIndex={counter}
            title={roadmap.featuredTitle}
            isCommunity={roadmap.isCommunity}
            subtitle={roadmap.featuredDescription}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
