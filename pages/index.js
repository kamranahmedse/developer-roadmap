import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss';
import Home from './home/index';

library.add(fab, faGithub, faArrowRight);

const Index = () => (
  <div>
    <Home />
  </div>
);

export default Index;
