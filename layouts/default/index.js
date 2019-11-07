import Helmet from 'components/helmet';
import './global.scss';

const DefaultLayout = (props) => (
  <div>
    <Helmet />
    { props.children }
  </div>
);

export default DefaultLayout;
