import { MDXProvider } from '@mdx-js/react';
import MdxComponents from 'components/mdx-components';

const MdRenderer = (props) => (
  <MDXProvider components={ MdxComponents }>
    { props.children }
  </MDXProvider>
);

export default MdRenderer;
