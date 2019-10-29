import { useRouter } from 'next/router';
import Roadmap from './roadmaps/[roadmap]';
import roadmapsList from "../data/roadmaps.json";

// Fallback page to handle the old roadmap pages implementation
const OldRoadmap = () => {
  const router = useRouter();
  const { fallback } = router.query;

  // Render the roadmap if it exists, otherwise 404
  const roadmapExists = !!roadmapsList.find(roadmap => roadmap.slug === fallback);
  if (roadmapExists) {
    return <Roadmap roadmap={ fallback } />
  }

  return <h1>404</h1>;
};

export default OldRoadmap;