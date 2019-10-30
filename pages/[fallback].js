import Roadmap from './roadmaps/[roadmap]';
import roadmapsList from "../data/roadmaps.json";
import { serverOnlyProps } from '../lib/server';

// Fallback page to handle the old roadmap pages implementation
const OldRoadmap = ({ roadmap }) => {
  if (roadmap) {
    return <Roadmap roadmap={ roadmap } />
  }

  return <h1>404</h1>
};

OldRoadmap.getInitialProps = serverOnlyProps(({ req }) => {
  return {
    roadmap: roadmapsList.find(roadmap => roadmap.slug === req.url),
  };
});


export default OldRoadmap;