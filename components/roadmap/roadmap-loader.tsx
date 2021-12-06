import { Container, Spinner } from '@chakra-ui/react';

export function RoadmapLoader() {
  return (
    <Container
      maxW={'container.md'}
      position="relative"
      mt="60px"
      textAlign="center"
    >
      <Spinner
        thickness="7px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.500"
        size="xl"
      />
    </Container>
  );
}
