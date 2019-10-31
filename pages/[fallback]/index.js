import Error from 'next/error';
import Roadmap from '../roadmaps/[roadmap]/index';
import { serverOnlyProps } from '../../lib/server';
import { getRequestedRoadmap } from '../../lib/roadmap';

// Fallback page to handle the old roadmap pages implementation
const OldRoadmap = ({ roadmap }) => {
  if (roadmap) {
    return <Roadmap roadmap={ roadmap } />
  }

  return <Error status={ 404 } />;
};

OldRoadmap.getInitialProps = serverOnlyProps(({ req }) => {
  return {
    roadmap: getRequestedRoadmap(req),
  };
});


export default OldRoadmap;