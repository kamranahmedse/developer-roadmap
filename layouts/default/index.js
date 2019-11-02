import Head from './head';
import './global.scss';

const DefaultLayout = (props) => (
  <div>
    <Head />
    { props.children }
  </div>
);

export default DefaultLayout;