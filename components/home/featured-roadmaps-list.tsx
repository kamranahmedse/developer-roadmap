import { RoadmapType } from '../../lib/roadmap';
import { SimpleGrid, Tag } from '@chakra-ui/react';
import { HomeRoadmapItem } from '../roadmap/home-roadmap-item';

type FeaturedRoadmapsListProps = {
  roadmaps: RoadmapType[];
  title: string;
};

export const upcomingRoadmaps = [
  {
    type: 'Role Based',
    title: 'React Native',
    description: 'Step by step guide to become a React Native Developer',
    id: 'react-native'
  }
];

export function FeaturedRoadmapsList(props: FeaturedRoadmapsListProps) {
  const { roadmaps, title } = props;

  return (
    <>
      <Tag bg='gray.400' mb={4}>{title}</Tag>
      <SimpleGrid columns={[1, 2, 3]} spacing={['10px', '10px', '15px']} mb='40px'>
        <>
          {roadmaps.map((roadmap: RoadmapType, counter: number) => (
            <HomeRoadmapItem
              isUpcoming={roadmap.isUpcoming}
              url={`/${roadmap.id}`}
              key={roadmap.id}
              colorIndex={counter}
              title={roadmap.featuredTitle}
              isCommunity={roadmap.isCommunity}
              isNew={roadmap.isNew}
              subtitle={roadmap.featuredDescription}
            />
          ))}
          {upcomingRoadmaps
            .filter(roadmap => roadmap.type === title)
            .map((roadmap, counter) => (
              <HomeRoadmapItem
                isUpcoming={true}
                url={`/upcoming?id=${roadmap.id}`}
                key={`upcoming-${roadmap.id}`}
                colorIndex={9}
                title={roadmap.title}
                subtitle={roadmap.description}
              />
            ))}
        </>
      </SimpleGrid>
    </>
  );
}
