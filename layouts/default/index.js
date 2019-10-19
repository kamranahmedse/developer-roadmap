import { faGithub, fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

import Head from '../../components/head';
import '../../pages/global.scss';

library.add(fab, faGithub, faArrowRight);

const DefaultLayout = (props) => (
  <div>
    <Head />
    { props.children }
  </div>
);

export default DefaultLayout;