import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, fab, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/scss/bootstrap.scss';
import Home from './home/index';
import './global.scss';

library.add(fab, faGithub, faArrowRight);

const Index = () => (
  <div>
    <Home />
  </div>
);

export default Index;
