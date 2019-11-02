import { MDXProvider } from '@mdx-js/react';
import MdxComponents from '../mdx-components';
import { GuideBodyWrap } from './style';

const GuideBody = (props) => (
  <MDXProvider components={ MdxComponents }>
    <GuideBodyWrap>
      { props.children }
    </GuideBodyWrap>
  </MDXProvider>
);

export default GuideBody;